import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublishedLibraryBookPage } from '@/lib/library-content'
import LibraryReaderButton from '../../components/LibraryReaderButton'
import LibrarySampleButton from '../../components/LibrarySampleButton'
import styles from '../../library.module.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { bookSlug } = await params
  const result = await getPublishedLibraryBookPage(bookSlug)
  if (!result) return {}
  const { book } = result

  return {
    title: `${book.displayTitle} | 마이티북스 온라인 서가`,
    description:
      book.shortDescription ||
      (Array.isArray(book.description) ? book.description[0] : book.description),
    alternates: { canonical: `/library/books/${book.slug}` },
  }
}

export default async function LibraryBookPage({ params }) {
  const { bookSlug } = await params
  const result = await getPublishedLibraryBookPage(bookSlug)
  if (!result) notFound()
  const { book, author } = result
  const descriptionParagraphs = Array.isArray(book.description)
    ? book.description
    : book.description.split(/\n\s*\n/)
  const hasSamplePages = Array.isArray(book.samplePages) &&
    book.samplePages.length > 0 &&
    book.samplePages.every(page => (
      page && typeof page.src === 'string' && page.src.length > 0 &&
      Number.isFinite(page.width) && page.width > 0 &&
      Number.isFinite(page.height) && page.height > 0
    ))

  return (
    <main className={styles.page}>
      <section className={styles.bookHero}>
        <img className={styles.bookCover} src={book.coverImage} width={book.coverWidth} height={book.coverHeight} alt={`${book.displayTitle} 표지`} />
        <div className={styles.bookMeta}>
          <p className={styles.eyebrow}>Digital Exhibition Book</p>
          <h1>{book.title}</h1>
          <p className={styles.byline}>글 {book.authorName}</p>
          {(book.publisher || book.publication) && (
            <p className={styles.publication}>
              {[book.publisher, book.publication].filter(Boolean).join(' · ')}
            </p>
          )}
          <div className={styles.actions}>
            <LibrarySampleButton book={book} />
            {book.readerAvailable && (
              <LibraryReaderButton slug={book.slug} title={book.displayTitle} />
            )}
            <Link href={`/${author.slug}`} className={styles.secondaryButton}>저자 서가로 돌아가기</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.detailGrid}>
          <div>
            <h2>책 소개</h2>
            <div className={styles.bookDescription}>
              {descriptionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {book.readerAvailable ? (
              <div className={styles.pending}>
                <strong>로그인 회원 전체 도서 열람</strong>
                <p>저자 계정 또는 도서 이용권이 등록된 회원은 전체 도서를 열람할 수 있습니다.</p>
              </div>
            ) : (
              <div className={styles.pending}>
                <strong>플립북 전체 서비스 준비 중</strong>
                <p>{hasSamplePages
                  ? '현재는 고화질 샘플을 먼저 만나보실 수 있습니다. 전체본은 준비가 완료되는 대로 제공할 예정입니다.'
                  : '샘플과 전체 도서 열람 자산을 준비하고 있습니다. 준비가 완료되는 대로 순차적으로 제공할 예정입니다.'}</p>
              </div>
            )}
          </div>
          <div>
            <h2>특징</h2>
            <ol>{book.contents.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </div>
      </section>
      <section className={styles.cta}>
        <h2>서가의 주인이 되어 보세요</h2>
        <p>
          전자책으로 직접 독자를 만나 보세요. 전용 서가와 고품질 플립북 제작을 함께 상담해 드립니다.
          <br />
          자서전을 비롯한 비매품 기념 서적은 판매 서비스 도입 여부와 관계없이,
          제작 완료 후 저자와 가족을 위한 프라이빗 링크를 제공해 드립니다.
        </p>
        <Link href="/business/epub" className={styles.button}>제작 문의하기</Link>
      </section>
    </main>
  )
}
