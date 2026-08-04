import {
  adminAuthorizationError,
  authorDeleteErrorResponse,
  authorSaveErrorResponse,
  errorResponse,
  getAdminLibraryAuthor,
  isUuid,
  jsonResponse,
  logDatabaseError,
  readJsonObject,
  validateAuthorPayload,
} from '@/lib/admin-library-api'
import { requireAdmin } from '@/lib/server-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

async function getValidatedAuthorId(params) {
  const { authorId } = await params
  return isUuid(authorId) ? authorId : null
}

export async function GET(request, { params }) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const authorId = await getValidatedAuthorId(params)

  if (!authorId) {
    return errorResponse(
      'INVALID_AUTHOR_ID',
      '올바른 저자 ID가 필요합니다.',
      400
    )
  }

  const result = await getAdminLibraryAuthor(authorId)

  if (result.error) {
    logDatabaseError(
      '[Admin library author GET] Author lookup failed',
      result.error
    )

    return errorResponse(
      'AUTHOR_FETCH_FAILED',
      '저자 정보를 불러오지 못했습니다.',
      500
    )
  }

  if (result.notFound) {
    return errorResponse(
      'AUTHOR_NOT_FOUND',
      '저자를 찾을 수 없습니다.',
      404
    )
  }

  return jsonResponse({ author: result.author })
}

export async function PUT(request, { params }) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const authorId = await getValidatedAuthorId(params)

  if (!authorId) {
    return errorResponse(
      'INVALID_AUTHOR_ID',
      '올바른 저자 ID가 필요합니다.',
      400
    )
  }

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

  const { error: saveError } = await supabaseAdmin.rpc(
    'save_admin_library_author',
    {
      p_author_id: authorId,
      p_author: validated.value,
    }
  )

  if (saveError) return authorSaveErrorResponse(saveError)

  const result = await getAdminLibraryAuthor(authorId)

  if (result.error || result.notFound) {
    if (result.error) {
      logDatabaseError(
        '[Admin library author PUT] Saved author lookup failed',
        result.error
      )
    }

    return errorResponse(
      'AUTHOR_FETCH_FAILED',
      '저자 정보를 불러오지 못했습니다.',
      500
    )
  }

  return jsonResponse({ author: result.author })
}

export async function DELETE(request, { params }) {
  const authorization = await requireAdmin(request)
  const authorizationError = adminAuthorizationError(authorization)

  if (authorizationError) return authorizationError

  const authorId = await getValidatedAuthorId(params)

  if (!authorId) {
    return errorResponse(
      'INVALID_AUTHOR_ID',
      '올바른 저자 ID가 필요합니다.',
      400
    )
  }

  const { data, error } = await supabaseAdmin.rpc(
    'delete_admin_library_author',
    { p_author_id: authorId }
  )

  if (error) return authorDeleteErrorResponse(error)

  if (data?.reason === 'AUTHOR_IN_USE') {
    return errorResponse(
      'AUTHOR_IN_USE',
      '연결된 도서 또는 회원 권한이 있어 저자를 삭제할 수 없습니다.',
      409,
      {
        book_count: data.book_count ?? 0,
        membership_count: data.membership_count ?? 0,
      }
    )
  }

  if (!data?.deleted) {
    console.error(
      '[Admin library author DELETE] Delete RPC returned no result',
      {
        code: 'EMPTY_RPC_RESULT',
        message: 'Delete RPC returned no result',
      }
    )

    return errorResponse(
      'AUTHOR_DELETE_FAILED',
      '저자를 삭제하지 못했습니다.',
      500
    )
  }

  return jsonResponse({ deleted: true, id: authorId })
}
