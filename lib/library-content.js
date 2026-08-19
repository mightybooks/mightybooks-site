import 'server-only'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase-admin'

const PUBLIC_CONTENT_ERROR_MESSAGE = '공개 서가 정보를 불러오지 못했습니다.'

const AUTHOR_COLUMNS = [
  'id',
  'slug',
  'display_name',
  'pen_name',
  'occupation',
  'profile_image_path',
  'short_bio',
  'bio_paragraphs',
  'display_order',
  'social_links',
  'external_links',
  'press_enabled',
  'featured_video_title',
  'featured_video_url',
].join(',')

const AUTHOR_CARD_COLUMNS = [
  'slug',
  'display_name',
  'pen_name',
  'occupation',
  'profile_image_path',
  'short_bio',
  'display_order',
].join(',')

const AUTHOR_SUMMARY_COLUMNS = [
  'id',
  'slug',
  'display_name',
  'pen_name',
  'occupation',
  'profile_image_path',
  'short_bio',
].join(',')

const BOOK_COLUMNS = [
  'id',
  'slug',
  'title',
  'display_title',
  'publisher_name',
  'publication_label',
  'cover_image_path',
  'cover_width',
  'cover_height',
  'short_description',
  'description_paragraphs',
  'contents',
  'display_order',
].join(',')

function throwPublicContentError(context, error) {
  console.error(`[library-content] ${context}`, {
    code: error?.code || 'UNKNOWN',
    message: error?.message || 'Unknown database error',
  })

  throw new Error(PUBLIC_CONTENT_ERROR_MESSAGE)
}

function asStringArray(value) {
  return Array.isArray(value) ? value : []
}

function createSamplePages(asset) {
  if (!asset) return []

  return Array.from({ length: asset.page_count }, (_, index) => {
    const pageNumber = index + 1
    const filename = String(pageNumber).padStart(asset.filename_padding, '0')
    const pathWithoutExtension = asset.public_path_prefix.includes('{page}')
      ? asset.public_path_prefix.replace('{page}', filename)
      : `${asset.public_path_prefix}/${filename}`

    return {
      src: `${pathWithoutExtension}.${asset.file_extension}`,
      width: asset.page_width,
      height: asset.page_height,
    }
  })
}

function createAuthorDto(row, careerSections = []) {
  return {
    slug: row.slug,
    displayName: row.display_name,
    penName: row.pen_name,
    occupation: row.occupation,
    profileImagePath: row.profile_image_path || null,
    profileImage: row.profile_image_path || '/library/authors/default-profile.svg',
    shortBio: row.short_bio,
    bio: asStringArray(row.bio_paragraphs),
    careerSections,
    socialLinks: asStringArray(row.social_links).filter((link) => link?.is_visible).sort((a, b) => a.sort_order - b.sort_order),
    externalLinks: asStringArray(row.external_links).filter((link) => link?.is_visible).sort((a, b) => a.sort_order - b.sort_order),
    pressEnabled: row.press_enabled === true,
    featuredVideoTitle: row.featured_video_title,
    featuredVideoUrl: row.featured_video_url,
  }
}

function createAuthorCardDto(row) {
  return {
    slug: row.slug,
    displayName: row.display_name,
    penName: row.pen_name,
    occupation: row.occupation,
    profileImage: row.profile_image_path || '/library/authors/default-profile.svg',
    shortBio: row.short_bio,
  }
}

function createBookDto(row, author, sampleAsset, readerAvailable) {
  return {
    slug: row.slug,
    title: row.title,
    displayTitle: row.display_title || row.title,
    authorSlug: author.slug,
    authorName: author.displayName,
    publisher: row.publisher_name,
    publication: row.publication_label,
    coverImage: row.cover_image_path,
    coverWidth: row.cover_width,
    coverHeight: row.cover_height,
    shortDescription: row.short_description,
    description: asStringArray(row.description_paragraphs),
    contents: asStringArray(row.contents),
    samplePages: createSamplePages(sampleAsset),
    readerAvailable,
  }
}

