import Link from 'next/link'
import styles from '../admin.module.css'

export default function AdminLibraryPage() {
  return <main className={styles.adminWrap}><div className={styles.adminBody}>
    <Link className={styles.backLink} href="/admin/dashboard">← 관리자 홈</Link>
    <h1 className={styles.adminTitle}>온라인 서가 관리</h1>
    <p className={styles.adminDescription}>DB에 저장된 공개 저자와 도서를 관리합니다.</p>
    <div className={styles.dashboardGrid}>
      <Link className={styles.adminCard} href="/admin/library/authors"><strong>저자 관리</strong><span>프로필, 채널, 외부 링크와 언론 보도를 관리합니다.</span></Link>
      <Link className={styles.adminCard} href="/admin/library/books"><strong>도서 관리</strong><span>도서 정보, 저자 연결, 소개와 특징을 관리합니다.</span></Link>
    </div>
  </div></main>
}
