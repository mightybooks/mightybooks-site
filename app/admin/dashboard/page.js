'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { verifyAdminSession } from '@/lib/admin-client'
import styles from '../admin.module.css'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const menus = [
  {
    title: '블로그 관리',
    description: '블로그 글 작성 및 발행 관리',
    href: '/admin/posts',
  },
  {
    title: '상담기록 관리',
    description: '자서전, 자비출간, 시집, 에세이 제작 문의와 상담 흐름을 기록하고 분석합니다.',
    href: '/admin/consultations',
  },
  {
    title: '파트너 신청 관리',
    description: '사업자 파트너 신청을 검토하고 승인 상태와 파트너 코드를 관리합니다.',
    href: '/admin/partners',
  },
]

export default function AdminDashboard() {
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    verifyAdminSession(supabase).then(async isAdmin => {
      if (!isAdmin) {
        await supabase.auth.signOut()
        router.push('/admin')
        return
      }

      setChecking(false)
    })
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  return (
    <div className={styles.adminWrap}>
      <div className={styles.adminHeader}>
        <div className={styles.adminLogo}><em>마이티</em>북스 ADMIN</div>
        <button onClick={logout} className={styles.btnGhost}>로그아웃</button>
      </div>
      <div className={styles.adminBody}>
        <h2 className={styles.adminTitle}>관리자 페이지</h2>
        <p className={styles.adminDescription}>관리할 항목을 선택하세요.</p>
        {checking ? <p>확인 중...</p> : (
          <div className={styles.dashboardGrid}>
            {menus.map(menu => (
              <Link key={menu.href} href={menu.href} className={styles.adminCard}>
                <strong>{menu.title}</strong>
                <span>{menu.description}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
