-- Login structure steps 2 and 3 were applied to the production database first
-- through the Supabase SQL Editor. This migration records that final structure
-- in the formal migration history so a new database reaches the same state by
-- running migrations 001 through 006. The legacy admin_users table is replaced
-- by user_roles and removed only after its existing rows have been backfilled.

begin;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  account_status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_account_status_check
    check (account_status in ('active', 'suspended'))
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
security invoker
set search_path = ''
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
set search_path = ''
as $$
begin
  insert into public.profiles (
    user_id,
    display_name,
    account_status
  )
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'contact_name'
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
  display_name,
  account_status,
  created_at,
  updated_at
)
select
  users.id,
  coalesce(
    users.raw_user_meta_data ->> 'display_name',
    users.raw_user_meta_data ->> 'name',
    users.raw_user_meta_data ->> 'contact_name'
  ),
  'active',
  users.created_at,
  now()
from auth.users as users
on conflict (user_id) do update
set
  display_name = coalesce(
    public.profiles.display_name,
    excluded.display_name
  ),
  updated_at = now();

do $$
begin
  if to_regclass('public.admin_users') is not null then
    execute $backfill$
      insert into public.user_roles (user_id, role)
      select user_id, 'admin'
      from public.admin_users
      on conflict (user_id, role) do nothing
    $backfill$;
  end if;
end;
$$;

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
set search_path = ''
as $$
  select
    check_user_id is not null
    and check_user_id = auth.uid()
    and exists (
      select 1
      from public.profiles p
      where p.user_id = check_user_id
        and p.account_status = 'active'
    )
    and exists (
      select 1
      from public.user_roles ur
      where ur.user_id = check_user_id
        and ur.role in ('admin', 'staff')
    );
$$;

create or replace function public.update_partner_status_with_note(
  p_partner_profile_id uuid,
  p_new_status text,
  p_updated_by uuid,
  p_rejected_reason text default null,
  p_internal_memo text default null,
  p_partner_code text default null
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_current public.partner_profiles%rowtype;
  v_updated public.partner_profiles%rowtype;

  v_rejected_reason text :=
    nullif(btrim(coalesce(p_rejected_reason, '')), '');

  v_internal_memo text :=
    nullif(btrim(coalesce(p_internal_memo, '')), '');

  v_partner_code text :=
    nullif(upper(btrim(coalesce(p_partner_code, ''))), '');
begin
  if p_partner_profile_id is null then
    raise exception 'PARTNER_ID_REQUIRED'
      using errcode = '22023';
  end if;

  if p_updated_by is null then
    raise exception 'ADMIN_ID_REQUIRED'
      using errcode = '22023';
  end if;

  if not exists (
    select 1
    from public.profiles p
    join public.user_roles ur
      on ur.user_id = p.user_id
    where p.user_id = p_updated_by
      and p.account_status = 'active'
      and ur.role in ('admin', 'staff')
  ) then
    raise exception 'ADMIN_REQUIRED'
      using errcode = '42501';
  end if;

  if p_new_status is null
    or p_new_status not in (
      'pending',
      'on_hold',
      'approved',
      'rejected',
      'suspended'
    )
  then
    raise exception 'INVALID_STATUS'
      using errcode = '22023';
  end if;

  if v_rejected_reason is not null
    and char_length(v_rejected_reason) > 1000
  then
    raise exception 'REJECTED_REASON_TOO_LONG'
      using errcode = '22023';
  end if;

  if v_internal_memo is not null
    and char_length(v_internal_memo) > 5000
  then
    raise exception 'INTERNAL_MEMO_TOO_LONG'
      using errcode = '22023';
  end if;

  select *
  into v_current
  from public.partner_profiles
  where id = p_partner_profile_id
  for update;

  if not found then
    raise exception 'PARTNER_NOT_FOUND'
      using errcode = 'P0002';
  end if;

  if not (
    case v_current.status
      when 'pending' then
        p_new_status in (
          'pending',
          'on_hold',
          'approved',
          'rejected'
        )

      when 'on_hold' then
        p_new_status in (
          'on_hold',
          'approved',
          'rejected'
        )

      when 'approved' then
        p_new_status in (
          'approved',
          'suspended'
        )

      when 'suspended' then
        p_new_status in (
          'suspended',
          'approved'
        )

      when 'rejected' then
        p_new_status = 'rejected'

      else false
    end
  ) then
    raise exception 'INVALID_STATUS_TRANSITION'
      using errcode = 'P0001';
  end if;

  if p_new_status = 'rejected'
    and v_rejected_reason is null
  then
    raise exception 'REJECTED_REASON_REQUIRED'
      using errcode = '22023';
  end if;

  if p_new_status = 'approved'
    and v_current.partner_code is null
  then
    if v_partner_code is null
      or v_partner_code !~ '^MB-[A-Z0-9]{5}$'
    then
      raise exception 'VALID_PARTNER_CODE_REQUIRED'
        using errcode = '22023';
    end if;
  end if;

  update public.partner_profiles
  set
    status = p_new_status,

    partner_code = case
      when p_new_status = 'approved'
        then coalesce(
          v_current.partner_code,
          v_partner_code
        )
      else v_current.partner_code
    end,

    approved_at = case
      when p_new_status = 'approved'
        then coalesce(
          v_current.approved_at,
          now()
        )
      else v_current.approved_at
    end,

    approved_by = case
      when p_new_status = 'approved'
        and v_current.status <> 'approved'
        then p_updated_by
      else v_current.approved_by
    end,

    rejected_reason = case
      when p_new_status = 'rejected'
        then v_rejected_reason
      else null
    end,

    updated_at = now()

  where id = p_partner_profile_id
  returning *
  into v_updated;

  insert into public.partner_admin_notes (
    partner_profile_id,
    internal_memo,
    updated_by,
    updated_at
  )
  values (
    p_partner_profile_id,
    v_internal_memo,
    p_updated_by,
    now()
  )
  on conflict (partner_profile_id)
  do update set
    internal_memo = excluded.internal_memo,
    updated_by = excluded.updated_by,
    updated_at = now();

  if v_current.status <> p_new_status then
    insert into public.partner_status_history (
      partner_profile_id,
      previous_status,
      new_status,
      changed_by,
      rejected_reason,
      internal_memo_snapshot,
      created_at
    )
    values (
      p_partner_profile_id,
      v_current.status,
      p_new_status,
      p_updated_by,
      case
        when p_new_status = 'rejected'
          then v_rejected_reason
        else null
      end,
      v_internal_memo,
      now()
    );
  end if;

  return
    to_jsonb(v_updated)
    || jsonb_build_object(
      'internal_memo',
      coalesce(v_internal_memo, '')
    );
end;
$function$;

revoke all on function public.is_admin(uuid) from public;
revoke all on function public.is_admin(uuid) from anon;
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.is_admin(uuid) to service_role;

revoke all on function
public.update_partner_status_with_note(uuid,text,uuid,text,text,text)
from public;

revoke all on function
public.update_partner_status_with_note(uuid,text,uuid,text,text,text)
from anon;

revoke all on function
public.update_partner_status_with_note(uuid,text,uuid,text,text,text)
from authenticated;

grant execute on function
public.update_partner_status_with_note(uuid,text,uuid,text,text,text)
to service_role;

drop table if exists public.admin_users;

commit;
