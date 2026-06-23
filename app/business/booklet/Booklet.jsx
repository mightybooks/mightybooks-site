'use client'
import { useEffect, useRef } from 'react'
import {
  Building2,
  ClipboardList,
  FileText,
  Presentation,
} from 'lucide-react'
import ServiceContactCta from '../components/ServiceContactCta'
import styles from '../poetry/poetry.module.css'

const services = [
  {
    icon: '01',
    title: '내용 구조 정리',
    desc: '기관 자료, 교육자료, 보고서의 흐름을 읽는 사람이 이해하기 쉬운 책자 구조로 정리합니다.',
    highlight: 'Structure',
  },
  {
    icon: '02',
    title: '표와 이미지 배치',
    desc: '제목 체계, 표, 이미지, 정보 흐름을 다듬어 자료의 목적이 분명하게 보이도록 편집합니다.',
    highlight: 'Editing',
  },
  {
    icon: '03',
    title: '판형·제본 방식 제안',
    desc: '배포용, 보관용, 교육용 목적에 맞춰 판형, 컬러 여부, 제본 방식, 납품 방식을 상담합니다.',
    highlight: 'Production',
  },
]

const targets = [
  { icon: FileText, label: '기관·행사 자료집' },
  { icon: Presentation, label: '교육 자료집·강의 교재' },
  { icon: ClipboardList, label: '프로젝트 보고서' },
  { icon: Building2, label: '단체 활동 기록집' },
]

const scope = [
  '기관 자료집',
  '기념 소책자',
  '복지관·도서관 결과물',
  '기업 내부 교육자료',
  '프로젝트 보고서',
  '포트폴리오 책자',
  '강의 교재',
]

const processSteps = [
  '문의',
  '자료 상태 확인',
  '구조 정리',
  '견적',
  '편집/디자인',
  '교정 확인',
  '인쇄/납품',
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
    { '@type': 'ListItem', position: 2, name: '출판서비스', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/booklet' },
    { '@type': 'ListItem', position: 3, name: '기관ㆍ기업 소책자', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/booklet' },
  ],
}

export default function BookletPage() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add(styles.visible)
      }),
      { threshold: 0.15 }
    )
    revealRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const ref = i => el => revealRefs.current[i] = el

  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className={styles.hero}>
        <div className={`${styles.heroBg} ${styles.bookletHeroBg}`} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.tag}>Institution / Company Booklet</span>
          <h1 className={styles.heroTitle}>기관ㆍ기업<br /><em>소책자 제작</em></h1>
          <div className={styles.heroLine} />
          <p className={styles.heroCopy}>
            자료를 단순히 인쇄하지 않고,<br />
            읽는 사람이 이해하기 쉬운 책자 구조로 정리합니다.
          </p>
          <p className={styles.seoLine}>
            기관, 단체, 기업, 도서관, 복지관, 교육기관, 프로젝트 운영자를 위한 편집·디자인·인쇄 서비스입니다.
          </p>
        </div>
        <div className={styles.heroFloat}>booklet</div>
      </section>

      <section className={styles.collectSection} ref={ref(0)}>
        <div className={styles.collectInner}>
          <div className={styles.collectLeft}>
            <span className={styles.tag}>What We Make</span>
            <h2 className={styles.sectionTitle}>
              목적에 맞는<br />
              <em>자료집으로 정리합니다</em>
            </h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              기관·기업 소책자는 단순한 인쇄물이 아닙니다. 읽는 사람이 내용을 이해하기 쉽도록
              자료의 순서, 제목 체계, 표와 이미지, 정보 흐름이 정리되어야 합니다.
            </p>
            <p className={styles.sectionDesc}>
              마이티북스는 다양한 기관 자료 제작 경험과 포트폴리오를 보유하고 있습니다.
              자료집, 교육자료, 행사 소책자, 활동 기록집 등 목적에 맞는 책자 제작 경험을 바탕으로 내용을 정리하고 편집합니다.
            </p>
          </div>
          <div className={styles.collectRight}>
            <div className={styles.targetLabel}>제작 대상</div>
            <div className={styles.targetGrid}>
              {targets.map((t, i) => {
                const Icon = t.icon

                return (
                  <div
                    key={t.label}
                    className={styles.targetCard}
                    ref={ref(i + 1)}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className={styles.targetIcon}>
                      <Icon size={30} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <div className={styles.targetName}>{t.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection} ref={ref(5)}>
        <div className={styles.servicesGrid}>
          {services.map((s, i) => (
            <div
              key={s.title}
              className={styles.serviceCard}
              ref={ref(i + 6)}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className={styles.serviceIconWrap}>
                <span className={styles.serviceIcon}>{s.icon}</span>
              </div>
              <div className={styles.serviceHighlight}>{s.highlight}</div>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.serviceDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.portfolioSection} ref={ref(9)}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Portfolio</span>
          <h2 className={styles.sectionTitle}>기관 자료 제작<br /><em>포트폴리오</em></h2>
          <div className={styles.sectionLine} style={{ margin: '16px auto 0' }} />
          <p className={styles.sectionDesc} style={{ maxWidth: '760px', margin: '24px auto 0', textAlign: 'center' }}>
            자료집, 교육자료, 행사 소책자 등 다양한 목적의 책자 제작이 가능합니다.
          </p>
        </div>
        <img
          src="/image/home/smallbook.png"
          alt="기관 자료 제작 포트폴리오"
          className={styles.portfolioImage}
        />
      </section>

      <section className={styles.quoteSection} ref={ref(10)}>
        <div className={styles.quoteBg} />
        <div className={styles.quoteOverlay} />
        <div className={styles.quoteInner}>
          <span className={styles.tag}>Scope</span>
          <h2 className={styles.quoteTitle}>
            배포용과 보관용에 맞춰<br />
            <em>제작 방식을 제안합니다</em>
          </h2>
          <div className={styles.quoteLine} />
          <p className={styles.quoteDesc}>
            {scope.join(' · ')} 등 목적에 맞는 책자를 제작할 수 있습니다.
            자료 상태에 따라 편집 난이도가 크게 달라질 수 있으므로, 최종 견적은 상담 후 확정됩니다.
          </p>
          <div className={styles.quoteStats}>
            {processSteps.slice(0, 4).map((item, i) => (
              <div key={item} className={styles.quoteStat}>
                <div className={styles.quoteStatNum}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.quoteStatLabel}>{item}</div>
              </div>
            ))}
          </div>
          <p className={styles.quoteDesc}>
            이후 절차: {processSteps.slice(4).join(' → ')}
          </p>
          <p className={styles.quoteDesc}>
            기관ㆍ기업 소책자는 자료 상태, 분량, 편집 범위, 디자인 난이도, 인쇄 부수와 납품 방식에 따라
            견적이 달라집니다. 상담을 통해 제작 목적과 예산을 확인한 뒤 진행 방향을 안내드립니다.
          </p>
        </div>
      </section>

      <section className={styles.cta} ref={ref(12)}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            기관 자료를<br />
            <em>책자 형태로 정리하고 싶다면</em>
          </h2>
          <ServiceContactCta styles={styles} />
        </div>
      </section>
    </div>
  )
}
