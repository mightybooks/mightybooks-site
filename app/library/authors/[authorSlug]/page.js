import { notFound, permanentRedirect } from 'next/navigation'
import { getPublishedLibraryAuthorPage, getPublishedLibraryAuthorRedirect } from '@/lib/library-content'

export default async function LegacyAuthorPage({ params }) {
  const { authorSlug } = await params
  const result = await getPublishedLibraryAuthorPage(authorSlug)
  if (result) permanentRedirect(`/${result.author.slug}`)
  const currentSlug = await getPublishedLibraryAuthorRedirect(authorSlug)
  if (currentSlug) permanentRedirect(`/${currentSlug}`)
  notFound()
}
