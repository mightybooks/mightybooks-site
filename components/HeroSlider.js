'use client'
import { useState, useEffect } from 'react'
import styles from './HeroSlider.module.css'

const slides = [
  {
    bg: '/image/home/slide004.avif',
    label: 'Life Story Publishing',
    title: '삶의 기록을\n한 권의 책으로 만듭니다',
    sub: '자서전, 시집, 문집, 기념 도서를 기획부터 편집, 디자인, 제작까지 함께합니다.\n대구 본사 방문상담 가능 · 전국 비대면 상담 가능',
    btn: '출판상담 받기',
    btnHref: '/support/diagnosis',
  },
  {
    bg: '/image/home/slide003.avif',
    label: 'Autobiography / Memoir',
    title: '삶의 흐름을 정리해\n책으로 남깁니다',
    sub: '부모님 자서전, 회고록, 퇴임기념집, 가족에게 남기는 책을 상담합니다.',
    btn: '자서전·기념 도서 제작',
    btnHref: '/business/autobiography',
  },
  {
    bg: '/image/home/slide001.avif',
    label: 'Poetry / Anthology',
    title: '시와 글을 모아\n책의 형태로 정리합니다',
    sub: '개인 시집, 동호회 문집, 가족 문집, 기념 문집 제작을 안내합니다.',
    btn: '시집·문집 제작',
    btnHref: '/business/poetry',
  },
  {
    bg: '/image/home/hero007.avif',
    label: 'Digital Publishing',
    title: 'EPUB·PDF·웹북으로\n읽히는 방식을 설계합니다',
    sub: '전자책 서점, 직접 배포와 웹브라우저 열람까지 목적에 맞는 디지털 출판 형식을 안내합니다.',
    btn: '전자책·웹북 제작',
    btnHref: '/business/epub',
  },
  {
    bg: '/image/home/edu005.avif',
    label: 'Institution / Company Booklet',
    title: '기업과 관공서 자료를\n읽기 쉬운 소책자로 정리합니다',
    sub: '기관 자료집, 교육자료, 행사 소책자, 프로젝트 보고서를 목적에 맞게 편집·디자인·인쇄합니다.',
    btn: '기관ㆍ기업 소책자 제작',
    btnHref: '/business/booklet',
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
          key={sl.title}
          className={`${styles.slide} ${i === cur ? styles.active : ''}`}
          style={{ backgroundImage: `url(${sl.bg})` }}
        />
      ))}
      <div className={styles.overlay} />
      <div className={styles.content} key={animKey}>
        <div className={styles.label}>{s.label}</div>
        <h1 className={styles.title}>
          {s.title.split('\n').map((line) => (
            <span key={line}>{line}<br /></span>
          ))}
        </h1>
        <p className={styles.sub}>
          {s.sub.split('\n').map((line) => (
            <span key={line}>{line}<br /></span>
          ))}
        </p>
        <a href={s.btnHref} className={styles.btn}>{s.btn} →</a>
      </div>
      <div className={styles.dots}>
        {slides.map((slide, i) => (
          <button
            key={slide.label}
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
