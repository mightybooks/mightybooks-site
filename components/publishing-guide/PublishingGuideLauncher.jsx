'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import PublishingGuide from './PublishingGuide'
import styles from './publishingGuide.module.css'

const EXCLUDED_PREFIXES = [
  '/admin', '/account', '/my', '/mypage', '/auth', '/api', '/partner/dashboard', '/partner/login',
  '/partner/signup', '/partner/pending', '/library/books', '/checkout', '/payment',
]

function isExcludedPath(pathname) {
  return pathname === '/tools/publishing-guide' ||
    EXCLUDED_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)) ||
    pathname.includes('/reader') || pathname.includes('/resources/') || pathname.endsWith('/adoption')
}

export default function PublishingGuideLauncher() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const closeRef = useRef(null)
  const launcherRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    let shouldShow = false
    try {
      shouldShow = localStorage.getItem('mightybooks-publishing-guide-hint-closed') !== 'true'
    } catch { /* 저장소를 사용할 수 없으면 안내 말풍선을 생략합니다. */ }
    const frame = requestAnimationFrame(() => setShowHint(shouldShow))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKeydown = event => {
      if (event.key === 'Escape') {
        setOpen(false)
        requestAnimationFrame(() => launcherRef.current?.focus())
        return
      }
      if (event.key !== 'Tab') return
      const focusable = modalRef.current?.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled)')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [open])

  if (isExcludedPath(pathname)) return null

  const dismissHint = () => {
    setShowHint(false)
    try { localStorage.setItem('mightybooks-publishing-guide-hint-closed', 'true') } catch { /* 저장소를 사용할 수 없는 환경에서는 현재 화면에서만 닫습니다. */ }
  }

  const openGuide = () => {
    setOpen(true)
    dismissHint()
    window.dispatchEvent(new CustomEvent('publishing_guide_open', { detail: { source: 'floating_launcher' } }))
    if (typeof window.gtag === 'function') window.gtag('event', 'publishing_guide_open', { source: 'floating_launcher' })
  }

  const closeGuide = () => {
    setOpen(false)
    requestAnimationFrame(() => launcherRef.current?.focus())
  }

  return (
    <>
      <div className={styles.launcherWrap}>
        {showHint && (
          <div className={styles.launcherHint} role="status">
            <button type="button" aria-label="출판 길라잡이 안내 닫기" onClick={dismissHint}>×</button>
            <strong>책을 준비하고 계신가요?</strong>
            <span>원고 상태에 맞는 제작 방식을 확인해 보세요.</span>
          </div>
        )}
        <button ref={launcherRef} type="button" className={styles.launcher} onClick={openGuide} aria-haspopup="dialog">
          <span>GUIDE</span><strong>1분 출판 길라잡이</strong>
        </button>
      </div>
      {open && (
        <div className={styles.modalOverlay} onMouseDown={event => { if (event.target === event.currentTarget) closeGuide() }}>
          <div ref={modalRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="publishing-guide-dialog-title">
            <div className={styles.modalTop}>
              <span id="publishing-guide-dialog-title">출판 길라잡이</span>
              <button ref={closeRef} type="button" onClick={closeGuide} aria-label="출판 길라잡이 닫기">×</button>
            </div>
            <div className={styles.modalScroll}><PublishingGuide variant="modal" /></div>
          </div>
        </div>
      )}
    </>
  )
}
