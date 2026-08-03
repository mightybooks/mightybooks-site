begin;

create table public.authors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint authors_slug_check
    check (
      slug <> ''
      and slug = btrim(slug)
      and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    ),
  constraint authors_display_name_check
    check (char_length(btrim(display_name)) > 0)
);

create table public.author_memberships (
  author_id uuid not null
    references public.authors(id) on delete cascade,
  user_id uuid not null
    references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  primary key (author_id, user_id),
  constraint author_memberships_role_check
    check (role in ('owner', 'manager'))
);

create index author_memberships_user_id_idx
on public.author_memberships(user_id);

create or replace function public.set_authors_updated_at()
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

create trigger set_authors_updated_at
before update on public.authors
for each row
execute function public.set_authors_updated_at();

insert into public.authors (
  slug,
  display_name
)
values (
  'moon-surim',
  '문수림'
)
on conflict (slug) do update
set display_name = excluded.display_name;

alter table public.authors enable row level security;
alter table public.author_memberships enable row level security;

revoke all on table public.authors from anon;
revoke all on table public.authors from authenticated;
revoke all on table public.author_memberships from anon;
revoke all on table public.author_memberships from authenticated;

grant select on table public.authors to authenticated;
grant select on table public.author_memberships to authenticated;
grant all on table public.authors to service_role;
grant all on table public.author_memberships to service_role;

create policy "Active users can read own author memberships"
on public.author_memberships
for select
to authenticated
using (
  user_id = auth.uid()
  and exists (
    select 1
    from public.profiles p
    where p.user_id = auth.uid()
      and p.account_status = 'active'
  )
);

create policy "Active members can read linked authors"
on public.authors
for select
to authenticated
using (
  exists (
    select 1
    from public.author_memberships am
    join public.profiles p
      on p.user_id = am.user_id
    where am.author_id = authors.id
      and am.user_id = auth.uid()
      and p.account_status = 'active'
  )
);

commit;
