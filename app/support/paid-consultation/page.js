import styles from '../diagnosis/diagnosis.module.css'

export const metadata = {
  title: '기획출간 유료상담 | 원고 검토·출간 방향 상담 - 마이티북스',
  description:
    '기획출간 가능성을 확인받고 싶은 원고를 유료상담으로 접수합니다. 원고 상태, 출간 가능성, 제작 방향과 현실적인 선택지를 함께 검토합니다.',
  alternates: {
    canonical: '/support/paid-consultation',
  },
  openGraph: {
    title: '기획출간 유료상담 | 원고 검토·출간 방향 상담 - 마이티북스',
    description:
      '기획출간 가능성, 원고 상태, 제작 방향과 비용 구조를 현실적으로 점검합니다.',
    url: '/support/paid-consultation',
    type: 'website',
  },
}

const SMARTSTORE_URL = 'https://smartstore.naver.com/shop15th/products/13464496645'

const checks = [
  {
    title: '기획출간 가능성 검토',
    desc: '원고가 출판사가 비용을 선투입하는 기획출간 구조로 검토될 수 있는지 현실적으로 확인합니다.',
  },
  {
    title: '원고 상태와 보완 방향',
    desc: '완성도, 독자, 시장성, 목차와 원고의 보완 지점을 출판사 대표가 직접 살펴봅니다.',
  },
  {
    title: '출판 방식 구분',
    desc: '기획출간, 맞춤형 제작, 자비출간, 전자책 등 원고 목적에 맞는 선택지를 구분합니다.',
  },
  {
    title: '제작비 규모 점검',
    desc: '편집, 디자인, 인쇄, 유통 등 비용에 영향을 주는 항목과 예상 범위를 분리해 설명합니다.',
  },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
    { '@type': 'ListItem', position: 2, name: '출판상담', item: 'https://xn--hz2b41ezwf0zf9tq.com/support/diagnosis' },
    { '@type': 'ListItem', position: 3, name: '기획출간 유료상담', item: 'https://xn--hz2b41ezwf0zf9tq.com/support/paid-consultation' },
  ],
}

export default function PaidConsultationPage() {
  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className={styles.hero}>
        <span className={styles.tag}>Paid Publishing Consultation</span>
        <h1 className={styles.title}>
          기획출간 가능성을<br /><em>현실적으로 검토합니다</em>
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          무분별한 투고를 자동 검토하지 않고, 필요한 원고를 유료상담으로 접수해 출판 방향을 함께 정리합니다.
        </p>
        <p className={styles.seoLine}>
          상담 비용은 55,000원이며, 원고 상태와 출간 가능성, 제작 방향, 현실적인 선택지를 출판사 대표가 직접 검토합니다.
        </p>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Role</span>
          <h2 className={styles.sectionTitle}>기획출간 유료상담의 역할</h2>
          <p>
            기획출간 상담은 단순히 “출간 가능/불가능”을 빠르게 판정하는 절차가 아닙니다.
            원고가 어떤 독자에게 읽힐 수 있는지, 출판사가 비용을 선투입하는 방식으로 검토될 수 있는지,
            또는 맞춤형 제작이 더 적합한지 차분히 확인하는 과정입니다.
          </p>
          <p>
            기획출간 가능성이 낮은 경우에도 대화를 거기서 끝내지 않습니다. 자서전, 시집, 문집,
            기관 소책자, 전자책처럼 원고와 자료를 목적에 맞는 책으로 정리하는 더 현실적인 방향을 제안할 수 있습니다.
          </p>
        </div>

        <div className={styles.notice}>
          <div className={styles.noticeTitle}>기획출간과 맞춤형 제작을 구분해 안내합니다</div>
          <p>
            출판사가 비용을 선투입하는 기획출간과 저자가 제작비를 부담하는 맞춤형 제작은 구조가 다릅니다.
            상담에서는 두 방식의 차이, 제작비 규모, 출판 후 활용 가능성을 분명히 안내합니다.
          </p>
        </div>
      </section>

      <section className={styles.checks}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Check Point</span>
          <h2 className={styles.sectionTitle}>상담에서 확인하는 기준</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.checkGrid}>
          {checks.map((item, i) => (
            <div key={item.title} className={styles.checkCard}>
              <div className={styles.checkNum}>{String(i + 1).padStart(2, '0')}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Before Payment</span>
          <h2 className={styles.sectionTitle}>상담 전 준비하면 좋은 자료</h2>
          <p>
            완성 원고가 있다면 원고 일부와 목차, 전체 분량을 준비해 주세요. 원고가 완성되지 않았다면
            기획 메모, 예상 독자, 제작 목적, 원하는 출판 방식, 유통 여부를 정리해 주시면 상담이 정확해집니다.
          </p>
          <p>
            이 상담은 원고 완성도와 시장성, 출판 방식, 제작비 규모를 현실적으로 확인하는 절차입니다.
            원고 검토 후 필요한 경우 보완 방향이나 다른 제작 상품으로 이어지는 길도 함께 살펴봅니다.
          </p>
        </div>

        <div className={styles.notice}>
          <div className={styles.noticeTitle}>상담은 출간을 보장하는 절차가 아닙니다</div>
          <p>
            상담은 현재 상태에서 가능한 선택지를 분명히 하는 과정입니다. 무조건 출간 가능하다고 말하지 않고,
            가능한 방식과 보완 지점, 이후 진행 여부를 별도 협의로 정합니다.
          </p>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            원고와 출판 방향을 먼저 점검해 보세요
          </h2>
          <p className={styles.centerText2}>
            기획출간 가능성을 확인받고 싶은 원고는 유료상담으로 접수합니다. 상담 비용은 55,000원입니다.
          </p>
          <div className={styles.ctaBtns}>
            <a
              href={SMARTSTORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              기획출간 유료상담 신청하기 →
            </a>
            <a href="/support/diagnosis" className={styles.ctaBtnGhost}>
              상담 경로 다시 선택하기 →
            </a>
            <a href="/support/faq" className={styles.ctaBtnGhost}>
              자주 묻는 질문 보기 →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
