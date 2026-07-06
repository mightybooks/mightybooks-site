'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './StatsBar.module.css'

const stats = [
  { label: '저자 인터뷰 누적 시간', target: 1172 },
  { label: '결과 만족도', target: 99 },
  { label: '누적 페이지뷰', target: 823401 },
]

function Counter({ target }) {
  const [val, setVal] = useState(target)
  const ref = useRef(null)
  const started = useRef(false)
  const timer = useRef(null)
  const formattedTarget = target.toLocaleString()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const step = target / (duration / 16)
        let cur = 0
        setVal(0)
        timer.current = setInterval(() => {
          cur += step
          if (cur >= target) {
            cur = target
            clearInterval(timer.current)
          }
          setVal(Math.floor(cur))
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (timer.current) clearInterval(timer.current)
    }
  }, [target])

  return (
    <span ref={ref}>
      <span aria-hidden="true">{val.toLocaleString()}</span>
      <span className={styles.visuallyHidden}>{formattedTarget}</span>
    </span>
  )
}

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.label}>
        <span>👥</span> OUR RECORD
      </div>
      <div className={styles.items}>
        {stats.map((stat) => (
          <div className={styles.item} key={stat.label}>
            <div className={styles.num}><Counter target={stat.target} /></div>
            <div className={styles.desc}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className={styles.right}>
        <Link href="/about/location" className={styles.btn}>오시는길</Link>
        <Link href="/support/diagnosis" className={`${styles.btn} ${styles.btnActive}`}>온라인문의</Link>
        <Link href="/portfolio/books" className={styles.btn}>포트폴리오</Link>
      </div>
    </div>
  )
}
