-- 13-5B 관리자 도서 API 적용 후 읽기 전용 검증 SQL

select
  '01_books_with_authors' as test_case,
  b.id as book_id,
  b.slug as book_slug,
  b.status as book_status,
  ba.author_id,
  a.slug as author_slug,
  a.status as author_status,
  ba.role,
  ba.sort_order
from public.books as b
left join public.book_authors as ba on ba.book_id = b.id
left join public.authors as a on a.id = ba.author_id
order by b.display_order, b.created_at desc, b.slug, ba.sort_order, ba.author_id;

select
  '02_sample_assets' as test_case,
  b.id as book_id,
  b.slug as book_slug,
  s.public_path_prefix,
  s.page_count,
  s.file_extension,
  s.filename_padding,
  s.page_width,
  s.page_height,
  s.status
from public.books as b
left join public.book_sample_assets as s on s.book_id = b.id
order by b.slug;

select
  '03_reader_assets' as test_case,
  b.id as book_id,
  b.slug as book_slug,
  r.storage_bucket,
  r.storage_prefix,
  r.page_count,
  r.file_extension,
  r.filename_padding,
  r.page_width,
  r.page_height,
  r.status
from public.books as b
left join public.book_reader_assets as r on r.book_id = b.id
order by b.slug;

select
  '04_entitlement_counts' as test_case,
  b.id as book_id,
  b.slug as book_slug,
  count(e.id)::integer as entitlement_count
from public.books as b
left join public.book_entitlements as e on e.book_id = b.id
group by b.id, b.slug
order by b.slug;

select
  '05_orphan_book_authors' as test_case,
  ba.book_id,
  ba.author_id,
  (b.id is null) as missing_book,
  (a.id is null) as missing_author
from public.book_authors as ba
left join public.books as b on b.id = ba.book_id
left join public.authors as a on a.id = ba.author_id
where b.id is null or a.id is null;

select
  '06_orphan_sample_assets' as test_case,
  s.book_id
from public.book_sample_assets as s
left join public.books as b on b.id = s.book_id
where b.id is null;

select
  '07_orphan_reader_assets' as test_case,
  r.book_id
from public.book_reader_assets as r
left join public.books as b on b.id = r.book_id
where b.id is null;

select
  '08_duplicate_book_slugs' as test_case,
  b.slug,
  count(*)::integer as duplicate_count
from public.books as b
group by b.slug
having count(*) > 1;

select
  '09_duplicate_book_authors' as test_case,
  ba.book_id,
  ba.author_id,
  count(*)::integer as duplicate_count
from public.book_authors as ba
group by ba.book_id, ba.author_id
having count(*) > 1;

select
  '10_published_book_representative_author' as test_case,
  b.id as book_id,
  b.slug as book_slug,
  representative.author_id,
  a.slug as author_slug,
  a.status as author_status,
  (
    representative.author_id is not null
    and a.status = 'published'
  ) as is_valid
from public.books as b
left join lateral (
  select ba.author_id
  from public.book_authors as ba
  where ba.book_id = b.id
    and ba.role = 'author'
  order by ba.sort_order, ba.author_id
  limit 1
) as representative on true
left join public.authors as a on a.id = representative.author_id
where b.status = 'published'
order by b.slug;

select
  '11_admin_book_function_privileges' as test_case,
  p.oid::regprocedure::text as function_signature,
  p.prosecdef as security_definer,
  p.proconfig as function_settings,
  coalesce(grantee.rolname, 'PUBLIC') as grantee,
  privileges.privilege_type,
  privileges.is_grantable
from pg_catalog.pg_proc as p
join pg_catalog.pg_namespace as n on n.oid = p.pronamespace
cross join lateral pg_catalog.aclexplode(
  coalesce(
    p.proacl,
    pg_catalog.acldefault('f', p.proowner)
  )
) as privileges
left join pg_catalog.pg_roles as grantee
  on grantee.oid = privileges.grantee
where n.nspname = 'public'
  and p.proname in (
    'save_admin_library_book',
    'delete_admin_library_book'
  )
order by 2, 5, 6;

select
  '12_library_table_rls' as test_case,
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as rls_forced
from pg_catalog.pg_class as c
join pg_catalog.pg_namespace as n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in (
    'books',
    'book_authors',
    'book_sample_assets',
    'book_reader_assets',
    'book_entitlements'
  )
order by c.relname;

select
  '13_library_table_grants' as test_case,
  grants.table_name,
  grants.grantee,
  grants.privilege_type
from information_schema.role_table_grants as grants
where grants.table_schema = 'public'
  and grants.table_name in (
    'books',
    'book_authors',
    'book_sample_assets',
    'book_reader_assets',
    'book_entitlements'
  )
  and grants.grantee in (
    'PUBLIC',
    'anon',
    'authenticated',
    'service_role'
  )
order by grants.table_name, grants.grantee, grants.privilege_type;
