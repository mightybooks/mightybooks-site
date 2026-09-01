import Link from 'next/link'
import styles from './productionServiceLanding.module.css'

const SITE_URL = 'https://mightybooks.kr'

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className={styles.sectionHeader}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export default function ProductionServiceLanding({ data }) {
  const pageUrl = `${SITE_URL}${data.path}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: data.serviceName,
        description: data.description,
        url: pageUrl,
        provider: { '@type': 'Organization', name: '마이티북스', url: SITE_URL },
        areaServed: '대한민국',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '출판서비스', item: pageUrl },
          { '@type': 'ListItem', position: 3, name: data.serviceName, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text },
        })),
      },
    ],
  }

  return (
    <main className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />

      <section className={`${styles.hero} ${styles[data.heroTone]}`}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="현재 위치">
            <Link href="/">홈</Link><span>›</span><span>출판서비스</span><span>›</span><span>{data.serviceName}</span>
          </nav>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
          <p className={styles.heroService}>{data.serviceName}</p>
          <h1>{data.heroTitle}</h1>
          <p className={styles.heroLead}>{data.heroLead}</p>
          <p className={styles.heroDescription}>{data.heroDescription}</p>
          <div className={styles.badges}>{data.badges.map(item => <span key={item}>{item}</span>)}</div>
          <div className={styles.heroActions}>
            <Link href="/support/diagnosis" className={styles.primaryButton}>현재 파일로 제작 상담하기</Link>
            <Link href="/tools/publishing-guide" className={styles.secondaryButton}>출판 길라잡이</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeader eyebrow="Who It Is For" title={data.fitTitle} description={data.fitDescription} />
        <div className={styles.fitGrid}>
          {data.fitCases.map(([title, text], index) => (
            <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <SectionHeader eyebrow="File Check" title="가지고 있는 파일에 따라 작업이 달라집니다" description={data.fileDescription} />
        <div className={styles.fileGrid}>
          {data.fileCases.map(([label, title, text, tasks]) => (
            <article key={title}>
              <span className={styles.cardLabel}>{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>{tasks.map(task => <li key={task}>{task}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className={styles.fileNotice}>{data.fileNotice}</p>
      </section>

      {data.checks && (
        <section className={styles.section}>
          <SectionHeader eyebrow="Print Readiness" title={data.checkTitle} description={data.checkDescription} />
          <div className={styles.checkGrid}>
            {data.checks.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>
      )}

      <section className={styles.processSection}>
        <SectionHeader eyebrow="Production Process" title="파일 확인부터 납품까지" description="현재 파일을 먼저 살핀 뒤 필요한 공정만 정하고, 최종 확인을 거쳐 책으로 제작합니다." />
        <ol className={styles.processGrid}>
          {data.process.map(([title, text], index) => (
            <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ol>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.costLayout}>
          <div>
            <span className={styles.eyebrow}>Estimate Factors</span>
            <h2>{data.costTitle}</h2>
            <p>{data.costDescription}</p>
            <Link href="/support/diagnosis" className={styles.textLink}>파일과 희망 사양을 알려 주고 견적 상담하기 →</Link>
          </div>
          <ul className={styles.costGrid}>{data.costFactors.map(([title, text]) => <li key={title}><strong>{title}</strong><span>{text}</span></li>)}</ul>
        </div>
      </section>

      <aside className={styles.related} aria-labelledby="related-service-title">
        <div><span className={styles.eyebrow}>Related Service</span><h2 id="related-service-title">{data.related.title}</h2><p>{data.related.text}</p></div>
        <Link href={data.related.href} className={styles.primaryButton}>{data.related.label} →</Link>
      </aside>

      <section className={styles.section}>
        <SectionHeader eyebrow="FAQ" title="자주 묻는 질문" description="파일과 제작 목적에 따라 달라지는 부분은 상담 전에 확인할 수 있도록 구분했습니다." />
        <div className={styles.faqList}>{data.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={styles.finalCta}>
        <span className={styles.eyebrow}>Start With Your File</span>
        <h2>{data.ctaTitle}</h2>
        <p>{data.ctaText}</p>
        <div className={styles.heroActions}>
          <Link href="/support/diagnosis" className={styles.primaryButton}>출판 제작 문의하기</Link>
          <Link href={data.guide.href} className={styles.secondaryButton}>{data.guide.label}</Link>
        </div>
      </section>
    </main>
  )
}
