import Link from 'next/link'
import styles from '../../reference/reference.module.css'

const pagePath = '/support/local-publishing-gyeongsan'
const pageUrl = `https://mightybooks.kr${pagePath}`

export const metadata = {
  title: '경산 자서전·시집·개인출판 | 마이티북스',
  description:
    '경산에서 자서전, 시집, 개인출판을 준비하는 분을 위한 안내입니다. 대구에 기반을 둔 마이티북스의 예약제 직접 상담과 책 제작 서비스를 확인해 보세요.',
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: '경산 자서전·시집·개인출판 | 마이티북스',
    description:
      '경산에서 자서전, 시집, 개인출판을 준비할 때 확인할 제작 범위와 대구 마이티북스의 예약제 직접 상담을 안내합니다.',
    url: pagePath,
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: '경산 자서전·시집·개인출판 | 마이티북스',
      description: metadata.description,
      inLanguage: 'ko-KR',
      about: ['자서전 제작', '시집·문집·에세이 제작', '개인출판', '소량 책 제작'],
      provider: {
        '@type': 'Organization',
        '@id': 'https://mightybooks.kr/#organization',
        name: '마이티북스',
        url: 'https://mightybooks.kr',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://mightybooks.kr/' },
        { '@type': 'ListItem', position: 2, name: '상담과 안내', item: 'https://mightybooks.kr/support/guide' },
        { '@type': 'ListItem', position: 3, name: '경산 출판 안내', item: pageUrl },
      ],
    },
  ],
}

const productionScope = [
  ['원고 확인', '완성 원고, 메모, 사진과 자료의 상태를 먼저 살펴봅니다.'],
  ['편집·디자인', '책의 목적에 맞춰 교정, 본문 편집과 표지·내지 디자인 범위를 정합니다.'],
  ['발행 방식', '소장·배포·판매 목적에 따라 ISBN과 서점 유통 필요 여부를 구분합니다.'],
  ['인쇄·발행 관리', '판형과 종이, 제본, 제작 부수를 정하고 인쇄부터 최종 발행까지 관리합니다.'],
]

const process = [
  ['01', '상담', '만들 책의 목적과 원하는 일정을 확인합니다.'],
  ['02', '원고 확인', '자료 상태와 필요한 작업 범위를 살펴봅니다.'],
  ['03', '편집·디자인', '합의한 범위에 따라 원고와 디자인을 다듬습니다.'],
  ['04', '교정', '저자가 시안과 수정 사항을 확인합니다.'],
  ['05', '인쇄·출간', '최종 승인 후 정한 방식으로 책을 완성합니다.'],
]

