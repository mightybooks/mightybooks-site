'use client'
import { useEffect, useRef } from 'react'
import styles from './planning.module.css'

const successCases = [
  {
    category: '미디어 출연',
    items: [
      {
        book: '내가 묻고, 산이 답하다',
        desc: 'SBS 일요특선 다큐멘터리 저자 출연',
      },
      {
        book: '육아가 자기 계발이 되는 윈윈육아',
        desc: 'HCN 뉴스와이드 저자 출연 / Youtube 채널 <김교수의 세가지>, <바다별에듀> 저자 출연',
      },
    ],
  },
  {
    category: '도서 순위',
    items: [
      {
        book: '문수림의 장르불문 관통하는 글쓰기',
        desc: '교보문고 주간베스트 / 출간과 함께 교보문고 MD의 선택으로 분류',
      },
      {
        book: '육아가 자기 계발이 되는 윈윈육아',
        desc: '교보문고 주간베스트 / 예스24 자녀교육 top100 진입',
      },
      {
        book: '허리디스크 탈출, 공감이 시작이다',
        desc: '교보문고 주간베스트 / 예스24 건강 취미 top100 진입',
      },
      {
        book: '내가 묻고, 산이 답하다',
        desc: '교보문고 주간베스트',
      },
    ],
  },
]

export default function PlanningPage() {
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

  const ref = (i) => el => revealRefs.current[i] = el

  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.tag}>Business</span>
          <h1 className={styles.heroTitle}>기획<em>출판</em></h1>
          <div className={styles.heroLine} />
          <p className={styles.heroCopy}>
            10,000 : 1의 경쟁률.<br />
            마이티북스가 선택한 원고는 베스트셀러가 됩니다.
          </p>
          <p className={styles.seoLine}>
            마이티북스는 원고를 선별하여 기획출판 방식으로 도서를 출간하는 출판사입니다.
          </p>
        </div>
        {/* 떠다니는 숫자 */}
        <div className={styles.floatNum}>10,000<span>:1</span></div>
      </section>

      {/* 01 — DREAM */}
      <section className={styles.pointSection} ref={ref(0)}>
        <div className={styles.pointInner}>
          <div className={styles.pointLeft}>
            <div className={styles.pointNum}>01</div>
            <div className={styles.pointKeyword}>Dream Come True</div>
            <h2 className={styles.pointTitle}>
              꿈만 꾸던<br />
              베스트셀러 작가,<br />
              <em>가능합니다</em>
            </h2>
          </div>
          <div className={styles.pointRight}>
            <div className={styles.pointCard}>
              <div className={styles.pointCardIcon}>🏆</div>
              <p className={styles.pointCardText}>
                꿈만 꾸던 베스트셀러 작가,<br />
                마이티북스와 함께 하면 가능합니다.
              </p>
              <div className={styles.pointCardStat}>
                <span className={styles.statNum}>10,000</span>
                <span className={styles.statLabel}>: 1 의 경쟁률을 뚫은<br />마이티북스의 선택</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — BRANDING */}
      <section className={styles.brandingSection} ref={ref(1)}>
        <div className={styles.brandingInner}>
          <div className={styles.brandingRight}>
            <div className={styles.pointNum} style={{color: 'rgba(255,255,255,.15)'}}>02</div>
            <div className={styles.pointKeyword}>Personal Branding</div>
            <h2 className={styles.pointTitle}>
              출간은 끝이 아니라<br />
              <em>새로운 출발선</em>입니다
            </h2>
            <p className={styles.brandingDesc}>
              출간 이후의 활동, 저자의 퍼스널 브랜딩을 리드해 드립니다.<br />
              마이티북스는 출간 이후 저자 활동 영역을 넓힐 수 있도록 안내해 드립니다.
            </p>
          </div>
          <div className={styles.brandingLeft}>
            {['미디어 출연', '도서 순위', '강연 연결', '콘텐츠 기획'].map((item, i) => (
              <div key={i} className={styles.brandingItem}>
                <span className={styles.brandingItemNum}>0{i+1}</span>
                <span className={styles.brandingItemLabel}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS CASES */}
      <section className={styles.successSection} ref={ref(2)}>
        <div className={styles.successHeader}>
          <span className={styles.tag}>Success Story</span>
          <h2 className={styles.successTitle}>기획출간 <em>성공사례</em></h2>
          <div className={styles.successLine} />
        </div>

        {successCases.map((group, gi) => (
          <div key={gi} className={styles.successGroup} ref={ref(gi + 3)}>
            <div className={styles.successGroupTitle}>
              <span className={styles.successGroupIcon}>
                {gi === 0 ? '📺' : '📊'}
              </span>
              {group.category}
            </div>
            <div className={styles.successItems}>
              {group.items.map((item, ii) => (
                <div key={ii} className={styles.successItem}>
                  <div className={styles.successBook}>
                    『{item.book}』
                  </div>
                  <div className={styles.successDesc}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      
      <section className={styles.cta} ref={ref(6)}>        
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            당신의 원고,<br />
            <em>마이티북스에 맡겨보세요</em>
          </h2>
          <p className={styles.seoLine2}>
            기획출판은 모든 원고가 진행되는 방식이 아니며, 내부 기준에 따라 선별됩니다.
          </p>
          <div style={{display:'flex', gap:'16px', flexWrap:'wrap', justifyContent:'center'}}>
            <a href="/support/submission" className={styles.ctaBtn}>원고 투고하기 →</a>
            <a href="https://open.kakao.com/me/mightybooks" target="_blank" rel="noopener noreferrer" className={styles.ctaBtnGhost}>카카오 상담 →</a>
          </div>
        </div>
      </section>

    </div>
  )
}