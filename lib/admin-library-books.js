import 'server-only'
import { supabaseAdmin } from '@/lib/supabase-admin'
import {
  errorResponse,
  isUuid,
  logDatabaseError,
} from '@/lib/admin-library-api'

const BOOK_STATUSES = ['draft', 'published', 'archived']
const AUTHOR_ROLES = ['author', 'coauthor']
const ASSET_STATUSES = ['active', 'disabled']
const FILE_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg']
const BOOK_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
const BOOK_COLUMNS = [
  'id',
  'slug',
  'title',
  'status',
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
  'created_at',
  'updated_at',
].join(',')

const BOOK_PATCH_FIELDS = new Set([
  'slug',
  'title',
  'status',
  'displayTitle',
  'publisherName',
  'publicationLabel',
  'coverImagePath',
  'coverWidth',
  'coverHeight',
  'shortDescription',
  'descriptionParagraphs',
  'contents',
  'displayOrder',
  'authors',
  'sampleAsset',
  'readerAsset',
])

function validationError(code, message) {
  return { error: { code, message } }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function normalizeSlug(value) {
  if (
    typeof value !== 'string' ||
    value !== value.trim() ||
    value.length === 0 ||
    value.length > 64 ||
    !BOOK_SLUG_PATTERN.test(value)
  ) {
    return validationError(
      'INVALID_SLUG',
      '도서 주소는 공백 없이 영문 소문자, 숫자, 하이픈으로 64자 이내여야 합니다.'
    )
  }

  return { value }
}

function normalizeRequiredString(value, code, message) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return validationError(code, message)
  }

  return { value: value.trim() }
}

function normalizeNullableString(value, code, message) {
  if (value === null) return { value: null }

  if (typeof value !== 'string') {
    return validationError(code, message)
  }

  return { value: value.trim() || null }
}

function normalizeStatus(value) {
  if (typeof value !== 'string') {
    return validationError(
      'INVALID_STATUS',
      '올바른 도서 상태를 선택해 주세요.'
    )
  }

  const status = value.trim()

  if (!BOOK_STATUSES.includes(status)) {
    return validationError(
      'INVALID_STATUS',
      '올바른 도서 상태를 선택해 주세요.'
    )
  }

  return { value: status }
}

function normalizeStringArray(value, code, message) {
  if (
    !Array.isArray(value) ||
    value.some(item => typeof item !== 'string')
  ) {
    return validationError(code, message)
  }

  return {
    value: value.map(item => item.trim()).filter(Boolean),
  }
}

function normalizeNonnegativeInteger(value, code, message) {
  if (!Number.isInteger(value) || value < 0) {
    return validationError(code, message)
  }

  return { value }
}

function normalizePositiveInteger(value, code, message, maximum) {
  if (
    !Number.isInteger(value) ||
    value < 1 ||
    (maximum !== undefined && value > maximum)
  ) {
    return validationError(code, message)
  }

  return { value }
}

function normalizeAuthors(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return validationError(
      'INVALID_AUTHORS',
      '도서에는 한 명 이상의 저자가 필요합니다.'
    )
  }

  const authorIds = new Set()
  const authors = []
  let hasPrimaryAuthor = false

  for (const author of value) {
    if (
      !isPlainObject(author) ||
      !isUuid(author.authorId) ||
      typeof author.role !== 'string'
    ) {
      return validationError(
        'INVALID_AUTHORS',
        '연결할 저자 정보를 확인해 주세요.'
      )
    }

    const role = author.role.trim()
    const sortOrder = normalizeNonnegativeInteger(
      author.sortOrder,
      'INVALID_AUTHORS',
      '저자 표시 순서는 0 이상의 정수여야 합니다.'
    )

    if (
      !AUTHOR_ROLES.includes(role) ||
      sortOrder.error ||
      authorIds.has(author.authorId)
    ) {
      return validationError(
        'INVALID_AUTHORS',
        '저자 역할, 표시 순서 또는 중복 연결을 확인해 주세요.'
      )
    }

    authorIds.add(author.authorId)
    hasPrimaryAuthor ||= role === 'author'
    authors.push({
      author_id: author.authorId,
      role,
      sort_order: sortOrder.value,
    })
  }

  if (!hasPrimaryAuthor) {
    return validationError(
      'INVALID_AUTHORS',
      '대표 역할이 author인 저자가 한 명 이상 필요합니다.'
    )
  }

  return { value: authors }
}