async function loadCareerSectionsByAuthorId(authorIds) {
  if (authorIds.length === 0) return new Map()

  const { data: sectionRows, error: sectionError } = await supabaseAdmin
    .from('author_career_sections')
    .select('id,author_id,title,sort_order')
    .in('author_id', authorIds)
    .order('sort_order', { ascending: true })
    .order('title', { ascending: true })

  if (sectionError) {
    throwPublicContentError('Failed to load author career sections', sectionError)
  }

  const sectionIds = sectionRows.map((section) => section.id)
  let itemRows = []

  if (sectionIds.length > 0) {
    const { data, error } = await supabaseAdmin
      .from('author_career_items')
      .select('id,section_id,item_type,body,organization,work,period,sort_order')
      .in('section_id', sectionIds)
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true })

    if (error) {
      throwPublicContentError('Failed to load author career items', error)
    }

    itemRows = data
  }

  const itemsBySectionId = new Map()

  for (const item of itemRows) {
    const items = itemsBySectionId.get(item.section_id) || []

    items.push(
      item.item_type === 'text'
        ? item.body
        : {
            organization: item.organization,
            work: item.work,
            period: item.period,
          }
    )
    itemsBySectionId.set(item.section_id, items)
  }

  const sectionsByAuthorId = new Map()

  for (const section of sectionRows) {
    const sections = sectionsByAuthorId.get(section.author_id) || []

    sections.push({
      title: section.title,
      items: itemsBySectionId.get(section.id) || [],
    })
    sectionsByAuthorId.set(section.author_id, sections)
  }

  return sectionsByAuthorId
}

async function loadPublishedAuthorSummariesById(authorIds) {
  const uniqueAuthorIds = [...new Set(authorIds)]
  if (uniqueAuthorIds.length === 0) return new Map()

  const { data, error } = await supabaseAdmin
    .from('authors')
    .select(AUTHOR_SUMMARY_COLUMNS)
    .in('id', uniqueAuthorIds)
    .eq('status', 'published')

  if (error) {
    throwPublicContentError('Failed to load published author summaries', error)
  }

  return new Map(data.map(author => [author.id, createAuthorDto(author)]))
}

async function hydratePublishedBookRows(bookRows, knownAuthorsById = new Map()) {
  if (bookRows.length === 0) return []

  const bookIds = bookRows.map((book) => book.id)
  const [authorLinksResult, sampleAssetsResult, readerAssetsResult] =
    await Promise.all([
      supabaseAdmin
        .from('book_authors')
        .select('book_id,author_id,sort_order')
        .in('book_id', bookIds)
        .eq('role', 'author')
        .order('sort_order', { ascending: true })
        .order('author_id', { ascending: true }),
      supabaseAdmin
        .from('book_sample_assets')
        .select(
          'book_id,public_path_prefix,page_count,file_extension,filename_padding,page_width,page_height'
        )
        .in('book_id', bookIds)
        .eq('status', 'active'),
      supabaseAdmin
        .from('book_reader_assets')
        .select('book_id')
        .in('book_id', bookIds)
        .eq('status', 'active'),
    ])

  if (authorLinksResult.error) {
    throwPublicContentError(
      'Failed to load representative book authors',
      authorLinksResult.error
    )
  }
  if (sampleAssetsResult.error) {
    throwPublicContentError(
      'Failed to load public sample assets',
      sampleAssetsResult.error
    )
  }
  if (readerAssetsResult.error) {
    throwPublicContentError(
      'Failed to load reader availability',
      readerAssetsResult.error
    )
  }

  const representativeAuthorIdByBookId = new Map()

  for (const link of authorLinksResult.data) {
    if (!representativeAuthorIdByBookId.has(link.book_id)) {
      representativeAuthorIdByBookId.set(link.book_id, link.author_id)
    }
  }

  const missingAuthorIds = [
    ...new Set(
      [...representativeAuthorIdByBookId.values()].filter(
        (authorId) => !knownAuthorsById.has(authorId)
      )
    ),
  ]
  const loadedAuthorsById = await loadPublishedAuthorSummariesById(missingAuthorIds)
  const authorsById = new Map([...knownAuthorsById, ...loadedAuthorsById])
  const sampleAssetByBookId = new Map(
    sampleAssetsResult.data.map((asset) => [asset.book_id, asset])
  )
  const readerBookIds = new Set(
    readerAssetsResult.data.map((asset) => asset.book_id)
  )

  return bookRows.flatMap((bookRow) => {
    const authorId = representativeAuthorIdByBookId.get(bookRow.id)
    const author = authorId ? authorsById.get(authorId) : null

    if (!author) return []

    return [
      {
        book: createBookDto(
          bookRow,
          author,
          sampleAssetByBookId.get(bookRow.id) || null,
          readerBookIds.has(bookRow.id)
        ),
        author,
      },
    ]
  })
}

