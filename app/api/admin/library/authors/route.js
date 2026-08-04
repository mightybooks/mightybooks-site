import {
  AUTHOR_STATUSES,
  adminAuthorizationError,
  authorSaveErrorResponse,
  errorResponse,
  getAdminLibraryAuthor,
  jsonResponse,
  logDatabaseError,
  readJsonObject,
  validateAuthorPayload,
} from '@/lib/admin-library-api'
import { requireAdmin } from '@/lib/server-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

function incrementCount(counts, authorId) {
  counts.set(authorId, (counts.get(authorId) ?? 0) + 1)
}

export async function GET(request) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const searchParams = new URL(request.url).searchParams
  const status = searchParams.get('status') ?? 'all'
  const searchTerm = (searchParams.get('q') ?? '').trim().toLowerCase()

  if (status !== 'all' && !AUTHOR_STATUSES.includes(status)) {
    return errorResponse(
      'INVALID_STATUS',
      '올바른 저자 상태를 선택해 주세요.',
      400
    )
  }

  let authorQuery = supabaseAdmin
    .from('authors')
    .select(
      'id,slug,display_name,status,pen_name,occupation,profile_image_path,short_bio,display_order,created_at,updated_at'
    )
    .order('display_order', { ascending: true })
    .order('slug', { ascending: true })

  if (status !== 'all') {
    authorQuery = authorQuery.eq('status', status)
  }

  const { data: authorRows, error: authorError } = await authorQuery

  if (authorError) {
    logDatabaseError(
      '[Admin library authors GET] Author list lookup failed',
      authorError
    )

    return errorResponse(
      'AUTHOR_LIST_FETCH_FAILED',
      '저자 목록을 불러오지 못했습니다.',
      500
    )
  }

  const authors = (authorRows ?? []).filter(author => {
    if (!searchTerm) return true

    return [author.display_name, author.pen_name, author.slug].some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm)
    )
  })

  if (authors.length === 0) {
    return jsonResponse({ authors: [] })
  }

  const authorIds = authors.map(author => author.id)
  const [bookLinksResult, membershipsResult, sectionsResult] =
    await Promise.all([
      supabaseAdmin
        .from('book_authors')
        .select('author_id')
        .in('author_id', authorIds),
      supabaseAdmin
        .from('author_memberships')
        .select('author_id')
        .in('author_id', authorIds),
      supabaseAdmin
        .from('author_career_sections')
        .select('author_id')
        .in('author_id', authorIds),
    ])

  const countError =
    bookLinksResult.error ||
    membershipsResult.error ||
    sectionsResult.error

  if (countError) {
    logDatabaseError(
      '[Admin library authors GET] Author counts lookup failed',
      countError
    )

    return errorResponse(
      'AUTHOR_LIST_FETCH_FAILED',
      '저자 목록을 불러오지 못했습니다.',
      500
    )
  }

  const bookCounts = new Map()
  const membershipCounts = new Map()
  const sectionCounts = new Map()

  for (const row of bookLinksResult.data ?? []) {
    incrementCount(bookCounts, row.author_id)
  }
  for (const row of membershipsResult.data ?? []) {
    incrementCount(membershipCounts, row.author_id)
  }
  for (const row of sectionsResult.data ?? []) {
    incrementCount(sectionCounts, row.author_id)
  }

  return jsonResponse({
    authors: authors.map(author => ({
      ...author,
      book_count: bookCounts.get(author.id) ?? 0,
      membership_count: membershipCounts.get(author.id) ?? 0,
      career_section_count: sectionCounts.get(author.id) ?? 0,
    })),
  })
}

export async function POST(request) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const parsed = await readJsonObject(request)

  if (parsed.error) return parsed.error

  const validated = validateAuthorPayload(parsed.body)

  if (validated.error) {
    return errorResponse(
      validated.error.code,
      validated.error.message,
      400
    )
  }

  const { data: authorId, error: saveError } =
    await supabaseAdmin.rpc('save_admin_library_author', {
      p_author_id: null,
      p_author: validated.value,
    })

  if (saveError) return authorSaveErrorResponse(saveError)

  const result = await getAdminLibraryAuthor(authorId)

  if (result.error || result.notFound) {
    if (result.error) {
      logDatabaseError(
        '[Admin library authors POST] Saved author lookup failed',
        result.error
      )
    }

    return errorResponse(
      'AUTHOR_FETCH_FAILED',
      '저자 정보를 불러오지 못했습니다.',
      500
    )
  }

  return jsonResponse({ author: result.author }, { status: 201 })
}
