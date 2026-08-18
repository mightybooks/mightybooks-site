import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublishedLibraryAuthorPage } from '@/lib/library-content'
import { getAuthorResource } from '@/lib/library-author-resources'
import libraryStyles from '../../../../library.module.css'
import ResourceDownloads from './ResourceDownloads'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { authorSlug, resourceSlug } = await params
  const resource = getAuthorResource(authorSlug, resourceSlug)

  if (!resource) return {}

  const result = await getPublishedLibraryAuthorPage(authorSlug)
  if (!result) return {}

  const canonical = `/library/authors/${result.author.slug}/resources/${resource.slug}`

  return {
    title: `${resource.metadataTitle} | ${result.author.displayName} | 마이티북스`,
    description: resource.description,
    alternates: { canonical },
    openGraph: {
      title: `${resource.title} | ${result.author.displayName}`,
      description: resource.description,
      url: canonical,
      type: 'website',
    },
  }
}

export default async function AuthorResourcePage({ params }) {
  const { authorSlug, resourceSlug } = await params
  const resource = getAuthorResource(authorSlug, resourceSlug)

  if (!resource) notFound()

  const result = await getPublishedLibraryAuthorPage(authorSlug)
  if (!result) notFound()

  return (
    <main className={libraryStyles.page}>
      <article className={styles.resourcePage}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Class &amp; Practice</p>
          <h1>{resource.title}</h1>
          <p className={styles.subtitle}>{resource.subtitle}</p>
          <div className={styles.introduction}>
            {resource.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <section className={styles.section} aria-labelledby="practice-steps-title">
          <div className={styles.sectionHeading}>
            <p>Three Steps</p>
            <h2 id="practice-steps-title">실습의 세 단계</h2>
          </div>
          <div className={styles.stepGrid}>
            {resource.steps.map((step, index) => (
              <article className={styles.stepCard} key={step.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.flowBlock}>
            <h3>실제 실습 흐름</h3>
            <ol aria-label="셀프 명상상담 실습 순서">
              {resource.practiceFlow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.recommendSection}`} aria-labelledby="recommended-title">
          <div className={styles.sectionHeading}>
            <p>For You</p>
            <h2 id="recommended-title">이런 분에게 권합니다</h2>
          </div>
          <ul className={styles.recommendList}>
            {resource.recommendedFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={`${styles.section} ${styles.materialSection}`} aria-labelledby="materials-title">
          <div className={styles.sectionHeading}>
            <p>Class Materials</p>
            <h2 id="materials-title">수업 자료 안내</h2>
            <span>개강 전에는 자료가 공개되지 않으며, 버튼을 누르면 개강 안내를 확인할 수 있습니다.</span>
          </div>

          <ResourceDownloads materials={resource.materials} />

          <div className={styles.resourceNotes}>
            <p>{resource.background}</p>
            <p><strong>심화 참고도서</strong> {resource.furtherReading}</p>
            <p className={styles.caution}>{resource.caution}</p>
          </div>
        </section>

        <Link className={styles.backLink} href={`/${result.author.slug}`}>
          ← {result.author.displayName} 저자 페이지로
        </Link>
      </article>
    </main>
  )
}
