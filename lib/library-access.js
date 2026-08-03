import 'server-only'

import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function getCurrentUserBooks() {
  const supabase = await createSupabaseServerClient()

  let user

  try {
    const {
      data: { user: currentUser },
      error,
    } = await supabase.auth.getUser()

    if (error || !currentUser) {
      return {
        user: null,
        books: [],
      }
    }

    user = currentUser
  } catch {
    return {
      user: null,
      books: [],
    }
  }

  const { data: books, error } = await supabase
    .from('books')
    .select('id, slug, title, status')
    .order('slug', { ascending: true })

  if (error) {
    console.error('[Library access] Book query failed', {
      code: error.code,
      message: error.message,
    })

    throw new Error('도서 권한 정보를 불러오지 못했습니다.')
  }

  return {
    user,
    books: books ?? [],
  }
}