function normalizeAsset(value, type) {
  if (value === null) return { value: null }

  const isSample = type === 'sample'
  const code = isSample ? 'INVALID_SAMPLE_ASSET' : 'INVALID_READER_ASSET'
  const message = isSample
    ? '공개 샘플 자산 정보를 확인해 주세요.'
    : '전체 열람 자산 정보를 확인해 주세요.'

  if (!isPlainObject(value)) return validationError(code, message)

  const pathFields = isSample
    ? [['publicPathPrefix', 'public_path_prefix']]
    : [
        ['storageBucket', 'storage_bucket'],
        ['storagePrefix', 'storage_prefix'],
      ]
  const normalized = {}

  for (const [inputName, outputName] of pathFields) {
    const path = normalizeRequiredString(value[inputName], code, message)
    if (path.error) return path
    normalized[outputName] = path.value
  }

  const pageCount = normalizePositiveInteger(
    value.pageCount,
    code,
    message,
    5000
  )
  const filenamePadding = normalizePositiveInteger(
    value.filenamePadding,
    code,
    message,
    6
  )
  const pageWidth = normalizePositiveInteger(
    value.pageWidth,
    code,
    message
  )
  const pageHeight = normalizePositiveInteger(
    value.pageHeight,
    code,
    message
  )

  if (
    pageCount.error ||
    filenamePadding.error ||
    pageWidth.error ||
    pageHeight.error ||
    typeof value.fileExtension !== 'string' ||
    typeof value.status !== 'string'
  ) {
    return validationError(code, message)
  }

  const fileExtension = value.fileExtension.trim()
  const status = value.status.trim()

  if (
    !FILE_EXTENSIONS.includes(fileExtension) ||
    !ASSET_STATUSES.includes(status)
  ) {
    return validationError(code, message)
  }

  return {
    value: {
      ...normalized,
      page_count: pageCount.value,
      file_extension: fileExtension,
      filename_padding: filenamePadding.value,
      page_width: pageWidth.value,
      page_height: pageHeight.value,
      status,
    },
  }
}

function normalizeCoverDimensions(width, height, partial) {
  const hasWidth = width !== undefined
  const hasHeight = height !== undefined

  if (!partial || (hasWidth && hasHeight)) {
    const bothNull = width === null && height === null
    const bothPositive =
      Number.isInteger(width) &&
      width >= 1 &&
      Number.isInteger(height) &&
      height >= 1

    if (!bothNull && !bothPositive) {
      return validationError(
        'INVALID_COVER_DIMENSIONS',
        '표지 너비와 높이는 모두 비우거나 각각 1 이상의 정수로 입력해 주세요.'
      )
    }
  } else {
    const provided = hasWidth ? width : height

    if (provided !== null && (!Number.isInteger(provided) || provided < 1)) {
      return validationError(
        'INVALID_COVER_DIMENSIONS',
        '표지 크기는 1 이상의 정수 또는 null이어야 합니다.'
      )
    }
  }

  return {
    value: {
      ...(hasWidth ? { cover_width: width } : {}),
      ...(hasHeight ? { cover_height: height } : {}),
    },
  }
}

function validatePublishedCreate(book) {
  if (book.status !== 'published') return null

  if (!book.cover_image_path) {
    return validationError(
      'BOOK_PUBLISH_COVER_REQUIRED',
      '도서를 공개하려면 표지 이미지 경로가 필요합니다.'
    )
  }

  if (!book.short_description) {
    return validationError(
      'BOOK_PUBLISH_DESCRIPTION_REQUIRED',
      '도서를 공개하려면 간단한 소개가 필요합니다.'
    )
  }

  return null
}

