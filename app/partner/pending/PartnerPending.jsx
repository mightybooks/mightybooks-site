'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from '../partner.module.css'

const statusContent = {
  pending: {
    label: '승인 대기',
    title: '파트너 신청이 접수되었습니다.',
  },
  on_hold: {
    label: '검토 보류',
    title: '파트너 신청을 추가로 검토하고 있습니다.',
  },
  rejected: {
    label: '승인 거절',
    title: '파트너 신청이 승인되지 않았습니다.',
  },
  suspended: {
    label: '제휴 중지',
    title: '현재 파트너 제휴가 중지된 상태입니다.',
  },
}

export default function PartnerPending({ profile }) {
  const router = useRouter()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('[Partner pending] Sign out failed', {
        message: error.message,
      })
      return
    }

    router.replace('/partner/login')
    router.refresh()
  }

  const content = statusContent[profile.status] ?? {
    label: '상태 확인 필요',
    title: '현재 파트너 상태를 확인하고 있습니다.',
  }

  return (
    <main className={styles.authWrap}>
      <div className={styles.statusCard}>
        <span className={styles.statusBadge}>
          {content.label}
        </span>

        <h1>{content.title}</h1>

        {profile.status === 'pending' && (
          <>
            <p>
              사업자등록증 사본과 업체 홈페이지 또는 주로 활동하는
              SNS 주소를{' '}
              <a href="mailto:novelstudylab@naver.com">
                novelstudylab@naver.com
              </a>
              으로 보내주세요.
            </p>

            <div className={styles.notice}>
              메일 제목:
              <br />
              <strong>
                [마이티북스 제휴 신청] {profile.business_name} /{' '}
                {profile.email}
              </strong>
              <br />
              <br />
              제출 자료를 확인한 뒤 승인 결과를 안내해드립니다.
            </div>
          </>
        )}

        {profile.status === 'on_hold' && (
          <div className={styles.notice}>
            제출 정보나 제휴 조건을 추가로 확인하고 있습니다.
            필요한 사항이 있으면 등록된 연락처로 별도 안내해드립니다.
          </div>
        )}

        {profile.status === 'rejected' && (
          <>
            <p>
              신청 내용을 검토한 결과 현재 제휴 승인이 어렵습니다.
            </p>

            {profile.rejected_reason && (
              <div className={styles.error}>
                안내 사유: {profile.rejected_reason}
              </div>
            )}
          </>
        )}

        {profile.status === 'suspended' && (
          <div className={styles.error}>
            현재 제휴가 중지된 상태입니다. 자세한 내용은
            마이티북스로 문의해 주세요.
          </div>
        )}

        <div className={styles.actions}>
          <Link href="/partner" className={styles.primary}>
            파트너 안내 확인
          </Link>

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
