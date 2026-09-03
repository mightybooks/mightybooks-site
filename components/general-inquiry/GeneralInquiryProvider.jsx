'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './generalInquiry.module.css'

const GeneralInquiryContext = createContext(null)
const INITIAL_FORM = { email: '', phone: '', message: '', website: '' }

export function GeneralInquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState('웹사이트 일반 문의')
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const dialogRef = useRef(null)
  const emailRef = useRef(null)
  const successCloseRef = useRef(null)
  const triggerRef = useRef(null)
  const abortRef = useRef(null)

  const closeInquiry = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setIsOpen(false)
    setForm(INITIAL_FORM)
    setStatus('idle')
    setFeedback('')
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const openInquiry = (trigger, nextSource) => {
    triggerRef.current = trigger
    setSource(nextSource || '웹사이트 일반 문의')
    setForm(INITIAL_FORM)
    setStatus('idle')
    setFeedback('')
    setIsOpen(true)
  }

  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => emailRef.current?.focus())

    const handleKeydown = event => {
      if (event.key === 'Escape') {
        closeInquiry()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll(
        'button:not(:disabled), input:not(:disabled):not([tabindex="-1"]), textarea:not(:disabled)'
      )
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
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [closeInquiry, isOpen])

  useEffect(() => {
    if (isOpen && status === 'success') {
      const frame = requestAnimationFrame(() => successCloseRef.current?.focus())
      return () => cancelAnimationFrame(frame)
    }
    return undefined
  }, [isOpen, status])

  const updateField = event => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const submitInquiry = async event => {
    event.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setFeedback('')
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch('/api/general-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
        signal: controller.signal,
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || '문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.')
      setStatus('success')
      setFeedback('문의가 정상적으로 전송되었습니다.')
    } catch (error) {
      if (error.name === 'AbortError') return
      setStatus('error')
      setFeedback(error.message || '문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      abortRef.current = null
    }
  }

  return (
    <GeneralInquiryContext.Provider value={openInquiry}>
      {children}
      {isOpen && (
        <div className={styles.overlay} onMouseDown={event => { if (event.target === event.currentTarget) closeInquiry() }}>
          <div
            ref={dialogRef}
            id="general-inquiry-dialog"
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="general-inquiry-title"
            aria-describedby="general-inquiry-description"
          >
            <div className={styles.header}>
              <div>
                <span>Publishing Inquiry</span>
                <h2 id="general-inquiry-title">이메일 문의</h2>
              </div>
              <button type="button" className={styles.close} onClick={closeInquiry} aria-label="문의 창 닫기">×</button>
            </div>
            <div className={styles.body}>
              <p id="general-inquiry-description" className={styles.description}>
                남겨주신 이메일로 제작 상담 내용을 회신해 드립니다.
              </p>
              {status === 'success' ? (
                <div className={styles.success} role="status">
                  <p>{feedback}</p>
                  <button ref={successCloseRef} type="button" onClick={closeInquiry}>닫기</button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={submitInquiry}>
                  <label htmlFor="general-inquiry-email">회신받을 이메일</label>
                  <input
                    ref={emailRef}
                    id="general-inquiry-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    maxLength={254}
                    placeholder="example@email.com"
                    autoComplete="email"
                    required
                  />
                  <label htmlFor="general-inquiry-phone">전화번호 <span>(선택)</span></label>
                  <input
                    id="general-inquiry-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    maxLength={50}
                    placeholder="010-0000-0000"
                    autoComplete="tel"
                  />
                  <label htmlFor="general-inquiry-message">문의 내용</label>
                  <textarea
                    id="general-inquiry-message"
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    maxLength={3000}
                    rows={7}
                    placeholder="문의하실 내용을 자유롭게 작성해 주세요."
                    required
                  />
                  <label className={styles.honeypot} aria-hidden="true">
                    웹사이트
                    <input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" />
                  </label>
                  <button className={styles.submit} type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? '보내는 중...' : '문의 보내기'}
                  </button>
                  {feedback && <p className={styles.feedback} role="alert">{feedback}</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </GeneralInquiryContext.Provider>
  )
}

export function GeneralInquiryTrigger({ children, className, source, ariaLabel }) {
  const openInquiry = useContext(GeneralInquiryContext)

  return (
    <a
      href="#general-inquiry-dialog"
      className={className}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      onClick={event => {
        event.preventDefault()
        openInquiry?.(event.currentTarget, source)
      }}
    >
      {children}
    </a>
  )
}
