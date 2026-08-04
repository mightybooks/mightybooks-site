import Link from 'next/link'
import { getPublishedLibraryAuthors } from '@/lib/library-content'
import LibraryAuthorExplorer from './components/LibraryAuthorExplorer'
import styles from './library.module.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: '온라인 서가 | 마이티북스',
  description: '여러 저자의 디지털 서가와 고화질 전자책 샘플을 만나는 마이티북스 온라인 서가입니다.',
  alternates: { canonical: '/library' },
}

export default async function LibraryPage() {
  const authors = await getPublishedLibraryAuthors()

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Mightybooks Digital Library</p>
          <h1>마이티북스만의 플립북 서비스,<br />저자의 서가에서 바로 최신작을 열람합니다.</h1>
          <p>디지털 서가에서 저자와 책을 만나고, 고퀄리티 플립북으로 바로 감상하세요.</p>
        </div>
      </section>

      <section className={styles.authorSection} aria-labelledby="authors-heading">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Choose an author</p>
            <h2 id="authors-heading">저자 서가 둘러보기</h2>
          </div>
          <p>궁금한 저자를 선택하면 그 저자의 소개와 등록 도서가 있는 서가로 이동합니다.</p>
        </header>
        <LibraryAuthorExplorer authors={authors} />
      </section>

      <section className={styles.notice}>
        <p className={styles.sectionKicker}>Preview service</p>
        <h2>현재 유료 서비스 준비 단계입니다.<br />온라인 서가의 화면 구성과 고화질 읽기 경험을 검증하고 있습니다.</h2>
        <p>판매용이 아닌 개인 자서전을 비롯한 기념 서적 고객들에게는 지금도 실시간 서비스 중이며,<br />저자와 가족들에게는 프라이빗 링크를 제공해 드리고 있습니다.</p>
      </section>
      <section className={styles.cta}>
        <h2>당신의 책도 디지털 서가에</h2>
        <p>전자책 제작 또는 저자 전용 온라인 서가 개설을 상담해 보세요.</p>
        <Link href="/business/epub" className={styles.button}>전자책 제작 문의</Link>
      </section>
    </main>
  )
}
