import 'server-only'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const AUTHOR_STATUSES = [
  'draft',
  'published',
  'archived',
]

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const AUTHOR_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  Vary: 'Authorization',
}

export function jsonResponse(body, init = {}) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...NO_STORE_HEADERS,
      ...init.headers,
    },
  })
}

export function errorResponse(code, message, status, details) {
  const body = { code, error: message }

  if (details !== undefined) {
    body.details = details
  }

  return jsonResponse(body, { status })
}

export function adminAuthorizationError({ user, isAdmin }) {
  if (!user) {
    return errorResponse(
      'ADMIN_AUTH_REQUIRED',
      '로그인이 필요합니다.',
      401
    )
  }

  if (!isAdmin) {
    return errorResponse(
      'ADMIN_REQUIRED',
      '관리자 권한이 필요합니다.',
      403
    )
  }

  return null
}

export function isUuid(value) {
  return typeof value === 'string' && UUID_PATTERN.test(value)
}

export function logDatabaseError(context, error) {
  console.error(context, {
    code: error?.code ?? null,
    message: error?.message ?? 'Unknown database error',
  })
}

export async function readJsonObject(
  request,
  invalidBodyMessage = '요청 내용을 확인해 주세요.'
) {
  let body

  try {
    body = await request.json()
  } catch {
    return {
      error: errorResponse(
        'INVALID_JSON',
        '올바른 JSON 요청을 전송해 주세요.',
        400
      ),
    }
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return {
      error: errorResponse(
        'INVALID_BODY',
        invalidBodyMessage,
        400
      ),
    }
  }

  return { body }
}

function validationError(code, message) {
  return { error: { code, message } }
}

function normalizeOptionalString(value) {
  if (value === undefined || value === null) {
    return { value: null }
  }

  if (typeof value !== 'string') {
    return { invalid: true }
  }

  return { value: value.trim() || null }
}

function normalizeCareerSections(value) {
  if (!Array.isArray(value)) {
    return validationError(
      'INVALID_CAREER_SECTIONS',
      '저자 경력 섹션을 확인해 주세요.'
    )
  }

  const sections = []

  for (const section of value) {
    if (
      !section ||
      typeof section !== 'object' ||
      Array.isArray(section) ||
      typeof section.title !== 'string' ||
      section.title.trim().length === 0 ||
      !Number.isInteger(section.sort_order) ||
      section.sort_order < 0 ||
      !Array.isArray(section.items)
    ) {
      return validationError(
        'INVALID_CAREER_SECTIONS',
        '저자 경력 섹션을 확인해 주세요.'
      )
    }

    const items = []

    for (const item of section.items) {
      if (
        !item ||
        typeof item !== 'object' ||
        Array.isArray(item) ||
        typeof item.item_type !== 'string' ||
        !Number.isInteger(item.sort_order) ||
        item.sort_order < 0
      ) {
        return validationError(
          'INVALID_CAREER_ITEM',
          '저자 경력 항목을 확인해 주세요.'
        )
      }

      const itemType = item.item_type.trim()

      if (!['text', 'structured'].includes(itemType)) {
        return validationError(
          'INVALID_CAREER_ITEM',
          '저자 경력 항목을 확인해 주세요.'
        )
      }

      const body = normalizeOptionalString(item.body)
      const organization = normalizeOptionalString(item.organization)
      const work = normalizeOptionalString(item.work)
      const period = normalizeOptionalString(item.period)

      if (
        body.invalid ||
        organization.invalid ||
        work.invalid ||
        period.invalid
      ) {
        return validationError(
          'INVALID_CAREER_ITEM',
          '저자 경력 항목을 확인해 주세요.'
        )
      }

      if (itemType === 'text' && !body.value) {
        return validationError(
          'INVALID_CAREER_ITEM',
          '텍스트 경력 항목의 내용을 입력해 주세요.'
        )
      }

      if (
        itemType === 'structured' &&
        !organization.value &&
        !work.value &&
        !period.value
      ) {
        return validationError(
          'INVALID_CAREER_ITEM',
          '구조화 경력 항목의 내용을 하나 이상 입력해 주세요.'
        )
      }

      items.push({
        item_type: itemType,
        body: itemType === 'text' ? body.value : null,
        organization:
          itemType === 'structured' ? organization.value : null,
        work: itemType === 'structured' ? work.value : null,
        period: itemType === 'structured' ? period.value : null,
        sort_order: item.sort_order,
      })
    }

    sections.push({
      title: section.title.trim(),
      sort_order: section.sort_order,
      items,
    })
  }

  return { value: sections }
}

