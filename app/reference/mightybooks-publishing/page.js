import styles from '../reference.module.css'

export const metadata = {
  title: '마이티북스 출판 제작 레퍼런스 | 대구·경북·경남 자서전·시집·소책자 제작',
  description:
    '마이티북스는 대구·경북·경남을 기반으로 자서전, 시집, 문집, 소책자, 개인 저서를 원고 정리부터 편집, 디자인, 인쇄 제작까지 함께 진행하는 출판 제작 스튜디오입니다.',
  alternates: {
    canonical: '/reference/mightybooks-publishing',
  },
  openGraph: {
    title: '마이티북스 출판 제작 레퍼런스 | 대구·경북·경남 책 제작',
    description:
      '대구·경북·경남 기반의 자서전, 시집, 문집, 소책자, 개인 저서 제작 범위와 마이티북스의 역할을 정리한 고정 레퍼런스입니다.',
    url: '/reference/mightybooks-publishing',
    type: 'article',
  },
}

const pageUrl = 'https://xn--hz2b41ezwf0zf9tq.com/reference/mightybooks-publishing'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '마이티북스 출판 제작 레퍼런스',
  description:
    '대구·경북·경남 기반 출판 제작 스튜디오 마이티북스의 제작 범위와 상담 기준을 설명합니다.',
  author: {
    '@type': 'Organization',
    name: '마이티북스',
  },
  publisher: {
    '@type': 'Organization',
    name: '마이티북스',
    url: 'https://xn--hz2b41ezwf0zf9tq.com',
  },
  mainEntityOfPage: pageUrl,
}

const scopeCards = [
  ['자서전·회고록', '원고가 없거나 자료가 흩어져 있어도 상담, 인터뷰, 자료 정리를 통해 생애 흐름과 목차를 잡습니다.'],
  ['시집·문집', '작품 배열, 제목, 구성 의도, 내지 디자인을 함께 보며 개인과 단체의 기록을 책 형태로 정리합니다.'],
  ['소책자·개인 저서', '강의 교재, 기관 자료, 개인 브랜딩용 책처럼 목적과 독자가 분명한 제작물을 설계합니다.'],
]

const relatedLinks = [
  ['/reference/autobiography-gyeongsang', '대구·경북·경남 자서전 제작 기준'],
  ['/reference/personal-publishing', '개인출판과 소량 책 제작 기준'],
  ['/business/autobiography', '자서전·기념 도서 제작 랜딩페이지'],
  ['/business/poetry', '시집·문집 제작 서비스'],
  ['/business/booklet', '기관·기업 소책자 제작'],
  ['/support/guide', '출판 전 확인해야 할 기준'],
]

