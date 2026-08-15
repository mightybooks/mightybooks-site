'use client'

import Image from 'next/image'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import BookPreviewModalRouter from './BookPreviewModalRouter'
import RestrictedAccessModal from './RestrictedAccessModal'
import styles from './bookPreview.module.css'

export default function BookPreviewTrigger({ book, showFullViewNotice = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)
  const lastPreviewTriggerRef = useRef(null)
  const fullViewTriggerRef = useRef(null)

  const openPreview = (event) => {
    lastPreviewTriggerRef.current = event.currentTarget
    setIsOpen(true)
  }

  const closePreview = () => {
    setIsOpen(false)
    window.requestAnimationFrame(() => lastPreviewTriggerRef.current?.focus())
  }

  const closeNotice = () => {
    setIsNoticeOpen(false)
    window.requestAnimationFrame(() => fullViewTriggerRef.current?.focus())
  }

  return (
    <div className={styles.previewBlock}>
      <div className={styles.previewCopy}>
        <span className={styles.eyebrow}>Inside the Book</span>
        <h3>{book.title}</h3>
        <p>{book.description || '책장을 넘겨 실제 제작 도서의 내지 구성과 편집 흐름을 확인해 보세요.'}</p>
        <p className={styles.previewNote}>아래 도서는 실제 제작 사례 중 하나입니다. 편집과 디자인은 원고의 성격, 독자, 판형과 제작 목적에 따라 달라집니다.</p>
      </div>

      <div className={styles.previewVisual}>
        <button
          type="button"
          className={`${styles.coverButton} ${showFullViewNotice ? styles.coverButtonWithActions : ''}`}
          onClick={openPreview}
          aria-label={`${book.displayTitle || book.title} 내지 미리보기`}
          aria-haspopup="dialog"
        >
          <span className={styles.coverGlow} aria-hidden="true" />
          <Image
            src={book.cover}
            alt={book.coverAlt || '마이티북스 실제 제작 도서 3D 표지'}
            width={book.coverWidth || 1000}
            height={book.coverHeight || 1000}
            sizes="(max-width: 768px) 78vw, 380px"
            className={styles.coverImage}
          />
          {!showFullViewNotice && (
            <span className={styles.clickHint}>
              <BookOpen size={18} aria-hidden="true" />
              클릭해서 내지 보기
            </span>
          )}
          <span className={styles.pageHint} aria-hidden="true">
            <ChevronLeft size={16} />
            <span>{book.pages.length} pages</span>
            <ChevronRight size={16} />
          </span>
        </button>

        {showFullViewNotice && (
          <div className={styles.previewActions}>
            <button type="button" onClick={openPreview} aria-haspopup="dialog">
              <BookOpen size={18} aria-hidden="true" />
              샘플 미리 보기
            </button>
            <button
              ref={fullViewTriggerRef}
              type="button"
              onClick={() => setIsNoticeOpen(true)}
              aria-haspopup="dialog"
            >
              교육 자료 전체보기
            </button>
          </div>
        )}
      </div>

      {isOpen && <BookPreviewModalRouter book={book} onClose={closePreview} />}
      {isNoticeOpen && <RestrictedAccessModal onClose={closeNotice} />}
    </div>
  )
}