export function validateAuthorPayload(body) {
  if (typeof body.slug !== 'string') {
    return validationError(
      'INVALID_SLUG',
      '올바른 저자 주소를 입력해 주세요.'
    )
  }

  const slug = body.slug.trim()

  if (
    slug.length === 0 ||
    slug.length > 64 ||
    !AUTHOR_SLUG_PATTERN.test(slug)
  ) {
    return validationError(
      'INVALID_SLUG',
      '저자 주소는 영문 소문자, 숫자, 하이픈으로 64자 이내여야 합니다.'
    )
  }

  if (
    typeof body.display_name !== 'string' ||
    body.display_name.trim().length === 0
  ) {
    return validationError(
      'INVALID_DISPLAY_NAME',
      '저자명을 입력해 주세요.'
    )
  }

  if (typeof body.status !== 'string') {
    return validationError(
      'INVALID_STATUS',
      '올바른 저자 상태를 선택해 주세요.'
    )
  }

  const status = body.status.trim()

  if (!AUTHOR_STATUSES.includes(status)) {
    return validationError(
      'INVALID_STATUS',
      '올바른 저자 상태를 선택해 주세요.'
    )
  }

  if (
    !Number.isInteger(body.display_order) ||
    body.display_order < 0
  ) {
    return validationError(
      'INVALID_DISPLAY_ORDER',
      '표시 순서는 0 이상의 정수여야 합니다.'
    )
  }

  if (
    !Array.isArray(body.bio_paragraphs) ||
    body.bio_paragraphs.some(value => typeof value !== 'string')
  ) {
    return validationError(
      'INVALID_BIO_PARAGRAPHS',
      '저자 소개 문단을 확인해 주세요.'
    )
  }

  const optionalFields = [
    'pen_name',
    'occupation',
    'profile_image_path',
    'short_bio',
  ]
  const normalizedOptionalFields = {}

  for (const field of optionalFields) {
    const normalized = normalizeOptionalString(body[field])

    if (normalized.invalid) {
      return validationError(
        'INVALID_BODY',
        '저자 정보를 확인해 주세요.'
      )
    }

    normalizedOptionalFields[field] = normalized.value
  }

  const careerSections = normalizeCareerSections(body.career_sections)

  if (careerSections.error) {
    return careerSections
  }

  return {
    value: {
      slug,
      display_name: body.display_name.trim(),
      status,
      ...normalizedOptionalFields,
      bio_paragraphs: body.bio_paragraphs
        .map(paragraph => paragraph.trim())
        .filter(Boolean),
      display_order: body.display_order,
      career_sections: careerSections.value,
    },
  }
}

function hasDatabaseError(error, value) {
  return (
    error?.code === value ||
    (typeof error?.message === 'string' &&
      error.message.includes(value))
  )
}

