import { notFound, permanentRedirect } from 'next/navigation'
import { getPublishedLibraryAuthorPage, getPublishedLibraryAuthorRedirect } from '@/lib/library-content'
import { getPublishedAuthorAdoptionFeature } from '@/lib/author-feature'
import {
  getAuthorRelatedLinkOrder,
  getAuthorSupplementalLinks,
} from '@/lib/library-author-resources'
import LibraryAuthorPage from '@/app/library/components/LibraryAuthorPage'
import { createAuthorMetadata } from '@/lib/library-author-metadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { authorSlug } = await params
  const result = await getPublishedLibraryAuthorPage(authorSlug)

  if (!result) return {}

  const { author } = result
  const description = author.shortBio || author.bio?.[0] || ''

  return createAuthorMetadata({
    author,
    canonicalPath: `/${author.slug}`,
    title: `${author.displayName} 서가 | 마이티북스`,
    description,
    type: 'profile',
  })
}

export default async function AuthorPage({ params }) {
  const { authorSlug } = await params
  const result = await getPublishedLibraryAuthorPage(authorSlug)
  if (!result) {
    const currentSlug = await getPublishedLibraryAuthorRedirect(authorSlug)
    if (currentSlug) permanentRedirect(`/${currentSlug}`)
    notFound()
  }

  const adoptionFeature = await getPublishedAuthorAdoptionFeature(result.author.slug)
  const supplementalLinks = getAuthorSupplementalLinks(
    result.author.slug,
    result.author.externalLinks
  )

  return (
    <LibraryAuthorPage
      author={result.author}
      books={result.books}
      adoptionEnabled={adoptionFeature?.enabled === true}
      supplementalLinks={supplementalLinks}
      relatedLinkOrder={getAuthorRelatedLinkOrder(result.author.slug)}
    />
  )
}
