'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import styles from './bookPreview.module.css'

const BookPreviewModal = dynamic(() => import('./BookPreviewModal'), {
  ssr: false,
  loading: () => <div className={styles.loadingOverlay} aria-label="도서 미리보기를 불러오는 중" />,
})

export default function BookPreviewTrigger({ book }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)

  const closePreview = () => {
    setIsOpen(false)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  return (
    <div className={styles.previewBlock}>
      <div className={styles.previewCopy}>
        <span className={styles.eyebrow}>Inside the Book</span>
        <h3>{book.title}</h3>
        <p>{book.description || '책장을 넘겨 실제 제작 도서의 내지 구성과 편집 흐름을 확인해 보세요.'}</p>
        <p className={styles.previewNote}>아래 도서는 실제 제작 사례 중 하나입니다. 편집과 디자인은 원고의 성격, 독자, 판형과 제작 목적에 따라 달라집니다.</p>
      </div>

      <button
        ref={triggerRef}
        type="button"
        className={styles.coverButton}
        onClick={() => setIsOpen(true)}
        aria-label={`${book.title} 열기`}
        aria-haspopup="dialog"
      >
        <span className={styles.coverGlow} aria-hidden="true" />
        <Image
          src={book.cover}
          alt={book.coverAlt || '마이티북스 실제 제작 도서 3D 표지'}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 78vw, 380px"
          className={styles.coverImage}
        />
        <span className={styles.clickHint}>
          <BookOpen size={18} aria-hidden="true" />
          클릭해서 내지 보기
        </span>
        <span className={styles.pageHint} aria-hidden="true">
          <ChevronLeft size={16} />
          <span>{book.pages.length} pages</span>
          <ChevronRight size={16} />
        </span>
      </button>

      {isOpen && <BookPreviewModal book={book} onClose={closePreview} />}
    </div>
  )
}
