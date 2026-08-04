import {
  AUTHOR_STATUSES,
  adminAuthorizationError,
  authorSaveErrorResponse,
  errorResponse,
  getAdminLibraryAuthor,
  jsonResponse,
  logDatabaseError,
  parseAdminListParams,
  readJsonObject,
  sanitizePostgrestSearch,
  validateAuthorPayload,
} from '@/lib/admin-library-api'
import { requireAdmin } from '@/lib/server-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { invalidateLibraryAuthorCache } from '@/lib/library-cache'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const parsed = parseAdminListParams(request, AUTHOR_STATUSES)
  if (parsed.error) return errorResponse(parsed.error.code, parsed.error.message, 400)
  const { status, q, page, pageSize, from, to } = parsed.value

  let authorQuery = supabaseAdmin
    .from('authors')
    .select(
      'id,slug,display_name,status,occupation,updated_at',
      { count: 'exact' }
    )
    .order('display_order', { ascending: true })
    .order('slug', { ascending: true })
    .range(from, to)

  if (status !== 'all') {
    authorQuery = authorQuery.eq('status', status)
  }

  const searchTerm = sanitizePostgrestSearch(q)
  if (searchTerm) {
    authorQuery = authorQuery.or(
      `display_name.ilike.%${searchTerm}%,slug.ilike.%${searchTerm}%,occupation.ilike.%${searchTerm}%`
    )
  }

  const { data: authors, error: authorError, count } = await authorQuery

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

  const total = count ?? 0
  return jsonResponse({
    authors: authors ?? [],
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
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
    await supabaseAdmin.rpc('save_admin_library_author_v2', {
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

  invalidateLibraryAuthorCache({
    newSlug: result.author.slug,
    bookSlugs: result.author.linked_books.map(book => book.slug),
  })

  return jsonResponse({ author: result.author }, { status: 201 })
}
