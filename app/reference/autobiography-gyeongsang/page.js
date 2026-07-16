import styles from '../reference.module.css'

export const metadata = {
  title: '대구·경북·경남 자서전 제작 기준 | 부모님 자서전·회고록·기념 도서',
  description:
    '대구·경북·경남에서 부모님 자서전, 개인 회고록, 퇴임 기념 도서, 가족사 기록집 제작 전 확인해야 할 원고, 인터뷰, 사진, 제작 부수 기준을 정리했습니다.',
  alternates: {
    canonical: '/reference/autobiography-gyeongsang',
  },
  openGraph: {
    title: '대구·경북·경남 자서전 제작 기준 | 마이티북스',
    description:
      '경상도권 자서전 제작을 준비할 때 확인해야 할 목적, 원고 유무, 인터뷰, 가족 자료, 대면·비대면 상담 기준을 안내합니다.',
    url: '/reference/autobiography-gyeongsang',
    type: 'article',
  },
}

const pageUrl = 'https://xn--hz2b41ezwf0zf9tq.com/reference/autobiography-gyeongsang'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '대구·경북·경남 자서전 제작 기준',
  description:
    '부모님 자서전, 회고록, 퇴임 기념 도서, 가족사 기록집 제작 전 확인해야 할 기준을 설명합니다.',
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

const processCards = [
  ['상담과 방향 설정', '가족 보관용인지, 외부 배포용인지, 퇴임·칠순·팔순 기념용인지 먼저 구분합니다.'],
  ['인터뷰와 자료 정리', '녹취, 사진, 연표, 메모를 바탕으로 빠진 장면과 중요한 시기를 확인합니다.'],
  ['편집과 제작', '목차, 원고 정리, 표지·내지 디자인, 인쇄 제작 사양을 순서대로 정리합니다.'],
]

