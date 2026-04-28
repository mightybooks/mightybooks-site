'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

const navItems = [
  {
    label: '출판상담',
    children: [
      { label: '검토 및 유료상담', href: '/support/diagnosis' },
      { label: '원고 접수 안내', href: '/support/submission' },
      { label: 'FAQ', href: '/support/faq' },
    ]
  },
  {
    label: '출판서비스',
    children: [
      { label: '자서전·기념 도서', href: '/business/autobiography' },
      { label: '시집·문집', href: '/business/poetry#poetry' },
      { label: '학원 교재·교구', href: '/business/poetry#textbook' },
      { label: '전자책', href: '/business/epub' },
    ]
  },
  {
    label: '워크숍',
    children: [
      { label: '500자 글쓰기 워크숍', href: '/workshop/500-character-fiction' },
      { label: '심화 교육', href: '/support/education' },
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
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
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
        setMobileOpen(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const closeMenus = () => {
    setOpenMenu(null)
    setMobileOpen(false)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} ref={navRef}>
      <Link href="/" className={styles.logo} onClick={closeMenus}>
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
                      onClick={closeMenus}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ) : (
            <li key={item.label}>
              <Link href={item.href} className={styles.link} onClick={closeMenus}>{item.label}</Link>
            </li>
          )
        )}
      </ul>
      <button
        type="button"
        className={styles.mobileToggle}
        aria-label="모바일 메뉴 열기"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        onClick={() => {
          setMobileOpen(open => !open)
          setOpenMenu(null)
        }}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={styles.social}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
        <a href="https://open.kakao.com/me/mightybooks" target="_blank" rel="noopener noreferrer">Ka</a>
      </div>
      <div
        id="mobile-nav"
        className={`${styles.mobilePanel} ${mobileOpen ? styles.mobilePanelOpen : ''}`}
      >
        {navItems.map(item => (
          <div key={item.label} className={styles.mobileGroup}>
            {item.children ? (
              <>
                <div className={styles.mobileGroupLabel}>{item.label}</div>
                <div className={styles.mobileChildren}>
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={styles.mobileItem}
                      onClick={closeMenus}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link href={item.href} className={styles.mobileTopLink} onClick={closeMenus}>
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
