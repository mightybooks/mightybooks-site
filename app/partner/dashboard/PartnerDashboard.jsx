'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from '../partner.module.css'

export default function PartnerDashboard({ profile }) {
  const router = useRouter()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('[Partner dashboard] Sign out failed', {
        message: error.message,
      })
      return
    }

    router.replace('/partner/login')
    router.refresh()
  }

  return (
    <main className={styles.authWrap}>
      <div className={styles.statusCard}>
        <span className={styles.statusBadge}>승인 완료</span>

        <h1>{profile.business_name} 파트너님</h1>

        <p>
          파트너 승인이 완료되었습니다. 전용 링크와 QR,
          홍보자료 제공 일정은 별도로 안내해 드립니다.
        </p>

        <dl className={styles.profile}>
          <div>
            <dt>업체명</dt>
            <dd>{profile.business_name}</dd>
          </div>

          <div>
            <dt>승인 상태</dt>
            <dd>승인 완료</dd>
          </div>

          <div>
            <dt>파트너 코드</dt>
            <dd>{profile.partner_code || '발급 준비 중'}</dd>
          </div>

          <div>
            <dt>승인일</dt>
            <dd>
              {profile.approved_at
                ? new Date(profile.approved_at).toLocaleDateString(
                    'ko-KR'
                  )
                : '확인 중'}
            </dd>
          </div>
        </dl>

        <div className={styles.notice}>
          오프라인 카드와 미니 배너 등 홍보물은 업체 운영 환경과
          활용 방식을 확인한 뒤 별도로 협의하여 제작합니다.
          <br />
          <br />
          문의:{' '}
          <a href="mailto:novelstudylab@naver.com">
            novelstudylab@naver.com
          </a>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondary}
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </main>
  )
}