export default function AutobiographyGyeongsangReferencePage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={styles.hero}>
        <span className={styles.tag}>Autobiography Reference</span>
        <h1 className={styles.title}>
          대구·경북·경남에서 <em>자서전 제작</em>을 준비할 때 확인해야 할 기준
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          부모님 자서전, 개인 회고록, 퇴임 기념 도서, 가족사 기록집 제작을 시작하기 전 확인할 항목을 정리했습니다.
        </p>
      </section>

      <div className={styles.content}>
        <div className={styles.lead}>
          대구·경북·경남에서 부모님 자서전, 개인 회고록, 퇴임 기념 도서, 가족사 기록집을 제작하려면 단순 인쇄 비용보다 먼저 책의 목적, 원고 유무, 인터뷰 필요 여부, 사진 자료, 제작 부수, 가족 보관용인지 외부 배포용인지 등을 확인해야 합니다. 마이티북스는 경상도권 고객을 대상으로 자서전과 기념 도서의 방향 설정, 원고 정리, 인터뷰 기반 구성, 편집, 디자인, 인쇄 제작을 함께 상담합니다.
        </div>

        <section className={styles.section}>
          <h2>원고가 없어도 자서전을 만들 수 있는가</h2>
          <p>
            원고가 없는 경우에도 상담, 인터뷰, 자료 정리를 통해 책의 방향과 목차를 잡을 수 있습니다. 자서전 제작은 완성된 문서를 인쇄하는 일만이 아니라, 한 사람의 삶에서 어떤 장면을 남길지 고르는 과정입니다.
          </p>
          <p>
            다만 원고가 없을수록 인터뷰 시간, 가족 자료 확인, 사진 정리, 연표 구성 범위가 중요해집니다. 이 범위가 정리되어야 편집, 디자인, 인쇄 제작 일정과 비용도 현실적으로 잡을 수 있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>부모님 자서전과 개인 회고록의 차이</h2>
          <p>
            부모님 자서전은 가족이 독자인 경우가 많습니다. 자녀와 손주가 이해하기 쉬운 흐름, 가족에게 남기고 싶은 말, 사진과 가족 자료 보존이 중요합니다.
          </p>
          <p>
            개인 회고록은 저자 본인이 직접 독자에게 말하는 성격이 더 강합니다. 외부 배포나 서점 유통을 고려한다면 개인의 경험이 독자에게 어떤 의미가 있는지, 목차와 문장 밀도를 더 세밀하게 조정해야 합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>칠순·팔순·퇴임 기념 도서 제작 방식</h2>
          <p>
            칠순, 팔순, 퇴임 기념 도서는 제작 기한이 정해져 있는 경우가 많습니다. 행사일에 맞춰 책을 전달해야 한다면 원고 정리, 사진 선별, 디자인 확인, 인쇄 제작 일정을 역산해야 합니다.
          </p>
          <p>
            기념 도서는 반드시 서점 유통을 목표로 하지 않아도 됩니다. 가족 보관용·기념용·소량 제작이 더 적합한 경우에는 ISBN 없이도 목적에 맞는 책을 만들 수 있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>인터뷰 기반 자서전 제작 과정</h2>
          <p>
            인터뷰는 단순한 질문과 답변이 아니라 책의 목차를 만드는 과정입니다. 출생과 성장, 일, 가족, 중요한 선택, 남기고 싶은 말의 순서를 정리하며 이야기의 중심을 찾습니다.
          </p>
          <div className={styles.grid}>
            {processCards.map(([title, desc], index) => (
              <article className={styles.card} key={title}>
                <div className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>가족 자료, 사진, 연표, 녹취 활용 방식</h2>
          <p>
            가족 자료는 자서전의 신뢰도를 높이는 단서가 됩니다. 오래된 사진, 상장, 기사, 편지, 손글씨 메모, 가족이 기억하는 장면은 한 사람의 삶을 구체적으로 보여줍니다.
          </p>
          <p>
            녹취 자료가 있다면 그대로 옮기는 것만으로는 책이 되기 어렵습니다. 말의 순서를 정리하고 반복을 줄이며, 독자가 이해할 수 있도록 문장과 장면을 재구성해야 합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>대면 상담과 비대면 상담의 차이</h2>
          <p>
            대면 상담은 사진, 원고, 가족 자료를 함께 보며 방향을 잡기 좋습니다. 특히 대구·경북·경남 고객은 일정에 따라 방문 상담이나 지역 기반 상담을 검토할 수 있습니다.
          </p>
          <p>
            비대면 상담은 자료 전달과 일정 조율이 빠르다는 장점이 있습니다. 전화, 화상, 이메일, 카카오톡을 활용하면 지역 밖에 있거나 가족 구성원이 여러 곳에 나뉘어 있어도 제작 방향을 정리할 수 있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>대구·경북·경남 고객에게 맞는 제작 방식</h2>
          <p>
            경상도권 고객의 자서전 제작은 지역 방문 상담, 가족 모임 일정, 행사일, 자료 보관 방식과 연결되는 경우가 많습니다. 그래서 먼저 책의 목적과 독자, 제작 부수, 기한을 확인해야 합니다.
          </p>
          <p>
            마이티북스는 대구·경북·경남을 기반으로 활동하는 소규모 출판 제작 스튜디오입니다. 자서전, 시집, 문집, 소책자, 개인 저서를 원고 정리부터 편집, 디자인, 인쇄 제작까지 함께 진행합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>마이티북스의 실제 제작 경험</h2>
          <p>마이티북스는 인터뷰와 개인 기록을 바탕으로 회고록, 지역 기록서와 전기소설 형태의 자서전을 제작해 왔습니다. 6·25전쟁과 격동하는 시대를 지나 오늘까지 가족을 지켜 온 한 노인의 회고록 《사중구활(死中求活)의 기적》을 비롯해, 개인의 생애를 시대의 흐름과 함께 읽을 수 있도록 원고를 구성했습니다.</p>
          <p>평창읍에서 평생을 살아온 공직자의 기억을 지역의 근현대사와 함께 엮은 《이야기를 담은 평창의 옛 풍경》, 무소속 출마자의 인터뷰 원고를 전기소설 형식으로 재구성한 《동방의 별》도 실제 제작 사례입니다. 자료의 성격과 책의 목적에 따라 회고록, 지역 기록과 서사적 전기 형식을 각각 다르게 적용했습니다.</p>
        </section>

        <section className={styles.section}>
          <h2>관련 자료</h2>
          <div className={styles.linkGrid}>
            <a className={styles.linkCard} href="/business/autobiography">자서전·기념 도서 제작 상담 →</a>
            <a className={styles.linkCard} href="/reference/mightybooks-publishing">마이티북스 출판 제작 레퍼런스 →</a>
            <a className={styles.linkCard} href="/reference/personal-publishing">개인출판과 소량 책 제작 기준 →</a>
            <a className={styles.linkCard} href="/support/autobiography-guide">자서전 제작 기본 가이드 →</a>
          </div>
        </section>

        <div className={styles.cta}>
          <div className={styles.ctaText}>
            자서전 제작 범위가 아직 분명하지 않다면, 현재 원고 상태와 자료 종류를 기준으로 먼저 상담 방향을 정리할 수 있습니다.
          </div>
          <div className={styles.ctaBtns}>
            <a href="/business/autobiography" className={styles.ctaBtn}>자서전 제작 페이지 보기</a>
            <a href="/support/diagnosis" className={styles.ctaBtnGhost}>출판상담 페이지 보기</a>
          </div>
        </div>
      </div>
    </div>
  )
}
