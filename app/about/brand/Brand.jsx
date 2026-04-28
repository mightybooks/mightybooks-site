'use client'
import { useEffect, useRef } from 'react'
import styles from './brand.module.css'

const brands = [
  {
    name: '마이티북스',
    sub: 'MIGHTY BOOKS',
    color: '#e8001e',
    desc: [
      '종합 출판 브랜드',
      '원고 기획, 편집, 제작, 출간까지 전 과정을 담당하는 출판사',
    ],
    symbol: '⚡',
  },
  {
    name: '마이티피플',
    sub: 'MIGHTY PEOPLE',
    color: '#c0392b',
    desc: [
      '인터뷰 기반 책 출간을 진행하는 출판 브랜드',
      '일반 교양 및 자기계발 분야 도서를 제작하는 기획출판 라인',
    ],
    symbol: '👥',
  },
  {
    name: '장미와 여우',
    sub: 'ROSE & FOX',
    color: '#8e44ad',
    desc: [
      '시와 소설 전문 문예 장르 브랜드',
      '문학 작품과 굿즈 제작을 병행하는 문예 라인',
    ],
    symbol: '🌹',
  },
  {
    name: '사이의 순간들',
    sub: 'MOMENTS IN BETWEEN',
    color: '#2980b9',
    desc: [
      '감성 에세이 출판 브랜드',
      '에세이 원고를 중심으로 책 출간을 진행',
    ],
    symbol: '✨',
  },
  {
    name: '수림 스튜디오',
    sub: 'SURIM STUDIO',
    color: '#27ae60',
    desc: [
      '문수림 작가가 운영하는 창작 실험 브랜드',
      '500자 소설, PPL 소설, 수림지 등 새로운 서사 형식을 연구하고 제작',
    ],
    symbol: '🔬',
  },
]

export default function BrandPage() {
  const itemRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
          }
        })
      },
      { threshold: 0.2 }
    )
    itemRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.tag}>Brand Identity</span>
        <h1 className={styles.title}>마이티북스 출판 <em>브랜드</em>구조</h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          여러 목소리로 세상과 만납니다
        </p>
          <section className={styles.seoIntro}>
            <p>
              마이티북스는 종합 출판 서비스를 지향하는 출판사로,<br/>
              다양한 출판 브랜드를 통해 문예, 에세이, 인터뷰, 실험적 콘텐츠까지 확장하고 있습니다.<br/>
              각 브랜드는 책 출간 목적과 장르에 따라 분리되어 운영됩니다.
            </p>
          </section>
      </div>

      {/* BRAND ITEMS */}
      <div className={styles.list}>
        {brands.map((brand, i) => (
          <div
            key={brand.name}
            ref={el => itemRefs.current[i] = el}
            className={`${styles.item} ${i % 2 === 0 ? styles.itemLeft : styles.itemRight}`}
            style={{ '--brand-color': brand.color }}
          >
            {/* 텍스트 */}
            <div className={styles.textBlock}>
              <div className={styles.itemNum}>0{i + 1}</div>
              <div className={styles.itemSub}>{brand.sub}</div>
              <h2 className={styles.itemName}>{brand.name}</h2>
              <div className={styles.itemBar} />
              <ul className={styles.itemDesc}>
                {brand.desc.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>

            {/* 심볼 */}
            <div className={styles.symbolBlock}>
              <div className={styles.symbolCircle}>
                <span className={styles.symbolIcon}>{brand.symbol}</span>
                <div className={styles.symbolName}>{brand.name}</div>
              </div>
              <div className={styles.symbolDeco} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}