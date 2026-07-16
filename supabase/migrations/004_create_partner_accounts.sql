create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin(check_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = check_user_id
  );
$$;

revoke all on function public.is_admin(uuid) from public;
grant execute on function public.is_admin(uuid) to authenticated;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
  on public.admin_users for select to authenticated
  using (public.is_admin());

create table if not exists public.partner_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  business_type text not null,
  region text not null,
  website_url text,
  sns_url text,
  introduction_plan text not null,
  has_offline_store boolean not null default false,
  can_display_cards boolean not null default false,
  can_display_banner boolean not null default false,
  status text not null default 'pending',
  partner_code text unique,
  approved_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  rejected_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint partner_profiles_status_check check (status in ('pending', 'approved', 'rejected', 'suspended')),
  constraint partner_profiles_code_check check (partner_code is null or partner_code ~ '^MB-[A-Z0-9]{5}$')
);

create index if not exists partner_profiles_status_idx on public.partner_profiles(status);
create index if not exists partner_profiles_created_at_idx on public.partner_profiles(created_at desc);

create table if not exists public.partner_admin_notes (
  partner_profile_id uuid primary key references public.partner_profiles(id) on delete cascade,
  internal_memo text,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.partner_admin_notes enable row level security;

drop policy if exists "Admins can manage partner notes" on public.partner_admin_notes;
create policy "Admins can manage partner notes"
  on public.partner_admin_notes for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create or replace function public.set_partner_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_partner_profiles_updated_at on public.partner_profiles;
create trigger set_partner_profiles_updated_at
before update on public.partner_profiles
for each row execute function public.set_partner_profiles_updated_at();

create or replace function public.create_partner_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.raw_user_meta_data ->> 'account_type' = 'partner' then
    insert into public.partner_profiles (
      user_id, business_name, contact_name, email, phone, business_type,
      region, website_url, sns_url, introduction_plan, has_offline_store,
      can_display_cards, can_display_banner
    ) values (
      new.id,
      trim(coalesce(new.raw_user_meta_data ->> 'business_name', '')),
      trim(coalesce(new.raw_user_meta_data ->> 'contact_name', '')),
      new.email,
      trim(coalesce(new.raw_user_meta_data ->> 'phone', '')),
      trim(coalesce(new.raw_user_meta_data ->> 'business_type', '')),
      trim(coalesce(new.raw_user_meta_data ->> 'region', '')),
      nullif(trim(coalesce(new.raw_user_meta_data ->> 'website_url', '')), ''),
      nullif(trim(coalesce(new.raw_user_meta_data ->> 'sns_url', '')), ''),
      trim(coalesce(new.raw_user_meta_data ->> 'introduction_plan', '')),
      coalesce(new.raw_user_meta_data ->> 'has_offline_store' = 'true', false),
      coalesce(new.raw_user_meta_data ->> 'can_display_cards' = 'true', false),
      coalesce(new.raw_user_meta_data ->> 'can_display_banner' = 'true', false)
    );
  end if;
  return new;
end;
$$;

drop trigger if exists create_partner_profile_after_signup on auth.users;
create trigger create_partner_profile_after_signup
after insert on auth.users
for each row execute function public.create_partner_profile_for_new_user();

alter table public.partner_profiles enable row level security;

drop policy if exists "Partners can read own profile" on public.partner_profiles;
create policy "Partners can read own profile"
  on public.partner_profiles for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "Admins can update partner profiles" on public.partner_profiles;
create policy "Admins can update partner profiles"
  on public.partner_profiles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Partner accounts must not inherit the former "any authenticated user" access
-- to private consultation records.
do $$
declare policy_record record;
begin
  if to_regclass('public.consultation_logs') is not null then
    for policy_record in select policyname from pg_policies where schemaname = 'public' and tablename = 'consultation_logs'
    loop execute format('drop policy if exists %I on public.consultation_logs', policy_record.policyname); end loop;
    execute 'create policy "Admins can read consultation logs" on public.consultation_logs for select to authenticated using (public.is_admin())';
    execute 'create policy "Admins can insert consultation logs" on public.consultation_logs for insert to authenticated with check (public.is_admin())';
    execute 'create policy "Admins can update consultation logs" on public.consultation_logs for update to authenticated using (public.is_admin()) with check (public.is_admin())';
    execute 'create policy "Admins can delete consultation logs" on public.consultation_logs for delete to authenticated using (public.is_admin())';
  end if;
end $$;

-- Preserve public blog reads while restricting post mutations to administrators.
do $$
declare policy_record record;
begin
  if to_regclass('public.posts') is not null then
    for policy_record in select policyname from pg_policies where schemaname = 'public' and tablename = 'posts'
    loop execute format('drop policy if exists %I on public.posts', policy_record.policyname); end loop;
    execute 'create policy "Public can read published posts" on public.posts for select to anon, authenticated using (published = true)';
    execute 'create policy "Admins can read all posts" on public.posts for select to authenticated using (public.is_admin())';
    execute 'create policy "Admins can insert posts" on public.posts for insert to authenticated with check (public.is_admin())';
    execute 'create policy "Admins can update posts" on public.posts for update to authenticated using (public.is_admin()) with check (public.is_admin())';
    execute 'create policy "Admins can delete posts" on public.posts for delete to authenticated using (public.is_admin())';
  end if;
end $$;

-- Register the existing administrator.
do $$
declare
  target_admin_id uuid;
begin
  select id
    into target_admin_id
  from auth.users
  where lower(email) = lower('novelstudylab@naver.com')
  limit 1;

  if target_admin_id is null then
    raise exception
      '관리자 등록 실패: auth.users에서 novelstudylab@naver.com 계정을 찾을 수 없습니다.';
  end if;

  insert into public.admin_users (user_id)
  values (target_admin_id)
  on conflict (user_id) do nothing;
end
$$;
