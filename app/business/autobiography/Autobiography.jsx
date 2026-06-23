'use client'
import { useEffect, useRef } from 'react'
import ServiceContactCta from '../components/ServiceContactCta'
import AutobiographyPlanFinder from './AutobiographyPlanFinder'
import styles from './autobiography.module.css'

const targets = [
  { icon: '01', label: '부모님 선물용' },
  { icon: '02', label: '칠순·팔순 기념용' },
  { icon: '03', label: '퇴임·은퇴 기념용' },
  { icon: '04', label: '가족사·회고록' },
]

const processSteps = [
  { num: '01', label: '문의', desc: '제작 목적, 예상 독자, 원고 유무를 먼저 확인합니다.' },
  { num: '02', label: '상담', desc: '출판사 대표가 직접 상담하며 책의 목적과 구성 방향을 잡습니다.' },
  { num: '03', label: '인터뷰', desc: '원고가 없으면 인터뷰를 통해 삶의 흐름과 주요 장면을 정리합니다.' },
  { num: '04', label: '집필·편집', desc: '구술 내용과 자료를 바탕으로 원고를 구성하고 편집합니다.' },
  { num: '05', label: '디자인·출간', desc: '표지, 내지, 사진 보정, 인쇄와 유통 여부를 확정합니다.' },
]