async function loadPublishedBooksById(bookIds, knownAuthorsById) {
  const uniqueBookIds = [...new Set(bookIds)]
  if (uniqueBookIds.length === 0) return []

  const { data: bookRows, error } = await supabaseAdmin
    .from('books')
    .select(BOOK_COLUMNS)
    .in('id', uniqueBookIds)
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .order('slug', { ascending: true })

  if (error) {
    throwPublicContentError('Failed to load published books', error)
  }

  return hydratePublishedBookRows(bookRows, knownAuthorsById)
}

async function loadPublishedLibraryAuthorCards() {
  const { data: authorRows, error } = await supabaseAdmin
    .from('authors')
    .select(AUTHOR_CARD_COLUMNS)
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .order('slug', { ascending: true })

  if (error) {
    throwPublicContentError('Failed to load the public author list', error)
  }

  return authorRows.map(createAuthorCardDto)
}

async function loadPublishedLibraryAuthorPage(authorSlug) {
    const { data: authorRow, error: authorError } = await supabaseAdmin
      .from('authors')
      .select(AUTHOR_COLUMNS)
      .eq('slug', authorSlug)
      .eq('status', 'published')
      .maybeSingle()

    if (authorError) {
      throwPublicContentError('Failed to load a public author', authorError)
    }
    if (!authorRow) return null

    const [careerSectionsByAuthorId, bookLinksResult] = await Promise.all([
      loadCareerSectionsByAuthorId([authorRow.id]),
      supabaseAdmin
        .from('book_authors')
        .select('book_id')
        .eq('author_id', authorRow.id),
    ])

    if (bookLinksResult.error) {
      throwPublicContentError(
        'Failed to load books linked to a public author',
        bookLinksResult.error
      )
    }

    const author = createAuthorDto(
      authorRow,
      careerSectionsByAuthorId.get(authorRow.id) || []
    )
    const hydratedBooks = await loadPublishedBooksById(
      bookLinksResult.data.map((link) => link.book_id),
      new Map([[authorRow.id, author]])
    )

    return {
      author,
      books: hydratedBooks.map(({ book }) => book),
    }
}

async function loadPublishedLibraryBookPage(bookSlug) {
    const { data: bookRow, error } = await supabaseAdmin
      .from('books')
      .select(BOOK_COLUMNS)
      .eq('slug', bookSlug)
      .eq('status', 'published')
      .maybeSingle()

    if (error) {
      throwPublicContentError('Failed to load a public book', error)
    }
    if (!bookRow) return null

    const [hydratedBook] = await hydratePublishedBookRows([bookRow])

    return hydratedBook || null
}

async function loadPublishedLibraryAuthorRedirect(oldSlug) {
  const { data, error } = await supabaseAdmin
    .from('author_slug_history')
    .select('authors!inner(slug,status)')
    .eq('old_slug', oldSlug)
    .eq('authors.status', 'published')
    .maybeSingle()
  if (error) throwPublicContentError('Failed to load author slug history', error)
  return data?.authors?.slug ?? null
}

async function loadPublishedAuthorPressPage(authorSlug) {
  const { data: author, error: authorError } = await supabaseAdmin
    .from('authors')
    .select('id,slug,display_name,profile_image_path,press_enabled')
    .eq('slug', authorSlug)
    .eq('status', 'published')
    .maybeSingle()
  if (authorError) throwPublicContentError('Failed to load press author', authorError)
  if (!author || !author.press_enabled) return null
  const { data: items, error } = await supabaseAdmin
    .from('author_press_items')
    .select('id,outlet_name,title,published_at,summary,source_url,sort_order')
    .eq('author_id', author.id)
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
    .order('published_at', { ascending: false })
  if (error) throwPublicContentError('Failed to load public press items', error)
  return {
    author: {
      slug: author.slug,
      displayName: author.display_name,
      profileImagePath: author.profile_image_path || null,
    },
    items,
  }
}

const PUBLIC_CACHE_SECONDS = 3600

export const getPublishedLibraryAuthorCards = cache(() =>
  unstable_cache(
    loadPublishedLibraryAuthorCards,
    ['published-library-author-cards'],
    { tags: ['library-authors'], revalidate: PUBLIC_CACHE_SECONDS }
  )()
)

export const getPublishedLibraryAuthorPage = cache(authorSlug =>
  unstable_cache(
    () => loadPublishedLibraryAuthorPage(authorSlug),
    ['published-library-author-page-v2', authorSlug],
    { tags: [`library-author:${authorSlug}`], revalidate: PUBLIC_CACHE_SECONDS }
  )()
)

export const getPublishedLibraryBookPage = cache(bookSlug =>
  unstable_cache(
    () => loadPublishedLibraryBookPage(bookSlug),
    ['published-library-book-page', bookSlug],
    { tags: [`library-book:${bookSlug}`], revalidate: PUBLIC_CACHE_SECONDS }
  )()
)

