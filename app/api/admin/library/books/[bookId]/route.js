import {
  adminAuthorizationError,
  errorResponse,
  isUuid,
  jsonResponse,
  logDatabaseError,
  readJsonObject,
} from '@/lib/admin-library-api'
import {
  bookDeleteErrorResponse,
  bookSaveErrorResponse,
  getAdminLibraryBook,
  validateBookPatchPayload,
} from '@/lib/admin-library-books'
import { requireAdmin } from '@/lib/server-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { invalidateLibraryBookCache } from '@/lib/library-cache'

export const dynamic = 'force-dynamic'

async function getValidatedBookId(params) {
  const { bookId } = await params
  return isUuid(bookId) ? bookId : null
}

async function getBookCacheContext(bookId) {
  const [bookResult, linksResult] = await Promise.all([
    supabaseAdmin.from('books').select('slug').eq('id', bookId).maybeSingle(),
    supabaseAdmin
      .from('book_authors')
      .select('authors!inner(slug)')
      .eq('book_id', bookId),
  ])
  const error = bookResult.error || linksResult.error
  if (error) return { error }
  return {
    slug: bookResult.data?.slug ?? null,
    authorSlugs: (linksResult.data ?? []).map(link => link.authors?.slug).filter(Boolean),
  }
}

export async function GET(request, { params }) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const bookId = await getValidatedBookId(params)

  if (!bookId) {
    return errorResponse(
      'INVALID_BOOK_ID',
      '올바른 도서 ID가 필요합니다.',
      400
    )
  }

  const result = await getAdminLibraryBook(bookId)

  if (result.error) {
    logDatabaseError(
      '[Admin library book GET] Book lookup failed',
      result.error
    )

    return errorResponse(
      'BOOK_FETCH_FAILED',
      '도서 정보를 불러오지 못했습니다.',
      500
    )
  }

  if (result.notFound) {
    return errorResponse(
      'BOOK_NOT_FOUND',
      '도서를 찾을 수 없습니다.',
      404
    )
  }

  return jsonResponse({ book: result.book })
}

export async function PATCH(request, { params }) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const bookId = await getValidatedBookId(params)

  if (!bookId) {
    return errorResponse(
      'INVALID_BOOK_ID',
      '올바른 도서 ID가 필요합니다.',
      400
    )
  }

  const parsed = await readJsonObject(
    request,
    '도서 정보를 확인해 주세요.'
  )

  if (parsed.error) return parsed.error

  const validated = validateBookPatchPayload(parsed.body)

  if (validated.error) {
    return errorResponse(
      validated.error.code,
      validated.error.message,
      400
    )
  }

  const previous = await getBookCacheContext(bookId)
  if (previous.error) {
    logDatabaseError('[Admin library book PATCH] Cache context lookup failed', previous.error)
    return errorResponse('BOOK_FETCH_FAILED', '도서 정보를 불러오지 못했습니다.', 500)
  }

  const { error: saveError } = await supabaseAdmin.rpc(
    'save_admin_library_book',
    {
      p_book_id: bookId,
      p_book: validated.value,
    }
  )

  if (saveError) return bookSaveErrorResponse(saveError)

  const result = await getAdminLibraryBook(bookId)

  if (result.error || result.notFound) {
    if (result.error) {
      logDatabaseError(
        '[Admin library book PATCH] Saved book lookup failed',
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
    oldSlug: previous.slug,
    newSlug: result.book.slug,
    authorSlugs: [
      ...previous.authorSlugs,
      ...result.book.authors.map(author => author.slug),
    ],
  })

  return jsonResponse({ book: result.book })
}

export async function DELETE(request, { params }) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const bookId = await getValidatedBookId(params)

  if (!bookId) {
    return errorResponse(
      'INVALID_BOOK_ID',
      '올바른 도서 ID가 필요합니다.',
      400
    )
  }

  const previous = await getBookCacheContext(bookId)
  if (previous.error) {
    logDatabaseError('[Admin library book DELETE] Cache context lookup failed', previous.error)
    return errorResponse('BOOK_FETCH_FAILED', '도서 정보를 불러오지 못했습니다.', 500)
  }

  const { data, error } = await supabaseAdmin.rpc(
    'delete_admin_library_book',
    { p_book_id: bookId }
  )

  if (error) return bookDeleteErrorResponse(error)

  if (data?.reason === 'BOOK_NOT_DRAFT') {
    return errorResponse(
      'BOOK_NOT_DRAFT',
      '공개 또는 보관 상태의 도서는 삭제할 수 없습니다. 먼저 임시저장 상태로 변경해 주세요.',
      409
    )
  }

  if (data?.reason === 'BOOK_HAS_ENTITLEMENTS') {
    return errorResponse(
      'BOOK_HAS_ENTITLEMENTS',
      '이용권이 연결된 도서는 삭제할 수 없습니다.',
      409,
      { entitlementCount: data.entitlement_count ?? 0 }
    )
  }

  if (!data?.deleted) {
    console.error(
      '[Admin library book DELETE] Delete RPC returned no result',
      {
        code: 'EMPTY_RPC_RESULT',
        message: 'Delete RPC returned no result',
      }
    )

    return errorResponse(
      'BOOK_DELETE_FAILED',
      '도서를 삭제하지 못했습니다.',
      500
    )
  }

  invalidateLibraryBookCache({
    oldSlug: previous.slug,
    authorSlugs: previous.authorSlugs,
  })

  return jsonResponse({ deleted: true, bookId })
}
