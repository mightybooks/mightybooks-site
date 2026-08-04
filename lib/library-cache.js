import 'server-only'
import { revalidateTag } from 'next/cache'

function expire(tag) {
  if (tag) revalidateTag(tag, { expire: 0 })
}

export function invalidateLibraryAuthorCache({ oldSlug, newSlug, bookSlugs = [] }) {
  expire('library-authors')
  for (const slug of new Set([oldSlug, newSlug].filter(Boolean))) {
    expire(`library-author:${slug}`)
    expire(`library-author-redirect:${slug}`)
    expire(`library-press:${slug}`)
  }
  for (const slug of new Set(bookSlugs.filter(Boolean))) {
    expire(`library-book:${slug}`)
  }
}

export function invalidateLibraryBookCache({ oldSlug, newSlug, authorSlugs = [] }) {
  expire('library-books')
  for (const slug of new Set([oldSlug, newSlug].filter(Boolean))) {
    expire(`library-book:${slug}`)
  }
  for (const slug of new Set(authorSlugs.filter(Boolean))) {
    expire(`library-author:${slug}`)
  }
}
