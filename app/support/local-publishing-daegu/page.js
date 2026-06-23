import styles from '../guide/guide.module.css'

export const metadata = {
  title: '대구에서 책을 만들 때 확인해야 할 것 | 마이티북스',
  description:
    '대구·경북권에서 방문상담 가능한 출판사를 찾는 고객을 위한 안내입니다. 자서전, 시집, 문집, 개인 출간 중심으로 설명합니다.',
  alternates: {
    canonical: '/support/local-publishing-daegu',
  },
  openGraph: {
    title: '대구에서 책을 만들 때 확인해야 할 것 | 마이티북스',
    description:
      '대구·경북권에서 방문상담 가능한 출판사를 찾는 고객을 위한 자서전, 시집, 문집, 개인 출간 안내입니다.',
    url: '/support/local-publishing-daegu',
    type: 'article',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '대구에서 책을 만들 때 확인해야 할 것',
  description:
    '대구·경북권에서 방문상담 가능한 출판사를 찾는 고객을 위한 자서전, 시집, 문집, 개인 출간 안내입니다.',
  author: {
    '@type': 'Organization',
    name: '마이티북스',
  },
  publisher: {
    '@type': 'Organization',
    name: '마이티북스',
  },
  mainEntityOfPage: 'https://xn--hz2b41ezwf0zf9tq.com/support/local-publishing-daegu',
}

export default function LocalPublishingDaeguPage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className={styles.hero}>
        <span className={styles.tag}>Local Publishing Guide</span>
        <h1 className={styles.title}>대구에서 책을 만들 때<br /><em>확인해야 할 것</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          대구·경북권에서 방문상담 가능한 출판사를 찾는 분을 위한 개인 출간 안내입니다.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.lead}>
          가까운 지역의 출판사를 찾는 이유는 대개 분명합니다. 원고와 자료를 직접 보여주고 싶거나,
          가족과 함께 상담하고 싶거나, 제작 과정에서 대면 확인이 필요한 경우입니다.
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>1. 만들고 싶은 책의 종류를 먼저 정합니다</h2>
          <p>
            자서전, 회고록, 부모님 자서전, 시집, 문집, 가족 문집, 추모 문집은 각각 필요한 상담 내용이 다릅니다.
            어떤 책을 만들고 싶은지 정해야 원고 정리, 편집, 디자인, 인쇄 범위를 판단할 수 있습니다.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>2. 방문상담 전 준비할 자료</h2>
          <p>
            원고 파일, 손글씨 원고, 사진, 목차 메모, 제작 부수, 원하는 일정, 서점 유통 여부를 정리하면
            상담이 구체적입니다. 원고가 없어도 자서전 제작은 인터뷰 기반으로 시작할 수 있습니다.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>3. 지역 출판 상담에서 확인할 기준</h2>
          <div className={styles.processGrid}>
            {[
              ['상담 방식', '예약제 방문상담인지, 사전 자료 확인이 필요한지 확인합니다.'],
              ['제작 범위', '원고 정리, 교정, 편집, 디자인, 인쇄 중 어디까지 필요한지 구분합니다.'],
              ['제작 목적', '가족 보관용, 기념 배포용, 서점 유통용 중 목적을 정합니다.'],
              ['비용 구조', '작업 범위와 부수에 따라 비용이 어떻게 달라지는지 확인합니다.'],
            ].map(([title, desc], index) => (
              <div key={title} className={styles.processCard}>
                <div className={styles.processStep}>{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.processTitle}>{title}</div>
                <div className={styles.processDesc}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaText}>관련 서비스와 상담 페이지</div>
          <div className={styles.ctaBtns}>
            <a href="/business/autobiography" className={styles.ctaBtn}>자서전 제작 →</a>
            <a href="/business/poetry" className={styles.ctaBtnGhost}>시집·문집 제작 →</a>
            <a href="/support/diagnosis" className={styles.ctaBtnGhost}>출판상담 →</a>
            <a href="/about/location" className={styles.ctaBtnGhost}>오시는 길 →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
