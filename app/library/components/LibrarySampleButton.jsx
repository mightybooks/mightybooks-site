'use client'

import { useState } from 'react'
import LibraryFlipbookModal from './LibraryFlipbookModal'
import styles from '../library.module.css'

export default function LibrarySampleButton({ book }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" className={styles.button} onClick={() => setOpen(true)}>
        고화질 샘플 읽기
      </button>
      {open && <LibraryFlipbookModal book={book} onClose={() => setOpen(false)} />}
    </>
  )
}
