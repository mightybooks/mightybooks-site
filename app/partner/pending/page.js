import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import PartnerPending from './PartnerPending'

export const metadata = {
  title: '파트너 승인 상태 | 마이티북스',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function PartnerPendingPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/partner/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('partner_profiles')
    .select('business_name,email,status,rejected_reason')
    .eq('user_id', user.id)
    .maybeSingle()

  if (profileError) {
    console.error('[Partner pending page] Profile lookup failed', {
      code: profileError.code,
      message: profileError.message,
    })

    throw new Error('파트너 상태를 확인하지 못했습니다.')
  }

  if (!profile) {
    redirect('/partner/signup')
  }

  if (profile.status === 'approved') {
    redirect('/partner/dashboard')
  }

  return <PartnerPending profile={profile} />
}