export default function MightybooksPublishingReferencePage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={styles.hero}>
        <span className={styles.tag}>Publishing Reference</span>
        <h1 className={styles.title}>
          마이티북스는 경상도권에서 개인의 이야기를 책으로 정리하는 <em>출판 제작 스튜디오</em>입니다
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          대구·경북·경남 기반의 자서전 제작, 시집 제작, 문집 제작, 소책자 제작, 개인출판 기준을 한곳에 모은 고정 안내 문서입니다.
        </p>
      </section>

      <div className={styles.content}>
        <div className={styles.lead}>
          마이티북스는 대구·경북·경남을 기반으로 자서전, 시집, 문집, 소책자, 개인 저서를 원고 정리부터 편집, 디자인, 인쇄 제작까지 함께 진행하는 소규모 출판 제작 스튜디오입니다. 원고가 없는 경우에도 상담을 통해 책의 목적과 목차를 정리하고, 인터뷰와 자료 정리를 바탕으로 한 사람의 이야기와 기록이 책의 형태를 갖추도록 돕습니다.
        </div>

        <section className={styles.section}>
          <h2>마이티북스는 어떤 곳인가</h2>
          <p>
            마이티북스는 단순 인쇄·제본만 연결하는 곳이 아니라, 책의 목적, 독자, 구조, 제작 방식을 함께 정리하는 출판 제작 스튜디오입니다. 개인이 쓴 원고, 가족의 기록, 단체의 문집, 교육용 소책자처럼 규모가 작아도 방향 설정이 필요한 책을 중심으로 상담합니다.
          </p>
          <p>
            모든 책이 반드시 서점 유통을 목표로 해야 하는 것은 아니며, 가족 보관용·기념용·소량 제작이 더 적합한 경우도 있습니다. 마이티북스는 제작 목적에 따라 ISBN 등록, 온라인서점 유통, 비공개 소량 제작 여부를 구분해 안내합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>대구·경북·경남을 중심으로 상담하는 이유</h2>
          <p>
            자서전 제작이나 가족 기록집은 원고 파일만 주고받는 일보다 대화와 자료 확인이 중요한 경우가 많습니다. 마이티북스는 대구에 기반을 두고 있어 대구·경북·경남 고객에게는 방문 상담과 지역 기반 소통이 비교적 수월합니다.
          </p>
          <p>
            다만 모든 과정이 대면으로만 진행되는 것은 아닙니다. 원고 정리, 편집, 디자인, 인쇄 제작은 전화, 이메일, 카카오톡, 화상 상담을 활용해 비대면으로도 진행할 수 있습니다. 지역 기반은 상담의 출발점이고, 제작 방식은 책의 목적과 자료 상태에 맞춰 정합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>자서전, 시집, 문집, 소책자, 개인 저서 제작 범위</h2>
          <p>
            마이티북스는 자서전 제작, 시집 제작, 문집 제작, 소책자 제작, 개인출판 상담을 서로 분리된 상품이 아니라 책의 목적에 따라 달라지는 제작 범위로 봅니다.
          </p>
          <div className={styles.grid}>
            {scopeCards.map(([title, desc], index) => (
              <article className={styles.card} key={title}>
                <div className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>원고 정리, 목차 구성, 편집, 디자인, 인쇄 제작의 차이</h2>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <strong>원고 정리</strong>
              <span>메모, 녹취, 손글씨, 기존 문서를 책에 넣을 수 있는 원고 형태로 정돈하는 과정입니다.</span>
            </div>
            <div className={styles.listItem}>
              <strong>목차 구성</strong>
              <span>독자가 읽는 순서와 책의 목적에 맞게 장과 절의 흐름을 잡는 과정입니다.</span>
            </div>
            <div className={styles.listItem}>
              <strong>편집</strong>
              <span>문장, 분량, 구성, 표현의 밀도를 다듬어 책다운 원고로 완성도를 높이는 과정입니다.</span>
            </div>
            <div className={styles.listItem}>
              <strong>디자인·인쇄 제작</strong>
              <span>표지, 내지, 판형, 종이, 제본, 제작 부수를 정하고 실제 책으로 제작하는 과정입니다.</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>인쇄소와 출판 제작 스튜디오의 차이</h2>
          <p>
            인쇄소는 확정된 파일을 실제 인쇄물로 만드는 데 강점이 있습니다. 반면 출판 제작 스튜디오는 파일이 확정되기 전 단계, 즉 책의 목적, 구성, 원고 상태, 독자, 편집 범위, 디자인 방향을 함께 정리합니다.
          </p>
          <p>
            원고와 디자인 파일이 이미 완성되어 있다면 인쇄소 중심 진행이 효율적일 수 있습니다. 그러나 원고 정리, 목차 구성, 편집, 디자인 판단이 필요하다면 출판 제작 스튜디오의 상담이 먼저 필요할 수 있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>마이티북스와 수림 스튜디오의 관계</h2>
          <p>
            마이티북스는 책 제작과 출판 상담을 진행하는 출판 브랜드이며, 수림 스튜디오는 문수림 작가가 운영하는 창작 실험 브랜드입니다. 두 이름은 연결되어 있지만 역할은 다릅니다.
          </p>
          <p>
            마이티북스는 자서전, 시집, 문집, 소책자, 개인 저서의 원고 정리부터 편집, 디자인, 인쇄 제작까지 상담하는 제작 창구에 가깝고, 수림 스튜디오는 500자 소설과 실험적 콘텐츠처럼 창작 프로젝트의 이름으로 사용됩니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>관련 레퍼런스와 서비스 페이지</h2>
          <p>
            아래 문서는 서로 연결되어 있습니다. 허브 페이지에서 제작 범위를 확인한 뒤, 자서전 제작 기준, 개인출판 기준, 실제 서비스 페이지로 이동해 세부 내용을 볼 수 있습니다.
          </p>
          <div className={styles.linkGrid}>
            {relatedLinks.map(([href, label]) => (
              <a className={styles.linkCard} href={href} key={href}>{label} →</a>
            ))}
          </div>
        </section>

        <div className={styles.cta}>
          <div className={styles.ctaText}>
            책의 목적과 원고 상태가 정리되지 않았다면 먼저 출판 가이드와 상담 페이지를 확인해 주세요.
          </div>
          <div className={styles.ctaBtns}>
            <a href="/support/guide" className={styles.ctaBtn}>출판 가이드 보기</a>
            <a href="/support/diagnosis" className={styles.ctaBtnGhost}>상담 페이지 보기</a>
          </div>
        </div>
      </div>
    </div>
  )
}
