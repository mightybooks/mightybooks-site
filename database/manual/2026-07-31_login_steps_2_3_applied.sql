-- 2026-07-31 Supabase SQL Editor에서 이미 수동 적용 완료한 기록입니다.
-- 현재 운영 DB에 다시 실행하지 마십시오.
-- 자동 실행용 migration 파일이 아니라 작업 이력 보존용입니다.

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  account_status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_account_status_check
    check (account_status in ('active', 'suspended', 'withdrawn'))
);

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, role),
  constraint user_roles_role_check
    check (role in ('admin', 'staff'))
);

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_profiles_updated_at();

create or replace function public.create_profile_after_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    user_id,
    email,
    display_name,
    account_status
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name'
    ),
    'active'
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists create_profile_after_signup on auth.users;
create trigger create_profile_after_signup
after insert on auth.users
for each row
execute function public.create_profile_after_signup();

insert into public.profiles (
  user_id,
  email,
  display_name,
  account_status,
  created_at,
  updated_at
)
select
  users.id,
  coalesce(users.email, ''),
  coalesce(
    users.raw_user_meta_data ->> 'display_name',
    users.raw_user_meta_data ->> 'full_name'
  ),
  'active',
  users.created_at,
  now()
from auth.users as users
on conflict (user_id) do update
set
  email = excluded.email,
  display_name = coalesce(
    public.profiles.display_name,
    excluded.display_name
  ),
  updated_at = now();

insert into public.user_roles (
  user_id,
  role
)
select
  admin_users.user_id,
  'admin'
from public.admin_users as admin_users
on conflict (user_id, role) do nothing;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;
revoke all on table public.user_roles from anon;
revoke all on table public.user_roles from authenticated;

grant select on table public.profiles to authenticated;
grant update (display_name) on table public.profiles to authenticated;
grant select on table public.user_roles to authenticated;
grant all on table public.profiles to service_role;
grant all on table public.user_roles to service_role;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Users can read own roles" on public.user_roles;
create policy "Users can read own roles"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

create or replace function public.is_admin(
  check_user_id uuid default auth.uid()
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    check_user_id = auth.uid()
    and exists (
      select 1
      from public.profiles
      where profiles.user_id = check_user_id
        and profiles.account_status = 'active'
    )
    and exists (
      select 1
      from public.user_roles
      where user_roles.user_id = check_user_id
        and user_roles.role in ('admin', 'staff')
    );
$$;

revoke all on function public.is_admin(uuid) from public;
revoke execute on function public.is_admin(uuid) from anon;
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.is_admin(uuid) to service_role;
