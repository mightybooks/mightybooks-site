'use client'
import { useEffect, useRef } from 'react'
import {
  BookOpenText,
  HeartHandshake,
  PenLine,
  Users,
} from 'lucide-react'
import ServiceContactCta from '../components/ServiceContactCta'
import styles from './poetry.module.css'

const services = [
  {
    icon: '01',
    title: '작품 배열과 원고 정리',
    desc: '흩어진 시와 글을 확인하고, 작품의 순서와 흐름이 자연스럽게 이어지도록 정리합니다.',
    highlight: 'Manuscript',
  },
  {
    icon: '02',
    title: '호흡을 살리는 편집',
    desc: '행갈이, 여백, 제목과 본문의 간격, 장 구성을 살펴 한 권의 책다운 리듬을 만듭니다.',
    highlight: 'Editing',
  },
  {
    icon: '03',
    title: '디자인·인쇄·유통 상담',
    desc: '내지 편집, 표지 구성, 소량 인쇄, ISBN과 서점 유통 여부를 제작 목적에 맞게 안내합니다.',
    highlight: 'Production',
  },
]

const targets = [
  { icon: PenLine, label: '개인 시집·작품집 제작' },
  { icon: Users, label: '동호회·문학회 문집' },
  { icon: HeartHandshake, label: '가족 문집·추모 문집' },
  { icon: BookOpenText, label: '수필집·창작 글 모음' },
]

const scope = [
  '원고 정리',
  '기본 윤문',
  '작품 배열',
  '내지 편집',
  '표지 구성',
  'ISBN/유통 상담',
  '1권부터 소량 제작',
]

const processSteps = [
  '문의',
  '원고 확인',
  '제작 방향 상담',
  '견적',
  '편집/디자인',
  '교정 확인',
  '인쇄/출간',
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
    { '@type': 'ListItem', position: 2, name: '출판서비스', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/poetry' },
    { '@type': 'ListItem', position: 3, name: '시집·문집 제작', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/poetry' },
  ],
}

export default function PoetryPage() {
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
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.tag}>Poetry Book / Anthology</span>
          <h1 className={styles.heroTitle}>시와 글을<br /><em>한 권의 책으로</em></h1>
          <div className={styles.heroLine} />
          <p className={styles.heroCopy}>
            원고를 단순히 페이지에 얹지 않고,<br />
            작품의 호흡과 여백, 배열을 고려해 한 권의 책으로 정리합니다.
          </p>
          <p className={styles.seoLine}>
            개인 시집, 문집, 작품집, 수필집을 목적에 맞게 편집·디자인·인쇄합니다.
          </p>
        </div>
        <div className={styles.heroFloat}>poetry</div>
      </section>

      <section className={styles.collectSection} ref={ref(0)}>
        <div className={styles.collectInner}>
          <div className={styles.collectLeft}>
            <span className={styles.tag}>Who We Help</span>
            <h2 className={styles.sectionTitle}>
              이런 분께<br />
              <em>필요합니다</em>
            </h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              시집과 문집은 단순한 원고 묶음이 아닙니다. 작품의 순서, 여백, 호흡,
              표지와 내지의 조화를 고려해 한 권의 책으로 정리합니다. 원고만 있다면
              한 권부터 제작할 수 있고, 필요에 따라 소량 제작 또는 서점 유통이 가능한 형태도 상담합니다.
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

      <section className={styles.quoteSection} ref={ref(9)}>
        <div className={styles.quoteBg} />
        <div className={styles.quoteOverlay} />
        <div className={styles.quoteInner}>
          <span className={styles.tag}>Scope</span>
          <h2 className={styles.quoteTitle}>
            제공 범위와 진행 절차를<br />
            <em>분명하게 안내합니다</em>
          </h2>
          <div className={styles.quoteLine} />
          <p className={styles.quoteDesc}>
            원고 정리, 기본 윤문, 작품 배열, 내지 편집, 표지 구성, ISBN/유통 상담,
            소량 인쇄 상담까지 필요한 범위를 제작 목적에 맞게 조정합니다.
          </p>
          <div className={styles.quoteStats}>
            {scope.slice(0, 3).map((item, i) => (
              <div key={item} className={styles.quoteStat}>
                <div className={styles.quoteStatNum}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.quoteStatLabel}>{item}</div>
              </div>
            ))}
          </div>
          <p className={styles.quoteDesc}>
            {scope.slice(3).join(' · ')}
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
            기본 제작비는 100만 원부터 시작합니다. 최종 견적은 원고 분량, 인쇄 부수,
            컬러 여부, 이미지 수, 제본 방식에 따라 달라질 수 있습니다.
          </p>
        </div>
      </section>

      <section className={styles.cta} ref={ref(11)}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            시집·문집 제작을<br />
            <em>문의해 주세요</em>
          </h2>
          <ServiceContactCta styles={styles} />
        </div>
      </section>
    </div>
  )
}
