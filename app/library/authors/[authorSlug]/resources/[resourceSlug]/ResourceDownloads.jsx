'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import styles from './page.module.css'

const subscribeToClientMount = () => () => {}
const INSTAGRAM_URL = 'https://www.instagram.com/hahaha_listen/'

export default function ResourceDownloads({ materials }) {
  const [isOpen, setIsOpen] = useState(false)
  const mounted = useSyncExternalStore(subscribeToClientMount, () => true, () => false)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)

  const closeModal = useCallback(() => setIsOpen(false), [])

  const openModal = (event) => {
    triggerRef.current = event.currentTarget
    setIsOpen(true)
  }

  useEffect(() => {
    if (!isOpen || !mounted) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      triggerRef.current?.focus()
    }
  }, [closeModal, isOpen, mounted])

  return (
    <>
      <div className={styles.downloadGrid}>
        {materials.map((material) => (
          <article className={styles.downloadCard} key={material.title}>
            <div>
              <p className={styles.pdfLabel}>PDF MATERIAL</p>
              <h3>{material.title}</h3>
              <p>{material.description}</p>
            </div>
            <button type="button" className={styles.downloadButton} onClick={openModal}>
              {material.buttonLabel}
              <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </div>

      {isOpen && mounted && createPortal(
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={closeModal}>
          <section
            ref={dialogRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="self-meditation-modal-title"
            aria-describedby="self-meditation-modal-description"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="개강 안내 닫기"
            >
              <span aria-hidden="true">×</span>
            </button>
            <p className={styles.modalEyebrow}>Class Notice</p>
            <h2 id="self-meditation-modal-title">개강 안내</h2>
            <p id="self-meditation-modal-description" className={styles.modalDescription}>
              9월 중 개강합니다.<br />
              자세한 안내를 원하시면, 저자님에게 DM을 보내보세요.
            </p>
            <a
              className={styles.instagramButton}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              인스타그램 DM 보내기
              <span aria-hidden="true">↗</span>
            </a>
          </section>
        </div>,
        document.body
      )}
    </>
  )
}