export const getPublishedLibraryAuthorRedirect = cache(oldSlug =>
  unstable_cache(
    () => loadPublishedLibraryAuthorRedirect(oldSlug),
    ['published-library-author-redirect', oldSlug],
    { tags: [`library-author-redirect:${oldSlug}`], revalidate: PUBLIC_CACHE_SECONDS }
  )()
)

export const getPublishedAuthorPressPage = cache(authorSlug =>
  unstable_cache(
    () => loadPublishedAuthorPressPage(authorSlug),
    ['published-library-author-press-v2', authorSlug],
    { tags: [`library-press:${authorSlug}`], revalidate: PUBLIC_CACHE_SECONDS }
  )()
)

export async function getPublishedLibraryBookCardsBySlugs(slugs) {
  if (!Array.isArray(slugs) || slugs.length === 0) return []

  const uniqueSlugs = [
    ...new Set(
      slugs
        .filter((slug) => typeof slug === 'string')
        .map((slug) => slug.trim())
        .filter(Boolean)
    ),
  ]

  if (uniqueSlugs.length === 0) return []

  const { data: bookRows, error: bookError } = await supabaseAdmin
    .from('books')
    .select('id,slug,title,cover_image_path,short_description')
    .in('slug', uniqueSlugs)
    .eq('status', 'published')
    .order('slug', { ascending: true })

  if (bookError) {
    throwPublicContentError('Failed to load library book cards', bookError)
  }
  if (bookRows.length === 0) return []

  const { data: authorLinks, error: authorLinksError } = await supabaseAdmin
    .from('book_authors')
    .select('book_id,author_id,sort_order')
    .in('book_id', bookRows.map((book) => book.id))
    .eq('role', 'author')
    .order('sort_order', { ascending: true })
    .order('author_id', { ascending: true })

  if (authorLinksError) {
    throwPublicContentError(
      'Failed to load library book card authors',
      authorLinksError
    )
  }

  const representativeAuthorIdByBookId = new Map()

  for (const link of authorLinks) {
    if (!representativeAuthorIdByBookId.has(link.book_id)) {
      representativeAuthorIdByBookId.set(link.book_id, link.author_id)
    }
  }

  const representativeAuthorIds = [
    ...new Set(representativeAuthorIdByBookId.values()),
  ]
  if (representativeAuthorIds.length === 0) return []

  const { data: authorRows, error: authorError } = await supabaseAdmin
    .from('authors')
    .select('id,display_name')
    .in('id', representativeAuthorIds)
    .eq('status', 'published')

  if (authorError) {
    throwPublicContentError(
      'Failed to load published library book card authors',
      authorError
    )
  }

  const authorNameById = new Map(
    authorRows.map((author) => [author.id, author.display_name])
  )

  return bookRows.flatMap((book) => {
    const authorId = representativeAuthorIdByBookId.get(book.id)
    const authorName = authorId ? authorNameById.get(authorId) : null

    if (!authorName) return []

    return [
      {
        slug: book.slug,
        title: book.title,
        authorName,
        coverImage: book.cover_image_path,
        shortDescription: book.short_description,
      },
    ]
  })
}

async function loadPublishedLibrarySitemapEntries() {
  const [authorsResult, booksResult] = await Promise.all([
    supabaseAdmin
      .from('authors')
      .select('slug,updated_at')
      .eq('status', 'published')
      .order('slug', { ascending: true }),
    supabaseAdmin
      .from('books')
      .select('slug,updated_at')
      .eq('status', 'published')
      .order('slug', { ascending: true }),
  ])

  if (authorsResult.error) {
    throwPublicContentError(
      'Failed to load published author sitemap entries',
      authorsResult.error
    )
  }
  if (booksResult.error) {
    throwPublicContentError(
      'Failed to load published book sitemap entries',
      booksResult.error
    )
  }

  return {
    authors: authorsResult.data.map((author) => ({
      slug: author.slug,
      updatedAt: author.updated_at,
    })),
    books: booksResult.data.map((book) => ({
      slug: book.slug,
      updatedAt: book.updated_at,
    })),
  }
}

export const getPublishedLibrarySitemapEntries = cache(() =>
  unstable_cache(
    loadPublishedLibrarySitemapEntries,
    ['published-library-sitemap-entries'],
    {
      tags: ['library-authors', 'library-books'],
      revalidate: PUBLIC_CACHE_SECONDS,
    }
  )()
)
