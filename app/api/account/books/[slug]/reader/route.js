import { NextResponse } from 'next/server'
import { getCurrentUserBookAccess } from '@/lib/library-access'
import { createBookReaderManifest } from '@/lib/library-reader'
import {
  createReaderSession,
  logReaderAuditEvent,
} from '@/lib/library-reader-security'

const BOOK_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
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
  try {
    const { slug } = await params

    if (typeof slug !== 'string' || !BOOK_SLUG_PATTERN.test(slug)) {
      return jsonNoStore(
        { error: '올바른 도서 주소가 아닙니다.' },
        { status: 400 }
      )
    }

    const result = await getCurrentUserBookAccess(slug)

    if (!result.user) {
      logReaderAuditEvent('manifest_denied_unauthenticated', { request })
      return jsonNoStore(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    if (!result.allowed || !result.book) {
      logReaderAuditEvent('manifest_denied_no_access', {
        request,
        user: result.user,
      })
      return jsonNoStore(
        { error: '열람 가능한 전체 도서를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const reader = await createBookReaderManifest(result.book.id)

    if (!reader) {
      return jsonNoStore(
        { error: '열람 가능한 전체 도서를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const readerSession = createReaderSession(result.user)

    logReaderAuditEvent('manifest_issued', {
      request,
      user: result.user,
      bookId: result.book.id,
      sessionId: readerSession.id,
      accessType: result.accessType,
      pageCount: reader.pageCount,
    })

    return jsonNoStore({
      allowed: true,
      accessType: result.accessType,
      book: result.book,
      reader: {
        ...reader,
        sessionId: readerSession.id,
        watermark: readerSession.watermark,
      },
    })
  } catch (error) {
    console.error('[Library reader manifest] Request failed', {
      message: error?.message || String(error),
    })
    return jsonNoStore(
      { error: '전체 도서 열람 정보를 불러오지 못했습니다.' },
      { status: 500 }
    )
  }
}
