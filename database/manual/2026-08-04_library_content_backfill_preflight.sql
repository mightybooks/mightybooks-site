/* 13-3A-01. Target authors and current content fields. */

with expected_authors(slug, display_order) as (
  values
    ('moon-surim', 0),
    ('estella-cho', 1),
    ('jungmyeongju', 2),
    ('sian', 3)
)
select
  '13-3A-01_target_authors' as test_case,
  expected.slug as expected_slug,
  authors.id,
  authors.slug,
  authors.display_name,
  authors.status,
  authors.pen_name,
  authors.occupation,
  authors.profile_image_path,
  authors.short_bio,
  authors.bio_paragraphs,
  authors.display_order,
  authors.created_at,
  authors.updated_at,
  expected.display_order as expected_display_order,
  authors.id is not null
    and authors.status = 'draft'
    and authors.pen_name is null
    and authors.occupation is null
    and authors.profile_image_path is null
    and authors.short_bio is null
    and authors.bio_paragraphs = '{}'::text[]
    and authors.display_order = 0 as is_ready
from expected_authors as expected
left join public.authors as authors
  on authors.slug = expected.slug
order by expected.display_order;


/* 13-3A-02. Target books and current content fields. */

with expected_books(slug, display_order) as (
  values
    ('500-character-fiction', 0),
    ('gaze-before-perfect-german', 1),
    ('my-heart-said-look-longer', 2),
    ('i-held-a-chubby-rabbit', 3)
)
select
  '13-3A-02_target_books' as test_case,
  expected.slug as expected_slug,
  books.id,
  books.slug,
  books.title,
  books.status,
  books.display_title,
  books.publisher_name,
  books.publication_label,
  books.cover_image_path,
  books.cover_width,
  books.cover_height,
  books.short_description,
  books.description_paragraphs,
  books.contents,
  books.display_order,
  books.created_at,
  books.updated_at,
  expected.display_order as expected_display_order,
  books.id is not null
    and books.status = 'published'
    and books.display_title is null
    and books.publisher_name is null
    and books.publication_label is null
    and books.cover_image_path is null
    and books.cover_width is null
    and books.cover_height is null
    and books.short_description is null
    and books.description_paragraphs = '{}'::text[]
    and books.contents = '{}'::text[]
    and books.display_order = 0 as is_ready
from expected_books as expected
left join public.books as books
  on books.slug = expected.slug
order by expected.display_order;


/* 13-3A-03. Current career and sample rows for the targets. */

with expected_authors(slug) as (
  values
    ('moon-surim'),
    ('estella-cho'),
    ('jungmyeongju'),
    ('sian')
),
expected_books(slug) as (
  values
    ('500-character-fiction'),
    ('gaze-before-perfect-german'),
    ('my-heart-said-look-longer'),
    ('i-held-a-chubby-rabbit')
)
select
  '13-3A-03_target_child_row_counts' as test_case,
  (
    select count(*)
    from public.author_career_sections as sections
    join public.authors as authors
      on authors.id = sections.author_id
    join expected_authors as expected
      on expected.slug = authors.slug
  ) as career_section_count,
  (
    select count(*)
    from public.author_career_items as items
    join public.author_career_sections as sections
      on sections.id = items.section_id
    join public.authors as authors
      on authors.id = sections.author_id
    join expected_authors as expected
      on expected.slug = authors.slug
  ) as career_item_count,
  (
    select count(*)
    from public.book_sample_assets as samples
    join public.books as books
      on books.id = samples.book_id
    join expected_books as expected
      on expected.slug = books.slug
  ) as sample_asset_count;


/* 13-3A-04. Current book-author relationships versus the JS source. */

