import 'server-only'

import { createSupabaseServerClient } from '@/lib/supabase-server'

const NO_BOOK_ACCESS = {
  book: null,
  allowed: false,
  accessType: null,
}

function throwBookAccessError(context, error) {
  console.error(`[Library access] ${context}`, {
    code: error.code,
    message: error.message,
  })

  throw new Error('도서 이용 권한을 확인하지 못했습니다.')
}

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

  if (!books || books.length === 0) {
    return {
      user,
      books: [],
    }
  }

  const bookIds = books.map(({ id }) => id)
  const [authorLinksResult, entitlementsResult] = await Promise.all([
    supabase
      .from('book_authors')
      .select('book_id')
      .in('book_id', bookIds),
    supabase
      .from('book_entitlements')
      .select('book_id')
      .in('book_id', bookIds),
  ])

  if (authorLinksResult.error) {
    console.error('[Library access] Author access query failed', {
      code: authorLinksResult.error.code,
      message: authorLinksResult.error.message,
    })

    throw new Error('도서 권한 정보를 불러오지 못했습니다.')
  }

  if (entitlementsResult.error) {
    console.error('[Library access] Entitlement query failed', {
      code: entitlementsResult.error.code,
      message: entitlementsResult.error.message,
    })

    throw new Error('도서 권한 정보를 불러오지 못했습니다.')
  }

  const authorBookIds = new Set(
    authorLinksResult.data?.map(({ book_id: bookId }) => bookId) ?? []
  )
  const entitlementBookIds = new Set(
    entitlementsResult.data?.map(({ book_id: bookId }) => bookId) ?? []
  )

  const booksWithAccess = books.map((book) => {
    if (authorBookIds.has(book.id)) {
      return {
        ...book,
        accessType: 'author',
      }
    }

    if (entitlementBookIds.has(book.id)) {
      return {
        ...book,
        accessType: 'entitlement',
      }
    }

    throw new Error('도서 권한 정보를 불러오지 못했습니다.')
  })

  return {
    user,
    books: booksWithAccess,
  }
}

export async function getCurrentUserBookAccess(slug) {
  if (typeof slug !== 'string' || slug.trim() === '') {
    return {
      user: null,
      ...NO_BOOK_ACCESS,
    }
  }

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
        ...NO_BOOK_ACCESS,
      }
    }

    user = currentUser
  } catch {
    return {
      user: null,
      ...NO_BOOK_ACCESS,
    }
  }

  const { data: book, error: bookError } = await supabase
    .from('books')
    .select('id, slug, title, status')
    .eq('slug', slug)
    .maybeSingle()

  if (bookError) {
    throwBookAccessError('Book query failed', bookError)
  }

  if (!book) {
    return {
      user,
      ...NO_BOOK_ACCESS,
    }
  }

  const { data: authorLink, error: authorError } = await supabase
    .from('book_authors')
    .select('book_id')
    .eq('book_id', book.id)
    .limit(1)
    .maybeSingle()

  if (authorError) {
    throwBookAccessError('Author access query failed', authorError)
  }

  if (authorLink) {
    return {
      user,
      book,
      allowed: true,
      accessType: 'author',
    }
  }

  const { data: entitlement, error: entitlementError } = await supabase
    .from('book_entitlements')
    .select('id')
    .eq('book_id', book.id)
    .limit(1)
    .maybeSingle()

  if (entitlementError) {
    throwBookAccessError('Entitlement query failed', entitlementError)
  }

  if (entitlement) {
    return {
      user,
      book,
      allowed: true,
      accessType: 'entitlement',
    }
  }

  return {
    user,
    ...NO_BOOK_ACCESS,
  }
}
