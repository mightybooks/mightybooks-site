export const SITE_URL = 'https://mightybooks.kr'
export const DEFAULT_OG_IMAGE_PATH = '/og.png'

export function toAbsoluteSiteUrl(value = '/') {
  return new URL(value, `${SITE_URL}/`).toString()
}

export function resolveSocialImageUrl(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return toAbsoluteSiteUrl(DEFAULT_OG_IMAGE_PATH)
  }

  try {
    const url = new URL(value, `${SITE_URL}/`)

    if (!['http:', 'https:'].includes(url.protocol)) {
      return toAbsoluteSiteUrl(DEFAULT_OG_IMAGE_PATH)
    }

    if (url.pathname.includes('/storage/v1/object/sign/')) {
      return toAbsoluteSiteUrl(DEFAULT_OG_IMAGE_PATH)
    }

    return url.toString()
  } catch {
    return toAbsoluteSiteUrl(DEFAULT_OG_IMAGE_PATH)
  }
}
