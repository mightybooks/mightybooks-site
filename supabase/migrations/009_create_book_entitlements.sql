begin;

create table public.book_entitlements (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null
    references public.books(id) on delete cascade,
  user_id uuid not null
    references auth.users(id) on delete cascade,
  status text not null default 'active',
  source text not null default 'manual',
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint book_entitlements_book_user_unique
    unique (book_id, user_id),
  constraint book_entitlements_status_check
    check (status in ('active', 'revoked')),
  constraint book_entitlements_source_check
    check (source in ('manual', 'purchase', 'gift', 'import')),
  constraint book_entitlements_expiration_check
    check (expires_at is null or expires_at > starts_at)
);

create index book_entitlements_user_id_idx
on public.book_entitlements(user_id);

create or replace function public.set_book_entitlements_updated_at()
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

create trigger set_book_entitlements_updated_at
before update on public.book_entitlements
for each row
execute function public.set_book_entitlements_updated_at();

alter table public.book_entitlements enable row level security;

revoke all on table public.book_entitlements from anon;
revoke all on table public.book_entitlements from authenticated;

grant select on table public.book_entitlements to authenticated;
grant all on table public.book_entitlements to service_role;

create policy "Active users can read current book entitlements"
on public.book_entitlements
as permissive
for select
to authenticated
using (
  user_id = auth.uid()
  and status = 'active'
  and starts_at <= now()
  and (expires_at is null or expires_at > now())
  and exists (
    select 1
    from public.profiles as profiles
    where profiles.user_id = auth.uid()
      and profiles.account_status = 'active'
  )
);

create policy "Active entitled users can read non-draft books"
on public.books
as permissive
for select
to authenticated
using (
  books.status in ('published', 'archived')
  and exists (
    select 1
    from public.book_entitlements as entitlements
    join public.profiles as profiles
      on profiles.user_id = entitlements.user_id
    where entitlements.book_id = books.id
      and entitlements.user_id = auth.uid()
      and entitlements.status = 'active'
      and entitlements.starts_at <= now()
      and (
        entitlements.expires_at is null
        or entitlements.expires_at > now()
      )
      and profiles.account_status = 'active'
  )
);

commit;