export function authorSaveErrorResponse(error) {
  if (hasDatabaseError(error, 'AUTHOR_NOT_FOUND')) {
    return errorResponse(
      'AUTHOR_NOT_FOUND',
      '저자를 찾을 수 없습니다.',
      404
    )
  }

  if (error?.code === '23505') {
    return errorResponse(
      'AUTHOR_SLUG_CONFLICT',
      '이미 사용 중인 저자 주소입니다.',
      409
    )
  }

  if (
    error?.code === '23514' &&
    typeof error?.message === 'string' &&
    error.message.toLowerCase().includes('reserved')
  ) {
    return errorResponse(
      'AUTHOR_SLUG_RESERVED',
      '예약된 주소는 저자 주소로 사용할 수 없습니다.',
      409
    )
  }

  logDatabaseError('[Admin library authors] Author save failed', error)

  return errorResponse(
    'AUTHOR_SAVE_FAILED',
    '저자 정보를 저장하지 못했습니다.',
    500
  )
}

export function authorDeleteErrorResponse(error) {
  if (hasDatabaseError(error, 'AUTHOR_NOT_FOUND')) {
    return errorResponse(
      'AUTHOR_NOT_FOUND',
      '저자를 찾을 수 없습니다.',
      404
    )
  }

  logDatabaseError('[Admin library authors] Author delete failed', error)

  return errorResponse(
    'AUTHOR_DELETE_FAILED',
    '저자를 삭제하지 못했습니다.',
    500
  )
}

export async function getAdminLibraryAuthor(authorId) {
  const { data: author, error: authorError } = await supabaseAdmin
    .from('authors')
    .select(
      'id,slug,display_name,status,pen_name,occupation,profile_image_path,short_bio,bio_paragraphs,display_order,created_at,updated_at'
    )
    .eq('id', authorId)
    .maybeSingle()

  if (authorError) return { error: authorError }
  if (!author) return { notFound: true }

  const [sectionsResult, bookLinksResult, membershipsResult] =
    await Promise.all([
      supabaseAdmin
        .from('author_career_sections')
        .select('id,author_id,title,sort_order,created_at,updated_at')
        .eq('author_id', authorId)
        .order('sort_order', { ascending: true })
        .order('id', { ascending: true }),
      supabaseAdmin
        .from('book_authors')
        .select('book_id,role,sort_order')
        .eq('author_id', authorId)
        .order('sort_order', { ascending: true })
        .order('book_id', { ascending: true }),
      supabaseAdmin
        .from('author_memberships')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', authorId),
    ])

  const relatedError =
    sectionsResult.error ||
    bookLinksResult.error ||
    membershipsResult.error

  if (relatedError) return { error: relatedError }

  const sectionIds = sectionsResult.data.map(section => section.id)
  const bookIds = bookLinksResult.data.map(link => link.book_id)

  const [itemsResult, booksResult] = await Promise.all([
    sectionIds.length > 0
      ? supabaseAdmin
          .from('author_career_items')
          .select(
            'id,section_id,item_type,body,organization,work,period,sort_order,created_at,updated_at'
          )
          .in('section_id', sectionIds)
          .order('sort_order', { ascending: true })
          .order('id', { ascending: true })
      : Promise.resolve({ data: [], error: null }),
    bookIds.length > 0
      ? supabaseAdmin
          .from('books')
          .select('id,slug,title,status')
          .in('id', bookIds)
      : Promise.resolve({ data: [], error: null }),
  ])

  const nestedError = itemsResult.error || booksResult.error

  if (nestedError) return { error: nestedError }

  const itemsBySectionId = new Map()

  for (const item of itemsResult.data) {
    const items = itemsBySectionId.get(item.section_id) ?? []
    items.push(item)
    itemsBySectionId.set(item.section_id, items)
  }

  const booksById = new Map(
    booksResult.data.map(book => [book.id, book])
  )

  return {
    author: {
      ...author,
      career_sections: sectionsResult.data.map(section => ({
        ...section,
        items: itemsBySectionId.get(section.id) ?? [],
      })),
      linked_books: bookLinksResult.data.flatMap(link => {
        const book = booksById.get(link.book_id)

        return book
          ? [{ ...book, role: link.role, sort_order: link.sort_order }]
          : []
      }),
      membership_count: membershipsResult.count ?? 0,
    },
  }
}
