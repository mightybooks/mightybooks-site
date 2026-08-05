begin;

-- Reader objects are delivered only through short-lived signed URLs issued by
-- the server after application-level authorization. Existing permissive
-- storage policies must not allow an authenticated browser to bypass that API
-- after learning a bucket and object path from a signed URL.
create or replace function public.is_book_reader_storage_bucket(
  p_bucket_id text
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.book_reader_assets as assets
    where assets.storage_bucket = p_bucket_id
  );
$$;

revoke all on function public.is_book_reader_storage_bucket(text) from public;
revoke all on function public.is_book_reader_storage_bucket(text) from anon;
revoke all on function public.is_book_reader_storage_bucket(text) from authenticated;
grant execute on function public.is_book_reader_storage_bucket(text) to authenticated;
grant execute on function public.is_book_reader_storage_bucket(text) to service_role;

drop policy if exists "Block direct authenticated reader downloads"
on storage.objects;
create policy "Block direct authenticated reader downloads"
on storage.objects
as restrictive
for select
to authenticated
using (not public.is_book_reader_storage_bucket(bucket_id));

drop policy if exists "Block direct authenticated reader uploads"
on storage.objects;
create policy "Block direct authenticated reader uploads"
on storage.objects
as restrictive
for insert
to authenticated
with check (not public.is_book_reader_storage_bucket(bucket_id));

drop policy if exists "Block direct authenticated reader updates"
on storage.objects;
create policy "Block direct authenticated reader updates"
on storage.objects
as restrictive
for update
to authenticated
using (not public.is_book_reader_storage_bucket(bucket_id))
with check (not public.is_book_reader_storage_bucket(bucket_id));

drop policy if exists "Block direct authenticated reader deletes"
on storage.objects;
create policy "Block direct authenticated reader deletes"
on storage.objects
as restrictive
for delete
to authenticated
using (not public.is_book_reader_storage_bucket(bucket_id));

commit;
