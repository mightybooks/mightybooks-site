begin;

create table public.books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint books_slug_check check (
    slug <> ''
    and slug = btrim(slug)
    and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
  ),
  constraint books_title_check check (char_length(btrim(title)) > 0),
  constraint books_status_check check (status in ('draft', 'published', 'archived'))
);

create table public.book_authors (
  book_id uuid not null references public.books(id) on delete cascade,
  author_id uuid not null references public.authors(id) on delete cascade,
  role text not null default 'author',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (book_id, author_id),
  constraint book_authors_role_check check (role in ('author', 'coauthor')),
  constraint book_authors_sort_order_check check (sort_order >= 0)
);

create index book_authors_author_id_idx
  on public.book_authors (author_id);

create or replace function public.set_books_updated_at()
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

create trigger set_books_updated_at
before update on public.books
for each row
execute function public.set_books_updated_at();

insert into public.authors (slug, display_name)
values
  ('moon-surim', '문수림'),
  ('estella-cho', '조현영(에스텔라)'),
  ('jungmyeongju', '정명주'),
  ('sian', '시안')
on conflict (slug) do update
set display_name = excluded.display_name;

insert into public.books (slug, title, status)
values
  ('500-character-fiction', '500자 소설', 'published'),
  ('gaze-before-perfect-german', '완벽한 독일어보다 눈빛이 먼저다', 'published'),
  ('my-heart-said-look-longer', '내 마음이 오래 봐 달라고 말했다', 'published'),
  ('i-held-a-chubby-rabbit', '토실토실 토끼를 안았습니다', 'published')
on conflict (slug) do update
set
  title = excluded.title,
  status = excluded.status;

insert into public.book_authors (book_id, author_id, role, sort_order)
select
  books.id,
  authors.id,
  links.role,
  links.sort_order
from (
  values
    ('500-character-fiction', 'moon-surim', 'author', 0),
    ('gaze-before-perfect-german', 'estella-cho', 'author', 0),
    ('my-heart-said-look-longer', 'jungmyeongju', 'author', 0),
    ('i-held-a-chubby-rabbit', 'sian', 'author', 0)
) as links (book_slug, author_slug, role, sort_order)
join public.books as books
  on books.slug = links.book_slug
join public.authors as authors
  on authors.slug = links.author_slug
on conflict (book_id, author_id) do update
set
  role = excluded.role,
  sort_order = excluded.sort_order;

alter table public.books enable row level security;
alter table public.book_authors enable row level security;

revoke all on table public.books from anon;
revoke all on table public.books from authenticated;
grant select on table public.books to authenticated;
grant all on table public.books to service_role;

revoke all on table public.book_authors from anon;
revoke all on table public.book_authors from authenticated;
grant select on table public.book_authors to authenticated;
grant all on table public.book_authors to service_role;

create policy "Active author members can read linked books"
on public.books
for select
to authenticated
using (
  exists (
    select 1
    from public.book_authors as book_links
    join public.author_memberships as memberships
      on memberships.author_id = book_links.author_id
    join public.profiles as profiles
      on profiles.user_id = memberships.user_id
    where book_links.book_id = books.id
      and memberships.user_id = auth.uid()
      and profiles.account_status = 'active'
  )
);

create policy "Active author members can read own book links"
on public.book_authors
for select
to authenticated
using (
  exists (
    select 1
    from public.author_memberships as memberships
    join public.profiles as profiles
      on profiles.user_id = memberships.user_id
    where memberships.author_id = book_authors.author_id
      and memberships.user_id = auth.uid()
      and profiles.account_status = 'active'
  )
);

commit;
