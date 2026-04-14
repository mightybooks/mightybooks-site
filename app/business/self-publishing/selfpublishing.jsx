'use client'
import { useEffect, useRef } from 'react'
import styles from './self-publishing.module.css'

const strengths = [
  {
    icon: '🎯',
    title: '기획 총괄',
    desc: '명확한 주제와 컨셉만 준비되어 있다면, 아이디어만으로도 출간할 수 있도록 마이티북스가 도와드립니다.',
  },
  {
    icon: '⚡',
    title: '스피드',
    desc: '초고 완성 후 출판사와 계약을 했더라도 출간까지 몇 년이 걸리기도 합니다. 마이티북스에서는 컨설턴트의 1:1 대응으로 빠르게 출간할 수 있도록 집중합니다.',
  },
  {
    icon: '💎',
    title: '합리적인 권한과 인세 비율',
    desc: '프리미엄 에디션은 저자가 투자한 비용으로 진행됨에 따라 재고의 모든 권한은 저자에게 귀속되며, 45%의 인세를 지불합니다.',
  },
]

const plans = [
  {
    name: '출간기획 피드백',
    price: '55만원~',
    desc: '출판사에 투고하기 전 제안서와 샘플 원고를 점검하여 수정 및 피드백을 해드립니다.',
    tier: 'basic',
    icon: '📋',
  },
  {
    name: '리라이팅 플랜',
    price: '250만원~',
    desc: '완성한 초고의 완성도를 높이는 작업입니다. 출판사와 계약을 했으나 스스로 수정할 여력이 되지 않는 예비 작가에게 추천합니다.',
    tier: 'basic',
    icon: '✏️',
  },
  {
    name: '베이직 플랜',
    price: '660만원~',
    desc: '효율성에 최적화된 플랜입니다. 빠른 제작 및 출간을 지원합니다.',
    tier: 'standard',
    icon: '📦',
  },
  {
    name: '스탠다드 플랜',
    price: '990만원~',
    desc: '완성된 초고에 전문 에디터의 감각을 입혀, 가독성을 높인 작업물을 기대할 수 있습니다.',
    tier: 'standard',
    icon: '⭐',
  },
  {
    name: '프리미엄 플랜',
    price: '1,400만원~',
    desc: '스탠다드 플랜에 온, 오프라인 이벤트 행사 지원이 추가된 플랜입니다.',
    tier: 'premium',
    icon: '👑',
  },
  {
    name: '올인원 플랜',
    price: '2,400만원~',
    desc: '인터뷰를 통한 원고 작성(대필) 및 윤문 등 출판과 관련한 모든 공정을 지원합니다.',
    tier: 'vip',
    icon: '💎',
  },
]

const tierColors = {
  basic: 'rgba(255,255,255,.15)',
  standard: '#c0392b',
  premium: '#c8a84b',
  vip: 'linear-gradient(135deg, #c8a84b, #e8001e)',
}

const tierLabels = {
  basic: 'BASIC',
  standard: 'STANDARD',
  premium: 'PREMIUM',
  vip: 'VIP',
}

export default function SelfPublishingPage() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add(styles.visible)
      }),
      { threshold: 0.12 }
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
          <h1 className={styles.heroTitle}>자비출판<br /><em>프리미엄 에디션</em></h1>
          <div className={styles.heroLine} />
          <p className={styles.heroCopy}>
            아이디어만으로도 출간할 수 있습니다.<br />
            재고의 모든 권한은 저자에게, 인세 45%.
          </p>
          <p className={styles.seoLine}>
            마이티북스는 자비출판을 기반으로 저자 중심의 출판 서비스를 제공합니다.
          </p>
        </div>
        <div className={styles.heroFloat}>45%</div>
      </section>

      {/* 3 STRENGTHS */}
      <section className={styles.strengthSection} ref={ref(0)}>
        <div className={styles.strengthGrid}>
          {strengths.map((s, i) => (
            <div
              key={i}
              className={styles.strengthCard}
              ref={ref(i + 1)}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className={styles.strengthIcon}>{s.icon}</div>
              <h3 className={styles.strengthTitle}>{s.title}</h3>
              <div className={styles.strengthBar} />
              <p className={styles.strengthDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
        
        <p className={styles.seoLine2}>
          자비출판은 저자가 주도적으로 진행하는 출판 방식입니다.<br/>
          마이티북스는 이를 프리미엄 제작 방식으로 제공합니다.
        </p>

      {/* HANDMADE */}
      <section className={styles.handmadeSection} ref={ref(4)}>
        <div className={styles.handmadeInner}>
          <div className={styles.handmadeLeft}>
            <span className={styles.tag}>Philosophy</span>
            <h2 className={styles.sectionTitle}>
              Handmade<br />
              <em>책다운 책 만들기</em>
            </h2>
            <div className={styles.sectionLine} />
          </div>
          <div className={styles.handmadeRight}>
            <p className={styles.handmadeText}>
              마이티북스는 <strong>'책다운 책 만들기'</strong>에 집중합니다.<br />
              이는 책을 단순한 인쇄물이 아닌 <strong>'작품'</strong>으로 바라보는
              시선에서 비롯한 신념입니다.
            </p>
            <p className={styles.handmadeText}>
              결국 도서 제작은 사람에 의해 완결됩니다.<br />
              첨단의 AI 생성 기술이 등장했더라도 최종 판단은 전문가들이 내리며,
              각 공정이 유기적으로 연결될 수 있도록
              전문 편집자가 기획해야만 완성도 있는 결과물이 나오는 법입니다.
            </p>
            <div className={styles.handmadeQuote}>
              마이티북스는 작품을 남긴다는 신념으로<br />
              단계 별 플랜을 두어 최상의 결과를 만들기 위해 노력하고 있습니다.
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className={styles.plansSection} ref={ref(5)}>
        <div className={styles.plansHeader}>
          <span className={styles.tag}>Plans</span>
          <h2 className={styles.sectionTitle}>출간 <em>플랜</em></h2>
          <div className={styles.sectionLine} style={{margin: '16px auto 0'}} />
          <p className={styles.plansNote}>
            제작하려는 도서의 사이즈와 부수, 컬러, 유통 방식과 광고 형태 등에 따라<br />
            세부 가격이 달라지니 충분한 상담 후 선택하시는 걸 권합니다.
          </p>
        </div>
        <div className={styles.plansGrid}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`${styles.planCard} ${styles[`tier_${plan.tier}`]}`}
              ref={ref(i + 6)}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.planTierBadge}>{tierLabels[plan.tier]}</div>
              <div className={styles.planIcon}>{plan.icon}</div>
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.planPrice}>{plan.price}</div>
              <div className={styles.planDivider} />
              <p className={styles.planDesc}>{plan.desc}</p>
              
              <a href="https://open.kakao.com/me/mightybooks"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.planBtn}
              >
                상담하기 →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} ref={ref(12)}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            당신의 책,<br />
            <em>마이티북스와 함께 만들어 보세요</em>
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
            <a href="/support/education" className={styles.ctaBtn}>글쓰기 교육 보기 →</a>
          </div>
        </div>
      </section>

    </div>
  )
}