'use client'
import { useEffect, useRef } from 'react'
import styles from './poetry.module.css'

const services = [
  {
    icon: '✏️',
    title: '맞춤형 제작',
    desc: '원하는 제작 시기와 수량, 디자인을 제작 비용에 맞추어 작업 진행해 드립니다. 전문가들이 작업하는 만큼 신속, 정확한 결과물을 받아보실 수 있습니다.',
    highlight: '신속 · 정확 · 맞춤',
  },
  {
    icon: '🃏',
    title: '교구 제작',
    desc: '일반 단행본 서적이 아닌 이미지 카드형 교구, 소량의 인쇄물 등도 제작 지원이 가능합니다.',
    highlight: '카드형 교구 · 소량 인쇄물',
  },
  {
    icon: '📦',
    title: '소량 제작',
    desc: '급변하는 시대에 따라 학원의 형태도 소규모 그룹 또는 온라인 강의 수강을 위해 서적을 개인이 직접 구매하는 형태로 변화하고 있습니다. 마이티북스는 이런 변화에 맞추어 소량 5권부터 제작을 진행해 드리고 있습니다.',
    highlight: '최소 5권부터 제작 가능',
  },
]

const targets = [
  { icon: '👤', label: '개인' },
  { icon: '🏛️', label: '기관 · 단체' },
  { icon: '🤝', label: '동호회' },
  { icon: '🏫', label: '학교 · 관공서' },
]

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

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.tag}>Business</span>
          <h1 className={styles.heroTitle}>시집 · 문집<br /><em>학원교재</em></h1>
          <div className={styles.heroLine} />
          <p className={styles.heroCopy}>
            소량 5권부터 제작 가능.<br />
            주어지는 제작비, 그 이상의 결과를 보여드립니다.
          </p>
          <p className={styles.seoLine}>
            마이티북스는 시집, 문집, 학원교재 등 다양한 형태의 도서를
            소량 맞춤 제작까지 전문적으로 지원하는 출판사입니다.
          </p>
        </div>
        <div className={styles.heroFloat}>5권~</div>
      </section>

      {/* 3 SERVICES */}
      <section className={styles.servicesSection} ref={ref(0)}>
        <div className={styles.servicesGrid}>
          {services.map((s, i) => (
            <div
              key={i}
              className={styles.serviceCard}
              ref={ref(i + 1)}
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

      {/* 소장용 시집 */}
      <section className={styles.collectSection} ref={ref(4)}>
        <div className={styles.collectInner}>
          <div className={styles.collectLeft}>
            <span className={styles.tag}>Collection Book</span>
            <h2 className={styles.sectionTitle}>
              소장용 시집<br />
              <em>문집 제작</em>
            </h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              판매하거나 유통하지 않는 소장용 도서라도
              <strong> 미려한 디자인은 필수</strong>입니다.<br /><br />
              아마추어들의 편집과는 격이 다른 디자인과 퀄리티,
              그리고 합리적인 가격까지.<br /><br />
              마이티북스는 모두가 기쁜 마음으로 함께 공유하고
              소장하는 도서를 만들어 드립니다.
            </p>
            <p className={styles.seoLine}>
              판매 목적이 아닌 소장용 도서나 교육용 교재 제작에 적합한 서비스입니다.
            </p>
          </div>
          <div className={styles.collectRight}>
            <div className={styles.targetLabel}>제작 대상</div>
            <div className={styles.targetGrid}>
              {targets.map((t, i) => (
                <div
                  key={i}
                  className={styles.targetCard}
                  ref={ref(i + 5)}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={styles.targetIcon}>{t.icon}</div>
                  <div className={styles.targetName}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 맞춤 견적 */}
      <section className={styles.quoteSection} ref={ref(9)}>
        <div className={styles.quoteBg} />
        <div className={styles.quoteOverlay} />
        <div className={styles.quoteInner}>
          <span className={styles.tag}>Custom Quote</span>
          <h2 className={styles.quoteTitle}>
            주어지는 제작비,<br />
            <em>그 이상의 결과</em>를 보여드립니다
          </h2>
          <div className={styles.quoteLine} />
          <p className={styles.quoteDesc}>
            관공서나 학교 등은 예산이 충분히 허락되지 않아
            제작 자체가 어려운 경우들이 많습니다.<br /><br />
            마이티북스는 의뢰인들의 사정을 고려하여
            주어지는 제작비, 그 이상의 결과를 보여드리려고 노력하고 있습니다.
          </p>
          <div className={styles.quoteStats}>
            <div className={styles.quoteStat}>
              <div className={styles.quoteStatNum}>5권~</div>
              <div className={styles.quoteStatLabel}>최소 제작 수량</div>
            </div>
            <div className={styles.quoteStatDivider} />
            <div className={styles.quoteStat}>
              <div className={styles.quoteStatNum}>100%</div>
              <div className={styles.quoteStatLabel}>맞춤 견적</div>
            </div>
            <div className={styles.quoteStatDivider} />
            <div className={styles.quoteStat}>
              <div className={styles.quoteStatNum}>전문가</div>
              <div className={styles.quoteStatLabel}>직접 작업</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} ref={ref(10)}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            견적 문의는<br />
            <em>언제든 환영합니다</em>
          </h2>
          <div style={{display:'flex', gap:'16px', flexWrap:'wrap', justifyContent:'center'}}>
            <a href="mailto:novelstudylab@naver.com" className={styles.ctaBtn}>이메일 문의 →</a>
            <a href="https://open.kakao.com/me/mightybooks"
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