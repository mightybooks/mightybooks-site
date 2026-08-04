'use client'

import dynamic from 'next/dynamic'
import styles from './bookPreview.module.css'

const LegacyBookPreviewModal = dynamic(() => import('./BookPreviewModal'), {
  ssr: false,
  loading: () => <div className={styles.loadingOverlay} aria-label="도서 미리보기를 불러오는 중" />,
})

const HighResolutionBookPreviewModal = dynamic(
  () => import('@/app/library/components/LibraryFlipbookModal'),
  {
    ssr: false,
    loading: () => <div className={styles.loadingOverlay} aria-label="고화질 도서 미리보기를 불러오는 중" />,
  }
)

export default function BookPreviewModalRouter({ book, onClose }) {
  if (book.highResolution) {
    return (
      <HighResolutionBookPreviewModal
        title={book.displayTitle || book.title}
        pages={book.samplePages || book.pages}
        mode="sample"
        onClose={onClose}
      />
    )
  }

  return <LegacyBookPreviewModal book={book} onClose={onClose} />
}
