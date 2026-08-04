import { permanentRedirect } from 'next/navigation'

export default async function LegacyAuthorPage({ params }) {
  const { authorSlug } = await params
  permanentRedirect(`/${authorSlug}`)
}
