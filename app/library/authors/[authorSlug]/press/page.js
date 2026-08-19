import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPublishedAuthorPressPage, getPublishedLibraryAuthorRedirect } from '@/lib/library-content'
import { createAuthorMetadata } from '@/lib/library-author-metadata'
import styles from '../../../library.module.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { authorSlug } = await params
  const result = await getPublishedAuthorPressPage(authorSlug)
  if (!result) return {}
  const title = `${result.author.displayName} 언론 보도 | 마이티북스`

  return createAuthorMetadata({
    author: result.author,
    canonicalPath: `/library/authors/${result.author.slug}/press`,
    title,
    description: `${result.author.displayName} 저자의 보도와 인터뷰를 모았습니다.`,
  })
}

export default async function AuthorPressPage({ params }) {
  const { authorSlug } = await params
  const result = await getPublishedAuthorPressPage(authorSlug)
  if (!result) {
    const currentSlug = await getPublishedLibraryAuthorRedirect(authorSlug)
    if (currentSlug) permanentRedirect(`/library/authors/${currentSlug}/press`)
    notFound()
  }
  return (
    <main className={styles.page}>
      <article className={styles.pressPage}>
        <header className={styles.pressHeader}><p className={styles.eyebrow}>Press</p><h1>{result.author.displayName} 언론 보도</h1><p>저자의 보도와 인터뷰를 모았습니다.</p></header>
        {result.items.length === 0 ? <p className={styles.pressEmpty}>등록된 언론 보도가 아직 없습니다.</p> : (
          <div className={styles.pressList}>{result.items.map((item) => (
            <section key={item.id} className={styles.pressItem}>
              <p className={styles.pressMeta}>{item.outlet_name} · <time dateTime={item.published_at}>{item.published_at}</time></p>
              <h2>{item.title}</h2>{item.summary && <p>{item.summary}</p>}
              <a className={styles.pressSource} href={item.source_url} target="_blank" rel="noopener noreferrer">원문 보기 ↗</a>
            </section>
          ))}</div>
        )}
        <Link className={styles.backLink} href={`/${result.author.slug}`}>← 저자 페이지로</Link>
      </article>
    </main>
  )
}
