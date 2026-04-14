'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './StatsBar.module.css'

function Counter({ target }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const step = target / (duration / 16)
        let cur = 0
        const timer = setInterval(() => {
          cur += step
          if (cur >= target) { cur = target; clearInterval(timer) }
          setVal(Math.floor(cur))
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{val.toLocaleString()}</span>
}

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.label}>
        <span>👥</span> OUR RECORD
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.num}><Counter target={1172} /></div>
          <div className={styles.desc}>저자 인터뷰 누적 시간</div>
        </div>
        <div className={styles.item}>
          <div className={styles.num}><Counter target={99} /></div>
          <div className={styles.desc}>결과 만족도</div>
        </div>
        <div className={styles.item}>
          <div className={styles.num}><Counter target={823401} /></div>
          <div className={styles.desc}>누적 페이지뷰</div>
        </div>
      </div>
      <div className={styles.right}>
        <Link href="/#contact" className={styles.btn}>오시는길</Link>
        <Link href="/#contact" className={`${styles.btn} ${styles.btnActive}`}>온라인문의</Link>
        <Link href="/#portfolio" className={styles.btn}>포트폴리오</Link>
      </div>
    </div>
  )
}