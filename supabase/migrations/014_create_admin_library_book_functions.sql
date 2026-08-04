begin;

create function public.save_admin_library_book(
  p_book_id uuid,
  p_book jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_book_id uuid;
  v_description_paragraphs text[];
  v_contents text[];
  v_author jsonb;
  v_sample_asset jsonb;
  v_reader_asset jsonb;
  v_status text;
  v_cover_image_path text;
  v_short_description text;
  v_representative_author_id uuid;
  v_representative_author_status text;
  v_constraint_name text;
begin
  if p_book ? 'description_paragraphs' then
    select coalesce(
      array_agg(entry.value order by entry.position),
      '{}'::text[]
    )
    into v_description_paragraphs
    from pg_catalog.jsonb_array_elements_text(
      p_book -> 'description_paragraphs'
    ) with ordinality as entry(value, position);
  end if;

  if p_book ? 'contents' then
    select coalesce(
      array_agg(entry.value order by entry.position),
      '{}'::text[]
    )
    into v_contents
    from pg_catalog.jsonb_array_elements_text(
      p_book -> 'contents'
    ) with ordinality as entry(value, position);
  end if;

  if p_book_id is null then
    insert into public.books (
      slug,
      title,
      status,
      display_title,
      publisher_name,
      publication_label,
      cover_image_path,
      cover_width,
      cover_height,
      short_description,
      description_paragraphs,
      contents,
      display_order
    )
    values (
      p_book ->> 'slug',
      p_book ->> 'title',
      p_book ->> 'status',
      p_book ->> 'display_title',
      p_book ->> 'publisher_name',
      p_book ->> 'publication_label',
      p_book ->> 'cover_image_path',
      (p_book ->> 'cover_width')::integer,
      (p_book ->> 'cover_height')::integer,
      p_book ->> 'short_description',
      v_description_paragraphs,
      v_contents,
      (p_book ->> 'display_order')::integer
    )
    returning id into v_book_id;
  else
    perform 1
    from public.books
    where public.books.id = p_book_id
    for update;

    if not found then
      raise exception using
        errcode = 'P0002',
        message = 'BOOK_NOT_FOUND';
    end if;

    update public.books
    set
      slug = case
        when p_book ? 'slug' then p_book ->> 'slug'
        else public.books.slug
      end,
      title = case
        when p_book ? 'title' then p_book ->> 'title'
        else public.books.title
      end,
      status = case
        when p_book ? 'status' then p_book ->> 'status'
        else public.books.status
      end,
      display_title = case
        when p_book ? 'display_title' then p_book ->> 'display_title'
        else public.books.display_title
      end,
      publisher_name = case
        when p_book ? 'publisher_name' then p_book ->> 'publisher_name'
        else public.books.publisher_name
      end,
      publication_label = case
        when p_book ? 'publication_label' then p_book ->> 'publication_label'
        else public.books.publication_label
      end,
      cover_image_path = case
        when p_book ? 'cover_image_path' then p_book ->> 'cover_image_path'
        else public.books.cover_image_path
      end,
      cover_width = case
        when p_book ? 'cover_width'
          then (p_book ->> 'cover_width')::integer
        else public.books.cover_width
      end,
      cover_height = case
        when p_book ? 'cover_height'
          then (p_book ->> 'cover_height')::integer
        else public.books.cover_height
      end,
      short_description = case
        when p_book ? 'short_description'
          then p_book ->> 'short_description'
        else public.books.short_description
      end,
      description_paragraphs = case
        when p_book ? 'description_paragraphs'
          then v_description_paragraphs
        else public.books.description_paragraphs
      end,
      contents = case
        when p_book ? 'contents' then v_contents
        else public.books.contents
      end,
      display_order = case
        when p_book ? 'display_order'
          then (p_book ->> 'display_order')::integer
        else public.books.display_order
      end
    where public.books.id = p_book_id;

    v_book_id := p_book_id;
  end if;

  if p_book_id is null or p_book ? 'authors' then
    delete from public.book_authors
    where public.book_authors.book_id = v_book_id;

    for v_author in
      select entry.value
      from pg_catalog.jsonb_array_elements(
        p_book -> 'authors'
      ) with ordinality as entry(value, position)
      order by entry.position
    loop
      if not exists (
        select 1
        from public.authors
        where public.authors.id = (v_author ->> 'author_id')::uuid
      ) then
        raise exception using
          errcode = 'P0002',
          message = 'BOOK_AUTHOR_NOT_FOUND';
      end if;

      insert into public.book_authors (
        book_id,
        author_id,
        role,
        sort_order
      )
      values (
        v_book_id,
        (v_author ->> 'author_id')::uuid,
        v_author ->> 'role',
        (v_author ->> 'sort_order')::integer
      );
    end loop;
  end if;

  if p_book_id is null or p_book ? 'sample_asset' then
    v_sample_asset := p_book -> 'sample_asset';

    if v_sample_asset is null or v_sample_asset = 'null'::jsonb then
      delete from public.book_sample_assets
      where public.book_sample_assets.book_id = v_book_id;
    else
      insert into public.book_sample_assets (
        book_id,
        public_path_prefix,
        page_count,
        file_extension,
        filename_padding,
        page_width,
        page_height,
        status
      )
      values (
        v_book_id,
        v_sample_asset ->> 'public_path_prefix',
        (v_sample_asset ->> 'page_count')::integer,
        v_sample_asset ->> 'file_extension',
        (v_sample_asset ->> 'filename_padding')::smallint,
        (v_sample_asset ->> 'page_width')::integer,
        (v_sample_asset ->> 'page_height')::integer,
        v_sample_asset ->> 'status'
      )
      on conflict (book_id) do update
      set
        public_path_prefix = excluded.public_path_prefix,
        page_count = excluded.page_count,
        file_extension = excluded.file_extension,
        filename_padding = excluded.filename_padding,
        page_width = excluded.page_width,
        page_height = excluded.page_height,
        status = excluded.status;
    end if;
  end if;

  if p_book_id is null or p_book ? 'reader_asset' then
    v_reader_asset := p_book -> 'reader_asset';

    if v_reader_asset is null or v_reader_asset = 'null'::jsonb then
      delete from public.book_reader_assets
      where public.book_reader_assets.book_id = v_book_id;
    else
      insert into public.book_reader_assets (
        book_id,
        storage_bucket,
        storage_prefix,
        page_count,
        file_extension,
        filename_padding,
        page_width,
        page_height,
        status
      )
      values (
        v_book_id,
        v_reader_asset ->> 'storage_bucket',
        v_reader_asset ->> 'storage_prefix',
        (v_reader_asset ->> 'page_count')::integer,
        v_reader_asset ->> 'file_extension',
        (v_reader_asset ->> 'filename_padding')::smallint,
        (v_reader_asset ->> 'page_width')::integer,
        (v_reader_asset ->> 'page_height')::integer,
        v_reader_asset ->> 'status'
      )
      on conflict (book_id) do update
      set
        storage_bucket = excluded.storage_bucket,
        storage_prefix = excluded.storage_prefix,
        page_count = excluded.page_count,
        file_extension = excluded.file_extension,
        filename_padding = excluded.filename_padding,
        page_width = excluded.page_width,
        page_height = excluded.page_height,
        status = excluded.status;
    end if;
  end if;

  select
    public.books.status,
    public.books.cover_image_path,
    public.books.short_description
  into
    v_status,
    v_cover_image_path,
    v_short_description
  from public.books
  where public.books.id = v_book_id;

  if v_status = 'published' then
    if v_cover_image_path is null then
      raise exception using
        errcode = 'P0001',
        message = 'BOOK_PUBLISH_COVER_REQUIRED';
    end if;

    if v_short_description is null then
      raise exception using
        errcode = 'P0001',
        message = 'BOOK_PUBLISH_DESCRIPTION_REQUIRED';
    end if;

    select public.book_authors.author_id
    into v_representative_author_id
    from public.book_authors
    where public.book_authors.book_id = v_book_id
      and public.book_authors.role = 'author'
    order by
      public.book_authors.sort_order asc,
      public.book_authors.author_id asc
    limit 1;

    if v_representative_author_id is null then
      raise exception using
        errcode = 'P0001',
        message = 'BOOK_PUBLISH_AUTHOR_REQUIRED';
    end if;

    select public.authors.status
    into v_representative_author_status
    from public.authors
    where public.authors.id = v_representative_author_id
    for share;

    if v_representative_author_status is distinct from 'published' then
      raise exception using
        errcode = 'P0001',
        message = 'BOOK_PUBLISH_AUTHOR_NOT_PUBLISHED';
    end if;
  end if;

  return v_book_id;
exception
  when unique_violation then
    get stacked diagnostics v_constraint_name = constraint_name;

    if v_constraint_name = 'books_slug_key' then
      raise exception using
        errcode = 'P0001',
        message = 'BOOK_SLUG_CONFLICT';
    end if;

    if v_constraint_name in (
      'book_sample_assets_public_path_prefix_unique',
      'book_reader_assets_storage_location_unique'
    ) then
      raise exception using
        errcode = 'P0001',
        message = 'BOOK_ASSET_PATH_CONFLICT';
    end if;

    raise;
end;
$$;

create function public.delete_admin_library_book(p_book_id uuid)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_status text;
  v_entitlement_count integer;
begin
  select public.books.status
  into v_status
  from public.books
  where public.books.id = p_book_id
  for update;

  if not found then
    raise exception using
      errcode = 'P0002',
      message = 'BOOK_NOT_FOUND';
  end if;

  if v_status <> 'draft' then
    return pg_catalog.jsonb_build_object(
      'deleted', false,
      'reason', 'BOOK_NOT_DRAFT',
      'status', v_status
    );
  end if;

  select count(*)::integer
  into v_entitlement_count
  from public.book_entitlements
  where public.book_entitlements.book_id = p_book_id;

  if v_entitlement_count > 0 then
    return pg_catalog.jsonb_build_object(
      'deleted', false,
      'reason', 'BOOK_HAS_ENTITLEMENTS',
      'entitlement_count', v_entitlement_count
    );
  end if;

  delete from public.books
  where public.books.id = p_book_id;

  return pg_catalog.jsonb_build_object(
    'deleted', true,
    'book_id', p_book_id
  );
end;
$$;

revoke all on function public.save_admin_library_book(uuid, jsonb)
from public;
revoke all on function public.save_admin_library_book(uuid, jsonb)
from anon;
revoke all on function public.save_admin_library_book(uuid, jsonb)
from authenticated;
revoke all on function public.save_admin_library_book(uuid, jsonb)
from service_role;
grant execute on function public.save_admin_library_book(uuid, jsonb)
to service_role;

revoke all on function public.delete_admin_library_book(uuid)
from public;
revoke all on function public.delete_admin_library_book(uuid)
from anon;
revoke all on function public.delete_admin_library_book(uuid)
from authenticated;
revoke all on function public.delete_admin_library_book(uuid)
from service_role;
grant execute on function public.delete_admin_library_book(uuid)
to service_role;

commit;
