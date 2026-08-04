import { notFound } from 'next/navigation'
import { getPublishedLibraryAuthorPage } from '@/lib/library-content'
import LibraryAuthorPage from '@/app/library/components/LibraryAuthorPage'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { authorSlug } = await params
  const result = await getPublishedLibraryAuthorPage(authorSlug)
  if (!result) return {}
  const { author } = result

  return {
    title: `${author.displayName} 디지털 서가 | 마이티북스`,
    description: author.shortBio || author.bio?.[0] || '',
    alternates: { canonical: `/${author.slug}` },
  }
}

export default async function AuthorPage({ params }) {
  const { authorSlug } = await params
  const result = await getPublishedLibraryAuthorPage(authorSlug)
  if (!result) notFound()

  return <LibraryAuthorPage author={result.author} books={result.books} />
}
