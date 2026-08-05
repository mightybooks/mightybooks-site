import 'server-only'

import { supabaseAdmin } from '@/lib/supabase-admin'

export const READER_PAGE_WINDOW_RADIUS = 2
export const SIGNED_URL_EXPIRES_IN_SECONDS = 10 * 60

function logReaderError(context, error) {
  console.error(`[Library reader] ${context}`, {
    code: error?.code || error?.statusCode || 'unknown',
    message: error?.message || String(error || 'Unknown error'),
  })
}

function createPagePath({
  storagePrefix,
  pageIndex,
  filenamePadding,
  fileExtension,
}) {
  const pageNumber = String(pageIndex + 1).padStart(filenamePadding, '0')
  return `${storagePrefix}/${pageNumber}.${fileExtension}`
}

async function getBookReaderAsset(bookId) {
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

  const { data: bucket, error: bucketError } =
    await supabaseAdmin.storage.getBucket(asset.storage_bucket)

  if (bucketError) {
    logReaderError('Storage bucket query failed', bucketError)
    throw new Error('전체 도서 저장소 보안 설정을 확인하지 못했습니다.')
  }

  if (bucket?.public !== false) {
    logReaderError('Public storage bucket rejected', {
      code: 'public_reader_bucket',
      message: 'Reader assets must be stored in a private bucket.',
    })
    throw new Error('전체 도서 저장소가 비공개로 설정되어 있지 않습니다.')
  }

  return asset
}

export async function createBookReaderManifest(bookId) {
  const asset = await getBookReaderAsset(bookId)

  if (!asset) return null

  return {
    pageCount: asset.page_count,
    width: asset.page_width,
    height: asset.page_height,
    pageWindowRadius: READER_PAGE_WINDOW_RADIUS,
  }
}

export async function createBookReaderPageWindow(bookId, centerPage) {
  const asset = await getBookReaderAsset(bookId)

  if (!asset) return null

  if (
    !Number.isInteger(centerPage) ||
    centerPage < 0 ||
    centerPage >= asset.page_count
  ) {
    return { invalidPage: true, pageCount: asset.page_count }
  }

  const firstPage = Math.max(0, centerPage - READER_PAGE_WINDOW_RADIUS)
  const lastPage = Math.min(
    asset.page_count - 1,
    centerPage + READER_PAGE_WINDOW_RADIUS
  )
  const pageIndexes = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, offset) => firstPage + offset
  )
  const pagePaths = pageIndexes.map((pageIndex) => createPagePath({
    storagePrefix: asset.storage_prefix,
    pageIndex,
    filenamePadding: asset.filename_padding,
    fileExtension: asset.file_extension,
  }))

  const expiresAt = new Date(
    Date.now() + SIGNED_URL_EXPIRES_IN_SECONDS * 1000
  ).toISOString()
  const storage = supabaseAdmin.storage.from(asset.storage_bucket)

  const { data, error } = await storage.createSignedUrls(
    pagePaths,
    SIGNED_URL_EXPIRES_IN_SECONDS
  )

  if (error) {
    logReaderError('Signed URL window failed', error)
    throw new Error('전체 도서 페이지 주소를 생성하지 못했습니다.')
  }

  if (!data || data.length !== pagePaths.length) {
    logReaderError('Signed URL window incomplete', {
      code: 'incomplete_signed_url_window',
      message: 'The signed URL response did not include every requested page.',
    })
    throw new Error('전체 도서 페이지 주소를 생성하지 못했습니다.')
  }

  const pages = data.map((signedPage, index) => {
    if (signedPage.error || !signedPage.signedUrl) {
      logReaderError('Signed URL missing', {
        code: 'missing_signed_url',
        message: signedPage.error || 'A signed URL was not returned.',
      })
      throw new Error('전체 도서 페이지 주소를 생성하지 못했습니다.')
    }

    return {
      index: pageIndexes[index],
      src: signedPage.signedUrl,
      width: asset.page_width,
      height: asset.page_height,
    }
  })

  return {
    firstPage,
    lastPage,
    expiresAt,
    pages,
  }
}