with expected_relations(book_slug, author_slug, display_order) as (
  values
    ('500-character-fiction', 'moon-surim', 0),
    ('gaze-before-perfect-german', 'estella-cho', 1),
    ('my-heart-said-look-longer', 'jungmyeongju', 2),
    ('i-held-a-chubby-rabbit', 'sian', 3)
)
select
  '13-3A-04_book_author_relationships' as test_case,
  expected.book_slug,
  books.id as book_id,
  expected.author_slug as expected_author_slug,
  authors.id as author_id,
  authors.slug as actual_author_slug,
  links.role,
  links.sort_order,
  (
    select count(*)
    from public.book_authors as all_links
    where all_links.book_id = books.id
  ) as link_count_for_book,
  authors.slug = expected.author_slug
    and (
      select count(*)
      from public.book_authors as all_links
      where all_links.book_id = books.id
    ) = 1 as matches_js
from expected_relations as expected
left join public.books as books
  on books.slug = expected.book_slug
left join public.book_authors as links
  on links.book_id = books.id
left join public.authors as authors
  on authors.id = links.author_id
order by expected.display_order;


/* 13-3A-05. Counts extracted from the current JS source. */

select
  '13-3A-05_expected_author_content' as test_case,
  source.slug,
  source.display_order,
  source.bio_paragraph_count,
  source.career_section_count,
  source.career_item_count,
  source.text_item_count,
  source.structured_item_count,
  source.legacy_career_count,
  source.legacy_career_used
from (
  values
    ('moon-surim', 0, 1, 4, 12, 10, 2, 1, false),
    ('estella-cho', 1, 3, 0, 0, 0, 0, 0, false),
    ('jungmyeongju', 2, 4, 0, 0, 0, 0, 0, false),
    ('sian', 3, 2, 0, 0, 0, 0, 0, false)
) as source(
  slug,
  display_order,
  bio_paragraph_count,
  career_section_count,
  career_item_count,
  text_item_count,
  structured_item_count,
  legacy_career_count,
  legacy_career_used
)
order by source.display_order;

select
  '13-3A-05_expected_book_content' as test_case,
  source.slug,
  source.author_slug,
  source.display_order,
  source.description_paragraph_count,
  source.contents_count,
  source.public_path_prefix,
  source.page_count,
  source.file_extension,
  source.filename_padding,
  source.page_width,
  source.page_height,
  source.first_page_path,
  source.last_page_path,
  source.path_rule_consistent
from (
  values
    (
      '500-character-fiction',
      'moon-surim',
      0,
      2,
      4,
      '/library/books/500fiction-sample/pages',
      13,
      'png',
      3,
      3180,
      4500,
      '/library/books/500fiction-sample/pages/001.png',
      '/library/books/500fiction-sample/pages/013.png',
      true
    ),
    (
      'gaze-before-perfect-german',
      'estella-cho',
      1,
      2,
      4,
      '/library/books/gaze-before-perfect-german/pages',
      14,
      'webp',
      3,
      3180,
      4500,
      '/library/books/gaze-before-perfect-german/pages/001.webp',
      '/library/books/gaze-before-perfect-german/pages/014.webp',
      true
    ),
    (
      'my-heart-said-look-longer',
      'jungmyeongju',
      2,
      2,
      4,
      '/library/books/my-heart-said-look-longer/pages',
      18,
      'webp',
      3,
      3180,
      4500,
      '/library/books/my-heart-said-look-longer/pages/001.webp',
      '/library/books/my-heart-said-look-longer/pages/018.webp',
      true
    ),
    (
      'i-held-a-chubby-rabbit',
      'sian',
      3,
      4,
      4,
      '/library/books/i-held-a-chubby-rabbit/pages',
      13,
      'webp',
      3,
      3180,
      4500,
      '/library/books/i-held-a-chubby-rabbit/pages/001.webp',
      '/library/books/i-held-a-chubby-rabbit/pages/013.webp',
      true
    )
) as source(
  slug,
  author_slug,
  display_order,
  description_paragraph_count,
  contents_count,
  public_path_prefix,
  page_count,
  file_extension,
  filename_padding,
  page_width,
  page_height,
  first_page_path,
  last_page_path,
  path_rule_consistent
)
order by source.display_order;


