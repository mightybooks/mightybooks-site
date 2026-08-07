import { notFound, permanentRedirect } from 'next/navigation'
import { getPublishedLibraryAuthorPage, getPublishedLibraryAuthorRedirect } from '@/lib/library-content'
import { getPublishedAuthorAdoptionFeature } from '@/lib/author-feature'
import LibraryAuthorPage from '@/app/library/components/LibraryAuthorPage'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { authorSlug } = await params
  const result = await getPublishedLibraryAuthorPage(authorSlug)

  if (!result) return {}

  const { author } = result
  const description = author.shortBio || author.bio?.[0] || ''

  return {
    title: `${author.displayName} 서가 | 마이티북스`,
    description,

    alternates: {
      canonical: `/${author.slug}`,
    },

    openGraph: {
      title: `${author.displayName} 서가 | 마이티북스`,
      description,
      url: `/${author.slug}`,
      type: 'profile',
      images: author.profileImage
        ? [
            {
              url: author.profileImage,
              alt: `${author.displayName} 프로필`,
            },
          ]
        : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      title: `${author.displayName} 서가 | 마이티북스`,
      description,
      images: author.profileImage ? [author.profileImage] : undefined,
    },
  }
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

  return (
    <LibraryAuthorPage
      author={result.author}
      books={result.books}
      adoptionEnabled={adoptionFeature?.enabled === true}
    />
  )
}
