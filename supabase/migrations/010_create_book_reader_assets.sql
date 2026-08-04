begin;

create table public.book_reader_assets (
  book_id uuid primary key
    references public.books(id) on delete cascade,
  storage_bucket text not null,
  storage_prefix text not null,
  page_count integer not null,
  file_extension text not null default 'webp',
  filename_padding smallint not null default 3,
  page_width integer not null default 3180,
  page_height integer not null default 4500,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint book_reader_assets_storage_location_unique
    unique (storage_bucket, storage_prefix),
  constraint book_reader_assets_page_count_check
    check (page_count between 1 and 5000),
  constraint book_reader_assets_filename_padding_check
    check (filename_padding between 1 and 6),
  constraint book_reader_assets_page_width_check
    check (page_width >= 1),
  constraint book_reader_assets_page_height_check
    check (page_height >= 1),
  constraint book_reader_assets_file_extension_check
    check (file_extension in ('webp', 'png', 'jpg', 'jpeg')),
  constraint book_reader_assets_status_check
    check (status in ('active', 'disabled'))
);

create or replace function public.set_book_reader_assets_updated_at()
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

create trigger set_book_reader_assets_updated_at
before update on public.book_reader_assets
for each row
execute function public.set_book_reader_assets_updated_at();

alter table public.book_reader_assets enable row level security;

revoke all on table public.book_reader_assets from anon;
revoke all on table public.book_reader_assets from authenticated;

grant select, insert, update, delete
on table public.book_reader_assets
to service_role;

revoke all on function public.set_book_reader_assets_updated_at() from public;
revoke all on function public.set_book_reader_assets_updated_at() from anon;
revoke all on function public.set_book_reader_assets_updated_at() from authenticated;
grant execute on function public.set_book_reader_assets_updated_at() to service_role;

commit;
