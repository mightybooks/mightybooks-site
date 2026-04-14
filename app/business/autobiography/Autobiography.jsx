'use client'
import { useEffect, useRef } from 'react'
import styles from './autobiography.module.css'

const targets = [
  { icon: '📝', label: '인생을 정리하는 자서전' },
  { icon: '💡', label: '삶의 깨달음을 전하는 에세이' },
  { icon: '🏛️', label: '정치 출마자들의 자서전' },
  { icon: '👤', label: '유명인 / 일반인 모두 가능' },
]

const processSteps = [
  { num: '01', label: '상담 신청', desc: '전화 또는 카카오 오픈톡으로 상담을 신청해주세요.' },
  { num: '02', label: '1:1 인터뷰', desc: '전문가와 1:1 인터뷰를 진행합니다. 원고가 없어도 됩니다.' },
  { num: '03', label: '집필 & 편집', desc: '전문 작가가 인터뷰 내용을 바탕으로 집필합니다.' },
  { num: '04', label: '사진 복원', desc: '낡은 사진도 디지털로 스캔하여 복원합니다.' },
  { num: '05', label: '출간', desc: '검토 후 최종 출간합니다.' },
]

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

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.tag}>Business</span>
          <h1 className={styles.heroTitle}>자서전<br /><em>출간</em></h1>
          <div className={styles.heroLine} />
          <p className={styles.heroCopy}>
            직접 쓴 원고 없이도<br />
            인터뷰만으로 집필이 가능합니다.
          </p>
          <p className={styles.seoLine}>
            마이티북스는 자서전 제작을 위해 인터뷰 기반 집필과 출간 서비스를 제공합니다.
          </p>
        </div>
        <div className={styles.heroFloat}>memoir</div>
      </section>

      {/* ONE-CLICK */}
      <section className={styles.oneclick} ref={ref(0)}>
        <div className={styles.oneclickInner}>
          <div className={styles.oneclickLeft}>
            <span className={styles.tag}>One-click Solution</span>
            <h2 className={styles.sectionTitle}>
              원고가 없어도<br />
              <em>괜찮습니다</em>
            </h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              개인 자서전, 회고록 출간에 대한 생각만 하고
              집필이 어려우신 분들이 많으십니다.<br /><br />
              마이티북스는 그런 분들을 위해 인터뷰만으로도
              집필이 가능한 <strong>원클릭 솔루션</strong>을 제공하고 있습니다.<br /><br />
              합리적인 가격은 기본, 다년간 현업에 종사했던
              전문가들이 1:1로 매칭되어 출간 집필을 도와드립니다.
            </p>
            <p className={styles.seoLine}>
              자서전은 개인의 삶을 기록하는 작업으로 충분한 상담 후 진행됩니다.
            </p>
          </div>
          <div className={styles.oneclickRight}>
            <div className={styles.oneclickCard}>
              <div className={styles.oneclickBadge}>원클릭 솔루션</div>
              <div className={styles.oneclickFeatures}>
                <div className={styles.oneclickFeature}>
                  <span>✅</span> 원고 없이 인터뷰만으로 집필
                </div>
                <div className={styles.oneclickFeature}>
                  <span>✅</span> 합리적인 가격
                </div>
                <div className={styles.oneclickFeature}>
                  <span>✅</span> 현업 전문가 1:1 매칭
                </div>
                <div className={styles.oneclickFeature}>
                  <span>✅</span> 의뢰인은 내용 정리만
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TARGETS */}
      <section className={styles.targetSection} ref={ref(1)}>
        <div className={styles.targetHeader}>
          <span className={styles.tag}>Who We Help</span>
          <h2 className={styles.sectionTitle}>유명인부터 일반인까지<br /><em>1:1 맞춤 컨설팅</em></h2>
          <div className={styles.sectionLine} style={{margin: '16px auto 0'}} />
        </div>
        <div className={styles.targetGrid}>
          {targets.map((t, i) => (
            <div
              key={i}
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
          의뢰인은 원고 내용만 정리해주시면 됩니다
        </div>
      </section>

      {/* PROCESS */}
      <section className={styles.processSection} ref={ref(7)}>
        <div className={styles.processHeader}>
          <span className={styles.tag}>Process</span>
          <h2 className={styles.sectionTitle}>진행 <em>과정</em></h2>
          <div className={styles.sectionLine} style={{margin: '16px auto 0'}} />
        </div>
        <div className={styles.processSteps}>
          {processSteps.map((s, i) => (
            <div
              key={i}
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

      {/* PHOTO RESTORE */}
      <section className={styles.photoSection} ref={ref(13)}>
        <div className={styles.photoInner}>
          <div className={styles.photoLeft}>
            <div className={styles.photoIconWrap}>
              <img src="/image/home/recover001.jpg"></img>
              <div className={styles.photoIconDeco} />
            </div>
          </div>
          <div className={styles.photoRight}>
            <span className={styles.tag}>Digital Restoration</span>
            <h2 className={styles.sectionTitle}>
              디지털 <em>복원</em>
            </h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              오래된 사진 복원 작업도 가능합니다.<br /><br />
              자서전에 지난 세월이 찍힌 사진을 담고 싶은 마음이 있어도
              너무 낡은 사진이라 망설여질 수가 있습니다.<br /><br />
              마이티북스는 전문가가 직접 사진을 디지털 파일로 스캔하여
              복원하는 작업까지 진행해 드립니다.
            </p>
            <div className={styles.photoTags}>
              {['기울어진 사진', '빛 반사 사진', '낡고 변색된 사진', '모든 경우 가능'].map((tag, i) => (
                <span key={i} className={styles.photoTag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} ref={ref(14)}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            당신의 이야기를<br />
            <em>책으로 남겨드립니다</em>
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