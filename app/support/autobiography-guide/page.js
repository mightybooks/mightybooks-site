import styles from '../guide/guide.module.css'

export const metadata = {
  title: '자서전 제작 전 확인해야 할 기준 | 마이티북스',
  description:
    '자서전 제작 방식, 인터뷰 대필, 비용에 영향을 주는 요소, 가족 보관용과 서점 유통용의 차이를 정리한 안내 문서입니다.',
  alternates: {
    canonical: '/support/autobiography-guide',
  },
  openGraph: {
    title: '자서전 제작 전 확인해야 할 기준 | 마이티북스',
    description:
      '자서전 제작 방식, 인터뷰 대필, 비용에 영향을 주는 요소, 가족 보관용과 서점 유통용의 차이를 정리했습니다.',
    url: '/support/autobiography-guide',
    type: 'article',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '자서전 제작 전 확인해야 할 기준',
  description:
    '자서전 제작 방식, 인터뷰 대필, 비용에 영향을 주는 요소, 가족 보관용과 서점 유통용의 차이를 정리한 안내 문서입니다.',
  author: {
    '@type': 'Organization',
    name: '마이티북스',
  },
  publisher: {
    '@type': 'Organization',
    name: '마이티북스',
  },
  mainEntityOfPage: 'https://xn--hz2b41ezwf0zf9tq.com/support/autobiography-guide',
}

export default function AutobiographyGuidePage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className={styles.hero}>
        <span className={styles.tag}>Reference Guide</span>
        <h1 className={styles.title}>자서전 제작 전<br /><em>확인해야 할 기준</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          원고가 있는 경우와 없는 경우, 인터뷰 기반 집필, 보관용과 유통용의 차이를 먼저 정리합니다.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.lead}>
          자서전 제작은 한 사람의 삶을 책의 구조로 옮기는 일입니다. 비용과 기간을 묻기 전에
          원고 유무, 인터뷰 필요 여부, 독자, 보관 또는 유통 목적을 먼저 확인해야 합니다.
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>1. 자서전 제작 방식은 원고 유무에 따라 달라집니다</h2>
          <p>
            이미 작성한 원고가 있다면 교정, 구성 정리, 편집, 디자인 중심으로 진행할 수 있습니다.
            원고가 없다면 인터뷰를 통해 생애 흐름을 정리하고, 구술 내용을 원고로 만드는 과정이 필요합니다.
          </p>
          <p>
            원고가 일부만 있는 경우에는 기존 글을 살릴 부분과 새로 인터뷰해야 할 부분을 나누어 판단합니다.
            이 구분이 분명해야 제작비와 일정도 현실적으로 정리됩니다.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>2. 인터뷰 대필은 책의 목차를 만드는 과정입니다</h2>
          <p>
            인터뷰는 단순한 질문과 답변이 아닙니다. 출생과 성장, 일, 가족, 중요한 선택, 남기고 싶은 말을
            어떤 순서로 배치할지 정하는 과정입니다.
          </p>
          <p>
            부모님 자서전이나 회고록 제작에서는 가족이 기억하는 장면, 사진, 기사, 상장, 편지 같은 자료도
            책의 구성에 영향을 줍니다.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>3. 비용에 영향을 주는 요소</h2>
          <div className={styles.processGrid}>
            {[
              ['분량', '인터뷰 시간, 원고 매수, 사진 자료 수량에 따라 편집 범위가 달라집니다.'],
              ['집필 방식', '완성 원고 편집인지, 인터뷰 기반 집필인지에 따라 비용 구조가 달라집니다.'],
              ['디자인', '표지, 내지, 사진 보정, 도판 배치 수준을 정해야 합니다.'],
              ['인쇄·유통', '가족 보관용 소량 인쇄인지, ISBN 등록과 서점 유통을 할지 구분합니다.'],
            ].map(([title, desc], index) => (
              <div key={title} className={styles.processCard}>
                <div className={styles.processStep}>{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.processTitle}>{title}</div>
                <div className={styles.processDesc}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>4. 가족 보관용과 서점 유통용은 기준이 다릅니다</h2>
          <p>
            가족 보관용 자서전은 읽는 사람이 분명합니다. 가족과 가까운 지인이 이해하기 쉬운 구성,
            사진과 기록의 보존, 적정 부수와 품질이 중요합니다.
          </p>
          <p>
            서점 유통용 자서전은 모르는 독자를 설득해야 하므로 제목, 소개문, 목차, 독자 관점의 편집,
            ISBN과 유통 구조까지 함께 검토해야 합니다.
          </p>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaText}>관련 서비스와 상담 페이지</div>
          <div className={styles.ctaBtns}>
            <a href="/business/autobiography" className={styles.ctaBtn}>자서전·기념 도서 제작 →</a>
            <a href="/support/diagnosis" className={styles.ctaBtnGhost}>출판상담 →</a>
            <a href="/about/location" className={styles.ctaBtnGhost}>오시는 길 →</a>
            <a href="/support/faq" className={styles.ctaBtnGhost}>FAQ →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
