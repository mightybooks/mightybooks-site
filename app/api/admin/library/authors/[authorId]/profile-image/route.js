import { randomUUID } from 'node:crypto'
import {
  adminAuthorizationError, errorResponse, isUuid, jsonResponse, logDatabaseError,
} from '@/lib/admin-library-api'
import { requireAdmin } from '@/lib/server-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
const BUCKET = 'author-profile-images'
const MAX_BYTES = 5 * 1024 * 1024

function detectImage(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { ext: 'jpg', mime: 'image/jpeg' }
  if (bytes.slice(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return { ext: 'png', mime: 'image/png' }
  if (bytes.slice(0, 4).toString() === 'RIFF' && bytes.slice(8, 12).toString() === 'WEBP') return { ext: 'webp', mime: 'image/webp' }
  return null
}

function storagePathFromUrl(value) {
  if (typeof value !== 'string') return null
  const marker = `/storage/v1/object/public/${BUCKET}/`
  try {
    const url = new URL(value)
    const index = url.pathname.indexOf(marker)
    return index < 0 ? null : decodeURIComponent(url.pathname.slice(index + marker.length))
  } catch { return null }
}

async function authorize(request, params) {
  const auth = await requireAdmin(request)
  const authError = adminAuthorizationError(auth)
  if (authError) return { error: authError }
  const { authorId } = await params
  if (!isUuid(authorId)) return { error: errorResponse('INVALID_AUTHOR_ID', '올바른 저자 ID가 필요합니다.', 400) }
  const { data, error } = await supabaseAdmin.from('authors').select('id,profile_image_path').eq('id', authorId).maybeSingle()
  if (error) {
    logDatabaseError('[Admin author profile image] Author lookup failed', error)
    return { error: errorResponse('AUTHOR_FETCH_FAILED', '저자 정보를 불러오지 못했습니다.', 500) }
  }
  if (!data) return { error: errorResponse('AUTHOR_NOT_FOUND', '저자를 찾을 수 없습니다.', 404) }
  return { author: data }
}

export async function POST(request, { params }) {
  const result = await authorize(request, params)
  if (result.error) return result.error
  let form
  try { form = await request.formData() } catch { return errorResponse('INVALID_IMAGE', '이미지 파일을 확인해 주세요.', 400) }
  const file = form.get('file')
  if (!(file instanceof File) || file.size < 1 || file.size > MAX_BYTES) {
    return errorResponse('INVALID_IMAGE', 'JPG, PNG, WebP 이미지를 5MB 이하로 선택해 주세요.', 400)
  }
  const buffer = Buffer.from(await file.arrayBuffer())
  const detected = detectImage(buffer)
  if (!detected || file.type !== detected.mime) {
    return errorResponse('INVALID_IMAGE', '파일 내용과 형식이 일치하는 JPG, PNG, WebP 이미지만 업로드할 수 있습니다.', 400)
  }
  const path = `${result.author.id}/${randomUUID()}.${detected.ext}`
  const bucket = supabaseAdmin.storage.from(BUCKET)
  const { error: uploadError } = await bucket.upload(path, buffer, { contentType: detected.mime, upsert: false })
  if (uploadError) {
    logDatabaseError('[Admin author profile image] Upload failed', uploadError)
    return errorResponse('PROFILE_IMAGE_UPLOAD_FAILED', '프로필 이미지를 업로드하지 못했습니다.', 500)
  }
  const publicUrl = bucket.getPublicUrl(path).data.publicUrl
  const { error: updateError } = await supabaseAdmin.from('authors').update({ profile_image_path: publicUrl }).eq('id', result.author.id)
  if (updateError) {
    await bucket.remove([path])
    logDatabaseError('[Admin author profile image] Database update failed', updateError)
    return errorResponse('PROFILE_IMAGE_SAVE_FAILED', '프로필 이미지를 저장하지 못했습니다.', 500)
  }
  const oldPath = storagePathFromUrl(result.author.profile_image_path)
  if (oldPath) await bucket.remove([oldPath])
  return jsonResponse({ profile_image_path: publicUrl })
}

export async function DELETE(request, { params }) {
  const result = await authorize(request, params)
  if (result.error) return result.error
  const { error } = await supabaseAdmin.from('authors').update({ profile_image_path: null }).eq('id', result.author.id)
  if (error) {
    logDatabaseError('[Admin author profile image] Delete update failed', error)
    return errorResponse('PROFILE_IMAGE_DELETE_FAILED', '프로필 이미지를 삭제하지 못했습니다.', 500)
  }
  const oldPath = storagePathFromUrl(result.author.profile_image_path)
  if (oldPath) await supabaseAdmin.storage.from(BUCKET).remove([oldPath])
  return jsonResponse({ profile_image_path: null })
}