export function validateBookCreatePayload(body) {
  const slug = normalizeSlug(body.slug)
  if (slug.error) return slug

  const title = normalizeRequiredString(
    body.title,
    'INVALID_TITLE',
    '도서명을 입력해 주세요.'
  )
  if (title.error) return title

  const status = normalizeStatus(body.status)
  if (status.error) return status

  const displayOrder = normalizeNonnegativeInteger(
    body.displayOrder,
    'INVALID_DISPLAY_ORDER',
    '표시 순서는 0 이상의 정수여야 합니다.'
  )
  if (displayOrder.error) return displayOrder

  const descriptionParagraphs = normalizeStringArray(
    body.descriptionParagraphs,
    'INVALID_DESCRIPTION_PARAGRAPHS',
    '도서 소개 문단을 확인해 주세요.'
  )
  if (descriptionParagraphs.error) return descriptionParagraphs

  const contents = normalizeStringArray(
    body.contents,
    'INVALID_CONTENTS',
    '도서 특징 목록을 확인해 주세요.'
  )
  if (contents.error) return contents

  const authors = normalizeAuthors(body.authors)
  if (authors.error) return authors

  const coverDimensions = normalizeCoverDimensions(
    body.coverWidth,
    body.coverHeight,
    false
  )
  if (coverDimensions.error) return coverDimensions

  const nullableFields = [
    ['displayTitle', 'display_title'],
    ['publisherName', 'publisher_name'],
    ['publicationLabel', 'publication_label'],
    ['coverImagePath', 'cover_image_path'],
    ['shortDescription', 'short_description'],
  ]
  const normalizedNullableFields = {}

  for (const [inputName, outputName] of nullableFields) {
    const field = normalizeNullableString(
      body[inputName] ?? null,
      'INVALID_BODY',
      '도서 정보를 확인해 주세요.'
    )
    if (field.error) return field
    normalizedNullableFields[outputName] = field.value
  }

  const sampleAsset = normalizeAsset(body.sampleAsset ?? null, 'sample')
  if (sampleAsset.error) return sampleAsset

  const readerAsset = normalizeAsset(body.readerAsset ?? null, 'reader')
  if (readerAsset.error) return readerAsset

  const book = {
    slug: slug.value,
    title: title.value,
    status: status.value,
    ...normalizedNullableFields,
    ...coverDimensions.value,
    description_paragraphs: descriptionParagraphs.value,
    contents: contents.value,
    display_order: displayOrder.value,
    authors: authors.value,
    sample_asset: sampleAsset.value,
    reader_asset: readerAsset.value,
  }
  const publishError = validatePublishedCreate(book)

  return publishError ?? { value: book }
}

export function validateBookPatchPayload(body) {
  const includedFields = Object.keys(body).filter(field =>
    BOOK_PATCH_FIELDS.has(field)
  )

  if (includedFields.length === 0) {
    return validationError(
      'INVALID_BODY',
      '수정할 도서 정보를 입력해 주세요.'
    )
  }

  const book = {}

  if ('slug' in body) {
    const slug = normalizeSlug(body.slug)
    if (slug.error) return slug
    book.slug = slug.value
  }

  if ('title' in body) {
    const title = normalizeRequiredString(
      body.title,
      'INVALID_TITLE',
      '도서명을 입력해 주세요.'
    )
    if (title.error) return title
    book.title = title.value
  }

  if ('status' in body) {
    const status = normalizeStatus(body.status)
    if (status.error) return status
    book.status = status.value
  }

  const nullableFields = [
    ['displayTitle', 'display_title'],
    ['publisherName', 'publisher_name'],
    ['publicationLabel', 'publication_label'],
    ['coverImagePath', 'cover_image_path'],
    ['shortDescription', 'short_description'],
  ]

  for (const [inputName, outputName] of nullableFields) {
    if (inputName in body) {
      const field = normalizeNullableString(
        body[inputName],
        'INVALID_BODY',
        '도서 정보를 확인해 주세요.'
      )
      if (field.error) return field
      book[outputName] = field.value
    }
  }

  if ('descriptionParagraphs' in body) {
    const paragraphs = normalizeStringArray(
      body.descriptionParagraphs,
      'INVALID_DESCRIPTION_PARAGRAPHS',
      '도서 소개 문단을 확인해 주세요.'
    )
    if (paragraphs.error) return paragraphs
    book.description_paragraphs = paragraphs.value
  }

  if ('contents' in body) {
    const contents = normalizeStringArray(
      body.contents,
      'INVALID_CONTENTS',
      '도서 특징 목록을 확인해 주세요.'
    )
    if (contents.error) return contents
    book.contents = contents.value
  }

  if ('displayOrder' in body) {
    const displayOrder = normalizeNonnegativeInteger(
      body.displayOrder,
      'INVALID_DISPLAY_ORDER',
      '표시 순서는 0 이상의 정수여야 합니다.'
    )
    if (displayOrder.error) return displayOrder
    book.display_order = displayOrder.value
  }

  if ('coverWidth' in body || 'coverHeight' in body) {
    const dimensions = normalizeCoverDimensions(
      body.coverWidth,
      body.coverHeight,
      true
    )
    if (dimensions.error) return dimensions
    Object.assign(book, dimensions.value)
  }

  if ('authors' in body) {
    const authors = normalizeAuthors(body.authors)
    if (authors.error) return authors
    book.authors = authors.value
  }

  if ('sampleAsset' in body) {
    const sampleAsset = normalizeAsset(body.sampleAsset, 'sample')
    if (sampleAsset.error) return sampleAsset
    book.sample_asset = sampleAsset.value
  }

  if ('readerAsset' in body) {
    const readerAsset = normalizeAsset(body.readerAsset, 'reader')
    if (readerAsset.error) return readerAsset
    book.reader_asset = readerAsset.value
  }

  return { value: book }
}

