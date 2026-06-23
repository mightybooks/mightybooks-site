import styles from './diagnosis.module.css'
import ServiceContactCta from '../../business/components/ServiceContactCta'

export const metadata = {
  title: '출판 상담 경로 선택 | 마이티북스',
  description:
    '자서전·기념 도서, 시집·문집, 기관ㆍ기업 소책자, 전자책, 기획출간 유료상담 중 현재 상황에 맞는 상담 경로를 안내합니다.',
  alternates: {
    canonical: '/support/diagnosis',
  },
  openGraph: {
    title: '출판 상담 경로 선택 | 마이티북스',
    description:
      '현재 원고와 제작 목적에 맞는 마이티북스 출판 상담 경로를 확인하세요.',
    url: '/support/diagnosis',
    type: 'website',
  },
}

const consultationPaths = [
  {
    num: '01',
    title: '자서전·기념 도서',
    desc: '부모님 선물, 칠순·팔순·퇴임 기념, 가족사 기록집, 회고록 제작을 상담합니다.',
    href: '/business/autobiography',
    link: '자서전·기념 도서 상담 →',
  },
  {
    num: '02',
    title: '시집·문집',
    desc: '개인 시집, 수필집, 가족 문집, 동호회 문집, 작품집 제작 방향을 확인합니다.',
    href: '/business/poetry',
    link: '시집·문집 상담 →',
  },
  {
    num: '03',
    title: '기관ㆍ기업 소책자',
    desc: '기관 자료집, 교육자료, 행사 소책자, 활동 기록집, 프로젝트 보고서를 책자 형태로 정리합니다.',
    href: '/business/booklet',
    link: '소책자 제작 상담 →',
  },
  {
    num: '04',
    title: '전자책',
    desc: 'PDF·EPUB 제작을 넘어 저자의 경험과 전문성을 오래 활용할 수 있는 출판 자산으로 정리합니다.',
    href: '/business/epub',
    link: '전자책 제작 상담 →',
  },
  {
    num: '05',
    title: '기획출간 유료상담',
    desc: '기획출간 가능성, 원고 상태, 출판 방식과 현실적인 선택지를 구체적으로 검토합니다. 상담 비용은 55,000원입니다.',
    href: '/support/paid-consultation',
    link: '기획출간 유료상담 보기 →',
  },
  {
    num: '06',
    title: '방향 미정 상담',
    desc: '어떤 제작 방식이 맞는지 아직 정하지 못했다면, 원고 상태와 목적을 먼저 알려주세요.',
    href: 'https://open.kakao.com/me/mightybooks',
    link: '오픈톡 메신저로 문의 →',
  },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
    { '@type': 'ListItem', position: 2, name: '출판상담', item: 'https://xn--hz2b41ezwf0zf9tq.com/support/diagnosis' },
    { '@type': 'ListItem', position: 3, name: '상담 경로 선택', item: 'https://xn--hz2b41ezwf0zf9tq.com/support/diagnosis' },
  ],
}

export default function DiagnosisPage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className={styles.hero}>
        <span className={styles.tag}>Publishing Consultation Guide</span>
        <h1 className={styles.title}>
          어떤 상담이 필요한지<br /><em>먼저 선택해 주세요</em>
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          만들고 싶은 책의 목적과 원고 상태에 따라 상담 경로가 달라집니다.
        </p>
        <p className={styles.seoLine}>
          자서전·기념 도서, 시집·문집, 기관ㆍ기업 소책자, 전자책 제작 문의와 기획출간 가능성 검토를 구분해 안내합니다.
        </p>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Start Here</span>
          <h2 className={styles.sectionTitle}>제작 목적이 분명하다면 해당 서비스로 이동하세요</h2>
          <p>
            자서전, 시집, 소책자, 전자책처럼 만들고 싶은 책의 형태가 이미 정해져 있다면
            해당 서비스 페이지에서 제작 방식과 상담 포인트를 먼저 확인하는 편이 빠릅니다.
          </p>
          <p>
            원고가 출판사의 기획출간 대상으로 검토될 수 있는지 판단받고 싶은 경우에는
            별도의 기획출간 유료상담으로 이동해 주세요.
          </p>
        </div>

        <div className={styles.notice}>
          <div className={styles.noticeTitle}>기본 문의는 무료, 일부 상담은 유료입니다</div>
          <p>
            제작 가능 여부, 상담 경로, 기본 진행 방식처럼 간단한 문의는 무료로 가능합니다.
            원고를 직접적으로 검토하거나 기획출간 가능성을 구체적으로 판단해야 할 때만 유료상담을 안내합니다.
          </p>
        </div>
      </section>

      <section className={styles.checks}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Choose Path</span>
          <h2 className={styles.sectionTitle}>상담 경로 선택</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.checkGrid}>
          {consultationPaths.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={styles.checkCard}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <div className={styles.checkNum}>{item.num}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className={styles.cardLink}>{item.link}</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            아직 잘 모르겠다면<br /><em>현재 상태만 알려주세요</em>
          </h2>
          <p className={styles.centerText2}>
            원고 유무, 만들고 싶은 책의 목적, 예상 부수, 상담받고 싶은 내용을 간단히 알려주시면
            가장 적합한 진행 방식을 안내드립니다.
          </p>
          <div className={styles.ctaBtns}>
            <ServiceContactCta styles={styles} />
            <a href="/support/faq" className={styles.ctaBtnGhost}>
              자주 묻는 질문 보기 →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
