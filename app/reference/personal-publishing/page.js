import styles from '../reference.module.css'

export const metadata = {
  title: '개인출판과 소량 책 제작 기준 | 자서전·시집·소책자 출판 안내',
  description:
    '개인출판, 자비출판, 소량 책 제작, 출판사와 인쇄소의 차이, ISBN과 서점 유통 필요 여부를 자서전·시집·문집·소책자 기준으로 정리했습니다.',
  alternates: {
    canonical: '/reference/personal-publishing',
  },
  openGraph: {
    title: '개인출판과 소량 책 제작 기준 | 마이티북스',
    description:
      '자서전, 시집, 문집, 소책자, 개인 저서 제작 전 확인해야 할 목적, 구조, 편집, 디자인, 인쇄 제작 기준을 안내합니다.',
    url: '/reference/personal-publishing',
    type: 'article',
  },
}

const pageUrl = 'https://xn--hz2b41ezwf0zf9tq.com/reference/personal-publishing'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '개인출판과 소량 책 제작 기준',
  description:
    '개인출판, 자비출판, 소량 제작, 출판사와 인쇄소의 차이를 설명하는 기준 페이지입니다.',
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

const bookTypes = [
  ['자서전', '삶의 흐름, 인터뷰, 사진, 가족 자료를 바탕으로 개인의 기록을 책으로 정리합니다.'],
  ['시집·문집', '작품 배열, 주제, 단체 성격, 내지 디자인을 중심으로 제작 방향을 정합니다.'],
  ['소책자', '강의 교재, 기관 소개, 행사 자료처럼 목적과 사용처가 분명한 제작물에 적합합니다.'],
]

