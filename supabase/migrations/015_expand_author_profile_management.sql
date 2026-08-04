begin;

alter table public.authors
  add column social_links jsonb not null default '[]'::jsonb,
  add column external_links jsonb not null default '[]'::jsonb,
  add column press_enabled boolean not null default false,
  add constraint authors_social_links_array_check
    check (jsonb_typeof(social_links) = 'array'),
  add constraint authors_external_links_array_check
    check (jsonb_typeof(external_links) = 'array');

create table public.author_press_items (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null
    references public.authors(id) on delete cascade,
  outlet_name text not null,
  title text not null,
  published_at date not null,
  summary text,
  source_url text not null,
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint author_press_items_outlet_name_check
    check (char_length(btrim(outlet_name)) between 1 and 120),
  constraint author_press_items_title_check
    check (char_length(btrim(title)) between 1 and 200),
  constraint author_press_items_summary_check
    check (summary is null or char_length(btrim(summary)) between 1 and 500),
  constraint author_press_items_source_url_check
    check (char_length(btrim(source_url)) between 1 and 2048),
  constraint author_press_items_sort_order_check
    check (sort_order >= 0)
);

create index author_press_items_author_id_sort_order_idx
on public.author_press_items(author_id, sort_order, published_at desc);

create table public.author_slug_history (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null
    references public.authors(id) on delete cascade,
  old_slug text not null unique,
  created_at timestamptz not null default now(),
  constraint author_slug_history_old_slug_check
    check (
      char_length(old_slug) between 1 and 64
      and old_slug = btrim(old_slug)
      and old_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    )
);

create index author_slug_history_author_id_idx
on public.author_slug_history(author_id);

create or replace function public.ensure_author_slug_not_reserved()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(new.slug, 0)
  );

  if exists (
    select 1
    from public.reserved_public_slugs
    where public.reserved_public_slugs.slug = new.slug
  ) then
    raise exception 'Author slug "%" is reserved.', new.slug
      using errcode = '23514';
  end if;

  if exists (
    select 1
    from public.author_slug_history
    where public.author_slug_history.old_slug = new.slug
      and public.author_slug_history.author_id <> new.id
  ) then
    raise exception 'Author slug "%" is reserved by history.', new.slug
      using errcode = '23514';
  end if;

  return new;
end;
$$;

create function public.record_author_slug_history()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  delete from public.author_slug_history
  where public.author_slug_history.author_id = new.id
    and public.author_slug_history.old_slug = new.slug;

  insert into public.author_slug_history(author_id, old_slug)
  values (new.id, old.slug);

  return new;
end;
$$;

create trigger record_author_slug_history
after update of slug on public.authors
for each row
when (old.slug is distinct from new.slug)
execute function public.record_author_slug_history();

create function public.set_author_press_items_updated_at()
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

create trigger set_author_press_items_updated_at
before update on public.author_press_items
for each row
execute function public.set_author_press_items_updated_at();

create function public.save_admin_library_author_v2(
  p_author_id uuid,
  p_author jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_author_id uuid;
  v_press_item jsonb;
begin
  v_author_id := public.save_admin_library_author(p_author_id, p_author);

  update public.authors
  set
    social_links = p_author -> 'social_links',
    external_links = p_author -> 'external_links',
    press_enabled = (p_author ->> 'press_enabled')::boolean
  where public.authors.id = v_author_id;

  delete from public.author_press_items
  where public.author_press_items.author_id = v_author_id;

  for v_press_item in
    select entry.value
    from pg_catalog.jsonb_array_elements(
      p_author -> 'press_items'
    ) with ordinality as entry(value, position)
    order by entry.position
  loop
    insert into public.author_press_items (
      author_id,
      outlet_name,
      title,
      published_at,
      summary,
      source_url,
      is_visible,
      sort_order
    )
    values (
      v_author_id,
      v_press_item ->> 'outlet_name',
      v_press_item ->> 'title',
      (v_press_item ->> 'published_at')::date,
      v_press_item ->> 'summary',
      v_press_item ->> 'source_url',
      (v_press_item ->> 'is_visible')::boolean,
      (v_press_item ->> 'sort_order')::integer
    );
  end loop;

  return v_author_id;
end;
$$;

alter table public.author_press_items enable row level security;
alter table public.author_slug_history enable row level security;

revoke all on table public.author_press_items from public;
revoke all on table public.author_press_items from anon;
revoke all on table public.author_press_items from authenticated;
revoke all on table public.author_press_items from service_role;
grant select, insert, update, delete
on table public.author_press_items to service_role;

revoke all on table public.author_slug_history from public;
revoke all on table public.author_slug_history from anon;
revoke all on table public.author_slug_history from authenticated;
revoke all on table public.author_slug_history from service_role;
grant select, insert, update, delete
on table public.author_slug_history to service_role;

revoke all on function public.record_author_slug_history() from public;
revoke all on function public.record_author_slug_history() from anon;
revoke all on function public.record_author_slug_history() from authenticated;
revoke all on function public.record_author_slug_history() from service_role;
grant execute on function public.record_author_slug_history() to service_role;

revoke all on function public.set_author_press_items_updated_at() from public;
revoke all on function public.set_author_press_items_updated_at() from anon;
revoke all on function public.set_author_press_items_updated_at()
from authenticated;
revoke all on function public.set_author_press_items_updated_at()
from service_role;
grant execute on function public.set_author_press_items_updated_at()
to service_role;

revoke all on function public.save_admin_library_author_v2(uuid, jsonb)
from public;
revoke all on function public.save_admin_library_author_v2(uuid, jsonb)
from anon;
revoke all on function public.save_admin_library_author_v2(uuid, jsonb)
from authenticated;
revoke all on function public.save_admin_library_author_v2(uuid, jsonb)
from service_role;
grant execute on function public.save_admin_library_author_v2(uuid, jsonb)
to service_role;

commit;
