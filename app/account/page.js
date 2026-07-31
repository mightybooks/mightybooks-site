import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AccountLogoutButton from './AccountLogoutButton'
import styles from './account.module.css'

export const metadata = {
  title: '내 계정 | 마이티북스',
  robots: {
    index: false,
    follow: false,
  },
}

const statusLabels = {
  active: '이용 중',
  suspended: '이용 정지',
  withdrawn: '탈퇴 처리',
}

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/account/login?next=/account')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('display_name,account_status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (profileError) {
    console.error('[Account page] Profile lookup failed', {
      code: profileError.code,
      message: profileError.message,
    })

    throw new Error('계정 정보를 확인하지 못했습니다.')
  }

  const displayName =
    profile?.display_name ||
    user.user_metadata?.display_name ||
    '마이티북스 회원'
  const accountStatus = profile?.account_status || 'unknown'

  return (
    <main className={styles.accountPage}>
      <div className={styles.accountBox}>
        <span className={styles.eyebrow}>My Account</span>
        <h1 className={styles.title}>내 계정</h1>

        <dl className={styles.details}>
          <div className={styles.detailRow}>
            <dt>표시 이름</dt>
            <dd>{displayName}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>로그인 이메일</dt>
            <dd>{user.email}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>계정 상태</dt>
            <dd className={styles.status}>
              {statusLabels[accountStatus] || '확인 필요'}
            </dd>
          </div>
        </dl>

        <div className={styles.accountActions}>
          <Link href="/" className={styles.secondaryAction}>
            홈으로
          </Link>
          <AccountLogoutButton />
        </div>
      </div>
    </main>
  )
}
