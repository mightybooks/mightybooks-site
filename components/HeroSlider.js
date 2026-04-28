'use client'
import { useState, useEffect } from 'react'
import styles from './HeroSlider.module.css'

const slides = [
  {
    bg: '/image/home/slide004.avif',
    label: 'Paid Manuscript Review / 유료 원고 검토',
    title: '선택받을 원고인지\n먼저\n점검합니다',
    sub: '당신의 원고가 10,000 : 1의 경쟁을 뚫고\n기획 출간될 가능성이 있는지 검토합니다.',
    btn: '유료 원고 검토 보기',
    btnHref: '/support/diagnosis',
  },
  {
    bg: '/image/home/slide003.avif',
    label: '500 Writing Workshop / 500자 글쓰기',
    title: 'AI 시대,\n500자로 먼저\n설득합니다',
    sub: '자기 경험과 원고, 브랜드를\n감각적으로 빠르게 읽히는 텍스트 숏폼으로 정리합니다.',
    btn: '워크숍 보기',
    btnHref: '/workshop/500-character-fiction'
  },
  {
    bg: '/image/home/slide001.avif',
    label: 'Purpose-based Book Production / 목적형 도서 제작',
    title: '목적이 분명한 책은\n무료상담으로\n시작합니다',
    sub: '자서전, 개인 에세이, 시집, 문집, 교재처럼\n제작 목적이 뚜렷한 도서를 상담합니다.',
    btn: '목적형 도서 상담',
    btnHref: '/business/autobiography'
  },
  {
    bg: '/image/home/slide002.jpg',
    label: 'Portfolio / 출간 사례',
    title: '마이티북스가\n만들어온 책들을\n확인합니다',
    sub: '출간 도서와 제작 사례를 통해\n책의 방향과 완성 방식을 살펴볼 수 있습니다.',
    btn: '출간 사례 보기',
    btnHref: '/portfolio/books'
  },
]

export default function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCur(c => (c + 1) % slides.length)
      setAnimKey(k => k + 1)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const goSlide = (n) => {
    setCur(n)
    setAnimKey(k => k + 1)
  }

  const s = slides[cur]

  return (
    <section className={styles.hero}>
      {slides.map((sl, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === cur ? styles.active : ''}`}
          style={{ backgroundImage: `url(${sl.bg})` }}
        />
      ))}
      <div className={styles.overlay} />
      <div className={styles.content} key={animKey}>
        <div className={styles.label}>{s.label}</div>
        <h1 className={styles.title}>
          {s.title.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
        <p className={styles.sub}>
          {s.sub.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
        <a href={s.btnHref} className={styles.btn} target={s.btnHref.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"> {s.btn} →</a>
      </div>
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === cur ? styles.dotActive : ''}`}
            onClick={() => goSlide(i)}
            aria-label={`슬라이드 ${i + 1}`}
          />
        ))}
      </div>
      <div className={styles.progressBar} key={`p-${animKey}`} />
    </section>
  )
}
