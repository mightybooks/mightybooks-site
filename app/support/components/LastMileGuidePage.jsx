import Link from 'next/link'
import PublishingGuideCta from './PublishingGuideCta'
import baseStyles from '../../reference/reference.module.css'
import styles from './lastMileGuide.module.css'

const baseUrl = 'https://mightybooks.kr'

export default function LastMileGuidePage({
  path,
  title,
  description,
  breadcrumb,
  eyebrow,
  h1,
  answer,
  faqs,
  related = [],
  children,
}) {
  const pageUrl = `${baseUrl}${path}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: title,
        description,
        mainEntityOfPage: pageUrl,
        author: { '@type': 'Organization', name: '마이티북스' },
        publisher: { '@type': 'Organization', name: '마이티북스', url: baseUrl },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: '출판 안내', item: `${baseUrl}/support/guide` },
          { '@type': 'ListItem', position: 3, name: breadcrumb, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text },
        })),
      },
    ],
  }

  return (
    <div className={baseStyles.wrap}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <header className={baseStyles.hero}>
        <nav className={baseStyles.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link> &gt; <Link href="/support/guide">출판 안내</Link> &gt; {breadcrumb}</nav>
        <span className={baseStyles.tag}>{eyebrow}</span>
        <h1 className={`${baseStyles.title} ${styles.questionTitle}`}>{h1}</h1>
        <div className={baseStyles.line} />
        <p className={baseStyles.heroSub}>{answer}</p>
      </header>
      <main className={baseStyles.content}>
        {children}
        {related.length > 0 && (
          <section className={baseStyles.section}>
            <h2>함께 확인하면 좋은 안내</h2>
            <div className={baseStyles.linkGrid}>
              {related.map(([label, href]) => <Link className={baseStyles.linkCard} href={href} key={href}>{label} →</Link>)}
            </div>
          </section>
        )}
        <section className={baseStyles.section}>
          <h2>자주 묻는 질문</h2>
          <div className={baseStyles.faqList}>
            {faqs.map(([question, faqAnswer]) => <details key={question}><summary>{question}</summary><p>{faqAnswer}</p></details>)}
          </div>
        </section>
        <PublishingGuideCta />
      </main>
    </div>
  )
}

