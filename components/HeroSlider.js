'use client'
import { useState, useEffect } from 'react'
import styles from './HeroSlider.module.css'

const slides = [
  {
    bg: '/image/home/slide004.avif',
    label: 'Open Publishing / 자서전·문집',
    title: '당신의 인생도\n한 권의 책이\n될 수 있습니다',
    sub: '전문 편집팀과 함께\n당신만의 이야기를 완성합니다.',
    btn: '자세히 보기', btnHref: '/business/autobiography',
  },
  {
    bg: '/image/home/slide002.jpg',
    label: 'Author Interview / 저자 인터뷰',
    title: '저자와 함께하는\n1,172시간의\n특별한 대화',
    sub: '국내 최다 저자 인터뷰 기록.\n진솔한 이야기를 담습니다.',
    btn: '더 알아보기', btnHref: '/business/self-publishing',
  },
  {
    bg: '/image/home/slide001.avif',
    label: 'Mighty Books / 종합 출판 브랜드',
    title: '단행본에서부터\n전문 서적\n전자책과 소량 제작까지',
    sub: '당신의 이야기가 세상을 바꿉니다.\n마이티북스와 함께 여정을 시작하세요.',
    btn: '소량 맞춤 제작', btnHref: '/business/poetry'
  },
  {
    bg: '/image/home/slide003.avif',
    label: 'Portfolio / 출판 포트폴리오',
    title: '마이티북스\n출간 도서 목록',
    sub: '세분화 된 다양한 브랜드\n전체 출간 도서목록을 통해 확인해 보세요',
    btn: '포트폴리오', btnHref: '/portfolio/books'
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