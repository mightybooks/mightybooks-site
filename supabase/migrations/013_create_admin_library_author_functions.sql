begin;

create function public.save_admin_library_author(
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
  v_bio_paragraphs text[];
  v_section jsonb;
  v_section_id uuid;
  v_item jsonb;
begin
  select coalesce(
    array_agg(entry.value order by entry.position),
    '{}'::text[]
  )
  into v_bio_paragraphs
  from pg_catalog.jsonb_array_elements_text(
    p_author -> 'bio_paragraphs'
  ) with ordinality as entry(value, position);

  if p_author_id is null then
    insert into public.authors (
      slug,
      display_name,
      status,
      pen_name,
      occupation,
      profile_image_path,
      short_bio,
      bio_paragraphs,
      display_order
    )
    values (
      p_author ->> 'slug',
      p_author ->> 'display_name',
      p_author ->> 'status',
      p_author ->> 'pen_name',
      p_author ->> 'occupation',
      p_author ->> 'profile_image_path',
      p_author ->> 'short_bio',
      v_bio_paragraphs,
      (p_author ->> 'display_order')::integer
    )
    returning id into v_author_id;
  else
    perform 1
    from public.authors
    where public.authors.id = p_author_id
    for update;

    if not found then
      raise exception using
        errcode = 'P0002',
        message = 'AUTHOR_NOT_FOUND';
    end if;

    update public.authors
    set
      slug = p_author ->> 'slug',
      display_name = p_author ->> 'display_name',
      status = p_author ->> 'status',
      pen_name = p_author ->> 'pen_name',
      occupation = p_author ->> 'occupation',
      profile_image_path = p_author ->> 'profile_image_path',
      short_bio = p_author ->> 'short_bio',
      bio_paragraphs = v_bio_paragraphs,
      display_order = (p_author ->> 'display_order')::integer
    where public.authors.id = p_author_id;

    v_author_id := p_author_id;

    delete from public.author_career_sections
    where public.author_career_sections.author_id = v_author_id;
  end if;

  for v_section in
    select entry.value
    from pg_catalog.jsonb_array_elements(
      p_author -> 'career_sections'
    ) with ordinality as entry(value, position)
    order by entry.position
  loop
    insert into public.author_career_sections (
      author_id,
      title,
      sort_order
    )
    values (
      v_author_id,
      v_section ->> 'title',
      (v_section ->> 'sort_order')::integer
    )
    returning id into v_section_id;

    for v_item in
      select entry.value
      from pg_catalog.jsonb_array_elements(
        v_section -> 'items'
      ) with ordinality as entry(value, position)
      order by entry.position
    loop
      insert into public.author_career_items (
        section_id,
        item_type,
        body,
        organization,
        work,
        period,
        sort_order
      )
      values (
        v_section_id,
        v_item ->> 'item_type',
        v_item ->> 'body',
        v_item ->> 'organization',
        v_item ->> 'work',
        v_item ->> 'period',
        (v_item ->> 'sort_order')::integer
      );
    end loop;
  end loop;

  return v_author_id;
end;
$$;

create function public.delete_admin_library_author(p_author_id uuid)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_book_count integer;
  v_membership_count integer;
begin
  perform 1
  from public.authors
  where public.authors.id = p_author_id
  for update;

  if not found then
    raise exception using
      errcode = 'P0002',
      message = 'AUTHOR_NOT_FOUND';
  end if;

  select count(*)::integer
  into v_book_count
  from public.book_authors
  where public.book_authors.author_id = p_author_id;

  select count(*)::integer
  into v_membership_count
  from public.author_memberships
  where public.author_memberships.author_id = p_author_id;

  if v_book_count > 0 or v_membership_count > 0 then
    return pg_catalog.jsonb_build_object(
      'deleted', false,
      'reason', 'AUTHOR_IN_USE',
      'book_count', v_book_count,
      'membership_count', v_membership_count
    );
  end if;

  delete from public.authors
  where public.authors.id = p_author_id;

  return pg_catalog.jsonb_build_object(
    'deleted', true,
    'id', p_author_id
  );
end;
$$;

revoke all on function public.save_admin_library_author(uuid, jsonb)
from public;
revoke all on function public.save_admin_library_author(uuid, jsonb)
from anon;
revoke all on function public.save_admin_library_author(uuid, jsonb)
from authenticated;
revoke all on function public.save_admin_library_author(uuid, jsonb)
from service_role;
grant execute on function public.save_admin_library_author(uuid, jsonb)
to service_role;

revoke all on function public.delete_admin_library_author(uuid)
from public;
revoke all on function public.delete_admin_library_author(uuid)
from anon;
revoke all on function public.delete_admin_library_author(uuid)
from authenticated;
revoke all on function public.delete_admin_library_author(uuid)
from service_role;
grant execute on function public.delete_admin_library_author(uuid)
to service_role;

commit;