function createSampleAssetDto(asset) {
  if (!asset) return null

  return {
    publicPathPrefix: asset.public_path_prefix,
    pageCount: asset.page_count,
    fileExtension: asset.file_extension,
    filenamePadding: asset.filename_padding,
    pageWidth: asset.page_width,
    pageHeight: asset.page_height,
    status: asset.status,
  }
}

function createReaderAssetDto(asset) {
  if (!asset) return null

  return {
    storageBucket: asset.storage_bucket,
    storagePrefix: asset.storage_prefix,
    pageCount: asset.page_count,
    fileExtension: asset.file_extension,
    filenamePadding: asset.filename_padding,
    pageWidth: asset.page_width,
    pageHeight: asset.page_height,
    status: asset.status,
  }
}

function createBookDto(
  book,
  authors,
  sampleAsset,
  readerAsset,
  entitlementCount
) {
  return {
    id: book.id,
    slug: book.slug,
    title: book.title,
    status: book.status,
    displayTitle: book.display_title,
    publisherName: book.publisher_name,
    publicationLabel: book.publication_label,
    coverImagePath: book.cover_image_path,
    coverWidth: book.cover_width,
    coverHeight: book.cover_height,
    shortDescription: book.short_description,
    descriptionParagraphs: book.description_paragraphs ?? [],
    contents: book.contents ?? [],
    displayOrder: book.display_order,
    authors,
    sampleAsset: createSampleAssetDto(sampleAsset),
    readerAsset: createReaderAssetDto(readerAsset),
    hasSampleAsset: Boolean(sampleAsset),
    hasReaderAsset: Boolean(readerAsset),
    entitlementCount,
    createdAt: book.created_at,
    updatedAt: book.updated_at,
  }
}

async function hydrateAdminLibraryBooks(bookRows) {
  if (bookRows.length === 0) return { books: [] }

  const bookIds = bookRows.map(book => book.id)
  const [linksResult, samplesResult, readersResult, entitlementsResult] =
    await Promise.all([
      supabaseAdmin
        .from('book_authors')
        .select('book_id,author_id,role,sort_order')
        .in('book_id', bookIds)
        .order('sort_order', { ascending: true })
        .order('author_id', { ascending: true }),
      supabaseAdmin
        .from('book_sample_assets')
        .select(
          'book_id,public_path_prefix,page_count,file_extension,filename_padding,page_width,page_height,status'
        )
        .in('book_id', bookIds),
      supabaseAdmin
        .from('book_reader_assets')
        .select(
          'book_id,storage_bucket,storage_prefix,page_count,file_extension,filename_padding,page_width,page_height,status'
        )
        .in('book_id', bookIds),
      supabaseAdmin
        .from('book_entitlements')
        .select('book_id')
        .in('book_id', bookIds),
    ])

  const relatedError =
    linksResult.error ||
    samplesResult.error ||
    readersResult.error ||
    entitlementsResult.error

  if (relatedError) return { error: relatedError }

  const authorIds = [
    ...new Set((linksResult.data ?? []).map(link => link.author_id)),
  ]
  const authorsResult = authorIds.length > 0
    ? await supabaseAdmin
        .from('authors')
        .select('id,slug,display_name')
        .in('id', authorIds)
    : { data: [], error: null }

  if (authorsResult.error) return { error: authorsResult.error }

  const authorById = new Map(
    (authorsResult.data ?? []).map(author => [author.id, author])
  )
  const authorsByBookId = new Map()

  for (const link of linksResult.data ?? []) {
    const author = authorById.get(link.author_id)
    if (!author) continue

    const authors = authorsByBookId.get(link.book_id) ?? []
    authors.push({
      authorId: author.id,
      slug: author.slug,
      displayName: author.display_name,
      role: link.role,
      sortOrder: link.sort_order,
    })
    authorsByBookId.set(link.book_id, authors)
  }

  const sampleByBookId = new Map(
    (samplesResult.data ?? []).map(asset => [asset.book_id, asset])
  )
  const readerByBookId = new Map(
    (readersResult.data ?? []).map(asset => [asset.book_id, asset])
  )
  const entitlementCounts = new Map()

  for (const entitlement of entitlementsResult.data ?? []) {
    entitlementCounts.set(
      entitlement.book_id,
      (entitlementCounts.get(entitlement.book_id) ?? 0) + 1
    )
  }

  return {
    books: bookRows.map(book =>
      createBookDto(
        book,
        authorsByBookId.get(book.id) ?? [],
        sampleByBookId.get(book.id),
        readerByBookId.get(book.id),
        entitlementCounts.get(book.id) ?? 0
      )
    ),
  }
}

