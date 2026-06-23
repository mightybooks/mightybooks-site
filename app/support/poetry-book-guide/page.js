import styles from '../guide/guide.module.css'

export const metadata = {
  title: '시집 제작 전 확인해야 할 기준 | 마이티북스',
  description:
    '시집 원고 정리, 작품 배열, 교정, 판형, 소량 인쇄, ISBN/유통 여부를 정리한 안내 문서입니다.',
  alternates: {
    canonical: '/support/poetry-book-guide',
  },
  openGraph: {
    title: '시집 제작 전 확인해야 할 기준 | 마이티북스',
    description:
      '시집 원고 정리, 작품 배열, 교정, 판형, 소량 인쇄, ISBN/유통 여부를 정리했습니다.',
    url: '/support/poetry-book-guide',
    type: 'article',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '시집 제작 전 확인해야 할 기준',
  description:
    '시집 원고 정리, 작품 배열, 교정, 판형, 소량 인쇄, ISBN/유통 여부를 정리한 안내 문서입니다.',
  author: {
    '@type': 'Organization',
    name: '마이티북스',
  },
  publisher: {
    '@type': 'Organization',
    name: '마이티북스',
  },
  mainEntityOfPage: 'https://xn--hz2b41ezwf0zf9tq.com/support/poetry-book-guide',
}

export default function PoetryBookGuidePage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className={styles.hero}>
        <span className={styles.tag}>Reference Guide</span>
        <h1 className={styles.title}>시집 제작 전<br /><em>확인해야 할 기준</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          시집 원고 정리, 작품 배열, 교정, 판형, 소량 인쇄, ISBN/유통 여부를 차례로 확인합니다.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.lead}>
          시집 제작은 작품을 모아 인쇄하는 일에서 끝나지 않습니다. 작품 배열, 여백, 표지, 판형,
          교정 기준이 책의 완성도를 크게 바꿉니다.
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>1. 원고 정리와 작품 배열</h2>
          <p>
            시집 원고는 작품 수, 제목 표기, 발표 연도, 주제 묶음, 장 구분을 먼저 확인해야 합니다.
            작품 배열은 시간순, 주제순, 정서의 흐름에 따른 배열 등 여러 방식이 가능합니다.
          </p>
          <p>
            동호회 문집이나 가족 문집은 참여자별 원고 취합 기준도 필요합니다. 파일 형식, 이름 표기,
            교정 책임 범위를 미리 정하면 제작 과정이 안정됩니다.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>2. 교정과 판형</h2>
          <p>
            시는 띄어쓰기, 행갈이, 문장부호 하나가 작품의 리듬에 영향을 줄 수 있습니다. 따라서 교정은
            오탈자 수정뿐 아니라 원작자의 의도를 확인하는 방식으로 진행해야 합니다.
          </p>
          <p>
            판형은 휴대성, 여백, 제작비에 영향을 줍니다. 개인 소장용 시집과 서점 유통용 시집은 판형과
            종이 선택 기준이 달라질 수 있습니다.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>3. 소량 인쇄와 ISBN/유통 여부</h2>
          <p>
            가족과 지인에게 나누는 책은 소량 인쇄만으로 충분할 수 있습니다. 반면 서점 유통을 고려한다면
            ISBN 등록, 정가, 소개문, 표지 이미지, 유통 관리까지 검토해야 합니다.
          </p>
          <p>
            제작 목적을 먼저 정해야 불필요한 비용을 줄이고, 필요한 공정에는 충분한 시간을 배정할 수 있습니다.
          </p>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaText}>관련 서비스와 상담 페이지</div>
          <div className={styles.ctaBtns}>
            <a href="/business/poetry" className={styles.ctaBtn}>시집·문집 제작 →</a>
            <a href="/support/diagnosis" className={styles.ctaBtnGhost}>출판상담 →</a>
            <a href="/about/location" className={styles.ctaBtnGhost}>오시는 길 →</a>
            <a href="/support/faq" className={styles.ctaBtnGhost}>FAQ →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
