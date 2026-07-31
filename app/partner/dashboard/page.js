import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import PartnerDashboard from './PartnerDashboard'

export const metadata = {
  title: '파트너 기본 화면 | 마이티북스',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function PartnerDashboardPage() {
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
    .select('business_name,status,partner_code,approved_at')
    .eq('user_id', user.id)
    .maybeSingle()

  if (profileError) {
    console.error('[Partner dashboard page] Profile lookup failed', {
      code: profileError.code,
      message: profileError.message,
    })

    throw new Error('파트너 정보를 확인하지 못했습니다.')
  }

  if (!profile || profile.status !== 'approved') {
    redirect('/partner/pending')
  }

  return <PartnerDashboard profile={profile} />
}