'use client'

import HTMLFlipBook from 'react-pageflip'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styles from './libraryFlipbook.module.css'

const LibraryPage = forwardRef(function LibraryPage({ page, index, bookTitle, onFirstPageLoad }, ref) {
  return (
    <div ref={ref} className={styles.page} data-density="soft">
      {/* 원본 PNG를 브라우저가 직접 불러오도록 next/image를 사용하지 않습니다. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={page.src}
        width={page.width}
        height={page.height}
        alt={`${bookTitle} 샘플 ${index + 1}페이지`}
        loading={index === 0 ? 'eager' : 'lazy'}
        fetchPriority={index === 0 ? 'high' : 'auto'}
        draggable="false"
        onLoad={index === 0 ? onFirstPageLoad : undefined}
      />
    </div>
  )
})

const LibraryFlipbookViewer = forwardRef(function LibraryFlipbookViewer(
  { pages, title, zoom, currentPage, onPageChange },
  ref
) {
  const bookRef = useRef(null)
  const viewportRef = useRef(null)
  const initializedRef = useRef(false)
  const lastPageRef = useRef(currentPage)
  const [firstPageLoaded, setFirstPageLoaded] = useState(false)
  const [baseSize, setBaseSize] = useState({ width: 320, height: 453 })
  const ratio = pages[0].width / pages[0].height

  useEffect(() => {
    const updateSize = () => {
      const viewport = viewportRef.current
      if (!viewport) return
      const availableWidth = Math.max(220, viewport.clientWidth - 28)
      const availableHeight = Math.max(280, viewport.clientHeight - 28)
      const width = Math.floor(Math.min(availableWidth, availableHeight * ratio, 680))
      setBaseSize({ width, height: Math.round(width / ratio) })
    }
    updateSize()
    const observer = new ResizeObserver(updateSize)
    if (viewportRef.current) observer.observe(viewportRef.current)
    return () => observer.disconnect()
  }, [ratio])

  useEffect(() => {
    const preload = () => {
      pages.slice(1).forEach((page) => {
        const image = new window.Image()
        image.src = page.src
      })
    }
    const idleId = window.requestIdleCallback?.(preload)
    const timeoutId = window.requestIdleCallback ? null : window.setTimeout(preload, 0)
    return () => {
      if (idleId) window.cancelIdleCallback?.(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [pages])

  useImperativeHandle(ref, () => ({
    flipPrev: () => bookRef.current?.pageFlip()?.flipPrev('top'),
    flipNext: () => bookRef.current?.pageFlip()?.flipNext('top'),
    turnToPage: (pageIndex) => bookRef.current?.pageFlip()?.turnToPage(pageIndex),
  }), [])

  const width = Math.round(baseSize.width * zoom)
  const height = Math.round(baseSize.height * zoom)
  const handleInit = useCallback(() => {
    lastPageRef.current = currentPage
    initializedRef.current = true
  }, [currentPage])
  const handleFlip = useCallback((event) => {
    const nextPage = Number(event.data)
    if (!Number.isFinite(nextPage)) return

    const safeNextPage = Math.min(pages.length - 1, Math.max(0, nextPage))
    const didPageChange = safeNextPage !== lastPageRef.current
    lastPageRef.current = safeNextPage
    onPageChange(safeNextPage, {
      shouldPlaySound: initializedRef.current && didPageChange,
    })
  }, [onPageChange, pages.length])

  return (
    <div ref={viewportRef} className={`${styles.viewport} ${zoom > 1 ? styles.zoomed : ''}`}>
      {!firstPageLoaded && <div className={styles.loading} role="status">첫 페이지를 불러오는 중입니다.</div>}
      <div className={styles.singlePageFrame} style={{ width, height }}>
        <HTMLFlipBook
          key={`${width}-${height}`}
          ref={bookRef}
          width={width}
          height={height}
          minWidth={width}
          maxWidth={width}
          minHeight={height}
          maxHeight={height}
          size="fixed"
          startPage={currentPage}
          drawShadow
          flippingTime={zoom > 1 ? 280 : 650}
          usePortrait
          autoSize={false}
          maxShadowOpacity={0.25}
          showCover={false}
          mobileScrollSupport
          swipeDistance={24}
          useMouseEvents={zoom === 1}
          clickEventForward={false}
          renderOnlyPageLengthChange
          disableFlipByClick={zoom > 1}
          className={styles.flipbook}
          style={{}}
          startZIndex={0}
          onInit={handleInit}
          onFlip={handleFlip}
        >
          {pages.map((page, index) => (
            <LibraryPage
              key={page.src}
              page={page}
              index={index}
              bookTitle={title}
              onFirstPageLoad={() => setFirstPageLoaded(true)}
            />
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
})

export default LibraryFlipbookViewer
