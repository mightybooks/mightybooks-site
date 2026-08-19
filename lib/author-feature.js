import 'server-only'
import { cache } from 'react'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const getPublishedAuthorAdoptionFeature = cache(async (authorSlug) => {
  const { data, error } = await supabaseAdmin
    .from('authors')
    .select('slug,display_name,profile_image_path,adoption_enabled')
    .eq('slug', authorSlug)
    .eq('status', 'published')
    .maybeSingle()

  if (error) {
    console.error('[author-feature] Failed to load adoption feature', {
      code: error?.code || 'UNKNOWN',
      message: error?.message || 'Unknown database error',
    })

    throw new Error('입양 홍보 기능 정보를 불러오지 못했습니다.')
  }

  if (!data) return null

  return {
    slug: data.slug,
    displayName: data.display_name,
    profileImagePath: data.profile_image_path || null,
    enabled: data.adoption_enabled === true,
  }
})
