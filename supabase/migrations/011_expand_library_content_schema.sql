begin;

alter table public.authors
  add column status text not null default 'draft',
  add column pen_name text,
  add column occupation text,
  add column profile_image_path text,
  add column short_bio text,
  add column bio_paragraphs text[] not null default '{}'::text[],
  add column display_order integer not null default 0,
  add constraint authors_status_check
    check (status in ('draft', 'published', 'archived')),
  add constraint authors_slug_length_check
    check (char_length(slug) <= 64),
  add constraint authors_pen_name_check
    check (pen_name is null or char_length(btrim(pen_name)) > 0),
  add constraint authors_occupation_check
    check (occupation is null or char_length(btrim(occupation)) > 0),
  add constraint authors_profile_image_path_check
    check (
      profile_image_path is null
      or char_length(btrim(profile_image_path)) > 0
    ),
  add constraint authors_short_bio_check
    check (short_bio is null or char_length(btrim(short_bio)) > 0),
  add constraint authors_display_order_check
    check (display_order >= 0);

alter table public.books
  add column display_title text,
  add column publisher_name text,
  add column publication_label text,
  add column cover_image_path text,
  add column cover_width integer,
  add column cover_height integer,
  add column short_description text,
  add column description_paragraphs text[] not null default '{}'::text[],
  add column contents text[] not null default '{}'::text[],
  add column display_order integer not null default 0,
  add constraint books_slug_length_check
    check (char_length(slug) <= 64),
  add constraint books_display_title_check
    check (
      display_title is null
      or char_length(btrim(display_title)) > 0
    ),
  add constraint books_publisher_name_check
    check (
      publisher_name is null
      or char_length(btrim(publisher_name)) > 0
    ),
  add constraint books_publication_label_check
    check (
      publication_label is null
      or char_length(btrim(publication_label)) > 0
    ),
  add constraint books_cover_image_path_check
    check (
      cover_image_path is null
      or char_length(btrim(cover_image_path)) > 0
    ),
  add constraint books_short_description_check
    check (
      short_description is null
      or char_length(btrim(short_description)) > 0
    ),
  add constraint books_cover_dimensions_check
    check (
      (cover_width is null and cover_height is null)
      or (
        cover_width is not null
        and cover_height is not null
        and cover_width >= 1
        and cover_height >= 1
      )
    ),
  add constraint books_display_order_check
    check (display_order >= 0);

create table public.author_career_sections (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null
    references public.authors(id) on delete cascade,
  title text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint author_career_sections_title_check
    check (char_length(btrim(title)) > 0),
  constraint author_career_sections_sort_order_check
    check (sort_order >= 0)
);

create table public.author_career_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null
    references public.author_career_sections(id) on delete cascade,
  item_type text not null,
  body text,
  organization text,
  work text,
  period text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint author_career_items_item_type_check
    check (item_type in ('text', 'structured')),
  constraint author_career_items_body_check
    check (body is null or char_length(btrim(body)) > 0),
  constraint author_career_items_organization_check
    check (
      organization is null
      or char_length(btrim(organization)) > 0
    ),
  constraint author_career_items_work_check
    check (work is null or char_length(btrim(work)) > 0),
  constraint author_career_items_period_check
    check (period is null or char_length(btrim(period)) > 0),
  constraint author_career_items_content_check
    check (num_nonnulls(body, organization, work, period) >= 1),
  constraint author_career_items_sort_order_check
    check (sort_order >= 0)
);

create index author_career_sections_author_id_sort_order_idx
on public.author_career_sections(author_id, sort_order);

create index author_career_items_section_id_sort_order_idx
on public.author_career_items(section_id, sort_order);

create table public.book_sample_assets (
  book_id uuid primary key
    references public.books(id) on delete cascade,
  public_path_prefix text not null,
  page_count integer not null,
  file_extension text not null default 'webp',
  filename_padding smallint not null default 3,
  page_width integer not null default 3180,
  page_height integer not null default 4500,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint book_sample_assets_public_path_prefix_unique
    unique (public_path_prefix),
  constraint book_sample_assets_public_path_prefix_check
    check (char_length(btrim(public_path_prefix)) > 0),
  constraint book_sample_assets_page_count_check
    check (page_count between 1 and 5000),
  constraint book_sample_assets_filename_padding_check
    check (filename_padding between 1 and 6),
  constraint book_sample_assets_page_width_check
    check (page_width >= 1),
  constraint book_sample_assets_page_height_check
    check (page_height >= 1),
  constraint book_sample_assets_file_extension_check
    check (file_extension in ('webp', 'png', 'jpg', 'jpeg')),
  constraint book_sample_assets_status_check
    check (status in ('active', 'disabled'))
);

create table public.reserved_public_slugs (
  slug text primary key,
  reason text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reserved_public_slugs_slug_check
    check (
      slug <> ''
      and slug = btrim(slug)
      and char_length(slug) <= 64
      and (
        slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
        or slug = '_next'
      )
    ),
  constraint reserved_public_slugs_reason_check
    check (char_length(btrim(reason)) > 0)
);

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

  return new;
end;
$$;

create trigger ensure_author_slug_not_reserved
before insert or update of slug on public.authors
for each row
execute function public.ensure_author_slug_not_reserved();

