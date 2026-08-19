import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from '../../../library.module.css'
import { getPublishedLibraryAuthorPage } from '@/lib/library-content'
import { createAuthorMetadata } from '@/lib/library-author-metadata'

export async function generateMetadata({ params }) {
  const { authorSlug } = await params

  if (authorSlug !== 'jungmyeongju') return {}
  const result = await getPublishedLibraryAuthorPage(authorSlug)
  if (!result) return {}

  return createAuthorMetadata({
    author: result.author,
    canonicalPath: `/library/authors/${result.author.slug}/book-launch`,
    title: '정명주 작가 출간기념회 | 마이티북스',
    description:
      '정명주 작가 《내 마음이 오래 봐 달라고 말했다》 출간기념회 안내입니다.',
    type: 'article',
  })
}

export default async function BookLaunchPage({ params }) {
  const { authorSlug } = await params

  if (authorSlug !== 'jungmyeongju') {
    notFound()
  }

  return (
    <main className={styles.page}>
      <section className={styles.pressPage}>

        <header className={styles.pressHeader}>
          <p className={styles.eyebrow}>Book Launch</p>

          <h1>정명주 작가 출간기념회</h1>

          <p>
            《내 마음이 오래 봐 달라고 말했다》 출간을 기념하는 자리입니다.
          </p>
        </header>

        <div className={styles.pressList}>
          <div className={styles.pressItem}>
            <Image
              src="/library/authors/jungmyeongju/book-launch.webp"
              width={1920}
              height={640}
              sizes="(max-width: 948px) calc(100vw - 48px), 900px"
              alt="정명주 작가 내 마음이 오래 봐 달라고 말했다 출간기념회"
              className={styles.bookLaunchImage}
              priority
            />
          </div>

          <div className={styles.pressItem}>
            <p className={styles.pressMeta}>2026. 8. 7. FRI · 17:00</p>

            <h2>《내 마음이 오래 봐 달라고 말했다》</h2>

            <p>
              <strong>일시</strong><br />
              2026년 8월 7일 오후 5시
            </p>

            <p>
              <strong>장소</strong><br />
              부산역 옆 혁정빌딩 802호 위대한경영자<br />
              중앙대로 196번길 6-7
            </p>
          </div>
        </div>

        <Link className={styles.backLink} href="/jungmyeongju">
          ← 정명주 작가의 서가로
        </Link>

      </section>
    </main>
  )
}
