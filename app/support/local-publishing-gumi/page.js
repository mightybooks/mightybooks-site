import Link from 'next/link'
import styles from '../../reference/reference.module.css'

const pagePath = '/support/local-publishing-gumi'
const pageUrl = `https://mightybooks.kr${pagePath}`

export const metadata = {
  title: '구미 책 출판·자비출판 상담 | 마이티북스',
  description:
    '구미에서 자서전, 시집, 에세이, 전문서적, 기업 백서와 소량 책 제작을 준비한다면 마이티북스에 상담할 수 있습니다. 구미역에서 대경선과 도시철도 1호선을 이용해 안심역 인근 사무실로 방문할 수 있으며 온라인 진행도 가능합니다.',
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: '구미 책 출판·자비출판 상담 | 마이티북스',
    description:
      '구미의 개인 저자·기업·기관을 위한 출판 제작 상담과 구미역에서 대경선으로 방문하는 방법을 안내합니다.',
    url: pagePath,
    type: 'website',
  },
}

const bookTypes = [
  ['자서전·회고록', '개인의 생애 기록, 부모님 자서전과 퇴임 기념 기록을 원고와 사진의 상태에 맞춰 책으로 구성합니다.'],
  ['시집·에세이', '작품 배열과 교정, 표지·내지 디자인, 제작 부수와 유통 여부를 출간 목적에 따라 정합니다.'],
  ['전문서적·교재', '전문 원고와 강의 자료를 목차, 표·그림, 각주와 참고문헌까지 고려해 단행본이나 교재로 제작합니다.'],
  ['기업사·백서', '기업의 연혁, 사업 기록, 인터뷰와 사진 자료를 한 권의 사사·백서·기념 책자로 정리합니다.'],
  ['교육자료·소책자', '기관과 단체의 교육자료, 사례집, 안내서와 배포용 소책자를 목적과 독자에 맞게 제작합니다.'],
]

const process = [
  ['01', '문의', '책의 종류, 사용 목적, 원고 유무와 희망 사항을 알려주세요.'],
  ['02', '원고 및 자료 확인', '원고, 사진, 표와 참고 자료의 상태와 분량을 살펴봅니다.'],
  ['03', '제작 범위와 견적 협의', '필요한 공정, 판형, 부수와 발행·유통 여부를 구분해 제작 방식을 안내합니다.'],
  ['04', '편집·디자인', '협의한 범위에 따라 원고를 다듬고 본문과 표지를 설계합니다.'],
  ['05', '교정 확인', '전달한 시안을 저자 또는 담당자가 확인하고 수정 의견을 취합합니다.'],
  ['06', '인쇄·발행 또는 유통', '최종 승인된 파일로 필요한 부수를 제작하고 협의한 경우 ISBN 발행과 유통을 진행합니다.'],
]

const faqItems = [
  ['구미에 있는 출판사인가요?', '아닙니다. 마이티북스 사무실은 대구 동구 안심역 인근에 있습니다. 구미 지역의 개인 저자·기업·기관도 방문 또는 온라인으로 출판 제작을 상담할 수 있습니다.'],
  ['구미에서 대중교통으로 방문할 수 있나요?', '구미역에서 대경선을 이용해 동대구역으로 이동한 뒤 도시철도 1호선으로 환승하면 안심역까지 올 수 있습니다. 안심역 3번 출구에서 사무실까지는 도보 약 5분이며, 실제 총 소요시간은 열차 운행과 환승 대기시간에 따라 달라집니다.'],
  ['원고가 완성되지 않아도 상담할 수 있나요?', '가능합니다. 현재 작성한 원고, 목차, 메모와 사진 등 준비된 자료를 확인한 뒤 추가로 필요한 내용과 적합한 진행 방식을 안내합니다.'],
  ['소량 제작도 가능한가요?', '가능 여부와 적합한 인쇄 방식은 판형, 페이지, 컬러 여부, 제본과 필요한 부수를 함께 확인해 판단합니다. 소장·배포·판매 목적에 따라 ISBN과 유통 필요 여부도 달라집니다.'],
  ['자서전이나 기업 백서도 맡길 수 있나요?', '개인 자서전·회고록뿐 아니라 기업사, 백서, 기관 교육자료와 기념 책자도 상담합니다. 보유한 원고와 사진, 연혁, 인터뷰 자료에 따라 편집 범위를 정합니다.'],
  ['제작비는 어떻게 정해지나요?', '원고 정리 상태, 전체 분량, 판형, 제작 부수, 사진·표의 수, 편집과 디자인 작업량, 인쇄 사양과 발행·유통 범위에 따라 달라집니다. 자료와 목적을 확인한 뒤 필요한 작업을 구분해 협의합니다.'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: metadata.title,
      description: metadata.description,
      inLanguage: 'ko-KR',
      about: ['구미 책 출판', '구미 자비출판', '구미 소량 출판', '자서전·시집 제작', '기업 백서·교육자료 제작'],
      provider: {
        '@type': 'Organization',
        '@id': 'https://mightybooks.kr/#organization',
        name: '마이티북스',
        url: 'https://mightybooks.kr',
      },
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: '구미 출판 제작 상담',
      serviceType: '책 출판·자비출판·소량 책 제작 상담',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: '구미시',
      },
      provider: {
        '@id': 'https://mightybooks.kr/#organization',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://mightybooks.kr/' },
        { '@type': 'ListItem', position: 2, name: '상담과 안내', item: 'https://mightybooks.kr/support/guide' },
        { '@type': 'ListItem', position: 3, name: '구미 출판 안내', item: pageUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: {
          '@type': 'Answer',
          text,
        },
      })),
    },
  ],
}

