import {
  adminAuthorizationError,
  errorResponse,
  jsonResponse,
  logDatabaseError,
  parseAdminListParams,
  readJsonObject,
  sanitizePostgrestSearch,
} from '@/lib/admin-library-api'
import {
  bookSaveErrorResponse,
  getAdminLibraryBook,
  getAdminLibraryBookList,
  validateBookCreatePayload,
} from '@/lib/admin-library-books'
import { requireAdmin } from '@/lib/server-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { invalidateLibraryBookCache } from '@/lib/library-cache'

export const dynamic = 'force-dynamic'
const BOOK_STATUSES = ['draft', 'published', 'archived']

export async function GET(request) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const parsed = parseAdminListParams(request, BOOK_STATUSES)
  if (parsed.error) return errorResponse(parsed.error.code, parsed.error.message, 400)
  const result = await getAdminLibraryBookList({
    ...parsed.value,
    q: sanitizePostgrestSearch(parsed.value.q),
  })

  if (result.error) {
    logDatabaseError(
      '[Admin library books GET] Book list lookup failed',
      result.error
    )

    return errorResponse(
      'BOOK_LIST_FETCH_FAILED',
      '도서 목록을 불러오지 못했습니다.',
      500
    )
  }

  return jsonResponse(result)
}

export async function POST(request) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const parsed = await readJsonObject(
    request,
    '도서 정보를 확인해 주세요.'
  )

  if (parsed.error) return parsed.error

  const validated = validateBookCreatePayload(parsed.body)

  if (validated.error) {
    return errorResponse(
      validated.error.code,
      validated.error.message,
      400
    )
  }

  const { data: bookId, error: saveError } =
    await supabaseAdmin.rpc('save_admin_library_book', {
      p_book_id: null,
      p_book: validated.value,
    })

  if (saveError) return bookSaveErrorResponse(saveError)

  const result = await getAdminLibraryBook(bookId)

  if (result.error || result.notFound) {
    if (result.error) {
      logDatabaseError(
        '[Admin library books POST] Saved book lookup failed',
        result.error
      )
    }

    return errorResponse(
      'BOOK_FETCH_FAILED',
      '도서 정보를 불러오지 못했습니다.',
      500
    )
  }

  invalidateLibraryBookCache({
    newSlug: result.book.slug,
    authorSlugs: result.book.authors.map(author => author.slug),
  })

  return jsonResponse({ book: result.book }, { status: 201 })
}