export async function getAdminLibraryBooks() {
  const { data, error } = await supabaseAdmin
    .from('books')
    .select(BOOK_COLUMNS)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
    .order('slug', { ascending: true })

  if (error) return { error }
  return hydrateAdminLibraryBooks(data ?? [])
}

export async function getAdminLibraryBook(bookId) {
  const { data, error } = await supabaseAdmin
    .from('books')
    .select(BOOK_COLUMNS)
    .eq('id', bookId)
    .maybeSingle()

  if (error) return { error }
  if (!data) return { notFound: true }

  const result = await hydrateAdminLibraryBooks([data])
  if (result.error) return result

  return { book: result.books[0] }
}

function hasDatabaseError(error, value) {
  return (
    error?.code === value ||
    (typeof error?.message === 'string' &&
      error.message.includes(value))
  )
}

export function bookSaveErrorResponse(error) {
  if (hasDatabaseError(error, 'BOOK_NOT_FOUND')) {
    return errorResponse(
      'BOOK_NOT_FOUND',
      '도서를 찾을 수 없습니다.',
      404
    )
  }

  if (
    hasDatabaseError(error, 'BOOK_AUTHOR_NOT_FOUND') ||
    error?.code === '23503'
  ) {
    return errorResponse(
      'BOOK_AUTHOR_NOT_FOUND',
      '연결할 저자를 찾을 수 없습니다.',
      404
    )
  }

  const databaseMessage = [error?.message, error?.details]
    .filter(value => typeof value === 'string')
    .join(' ')
    .toLowerCase()

  if (hasDatabaseError(error, 'BOOK_SLUG_CONFLICT')) {
    return errorResponse(
      'BOOK_SLUG_CONFLICT',
      '이미 사용 중인 도서 주소입니다.',
      409
    )
  }

  if (hasDatabaseError(error, 'BOOK_ASSET_PATH_CONFLICT')) {
    return errorResponse(
      'BOOK_ASSET_PATH_CONFLICT',
      '이미 다른 도서에서 사용 중인 자산 경로입니다.',
      409
    )
  }

  if (
    error?.code === '23505' &&
    databaseMessage.includes('books_slug')
  ) {
    return errorResponse(
      'BOOK_SLUG_CONFLICT',
      '이미 사용 중인 도서 주소입니다.',
      409
    )
  }

  if (error?.code === '23505') {
    return errorResponse(
      'BOOK_ASSET_PATH_CONFLICT',
      '이미 다른 도서에서 사용 중인 자산 경로입니다.',
      409
    )
  }

  const publishErrors = [
    [
      'BOOK_PUBLISH_COVER_REQUIRED',
      '도서를 공개하려면 표지 이미지 경로가 필요합니다.',
    ],
    [
      'BOOK_PUBLISH_DESCRIPTION_REQUIRED',
      '도서를 공개하려면 간단한 소개가 필요합니다.',
    ],
    [
      'BOOK_PUBLISH_AUTHOR_REQUIRED',
      '도서를 공개하려면 대표 저자가 필요합니다.',
    ],
    [
      'BOOK_PUBLISH_AUTHOR_NOT_PUBLISHED',
      '대표 저자를 먼저 공개 상태로 변경해 주세요.',
    ],
  ]

  for (const [code, message] of publishErrors) {
    if (hasDatabaseError(error, code)) {
      return errorResponse(code, message, 400)
    }
  }

  if (
    error?.code === '23514' &&
    databaseMessage.includes('books_cover_dimensions_check')
  ) {
    return errorResponse(
      'INVALID_COVER_DIMENSIONS',
      '표지 너비와 높이를 함께 확인해 주세요.',
      400
    )
  }

  logDatabaseError('[Admin library books] Book save failed', error)

  return errorResponse(
    'BOOK_SAVE_FAILED',
    '도서 정보를 저장하지 못했습니다.',
    500
  )
}

export function bookDeleteErrorResponse(error) {
  if (hasDatabaseError(error, 'BOOK_NOT_FOUND')) {
    return errorResponse(
      'BOOK_NOT_FOUND',
      '도서를 찾을 수 없습니다.',
      404
    )
  }

  logDatabaseError('[Admin library books] Book delete failed', error)

  return errorResponse(
    'BOOK_DELETE_FAILED',
    '도서를 삭제하지 못했습니다.',
    500
  )
}
