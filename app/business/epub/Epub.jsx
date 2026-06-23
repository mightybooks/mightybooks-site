'use client'
import { useEffect, useRef } from 'react'
import ServiceContactCta from '../components/ServiceContactCta'
import styles from './epub.module.css'

const features = [
  {
    icon: '01',
    title: '책의 구조 설계',
    desc: '누구에게 어떤 이유로 읽힐 책인지 먼저 정리하고, 저자의 경험과 전문성을 목차와 장 구성으로 다듬습니다.',
    highlight: 'Structure',
  },
  {
    icon: '02',
    title: 'PDF/EPUB 제작',
    desc: '필요에 따라 PDF 또는 EPUB 형태를 고려하고, 표지와 내지 구성, 소개문까지 함께 정리할 수 있습니다.',
    highlight: 'Production',
  },
  {
    icon: '03',
    title: '장기 활용 자산',
    desc: '강의, 상담, 사업, 포트폴리오, 브랜딩, 콘텐츠 판매로 이어질 수 있는 출판 자산으로 정리합니다.',
    highlight: 'Asset',
  },
]

const targets = [
  { name: '강사·코치·상담사', icon: 'A' },
  { name: '1인 사업자·프리랜서', icon: 'B' },
  { name: '예비 저자·경력 전환자', icon: 'C' },
  { name: '개인 창작자·기관 자료 보유자', icon: 'D' },
]

export default function EpubPage() {
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

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.tag}>Digital Publishing Asset</span>
          <h1 className={styles.heroTitle}>전자책을 넘어<br /><em>저자의 자산으로</em></h1>
          <div className={styles.heroLine} />
          <p className={styles.heroCopy}>
            AI 시대에는 누구나 전자책을 만들 수 있습니다.<br />
            중요한 것은 오래 활용될 책의 구조를 잡는 일입니다.
          </p>
          <p className={styles.seoLine}>
            저자의 경험, 지식, 이야기, 전문성을 장기적으로 활용 가능한 출판 자산으로 정리합니다.
          </p>
        </div>
        <div className={styles.heroFloat}>ePub</div>
      </section>

      {/* 3 FEATURES */}
      <section className={styles.featuresSection} ref={ref(0)}>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div
              key={i}
              className={styles.featureCard}
              ref={ref(i + 1)}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className={styles.featureIconWrap}>
                <div className={styles.featureCircle}>
                <span className={styles.featureIcon}>{f.icon}</span>
                </div>
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <div className={styles.featureHighlight}>{f.highlight}</div>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORMS */}
      <section className={styles.platformSection} ref={ref(4)}>
        <div className={styles.platformInner}>
          <div className={styles.platformLeft}>
          <span className={styles.tag}>Who It Helps</span>
          <h2 className={styles.platformTitle}>
              팔리는 파일보다<br />
              <em>읽힐 이유를 먼저 정합니다</em>
            </h2>
            <div className={styles.platformLine} />
            <p className={styles.platformDesc}>
              전자책을 낸다고 모두 팔리는 것은 아니고, 모두 저자의 브랜드를 강화하는 것도 아닙니다.
              마이티북스는 파일 제작보다 먼저 그 책이 누구에게 어떤 이유로 읽혀야 하는지 정리합니다.
            </p>
          </div>
          <div className={styles.platformRight}>
            {targets.map((p, i) => (
              <div
                key={i}
                className={styles.platformItem}
                ref={ref(i + 5)}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className={styles.platformIcon}>{p.icon}</span>
                <span className={styles.platformName}>{p.name}</span>
                <div className={styles.platformBar} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROYALTY */}
      <section className={styles.royaltySection} ref={ref(9)}>
        <div className={styles.royaltyInner}>
          <div className={styles.royaltyCard}>
            <div className={styles.royaltyIcon}>PDF / EPUB</div>
            <p className={styles.royaltyDesc}>
              전자책은 강의, 상담, 사업, 포트폴리오, 브랜딩, 콘텐츠 판매의 기반이 될 수 있습니다.
              종이책 출간 전 테스트 상품으로도 활용할 수 있으며, 필요에 따라 목차, 소개문,
              판매용 설명문까지 함께 정리합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} ref={ref(10)}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            내 콘텐츠가<br />
            <em>전자책이 될 수 있는지 확인하세요</em>
          </h2>
          <ServiceContactCta styles={styles} />
        </div>
      </section>

    </div>
  )
}
