import { resolveSocialImageUrl, toAbsoluteSiteUrl } from '@/lib/site-url'

export function createAuthorMetadata({
  author,
  canonicalPath,
  title,
  description,
  type = 'website',
  imagePath = author.profileImagePath,
  imageAlt = `${author.displayName} 프로필`,
}) {
  const canonical = toAbsoluteSiteUrl(canonicalPath)
  const image = resolveSocialImageUrl(imagePath)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: '마이티북스',
      locale: 'ko_KR',
      type,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
