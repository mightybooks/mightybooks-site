import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

const pageUrl = 'https://mightybooks.kr/jungmyeongju/book-launch'
const imageUrl =
  'https://mightybooks.kr/library/authors/jungmyeongju/book-launch.webp'

export const metadata = {
  title: '정명주 작가 출간기념회 | 마이티북스',
  description:
    '정명주 작가 《내 마음이 오래 봐 달라고 말했다》 출간기념회 안내입니다.',

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    title: '정명주 작가 《내 마음이 오래 봐 달라고 말했다》 출간기념회',
    description: '2026년 8월 7일 오후 5시 · 위대한경영자',
    url: pageUrl,
    type: 'article',
    images: [
      {
        url: imageUrl,
        alt: '정명주 작가 출간기념회',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: '정명주 작가 《내 마음이 오래 봐 달라고 말했다》 출간기념회',
    description: '2026년 8월 7일 오후 5시 · 위대한경영자',
    images: [imageUrl],
  },
}

export default function BookLaunchPage() {
  return (
    <main className={styles.page}>
      <article className={styles.event}>
        <div className={styles.imageWrap}>
          <Image
            src="/library/authors/jungmyeongju/book-launch.webp"
            width={1600}
            height={900}
            alt="정명주 작가 출간기념회"
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.content}>
          <p className={styles.kicker}>BOOK LAUNCH</p>

          <h1>
            정명주 작가
            <br />
            출간기념회
          </h1>

          <p className={styles.bookTitle}>
            《내 마음이 오래 봐 달라고 말했다》
          </p>

          <div className={styles.info}>
            <div>
              <span>일시</span>
              <strong>2026년 8월 7일 오후 5시</strong>
            </div>

            <div>
              <span>장소</span>
              <strong>부산역 옆 혁정빌빙 802호 위대한경영자 (중앙대로 196번길 6-7)</strong>
            </div>
          </div>

          <div className={styles.intro}>
            <p>
              정명주 작가의 《내 마음이 오래 봐 달라고 말했다》 출간을
              기념하는 자리를 마련합니다.
            </p>
            <p>
              한 권의 책으로 이어진 이야기와 작가를 함께 만나는 자리입니다.
            </p>
          </div>

          <Link href="/jungmyeongju" className={styles.authorLink}>
            정명주 작가의 서가 보기 →
          </Link>
        </div>
      </article>
    </main>
  )
}