export default function LocalPublishingGumiPage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="현재 위치">
          <Link href="/">홈</Link> &gt; 상담과 안내 &gt; 구미 출판 안내
        </nav>
        <span className={styles.tag}>Gumi Publishing Guide</span>
        <h1 className={styles.title}>
          구미에서 책을 만들고 싶다면, <em>직접 상담하실 수 있습니다</em>
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          구미의 개인 저자·기업·기관을 위한 출판 제작 상담입니다. 마이티북스는 대구 안심역 인근에 위치해 대경선 이용이 가능합니다. 원고 검토부터 편집·표지 디자인·인쇄·ISBN 발행과 유통까지 필요한 과정을 연결합니다.
        </p>
        <div className={styles.linkGrid}>
          <Link className={styles.linkCard} href="/support/diagnosis">내 책에 맞는 상담 경로 확인하기 →</Link>
          <Link className={styles.linkCard} href="/about/location">대구 상담 장소와 예약 안내 보기 →</Link>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.lead}>
          구미에서도 예약 후 편안한 대중교통으로 방문 상담을 할 수 있습니다. 방문이 어렵다면 전화·이메일과 온라인 자료 전달로 원고 확인, 편집·디자인 시안 검토, 교정 등 대부분의 제작 과정을 진행할 수 있습니다. 무조건 계약을 권하기보다 원고와 제작 목적을 먼저 확인하고 적합한 방식을 안내합니다.
        </div>

        <section className={styles.section}>
          <h2>구미에서 방문하는 방법</h2>
          <p className={styles.quote}>
            구미역에서 대경선을 이용해 동대구역으로 이동한 뒤, 도시철도 1호선으로 환승하면 안심역까지 올 수 있습니다. 안심역 3번 출구에서 마이티북스 사무실까지는 도보 약 5분입니다. 자차 이용시에는 동대구IC와 율암IC를 이용하시면 편하십니다.
          </p>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <strong>구미역 → 동대구역</strong>
              <span>대경선을 이용하며 빠르고 간편하게 이동하실 수 있습니다.</span>
            </div>
            <div className={styles.listItem}>
              <strong>동대구역 → 안심역</strong>
              <span>동대구역에서 하차하여 바로 도시철도 1호선으로 환승해 안심역까지 이동합니다.</span>
            </div>
            <div className={styles.listItem}>
              <strong>안심역 → 사무실</strong>
              <span>안심역 3번 출구에서 도보 약 5분입니다.</span>
            </div>
          </div>
          <p>
            실제 총 소요시간은 열차 운행과 환승·대기시간에 따라 달라질 수 있습니다. 방문 상담은 사전 예약 후 진행하므로 출발 전에 상담 일정과 위치를 확인해 주세요.
          </p>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/about/location">사무실 위치와 방문 유의사항 확인하기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>어떤 책을 제작할 수 있나요?</h2>
          <p>
            개인의 구미 책 출판과 구미 자비출판 상담부터 기업·기관의 공식 기록물까지 책의 독자와 사용 목적에 따라 제작 범위를 정합니다.
          </p>
          <div className={styles.grid}>
            {bookTypes.map(([title, description], index) => (
              <article className={styles.card} key={title}>
                <div className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/business/autobiography">자서전·회고록 제작 서비스 보기 →</Link>
            <Link className={styles.linkCard} href="/business/poetry">시집·문집·에세이 제작 서비스 보기 →</Link>
            <Link className={styles.linkCard} href="/reference/professional-book-publishing">전문서적·교재 제작 기준 확인하기 →</Link>
            <Link className={styles.linkCard} href="/business/booklet">기관·기업 소책자 제작 서비스 보기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>인쇄만 필요한 경우와 출판 제작이 필요한 경우</h2>
          <p>
            인쇄할 최종 파일이 이미 준비되어 있고 종이, 제본과 부수만 정하면 된다면 인쇄 중심의 상담이 알맞을 수 있습니다. 반면 원고의 구조를 정리하거나 문장을 교정하고, 표지와 내지를 디자인해 발행 가능한 책으로 만들어야 한다면 출판 제작 과정이 필요합니다.
          </p>
          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.cardNum}>PRINT</div>
              <h3>인쇄 중심</h3>
              <p>완성된 인쇄 파일을 바탕으로 판형, 종이, 제본, 컬러와 제작 부수를 결정합니다.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.cardNum}>PUBLISHING</div>
              <h3>출판 제작</h3>
              <p>원고 검토와 편집, 표지·내지 디자인, 교정, 인쇄, ISBN 발행과 유통 가운데 필요한 범위를 연결합니다.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.cardNum}>CHOICE</div>
              <h3>목적에 맞는 선택</h3>
              <p>판매용, 교육·배포용, 기념용 또는 개인 소장용인지 확인한 뒤 불필요한 공정 없이 방식을 정합니다.</p>
            </article>
          </div>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/reference/personal-publishing">개인출판과 소량 책 제작 기준 보기 →</Link>
            <Link className={styles.linkCard} href="/reference/institutional-booklet-production">기업·기관 책자 제작 기준 보기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>출판 제작은 이렇게 진행합니다</h2>
          <p>
            구미 소량 출판을 포함한 제작 방식과 예상 비용은 원고 상태, 분량, 판형, 부수, 사진과 디자인 작업량에 따라 달라집니다. 정해진 상품을 일괄 적용하지 않고 자료를 확인한 뒤 필요한 범위를 협의합니다.
          </p>
          <div className={styles.list}>
            {process.map(([number, title, description]) => (
              <div className={styles.listItem} key={number}>
                <strong>{number} · {title}</strong>
                <span>{description}</span>
              </div>
            ))}
          </div>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/support/guide">출판 제작 전체 과정 살펴보기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>방문하지 않아도 온라인으로 진행할 수 있습니다</h2>
          <p>
            원고와 사진은 이메일 등 협의한 온라인 방식으로 전달할 수 있고, 편집·디자인 시안과 교정 파일도 원격으로 확인할 수 있습니다. 구미에서 매 단계마다 방문할 필요는 없습니다.
          </p>
          <p>
            자료를 직접 보여주며 제작 방향을 논의할 필요가 있을 때만 일정을 예약한 뒤 안심역 인근 사무실을 방문하면 됩니다. 먼저 온라인으로 자료의 종류와 분량을 알려주면 상담 준비에 도움이 됩니다.
          </p>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/support/diagnosis">출판 상담 경로 선택하기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>구미 출판 상담 FAQ</h2>
          <div className={styles.faqList}>
            {faqItems.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className={styles.cta}>
          <div className={styles.ctaText}>
            원고 유무와 만들고 싶은 책의 목적을 알려주시면 방문 또는 온라인 중 알맞은 상담 경로를 확인할 수 있습니다.
          </div>
          <div className={styles.ctaBtns}>
            <Link href="/support/diagnosis" className={styles.ctaBtn}>출판 제작 상담 시작하기</Link>
            <Link href="/about/location" className={styles.ctaBtnGhost}>방문 위치와 예약 안내 보기</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