export default function LocalPublishingGyeongsanPage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="현재 위치">
          <Link href="/">홈</Link> &gt; 상담과 안내 &gt; 경산 출판 안내
        </nav>
        <span className={styles.tag}>Gyeongsan Publishing Guide</span>
        <h1 className={styles.title}>
          경산에서 자서전·시집·<em>개인출판을 준비하고 계신가요?</em>
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          출판사 마이티북스는 대구 동구에 자리하고 있으며, 경산과도 가까운 생활권에 있습니다. 경산시청을 기준으로 자차로 약 15분 거리여서 경산 지역에서도 사전 예약 후 직접 방문해 상담받을 수 있습니다.
        </p>
        <div className={styles.linkGrid}>
          <Link className={styles.linkCard} href="/support/diagnosis">내 책에 맞는 상담 경로 확인하기 →</Link>
          <Link className={styles.linkCard} href="/about/location">대구 상담 장소와 예약 안내 보기 →</Link>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.lead}>
          경산 안에 있는 작은 업체만을 찾기보다는 더 다양한 경험과 노하우가 축적된 업체가 어떨까요? 필요한 제작 범위를 함께 정리하고 직접 확인할 수 있는 출판사를 선택하는 방법이 있습니다.
          경산은 대구와 인접해 있어 마이티북스 본사로 직접 방문 후 상담이 가능합니다. (단, 방문 상담은 반드시 사전 예약 후 진행됩니다.)
        </div>

        <section className={styles.section}>
          <h2>경북 지역 고객을 위한 두 가지 서비스 조건</h2>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <strong>첫 상담부터 출간까지, 프로 작가 문수림이 직접 담당합니다</strong>
              <span>
                처음 전화를 받는 사람과 실제 책을 만드는 담당자가 따로 나뉘지 않습니다. 프로 작가 문수림이 첫 상담부터 원고 확인, 편집·디자인 협의, 인쇄·발행 관리와 최종 출간까지 직접 담당합니다.
              </span>
            </div>
            <div className={styles.listItem}>
              <strong>경북 지역 출간 고객에게 온라인 서가를 1년간 제공합니다</strong>
              <span>
                종이책 출간 고객에게 완성된 책을 웹에서 열람할 수 있는 마이티북스 온라인 서가를 별도 제작비 없이 제공합니다. 별도의 EPUB·PDF 전자책을 제작하는 혜택이나 판매용 공개 전자책이 아니며, 출간 후 1년 동안 프라이빗 링크로 가족·지인 등 원하는 사람과 열람할 수 있습니다.
              </span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>경산에서 책을 만들 때 확인할 제작 범위</h2>
          <p>
            책 제작은 원고를 인쇄소에 전달하는 한 단계로 끝나지 않을 수 있습니다. 원고 상태와 책의 목적에 따라
            편집, 디자인, 발행과 인쇄 가운데 필요한 공정이 달라집니다. 마이티북스는 상담을 통해 필요한 범위를 나누어 정합니다.
          </p>
          <div className={styles.grid}>
            {productionScope.map(([title, description], index) => (
              <article className={styles.card} key={title}>
                <div className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>부모님 자서전과 개인 회고록</h2>
          <p>
            부모님의 생애를 남기는 자서전, 개인 회고록, 퇴임 기념 책과 가족 기록은 자료의 양과 원고 유무에 따라 출발점이 다릅니다.
            완성 원고가 없어도 메모, 사진, 연표와 인터뷰를 바탕으로 책의 구성과 필요한 자료 정리 범위를 정할 수 있습니다.
          </p>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/business/autobiography">자서전 제작 방식과 비용 자세히 보기 →</Link>
            <Link className={styles.linkCard} href="/support/autobiography-guide">자서전 준비 기본 가이드 보기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>개인 시집·문집·에세이 제작</h2>
          <p>
            경산의 개인 작가뿐 아니라 동인과 모임이 함께 만든 작품도 시집, 문집, 에세이 형태로 정리할 수 있습니다.
            작품 배열, 교정 범위, 표지와 내지 구성, 제작 부수와 유통 여부는 원고와 출간 목적을 확인한 뒤 결정합니다.
          </p>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/business/poetry">시집·문집·에세이 제작 서비스 자세히 보기 →</Link>
            <Link className={styles.linkCard} href="/support/poetry-book-guide">시집 원고 준비 가이드 보기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>원고를 책으로 만드는 개인출판과 소량 제작</h2>
          <p>
            직접 쓴 원고나 오랫동안 모은 기록이 있다면 판매용 책, 가족·지인 배포용 책, 개인 소장용 책 가운데 목적을 먼저 정하는 것이 좋습니다.
            목적에 따라 편집과 디자인의 범위, 제작 부수, ISBN과 유통 여부가 달라지므로 필요한 선택지를 먼저 비교해 보세요.
          </p>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/reference/personal-publishing">개인출판과 소량 책 제작 기준 자세히 보기 →</Link>
            <Link className={styles.linkCard} href="/business/self-publishing">전문서·실용서·개인 저서 제작 보기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>책 제작은 이런 순서로 진행합니다</h2>
          <p>
            지역 안내 페이지에서는 큰 흐름만 소개합니다. 실제 일정과 세부 공정은 원고 상태와 선택한 서비스에 따라 달라집니다.
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
            <Link className={styles.linkCard} href="/support/guide">출판 제작 전체 가이드 보기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>직접 상담을 원한다면</h2>
          <p>
            마이티북스 본사는 대구 동구 안심역 인근에 있습니다.
            원고와 사진 자료를 직접 보여주거나 가족과 함께 제작 방향을 상의하고 싶다면 먼저 상담 목적과 일정을 알려주세요.
          </p>
          <p>
            방문 상담은 상시 접수가 아닌 예약제로 진행하며, 일정이 확정된 뒤 이용할 수 있습니다.
            방문이 어렵다면 전화, 카카오톡, 이메일을 이용한 비대면 상담도 가능합니다.
          </p>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/support/diagnosis">출판 상담 경로 선택하기 →</Link>
            <Link className={styles.linkCard} href="/about/location">방문 위치와 예약 유의사항 보기 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>관련 서비스와 실제 제작 사례</h2>
          <p>
            만들고 싶은 책의 종류가 정해졌다면 해당 서비스에서 제작 범위를 확인하고, 출간 도서에서 실제 결과물을 살펴볼 수 있습니다.
          </p>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/business/autobiography">자서전·회고록 제작 →</Link>
            <Link className={styles.linkCard} href="/business/poetry">시집·문집·에세이 제작 →</Link>
            <Link className={styles.linkCard} href="/reference/personal-publishing">개인출판·소량 제작 기준 →</Link>
            <Link className={styles.linkCard} href="/portfolio/books">마이티북스 출간 도서 보기 →</Link>
          </div>
        </section>

        <div className={styles.cta}>
          <div className={styles.ctaText}>
            원고 유무와 만들고 싶은 책의 목적을 알려주시면 알맞은 상담 경로를 확인할 수 있습니다.
          </div>
          <div className={styles.ctaBtns}>
            <Link href="/support/diagnosis" className={styles.ctaBtn}>출판 제작 상담 시작하기</Link>
            <Link href="/support/faq" className={styles.ctaBtnGhost}>자주 묻는 질문 보기</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
