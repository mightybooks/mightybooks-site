import { NextResponse } from 'next/server'
import { getCurrentUserBookAccess } from '@/lib/library-access'
import { createBookReaderPageWindow } from '@/lib/library-reader'
import {
  isValidReaderSessionId,
  logReaderAuditEvent,
} from '@/lib/library-reader-security'

const BOOK_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
const PAGE_PATTERN = /^(0|[1-9][0-9]{0,3})$/
const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  Vary: 'Cookie',
}

export const dynamic = 'force-dynamic'

function jsonNoStore(body, init = {}) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...init.headers,
      ...NO_STORE_HEADERS,
    },
  })
}

export async function GET(request, { params }) {
  let result = null
  let sessionId = null
  let centerPage = null

  try {
    const { slug } = await params
    const searchParams = new URL(request.url).searchParams
    const centerValue = searchParams.get('center')
    const sessionValue = searchParams.get('session')

    if (typeof slug !== 'string' || !BOOK_SLUG_PATTERN.test(slug)) {
      return jsonNoStore(
        { error: '올바른 도서 주소가 아닙니다.' },
        { status: 400 }
      )
    }

    if (!PAGE_PATTERN.test(centerValue || '') || !isValidReaderSessionId(sessionValue)) {
      logReaderAuditEvent('page_window_denied_invalid_request', {
        request,
      })
      return jsonNoStore(
        { error: '올바른 페이지 요청이 아닙니다.' },
        { status: 400 }
      )
    }

    sessionId = sessionValue
    centerPage = Number(centerValue)
    result = await getCurrentUserBookAccess(slug)

    if (!result.user) {
      logReaderAuditEvent('page_window_denied_unauthenticated', {
        request,
        sessionId,
        centerPage,
      })
      return jsonNoStore(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    if (!result.allowed || !result.book) {
      logReaderAuditEvent('page_window_denied_no_access', {
        request,
        user: result.user,
        sessionId,
        centerPage,
      })
      return jsonNoStore(
        { error: '열람 가능한 전체 도서를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const pageWindow = await createBookReaderPageWindow(
      result.book.id,
      centerPage
    )

    if (!pageWindow) {
      return jsonNoStore(
        { error: '열람 가능한 전체 도서를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    if (pageWindow.invalidPage) {
      logReaderAuditEvent('page_window_denied_out_of_range', {
        request,
        user: result.user,
        bookId: result.book.id,
        sessionId,
        centerPage,
        pageCount: pageWindow.pageCount,
      })
      return jsonNoStore(
        { error: '존재하지 않는 페이지입니다.' },
        { status: 400 }
      )
    }

    logReaderAuditEvent('page_window_issued', {
      request,
      user: result.user,
      bookId: result.book.id,
      sessionId,
      centerPage,
      firstPage: pageWindow.firstPage,
      lastPage: pageWindow.lastPage,
    })

    return jsonNoStore({
      allowed: true,
      pageWindow,
    })
  } catch (error) {
    console.error('[Library reader pages] Request failed', {
      message: error?.message || String(error),
    })
    logReaderAuditEvent('page_window_failed', {
      request,
      user: result?.user,
      bookId: result?.book?.id,
      sessionId,
      centerPage,
    })
    return jsonNoStore(
      { error: '전체 도서 페이지를 불러오지 못했습니다.' },
      { status: 500 }
    )
  }
}
