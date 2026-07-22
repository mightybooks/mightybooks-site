'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import BookPreviewModal from './business/components/book-preview/BookPreviewModal'
import {
  autobiographyPreview,
  companyBookletPreview,
  poetryPreview,
  selfPublishingPreview,
} from './business/components/book-preview/bookPreviews'
import styles from './page.module.css'

const cases = [
  { type: '자서전·회고록', title: '실제 제작 자서전', process: '원고 정리 · 편집 · 표지·내지 디자인 · 인쇄', book: autobiographyPreview },
  { type: '시집·문집', title: '실제 제작 시집', process: '원고 편집 · 교정 · 표지·내지 디자인', book: poetryPreview },
  { type: '전문서·실용서', title: '실제 제작 전문·실용 도서', process: '구성 검토 · 편집 · 디자인 · 정식 출판', book: selfPublishingPreview },
  { type: '기관·기업 소책자', title: '실제 제작 기업 소책자', process: '자료 정리 · 편집 · 디자인 · 인쇄', book: companyBookletPreview },
  { type: '전자책·웹북', title: '전자책·웹북 제작', process: '원고 변환 · 화면 편집 · 파일 제작', img: '/image/home/surimji_cover3d.png', externalHref: 'https://surimstudio.com/edition/surimji/issue-0' },
]

export default function HomeProductionCases() {
  const [selectedBook, setSelectedBook] = useState(null)
  const lastTriggerRef = useRef(null)

  const openPreview = (book, trigger) => {
    lastTriggerRef.current = trigger
    setSelectedBook(book)
  }

  const closePreview = () => {
    setSelectedBook(null)
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }

  return (
    <>
      <div className={styles.bookGrid}>
        {cases.map((item) => {
          const image = item.book?.cover || item.img
          const content = <><div className={styles.bookImg}><Image src={image} alt={`${item.title} 3D 표지`} fill sizes="260px" /><span className={styles.bookNum}>{item.type}</span></div><div className={styles.bookInfo}><div className={styles.bookGenre}>{item.type}</div><h3 className={styles.bookTitle}>{item.title}</h3><p className={styles.bookAuthor}>{item.process}</p>{item.book && <span className={styles.previewLink}>3D 표지·{item.book.pages.length}페이지 내지 보기 →</span>}{item.externalHref && <span className={styles.previewLink}>수림지 웹북 바로 보기 →</span>}</div></>

          return item.book ? (
            <button key={item.type} type="button" className={`${styles.bookCard} ${styles.previewCardButton}`} onClick={(event) => openPreview(item.book, event.currentTarget)} aria-haspopup="dialog" aria-label={`${item.title} 내지 미리보기 열기`}>
              {content}
            </button>
          ) : item.externalHref ? (
            <a key={item.type} href={item.externalHref} target="_blank" rel="noopener noreferrer" className={styles.bookCard} aria-label={`${item.title} 새 탭에서 열기`}>
              {content}
            </a>
          ) : (
            <article key={item.type} className={`${styles.bookCard} ${styles.staticBookCard}`}>{content}</article>
          )
        })}
      </div>
      {selectedBook && <BookPreviewModal book={selectedBook} onClose={closePreview} />}
    </>
  )
}
