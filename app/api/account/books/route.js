import { NextResponse } from 'next/server'
import { getCurrentUserBooks } from '@/lib/library-access'

export async function GET() {
  try {
    const { user, books } = await getCurrentUserBooks()

    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    return NextResponse.json({ books })
  } catch {
    return NextResponse.json(
      { error: '도서 권한 정보를 불러오지 못했습니다.' },
      { status: 500 }
    )
  }
}