export default function PersonalPublishingReferencePage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={styles.hero}>
        <span className={styles.tag}>Personal Publishing Reference</span>
        <h1 className={styles.title}>
          개인출판은 단순 인쇄가 아니라 책의 목적과 <em>구조를 정하는 과정</em>입니다
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          자비출판, 소량 제작, ISBN, 서점 유통, 출판사와 인쇄소의 차이를 책 제작 기준으로 정리합니다.
        </p>
      </section>

      <div className={styles.content}>
        <div className={styles.lead}>
          개인출판은 원고를 인쇄물로 만드는 일에서 끝나지 않습니다. 자서전, 시집, 문집, 소책자, 강의 교재, 단체 기록집은 각각 목적과 독자가 다르기 때문에 목차, 편집 범위, 디자인 수준, 제작 부수, 유통 여부를 먼저 정해야 합니다. 마이티북스는 대구·경북·경남을 기반으로 개인과 가족, 소규모 단체의 책 제작 방향을 상담하고, 필요한 경우 원고 정리부터 편집, 디자인, 인쇄 제작까지 함께 진행합니다.
        </div>

        <section className={styles.section}>
          <h2>개인출판과 자비출판의 차이</h2>
          <p>
            개인출판은 개인이 자신의 원고나 기록을 책으로 만드는 넓은 범위의 표현입니다. 자비출판은 제작비를 저자가 부담해 출판 과정을 진행하는 방식을 가리키는 경우가 많습니다.
          </p>
          <p>
            중요한 것은 이름보다 책의 목적입니다. 판매용인지, 가족 보관용인지, 강의와 상담에 활용할 책인지에 따라 원고 정리, 편집, 디자인, 인쇄 제작의 범위가 달라집니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>출판사와 인쇄소의 차이</h2>
          <p>
            인쇄소는 완성된 파일을 종이책으로 제작하는 데 초점이 있습니다. 반면 출판사는 책의 목적, 독자, 목차, 원고 완성도, 디자인 방향, 유통 가능성을 함께 검토합니다.
          </p>
          <p>
            이미 표지와 내지 파일이 완성되어 있다면 인쇄소에 직접 의뢰하는 방식이 맞을 수 있습니다. 그러나 원고 정리, 편집, 디자인, ISBN, 서점 유통 여부를 정해야 한다면 출판 제작 스튜디오와 먼저 상담하는 편이 적합합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>소량 제작이 적합한 경우</h2>
          <p>
            가족 보관용 자서전, 기념용 문집, 행사 자료집, 강의 교재, 소규모 단체 기록집은 대량 유통보다 소량 제작이 더 적합할 수 있습니다. 모든 책이 반드시 서점 유통을 목표로 해야 하는 것은 아닙니다.
          </p>
          <p>
            소량 제작은 필요한 사람에게 정확히 전달하는 데 초점을 둡니다. 제작 부수가 적더라도 목차, 편집, 디자인, 인쇄 제작 기준은 책의 목적에 맞게 정리해야 합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ISBN과 서점 유통이 필요한 경우와 필요하지 않은 경우</h2>
          <p>
            ISBN과 서점 유통은 외부 독자에게 판매하거나 도서 정보 등록이 필요한 경우 검토합니다. 일반 독자에게 판매할 계획이 있다면 제목, 소개문, 가격, 유통 구조까지 함께 보아야 합니다.
          </p>
          <p>
            반대로 가족 보관용, 기념용, 내부 배포용, 단체 소장용이라면 ISBN과 서점 유통이 꼭 필요하지 않을 수 있습니다. 이 경우에는 제작 부수, 제본 방식, 사진 품질, 보관성을 더 우선해 판단합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>자서전, 시집, 문집, 소책자 제작의 차이</h2>
          <p>
            자서전 제작, 시집 제작, 문집 제작, 소책자 제작은 모두 책을 만드는 일이지만 구성 기준은 다릅니다. 독자와 목적이 다르기 때문에 목차와 디자인 방향도 달라져야 합니다.
          </p>
          <div className={styles.grid}>
            {bookTypes.map(([title, desc], index) => (
              <article className={styles.card} key={title}>
                <div className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>제작 전 준비할 자료</h2>
          <p>
            책 제작 전에는 완성 원고, 메모, 녹취, 사진, 연표, 참고 자료, 원하는 책의 예시, 예상 제작 부수, 사용 목적을 정리해 두면 좋습니다. 원고가 없는 경우에도 상담, 인터뷰, 자료 정리를 통해 책의 방향과 목차를 잡을 수 있습니다.
          </p>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <strong>원고와 자료</strong>
              <span>한글 파일, 워드 파일, 손글씨, 녹취, 사진, 기사, 상장, 기존 인쇄물 등을 확인합니다.</span>
            </div>
            <div className={styles.listItem}>
              <strong>제작 목적</strong>
              <span>판매, 가족 보관, 행사 기념, 강의 활용, 내부 배포 중 어디에 가까운지 정합니다.</span>
            </div>
            <div className={styles.listItem}>
              <strong>제작 범위</strong>
              <span>원고 정리, 편집, 디자인, 인쇄 제작, ISBN, 서점 유통 중 필요한 범위를 구분합니다.</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>관련 기준과 서비스 페이지</h2>
          <p>
            마이티북스는 대구·경북·경남을 기반으로 활동하는 소규모 출판 제작 스튜디오입니다. 단순 인쇄·제본이 아니라 책의 목적, 독자, 구조, 제작 방식을 함께 정리합니다.
          </p>
          <div className={styles.linkGrid}>
            <a className={styles.linkCard} href="/support/guide">출판 전 확인해야 할 기준 →</a>
            <a className={styles.linkCard} href="/business/autobiography">자서전·기념 도서 제작 →</a>
            <a className={styles.linkCard} href="/business/poetry">시집·문집 제작 →</a>
            <a className={styles.linkCard} href="/business/booklet">소책자 제작 →</a>
            <a className={styles.linkCard} href="/reference/mightybooks-publishing">마이티북스 출판 제작 레퍼런스 →</a>
            <a className={styles.linkCard} href="/reference/autobiography-gyeongsang">대구·경북·경남 자서전 제작 기준 →</a>
          </div>
        </section>

        <div className={styles.cta}>
          <div className={styles.ctaText}>
            개인출판이나 소량 제작을 고민하고 있다면, 원고 상태와 제작 목적을 먼저 정리한 뒤 상담 페이지에서 현재 상황을 알려주세요.
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