create or replace function public.ensure_reserved_slug_not_used_by_author()
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
    from public.authors
    where public.authors.slug = new.slug
  ) then
    raise exception 'Reserved slug "%" is already used by an author.', new.slug
      using errcode = '23514';
  end if;

  return new;
end;
$$;

create trigger ensure_reserved_slug_not_used_by_author
before insert or update of slug on public.reserved_public_slugs
for each row
execute function public.ensure_reserved_slug_not_used_by_author();

insert into public.reserved_public_slugs (slug, reason)
values
  ('about', 'existing_app_route'),
  ('account', 'existing_app_route'),
  ('admin', 'existing_app_route'),
  ('api', 'existing_app_route'),
  ('auth', 'existing_app_route'),
  ('blog', 'existing_app_route'),
  ('business', 'existing_app_route'),
  ('library', 'existing_app_route'),
  ('partner', 'existing_app_route'),
  ('portfolio', 'existing_app_route'),
  ('r', 'existing_app_route'),
  ('reference', 'existing_app_route'),
  ('support', 'existing_app_route'),
  ('tools', 'existing_app_route'),
  ('workshop', 'existing_app_route'),
  ('robots', 'framework_or_public_route'),
  ('sitemap', 'framework_or_public_route'),
  ('favicon', 'framework_or_public_route'),
  ('manifest', 'framework_or_public_route'),
  ('www', 'operational_reserved_name'),
  ('_next', 'next_internal_route'),
  ('login', 'authentication_route'),
  ('signup', 'authentication_route'),
  ('logout', 'authentication_route');

create or replace function public.set_author_career_sections_updated_at()
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

create trigger set_author_career_sections_updated_at
before update on public.author_career_sections
for each row
execute function public.set_author_career_sections_updated_at();

create or replace function public.set_author_career_items_updated_at()
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

create trigger set_author_career_items_updated_at
before update on public.author_career_items
for each row
execute function public.set_author_career_items_updated_at();

create or replace function public.set_book_sample_assets_updated_at()
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

create trigger set_book_sample_assets_updated_at
before update on public.book_sample_assets
for each row
execute function public.set_book_sample_assets_updated_at();

create or replace function public.set_reserved_public_slugs_updated_at()
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

create trigger set_reserved_public_slugs_updated_at
before update on public.reserved_public_slugs
for each row
execute function public.set_reserved_public_slugs_updated_at();

alter table public.author_career_sections enable row level security;
alter table public.author_career_items enable row level security;
alter table public.book_sample_assets enable row level security;
alter table public.reserved_public_slugs enable row level security;

revoke all on table public.author_career_sections from public;
revoke all on table public.author_career_sections from anon;
revoke all on table public.author_career_sections from authenticated;
revoke all on table public.author_career_sections from service_role;

revoke all on table public.author_career_items from public;
revoke all on table public.author_career_items from anon;
revoke all on table public.author_career_items from authenticated;
revoke all on table public.author_career_items from service_role;

revoke all on table public.book_sample_assets from public;
revoke all on table public.book_sample_assets from anon;
revoke all on table public.book_sample_assets from authenticated;
revoke all on table public.book_sample_assets from service_role;

revoke all on table public.reserved_public_slugs from public;
revoke all on table public.reserved_public_slugs from anon;
revoke all on table public.reserved_public_slugs from authenticated;
revoke all on table public.reserved_public_slugs from service_role;

grant select, insert, update, delete
on table public.author_career_sections
to service_role;

grant select, insert, update, delete
on table public.author_career_items
to service_role;

grant select, insert, update, delete
on table public.book_sample_assets
to service_role;

grant select, insert, update, delete
on table public.reserved_public_slugs
to service_role;

revoke all on function public.ensure_author_slug_not_reserved() from public;
revoke all on function public.ensure_author_slug_not_reserved() from anon;
revoke all on function public.ensure_author_slug_not_reserved() from authenticated;
grant execute on function public.ensure_author_slug_not_reserved() to service_role;

revoke all on function public.ensure_reserved_slug_not_used_by_author() from public;
revoke all on function public.ensure_reserved_slug_not_used_by_author() from anon;
revoke all on function public.ensure_reserved_slug_not_used_by_author() from authenticated;
grant execute on function public.ensure_reserved_slug_not_used_by_author() to service_role;

revoke all on function public.set_author_career_sections_updated_at() from public;
revoke all on function public.set_author_career_sections_updated_at() from anon;
revoke all on function public.set_author_career_sections_updated_at() from authenticated;
grant execute on function public.set_author_career_sections_updated_at()
to service_role;

revoke all on function public.set_author_career_items_updated_at() from public;
revoke all on function public.set_author_career_items_updated_at() from anon;
revoke all on function public.set_author_career_items_updated_at() from authenticated;
grant execute on function public.set_author_career_items_updated_at()
to service_role;

revoke all on function public.set_book_sample_assets_updated_at() from public;
revoke all on function public.set_book_sample_assets_updated_at() from anon;
revoke all on function public.set_book_sample_assets_updated_at() from authenticated;
grant execute on function public.set_book_sample_assets_updated_at()
to service_role;

revoke all on function public.set_reserved_public_slugs_updated_at() from public;
revoke all on function public.set_reserved_public_slugs_updated_at() from anon;
revoke all on function public.set_reserved_public_slugs_updated_at()
from authenticated;
grant execute on function public.set_reserved_public_slugs_updated_at()
to service_role;

commit;
