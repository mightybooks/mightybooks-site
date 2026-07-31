import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import PartnerSignupForm from './PartnerSignupForm'
import styles from '../partner.module.css'

export const metadata = {
  title: '파트너십 신청 | 마이티북스',
  robots: {
    index: false,
    follow: false,
  },
}

function ApplicationUnavailable({ title, message }) {
  return (
    <main className={styles.authWrap}>
      <div className={styles.statusCard}>
        <span className={styles.statusBadge}>신청 확인</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className={styles.actions}>
          <Link href="/account" className={styles.primary}>
            내 계정
          </Link>
          <Link href="/partner" className={styles.secondary}>
            파트너 안내
          </Link>
        </div>
      </div>
    </main>
  )
}

export default async function PartnerSignupPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return <PartnerSignupForm mode="guest" />
  }

  const [profileResult, applicationResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('display_name,account_status')
      .eq('user_id', user.id)
      .maybeSingle(),
    supabase
      .from('partner_profiles')
      .select('status')
      .eq('user_id', user.id)
      .maybeSingle(),
  ])

  if (profileResult.error || applicationResult.error) {
    console.error('[Partner signup page] Account lookup failed', {
      profileError: profileResult.error
        ? {
            code: profileResult.error.code,
            message: profileResult.error.message,
          }
        : null,
      applicationError: applicationResult.error
        ? {
            code: applicationResult.error.code,
            message: applicationResult.error.message,
          }
        : null,
    })

    throw new Error('파트너 신청 상태를 확인하지 못했습니다.')
  }

  if (applicationResult.data) {
    redirect(
      applicationResult.data.status === 'approved'
        ? '/partner/dashboard'
        : '/partner/pending'
    )
  }

  if (!profileResult.data) {
    return (
      <ApplicationUnavailable
        title="계정 정보를 확인할 수 없습니다."
        message="현재 계정의 회원 프로필이 없어 파트너 신청을 진행할 수 없습니다. 고객센터로 문의해 주세요."
      />
    )
  }

  if (profileResult.data.account_status !== 'active') {
    return (
      <ApplicationUnavailable
        title="현재 계정으로 신청할 수 없습니다."
        message="계정 상태로 인해 파트너 신청을 진행할 수 없습니다. 내 계정에서 현재 상태를 확인해 주세요."
      />
    )
  }

  return (
    <PartnerSignupForm
      mode="member"
      accountEmail={user.email || ''}
      initialContactName={
        profileResult.data.display_name ||
        user.user_metadata?.display_name ||
        ''
      }
    />
  )
}
