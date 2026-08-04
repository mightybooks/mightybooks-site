import 'server-only'
import { cache } from 'react'
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

    return {
      src: `${asset.public_path_prefix}/${filename}.${asset.file_extension}`,
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
    profileImage: row.profile_image_path,
    shortBio: row.short_bio,
    bio: asStringArray(row.bio_paragraphs),
    careerSections,
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

async function loadPublishedAuthorDtosById(authorIds) {
  const uniqueAuthorIds = [...new Set(authorIds)]
  if (uniqueAuthorIds.length === 0) return new Map()

  const { data: authorRows, error } = await supabaseAdmin
    .from('authors')
    .select(AUTHOR_COLUMNS)
    .in('id', uniqueAuthorIds)
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .order('slug', { ascending: true })

  if (error) {
    throwPublicContentError('Failed to load published authors', error)
  }

  const careerSectionsByAuthorId = await loadCareerSectionsByAuthorId(
    authorRows.map((author) => author.id)
  )

  return new Map(
    authorRows.map((author) => [
      author.id,
      createAuthorDto(
        author,
        careerSectionsByAuthorId.get(author.id) || []
      ),
    ])
  )
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
  const loadedAuthorsById = await loadPublishedAuthorDtosById(missingAuthorIds)
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

export const getPublishedLibraryAuthors = cache(async function getAuthors() {
  const { data: authorRows, error } = await supabaseAdmin
    .from('authors')
    .select(AUTHOR_COLUMNS)
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .order('slug', { ascending: true })

  if (error) {
    throwPublicContentError('Failed to load the public author list', error)
  }

  const careerSectionsByAuthorId = await loadCareerSectionsByAuthorId(
    authorRows.map((author) => author.id)
  )

  return authorRows.map((author) =>
    createAuthorDto(
      author,
      careerSectionsByAuthorId.get(author.id) || []
    )
  )
})

export const getPublishedLibraryAuthorPage = cache(
  async function getAuthorPage(authorSlug) {
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
)

export const getPublishedLibraryBookPage = cache(
  async function getBookPage(bookSlug) {
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
)
