import 'server-only'

import { supabaseAdmin } from '@/lib/supabase-admin'

const SIGNED_URL_EXPIRES_IN_SECONDS = 2 * 60 * 60
const SIGNED_URL_BATCH_SIZE = 100

function logReaderError(context, error) {
  console.error(`[Library reader] ${context}`, {
    code: error?.code || error?.statusCode || 'unknown',
    message: error?.message || String(error || 'Unknown error'),
  })
}

function createPagePaths({
  storagePrefix,
  pageCount,
  filenamePadding,
  fileExtension,
}) {
  return Array.from({ length: pageCount }, (_, index) => {
    const pageNumber = String(index + 1).padStart(filenamePadding, '0')
    return `${storagePrefix}/${pageNumber}.${fileExtension}`
  })
}

export async function createBookReaderManifest(bookId) {
  const { data: asset, error: assetError } = await supabaseAdmin
    .from('book_reader_assets')
    .select(
      'storage_bucket,storage_prefix,page_count,file_extension,filename_padding,page_width,page_height'
    )
    .eq('book_id', bookId)
    .eq('status', 'active')
    .maybeSingle()

  if (assetError) {
    logReaderError('Asset query failed', assetError)
    throw new Error('전체 도서 등록 정보를 불러오지 못했습니다.')
  }

  if (!asset) {
    return null
  }

  const pagePaths = createPagePaths({
    storagePrefix: asset.storage_prefix,
    pageCount: asset.page_count,
    filenamePadding: asset.filename_padding,
    fileExtension: asset.file_extension,
  })
  const expiresAt = new Date(
    Date.now() + SIGNED_URL_EXPIRES_IN_SECONDS * 1000
  ).toISOString()
  const pages = []
  const storage = supabaseAdmin.storage.from(asset.storage_bucket)

  for (let start = 0; start < pagePaths.length; start += SIGNED_URL_BATCH_SIZE) {
    const pathBatch = pagePaths.slice(start, start + SIGNED_URL_BATCH_SIZE)
    const { data, error } = await storage.createSignedUrls(
      pathBatch,
      SIGNED_URL_EXPIRES_IN_SECONDS
    )

    if (error) {
      logReaderError('Signed URL batch failed', error)
      throw new Error('전체 도서 페이지 주소를 생성하지 못했습니다.')
    }

    if (!data || data.length !== pathBatch.length) {
      logReaderError('Signed URL batch incomplete', {
        code: 'incomplete_signed_url_batch',
        message: 'The signed URL response did not include every requested page.',
      })
      throw new Error('전체 도서 페이지 주소를 생성하지 못했습니다.')
    }

    for (const signedPage of data) {
      if (signedPage.error || !signedPage.signedUrl) {
        logReaderError('Signed URL missing', {
          code: 'missing_signed_url',
          message: signedPage.error || 'A signed URL was not returned.',
        })
        throw new Error('전체 도서 페이지 주소를 생성하지 못했습니다.')
      }

      pages.push({
        src: signedPage.signedUrl,
        width: asset.page_width,
        height: asset.page_height,
      })
    }
  }

  return {
    pageCount: asset.page_count,
    width: asset.page_width,
    height: asset.page_height,
    expiresAt,
    pages,
  }
}
