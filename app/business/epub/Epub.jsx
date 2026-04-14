'use client'
import { useEffect, useRef } from 'react'
import styles from './epub.module.css'

const features = [
  {
    icon: '📱',
    title: 'ePub 파일 제작',
    desc: '단순 전자문서가 아닌 모든 플랫폼 DRM이 적용 가능하고, 디바이스에 최적화 되는 ePub파일로 제작해 드립니다.',
    highlight: '모든 플랫폼 DRM 적용',
  },
  {
    icon: '🏪',
    title: '유통',
    desc: '전자책 도서는 리디북스, 온라인 교보문고, 예스24, 알라딘을 통해 유통됩니다.',
    highlight: '4대 전자책 플랫폼 동시 입점',
  },
  {
    icon: '💰',
    title: '정확한 인세 정산',
    desc: '약속된 인세를 매월 10일에 정산하여 매월 25일에 지급합니다.',
    highlight: '매월 25일 정확한 지급',
  },
]

const platforms = [
  { name: '리디북스', icon: '📖' },
  { name: '교보문고', icon: '📚' },
  { name: '예스24', icon: '📗' },
  { name: '알라딘', icon: '📘' },
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
          <span className={styles.tag}>Business</span>
          <h1 className={styles.heroTitle}>ePub<br /><em>전자책 제작</em></h1>
          <div className={styles.heroLine} />
          <p className={styles.heroCopy}>
            종이책을 넘어, 디지털로 확장합니다.<br />
            모든 디바이스에서 완벽하게 읽히는 전자책.
          </p>
          <p className={styles.seoLine}>
            마이티북스는 ePub 전자책 제작과 주요 플랫폼 유통을 지원하는 서비스입니다.
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
            <span className={styles.tag}>Distribution</span>
            <h2 className={styles.platformTitle}>
              4대 플랫폼<br />
              <em>동시 입점</em>
            </h2>
            <div className={styles.platformLine} />
            <p className={styles.platformDesc}>
              한 번의 제작으로 국내 주요 전자책 플랫폼에<br />
              모두 유통됩니다. 최대한 많은 독자에게<br />
              닿을 수 있도록 도와드립니다.
            </p>
          </div>
          <div className={styles.platformRight}>
            {platforms.map((p, i) => (
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
            <div className={styles.royaltyIcon}>📅</div>
            <div className={styles.royaltyFlow}>
              <div className={styles.royaltyStep}>
                <div className={styles.royaltyStepNum}>매월 10일</div>
                <div className={styles.royaltyStepLabel}>인세 정산</div>
              </div>
              <div className={styles.royaltyArrow}>→</div>
              <div className={styles.royaltyStep}>
                <div className={styles.royaltyStepNum}>매월 25일</div>
                <div className={styles.royaltyStepLabel}>인세 지급</div>
              </div>
            </div>
            <p className={styles.royaltyDesc}>
              약속된 인세를 정확하게, 제때 지급합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} ref={ref(10)}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            전자책 제작,<br />
            <em>지금 바로 시작하세요</em>
          </h2>
          <div style={{display:'flex', gap:'16px', flexWrap:'wrap', justifyContent:'center'}}>
            <a href="mailto:novelstudylab@naver.com" className={styles.ctaBtn}>이메일 문의 →</a>
            <a  href="https://open.kakao.com/me/mightybooks"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtnGhost}
            >
              카카오 상담 →
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}