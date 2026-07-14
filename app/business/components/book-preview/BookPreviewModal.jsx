'use client'

import dynamic from 'next/dynamic'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import styles from './bookPreview.module.css'

const PageFlipViewer = dynamic(() => import('./PageFlipViewer'), {
  ssr: false,
  loading: () => <div className={styles.viewerLoading}>책장을 준비하고 있습니다.</div>,
})

const subscribeToClientMount = () => () => {}

export default function BookPreviewModal({ book, onClose }) {
  const mounted = useSyncExternalStore(subscribeToClientMount, () => true, () => false)
  const closeButtonRef = useRef(null)
  const viewerRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)

  const showPrevious = useCallback(() => viewerRef.current?.flipPrev(), [])
  const showNext = useCallback(() => viewerRef.current?.flipNext(), [])

  useEffect(() => {
    if (!mounted) return

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mounted, onClose, showNext, showPrevious])

  if (!mounted) return null

  return createPortal(
    <div
      className={styles.modalBackdrop}
      role="presentation"
      onMouseDown={onClose}
    >
      <div className={styles.modalPositioner}>
        <section
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${book.id}-preview-title`}
          onMouseDown={(event) => event.stopPropagation()}
        >
        <header className={styles.modalHeader}>
          <div>
            <span className={styles.modalEyebrow}>Book Preview</span>
            <h2 id={`${book.id}-preview-title`}>{book.title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="도서 미리보기 닫기"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.viewerArea}>
          <PageFlipViewer
            ref={viewerRef}
            pages={book.pages}
            onPageChange={setCurrentPage}
          />
        </div>

        <footer className={styles.controls}>
          <button
            type="button"
            onClick={showPrevious}
            disabled={currentPage === 0}
            aria-label="이전 페이지 보기"
          >
            <ChevronLeft size={20} aria-hidden="true" />
            <span>이전</span>
          </button>
          <p aria-live="polite" aria-atomic="true">
            <strong>{Math.min(currentPage + 1, book.pages.length)}</strong>
            <span> / {book.pages.length}</span>
          </p>
          <button
            type="button"
            onClick={showNext}
            disabled={currentPage >= book.pages.length - 1}
            aria-label="다음 페이지 보기"
          >
            <span>다음</span>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </footer>
        <p className={styles.gestureHint}>페이지를 드래그하거나 좌우로 밀어 책장을 넘겨 보세요.</p>
        </section>
      </div>
    </div>,
    document.body
  )
}