const plans = [
  {
    name: '라이트 플랜',
    price: '예상 100만 원~',
    summary: '원고가 준비된 소량 기념 도서',
  },
  {
    name: '스탠다드 플랜',
    price: '예상 200만 원~',
    summary: '원고·녹취·메모 기반 자서전',
  },
  {
    name: '프리미엄 플랜',
    price: '예상 660만 원~',
    summary: '인터뷰 기반 생애 기록',
  },
  {
    name: '비즈니스 플랜',
    price: '예상 1,800만 원~',
    summary: '브랜딩 목적의 고급 자서전',
  },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
    { '@type': 'ListItem', position: 2, name: '출판서비스', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/autobiography' },
    { '@type': 'ListItem', position: 3, name: '자서전·기념 도서 제작', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/autobiography' },
  ],
}

export default function AutobiographyPage() {
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
          <span className={styles.tag}>Autobiography / Memoir</span>
          <h1 className={styles.heroTitle}>자서전,<br /><em>기념 도서 제작</em></h1>
          <div className={styles.heroLine} />
          <p className={styles.heroCopy}>
            한 사람의 삶과 기억, 가족사와 사회적 이력을<br />
            목적에 맞는 책의 구조로 정리합니다.
          </p>
          <p className={styles.seoLine}>
            공장형 템플릿이 아니라 출판사 대표가 직접 상담하고, 원고 방향과 목차를 함께 잡습니다.
          </p>
        </div>
        <div className={styles.heroFloat}>memoir</div>
      </section>

      <section className={styles.oneclick} ref={ref(0)}>
        <div className={styles.oneclickInner}>
          <div className={styles.oneclickLeft}>
            <span className={styles.tag}>Start Without Manuscript</span>
            <h2 className={styles.sectionTitle}>
              원고가 없어도<br />
              <em>시작할 수 있습니다</em>
            </h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              자서전·기념 도서 제작은 완성된 원고를 제출하는 방식만 있는 것이 아닙니다. 미완성 원고,
              메모, 녹취, 구술 자료, 인터뷰, 가족이 정리한 자료, 사진과 연표를 바탕으로 시작할 수 있습니다.
            </p>
            <p className={styles.sectionDesc}>
              의뢰인의 이야기, 생애 흐름, 책의 목적에 맞춰 목차와 구성을 설계합니다. 당사자가 고령이거나
              직접 응대가 어려운 경우에는 자녀·가족·지인과의 대리 응대를 통해 진행할 수 있습니다.
            </p>
          </div>
          <div className={styles.oneclickRight}>
            <div className={styles.oneclickCard}>
              <div className={styles.oneclickBadge}>제작 키워드</div>
              <div className={styles.oneclickFeatures}>
                <div className={styles.oneclickFeature}><span>01</span> 출판사 대표 직접 상담</div>
                <div className={styles.oneclickFeature}><span>02</span> 원고 없이 시작 가능</div>
                <div className={styles.oneclickFeature}><span>03</span> 오래된 사진 보정·배치</div>
                <div className={styles.oneclickFeature}><span>04</span> 소량 제작 가능</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.targetSection} ref={ref(1)}>
        <div className={styles.targetHeader}>
          <span className={styles.tag}>Purpose</span>
          <h2 className={styles.sectionTitle}>목적에 따라<br /><em>제작 방식이 달라집니다</em></h2>
          <div className={styles.sectionLine} style={{ margin: '16px auto 0' }} />
        </div>
        <div className={styles.targetGrid}>
          {targets.map((t, i) => (
            <div
              key={t.label}
              className={styles.targetCard}
              ref={ref(i + 2)}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className={styles.targetIcon}>{t.icon}</div>
              <div className={styles.targetLabel}>{t.label}</div>
            </div>
          ))}
        </div>
        <div className={styles.targetNote} ref={ref(6)}>
          가족 소장용 · 부모님 선물용 · 인물 기록집 · 가족사 기록집까지 목적에 맞춰 제작합니다
        </div>
      </section>

      <section className={styles.processSection} ref={ref(7)}>
        <div className={styles.processHeader}>
          <span className={styles.tag}>Process</span>
          <h2 className={styles.sectionTitle}>진행 <em>절차</em></h2>
          <div className={styles.sectionLine} style={{ margin: '16px auto 0' }} />
        </div>
        <div className={styles.processSteps}>
          {processSteps.map((s, i) => (
            <div
              key={s.num}
              className={styles.processStep}
              ref={ref(i + 8)}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.processNum}>{s.num}</div>
              <div className={styles.processLabel}>{s.label}</div>
              <div className={styles.processDivider} />
              <div className={styles.processDesc}>{s.desc}</div>
              {i < processSteps.length - 1 && (
                <div className={styles.processArrow}>→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.photoSection} ref={ref(13)}>
        <div className={styles.photoInner}>
          <div className={styles.photoLeft}>
            <div className={styles.oneclickCard}>
              <div className={styles.oneclickBadge}>인터뷰 기반 구성</div>
              <div className={styles.oneclickFeatures}>
                <div className={styles.oneclickFeature}><span>01</span> 완성 원고 없이 시작 가능</div>
                <div className={styles.oneclickFeature}><span>02</span> 녹취·메모·연표 활용</div>
                <div className={styles.oneclickFeature}><span>03</span> 가족·지인 보충 인터뷰 가능</div>
                <div className={styles.oneclickFeature}><span>04</span> 대면·비대면 진행 조정</div>
              </div>
            </div>
          </div>
          <div className={styles.photoRight}>
            <span className={styles.tag}>Interview Based Writing</span>
            <h2 className={styles.sectionTitle}>
              인터뷰를 통해<br /><em>삶의 흐름을 정리합니다</em>
            </h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              인터뷰는 단순한 문답이 아니라 책의 구조를 만드는 과정입니다. 출생과 성장, 일과 가족,
              중요한 선택, 남기고 싶은 말의 흐름을 잡아 원고의 뼈대를 세웁니다.
            </p>
            <p className={styles.sectionDesc}>
              직접 작성이 어려운 경우 말로 들려주신 이야기를 바탕으로 구성할 수 있습니다.
              당사자가 고령이거나 직접 응대가 어려운 경우에는 가족·지인 인터뷰를 보완할 수 있습니다.
            </p>
            <p className={styles.sectionDesc}>
              녹취, 메모, 연표, 가족 자료를 함께 활용할 수 있습니다. 대구·경상권은 대면 상담이 가능하고,
              원거리 의뢰자는 전화·화상·온라인 자료 전달로 진행할 수 있습니다. 출장 인터뷰는 별도 비용이 발생할 수 있습니다.
            </p>
            <div className={styles.photoTags}>
              {['미완성 원고', '메모와 녹취', '가족 자료', '화상 인터뷰', '대리 응대 가능'].map((tag) => (
                <span key={tag} className={styles.photoTag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.photoSection} ref={ref(14)}>
        <div className={styles.photoInner}>
          <div className={styles.photoLeft}>
            <div className={styles.photoIconWrap}>
              <img src="/image/home/recover001.jpg" alt="자서전과 기념 도서에 활용할 오래된 사진 자료" />
              <div className={styles.photoIconDeco} />
            </div>
          </div>
          <div className={styles.photoRight}>
            <span className={styles.tag}>Photo Restoration</span>
            <h2 className={styles.sectionTitle}>
              오래된 사진도<br /><em>책에 맞게 정리합니다</em>
            </h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              오래된 사진은 원형을 최대한 유지하는 방향으로 밝기, 색감, 선명도 등 기본 보정을 진행할 수 있습니다.
              책에 넣기 적합한 형태로 사진을 정리하고 배치합니다.
            </p>
            <p className={styles.sectionDesc}>
              기본 범위를 벗어나는 대량 사진 편집, 심한 훼손 사진 복원, 컬러 복원, 인물 합성,
              배경 제거 등은 별도 견적이 필요할 수 있습니다.
            </p>
            <p className={styles.sectionDesc}>
              사진은 자서전과 기념 도서의 감정적 밀도를 높이는 중요한 자료로 다룹니다.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.priceSection} ref={ref(15)}>
        <div className={styles.processHeader}>
          <span className={styles.tag}>Starting Price</span>
          <h2 className={styles.sectionTitle}>제작비는<br /><em>예상 기준으로 안내합니다</em></h2>
          <div className={styles.sectionLine} style={{ margin: '16px auto 0' }} />
        </div>
        <div className={styles.priceGrid}>
          {plans.map((plan) => (
            <article key={plan.name} className={styles.priceCard}>
              <h3>{plan.name}</h3>
              <div className={styles.price}>{plan.price}</div>
              <p>{plan.summary}</p>
            </article>
          ))}
        </div>
        <p className={styles.priceNote}>
          아래 금액은 단편적인 정보에 따른 상담 전 예상 기준입니다. 실제 제작비는 원고 분량, 인터뷰 방식,
          사진 작업량, 인쇄 부수, 제본 사양, 예산 범위에 따라 달라질 수 있습니다.
        </p>
      </section>

      <section className={styles.finderSection} ref={ref(16)}>
        <div className={styles.processHeader}>
          <span className={styles.tag}>Plan Finder</span>
          <h2 className={styles.sectionTitle}>내게 맞는<br /><em>플랜 찾기</em></h2>
          <div className={styles.sectionLine} style={{ margin: '16px auto 0' }} />
          <p className={styles.finderLead}>
            몇 가지 질문에 답하면 현재 상황에 가까운 예상 플랜을 확인할 수 있습니다.
            최종 견적은 원고 분량, 인터뷰 방식, 사진 작업량, 인쇄 부수와 제본 사양을 확인한 뒤 확정됩니다.
          </p>
        </div>
        <AutobiographyPlanFinder />
      </section>

      <section className={styles.cta} ref={ref(17)}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            삶의 기록을<br />
            <em>책으로 남기고 싶다면</em>
          </h2>
          <ServiceContactCta styles={styles} />
        </div>
      </section>
    </div>
  )
}
