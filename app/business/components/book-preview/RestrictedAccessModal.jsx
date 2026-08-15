'use client'

import { X } from 'lucide-react'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import styles from './bookPreview.module.css'

const subscribeToClientMount = () => () => {}

export default function RestrictedAccessModal({ onClose }) {
  const mounted = useSyncExternalStore(subscribeToClientMount, () => true, () => false)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!mounted) return

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mounted, onClose])

  if (!mounted) return null

  return createPortal(
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.accessModal}
        role="dialog"
        aria-modal="true"
        aria-label="교육 자료 전체보기 안내"
        aria-describedby="restricted-access-message"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.accessModalIconClose}
          onClick={onClose}
          aria-label="교육 자료 전체보기 안내 닫기"
        >
          <X size={22} aria-hidden="true" />
        </button>
        <span className={styles.modalEyebrow}>Full Book Access</span>
        <p id="restricted-access-message">
          해당 도서 전체 열람은 관련 업체 직원만 열람할 수 있습니다.
        </p>
        <button
          type="button"
          className={styles.accessModalClose}
          onClick={onClose}
          aria-label="안내 팝업 닫기"
        >
          닫기
        </button>
      </section>
    </div>,
    document.body
  )
}