/* 13-3A-06. Combined readiness decision. */

with expected_authors(slug) as (
  values
    ('moon-surim'),
    ('estella-cho'),
    ('jungmyeongju'),
    ('sian')
),
expected_books(slug) as (
  values
    ('500-character-fiction'),
    ('gaze-before-perfect-german'),
    ('my-heart-said-look-longer'),
    ('i-held-a-chubby-rabbit')
),
expected_relations(book_slug, author_slug) as (
  values
    ('500-character-fiction', 'moon-surim'),
    ('gaze-before-perfect-german', 'estella-cho'),
    ('my-heart-said-look-longer', 'jungmyeongju'),
    ('i-held-a-chubby-rabbit', 'sian')
),
flags as (
  select
    (
      select count(*) = 4
      from public.authors as authors
      join expected_authors as expected
        on expected.slug = authors.slug
    ) as author_rows_ok,
    not exists (
      select 1
      from public.authors as authors
      join expected_authors as expected
        on expected.slug = authors.slug
      where authors.status <> 'draft'
        or authors.pen_name is not null
        or authors.occupation is not null
        or authors.profile_image_path is not null
        or authors.short_bio is not null
        or authors.bio_paragraphs <> '{}'::text[]
        or authors.display_order <> 0
    ) as author_defaults_ok,
    (
      select count(*) = 4
      from public.books as books
      join expected_books as expected
        on expected.slug = books.slug
    ) as book_rows_ok,
    not exists (
      select 1
      from public.books as books
      join expected_books as expected
        on expected.slug = books.slug
      where books.status <> 'published'
        or books.display_title is not null
        or books.publisher_name is not null
        or books.publication_label is not null
        or books.cover_image_path is not null
        or books.cover_width is not null
        or books.cover_height is not null
        or books.short_description is not null
        or books.description_paragraphs <> '{}'::text[]
        or books.contents <> '{}'::text[]
        or books.display_order <> 0
    ) as book_defaults_ok,
    not exists (
      select 1
      from public.author_career_sections as sections
      join public.authors as authors
        on authors.id = sections.author_id
      join expected_authors as expected
        on expected.slug = authors.slug
    ) as career_tables_empty_for_targets,
    not exists (
      select 1
      from public.book_sample_assets as samples
      join public.books as books
        on books.id = samples.book_id
      join expected_books as expected
        on expected.slug = books.slug
    ) as sample_table_empty_for_targets,
    not exists (
      select 1
      from expected_relations as expected
      where not exists (
        select 1
        from public.book_authors as links
        join public.books as books
          on books.id = links.book_id
        join public.authors as authors
          on authors.id = links.author_id
        where books.slug = expected.book_slug
          and authors.slug = expected.author_slug
      )
    )
    and not exists (
      select 1
      from public.book_authors as links
      join public.books as books
        on books.id = links.book_id
      join public.authors as authors
        on authors.id = links.author_id
      join expected_books as targets
        on targets.slug = books.slug
      where not exists (
        select 1
        from expected_relations as expected
        where expected.book_slug = books.slug
          and expected.author_slug = authors.slug
      )
    ) as book_author_relations_ok,
    not exists (
      select 1
      from public.authors as authors
      join expected_authors as expected
        on expected.slug = authors.slug
      join public.reserved_public_slugs as reserved
        on reserved.slug = authors.slug
    ) as reserved_slug_conflicts_absent
)
select
  '13-3A-06_readiness' as test_case,
  flags.*,
  author_rows_ok
    and author_defaults_ok
    and book_rows_ok
    and book_defaults_ok
    and career_tables_empty_for_targets
    and sample_table_empty_for_targets
    and book_author_relations_ok
    and reserved_slug_conflicts_absent as can_run_backfill
from flags;
