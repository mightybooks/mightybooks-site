import { NextResponse } from 'next/server'
import { getCurrentUserBookAccess } from '@/lib/library-access'

const BOOK_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
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

export async function GET(_request, { params }) {
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
      return jsonNoStore(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    if (!result.allowed || !result.book) {
      return jsonNoStore(
        { error: '열람 가능한 도서를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return jsonNoStore({
      allowed: true,
      accessType: result.accessType,
      book: result.book,
    })
  } catch {
    return jsonNoStore(
      { error: '도서 이용 권한을 확인하지 못했습니다.' },
      { status: 500 }
    )
  }
}
