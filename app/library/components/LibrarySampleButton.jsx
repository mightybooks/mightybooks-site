'use client'

import { useState } from 'react'
import LibraryFlipbookModal from './LibraryFlipbookModal'
import styles from '../library.module.css'

export default function LibrarySampleButton({ book }) {
  const [open, setOpen] = useState(false)
  const hasValidSample = Array.isArray(book.samplePages) &&
    book.samplePages.length > 0 &&
    book.samplePages.every(page => (
      page && typeof page.src === 'string' && page.src.length > 0 &&
      Number.isFinite(page.width) && page.width > 0 &&
      Number.isFinite(page.height) && page.height > 0
    ))

  if (!hasValidSample) {
    return <button type="button" className={styles.button} disabled>샘플 준비 중</button>
  }

  return (
    <>
      <button type="button" className={styles.button} onClick={() => setOpen(true)}>
        고화질 샘플 읽기
      </button>
      {open && (
        <LibraryFlipbookModal
          title={book.displayTitle}
          pages={book.samplePages}
          mode="sample"
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
