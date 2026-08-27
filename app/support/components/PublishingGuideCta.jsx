import Link from 'next/link'
import styles from './lastMileGuide.module.css'

export default function PublishingGuideCta() {
  return (
    <section className={styles.guideCta} aria-labelledby="publishing-guide-cta-title">
      <h2 id="publishing-guide-cta-title">현재 파일로 어떤 제작이 가능한지 확인해 보세요</h2>
      <p>PDF, HWP, Word 등 현재 가지고 있는 파일과 원하는 제작 형태를 선택하면 필요한 제작 방향을 확인할 수 있습니다.</p>
      <Link href="/tools/publishing-guide">출판 길라잡이 시작하기</Link>
    </section>
  )
}

