'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

const navItems = [
  {
    label: '출판사 소개',
    children: [
      { label: '인사말', href: '/about/greeting' },
      { label: '브랜드 소개', href: '/about/brand' },
      { label: '오시는 길', href: '/about/location' },
    ]
  },
  { 
    label: '사업 소개',
    children: [
      { label: '기획출판', href: '/business/planning' },
      { label: '자비출판', href: '/business/self-publishing' },
      { label: 'ePub 전자책', href: '/business/epub' },
      { label: '자서전', href: '/business/autobiography' },
      { label: '시집 / 학원교재', href: '/business/poetry' },
    ]
  },
  {
    label: '포트폴리오',
    children: [
      { label: '출간 도서', href: '/portfolio/books' },
      { label: '북트레일러', href: '/portfolio/trailer' },
    ]
  },
  { label: '블로그', href: '/blog' },
  {
    label: '고객센터',
    children: [
      { label: 'FAQ', href: '/support/faq' },
      { label: '출판 가이드', href: '/support/guide' },
      { label: '원고 투고', href: '/support/submission' },
      { label: '온라인 교육', href: '/support/education' },
    ]
  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} ref={navRef}>
      <Link href="/" className={styles.logo}>
        <div className={styles.logoIcon}>⚡</div>
        <span className={styles.logoText}><em>마이티</em>북스</span>
      </Link>
      <ul className={styles.links}>
        {navItems.map((item) =>
          item.children ? (
            <li key={item.label} className={styles.dropWrap}>
              <button
                className={`${styles.dropTrigger} ${openMenu === item.label ? styles.dropTriggerActive : ''}`}
                onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
              >
                {item.label}
                <span className={styles.caret}>
                  {openMenu === item.label ? '▲' : '▼'}
                </span>
              </button>
              {openMenu === item.label && (
                <div className={styles.dropdown}>
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={styles.dropItem}
                      onClick={() => setOpenMenu(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ) : (
            <li key={item.label}>
              <Link href={item.href} className={styles.link}>{item.label}</Link>
            </li>
          )
        )}
      </ul>
      <div className={styles.social}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
        <a href="https://open.kakao.com/me/mightybooks" target="_blank" rel="noopener noreferrer">Ka</a>
      </div>
    </nav>
  )
}