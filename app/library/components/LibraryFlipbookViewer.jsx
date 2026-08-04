'use client'

import HTMLFlipBook from 'react-pageflip'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import styles from './libraryFlipbook.module.css'

const LibraryPage = forwardRef(function LibraryPage(
  { page, index, bookTitle, mode, shouldLoad, isPriority, onFirstPageLoad },
  ref
) {
  const pageModeLabel = mode === 'reader' ? '전체본' : '샘플'

  return (
    <div ref={ref} className={styles.page} data-density="soft">
      {shouldLoad ? (
        <>
          {/* 원본 이미지를 브라우저가 직접 불러오도록 next/image를 사용하지 않습니다. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.src}
            width={page.width}
            height={page.height}
            alt={`${bookTitle} ${pageModeLabel} ${index + 1}페이지`}
            loading={isPriority ? 'eager' : 'lazy'}
            fetchPriority={isPriority ? 'high' : 'auto'}
            draggable="false"
            onLoad={index === 0 ? onFirstPageLoad : undefined}
          />
        </>
      ) : (
        <div className={styles.pagePlaceholder} aria-hidden="true" />
      )}
    </div>
  )
})

const LibraryFlipbookViewer = forwardRef(function LibraryFlipbookViewer(
  {
    pages,
    title,
    mode,
    loadCenterPage,
    zoom,
    currentPage,
    onPageChange,
    onReadyChange,
  },
  ref
) {
  const bookRef = useRef(null)
  const viewportRef = useRef(null)
  const initializedRef = useRef(false)
  const readyRef = useRef(false)
  const onReadyChangeRef = useRef(onReadyChange)
  const lastPageRef = useRef(currentPage)
  const baseSizeRef = useRef({ width: 320, height: 453 })
  const [firstPageLoaded, setFirstPageLoaded] = useState(false)
  const [baseSize, setBaseSize] = useState({ width: 320, height: 453 })
  const ratio = pages[0].width / pages[0].height
  const isReaderMode = mode === 'reader'
  const safeLoadCenterPage = Math.min(
    pages.length - 1,
    Math.max(0, loadCenterPage)
  )

  useEffect(() => {
    onReadyChangeRef.current = onReadyChange
  }, [onReadyChange])

  useEffect(() => {
    const updateSize = () => {
      const viewport = viewportRef.current
      if (!viewport) return
      const availableWidth = Math.max(220, viewport.clientWidth - 28)
      const availableHeight = Math.max(280, viewport.clientHeight - 28)
      const width = Math.floor(Math.min(availableWidth, availableHeight * ratio, 680))
      const nextSize = { width, height: Math.round(width / ratio) }
      const previousSize = baseSizeRef.current

      if (
        nextSize.width === previousSize.width &&
        nextSize.height === previousSize.height
      ) return

      baseSizeRef.current = nextSize
      readyRef.current = false
      initializedRef.current = false
      onReadyChangeRef.current?.(false)
      setBaseSize(nextSize)
    }
    updateSize()
    const observer = new ResizeObserver(updateSize)
    if (viewportRef.current) observer.observe(viewportRef.current)
    return () => observer.disconnect()
  }, [ratio])

  useEffect(() => {
    if (zoom !== 1) return
    viewportRef.current?.scrollTo({ top: 0, left: 0 })
  }, [zoom])

  useEffect(() => {
    if (isReaderMode) return undefined

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
  }, [isReaderMode, pages])

  useImperativeHandle(ref, () => ({
    flipPrev: () => {
      if (!readyRef.current) return
      bookRef.current?.pageFlip()?.flipPrev('top')
    },
    flipNext: () => {
      if (!readyRef.current) return
      bookRef.current?.pageFlip()?.flipNext('top')
    },
    turnToPage: (pageIndex) => {
      if (!readyRef.current) return
      bookRef.current?.pageFlip()?.turnToPage(pageIndex)
    },
    isReady: () => readyRef.current,
  }), [])

  const scaledWidth = Math.round(baseSize.width * zoom)
  const scaledHeight = Math.round(baseSize.height * zoom)
  const handleInit = useCallback((event) => {
    const activeInstance = bookRef.current?.pageFlip?.()
    if (!activeInstance || event?.object !== activeInstance) return

    lastPageRef.current = currentPage
    initializedRef.current = true
    readyRef.current = true
    onReadyChangeRef.current?.(true)
  }, [currentPage])
  const handleFlip = useCallback((event) => {
    const nextPage = Number(event.data)
    if (!Number.isFinite(nextPage)) return

    const safeNextPage = Math.min(pages.length - 1, Math.max(0, nextPage))
    const didPageChange = safeNextPage !== lastPageRef.current
    if (!didPageChange) return

    lastPageRef.current = safeNextPage
    onPageChange(safeNextPage, {
      shouldPlaySound: initializedRef.current,
    })
  }, [onPageChange, pages.length])
  const handleFirstPageLoad = useCallback(() => setFirstPageLoaded(true), [])
  const pageElements = useMemo(() => pages.map((page, index) => {
    const shouldLoad = !isReaderMode || index === 0 || (
      index >= safeLoadCenterPage - 2 &&
      index <= safeLoadCenterPage + 4
    )

    return (
      <LibraryPage
        key={`${mode}-${index}`}
        page={page}
        index={index}
        bookTitle={title}
        mode={mode}
        shouldLoad={shouldLoad}
        isPriority={index === 0 || index === safeLoadCenterPage}
        onFirstPageLoad={handleFirstPageLoad}
      />
    )
  }), [
    handleFirstPageLoad,
    isReaderMode,
    mode,
    pages,
    safeLoadCenterPage,
    title,
  ])

  return (
    <div ref={viewportRef} className={`${styles.viewport} ${zoom > 1 ? styles.zoomed : ''}`}>
      {!firstPageLoaded && <div className={styles.loading} role="status">첫 페이지를 불러오는 중입니다.</div>}
      <div className={styles.zoomStage}>
        <div className={styles.zoomCanvas} style={{ width: scaledWidth, height: scaledHeight }}>
          <div
            className={styles.singlePageFrame}
            style={{
              width: baseSize.width,
              height: baseSize.height,
              transform: `scale(${zoom})`,
            }}
          >
            <HTMLFlipBook
              key={`${baseSize.width}-${baseSize.height}`}
              ref={bookRef}
              width={baseSize.width}
              height={baseSize.height}
              minWidth={baseSize.width}
              maxWidth={baseSize.width}
              minHeight={baseSize.height}
              maxHeight={baseSize.height}
              size="fixed"
              startPage={currentPage}
              drawShadow
              flippingTime={650}
              usePortrait
              autoSize={false}
              maxShadowOpacity={0.25}
              showCover={false}
              mobileScrollSupport
              swipeDistance={24}
              useMouseEvents
              clickEventForward={false}
              renderOnlyPageLengthChange={!isReaderMode}
              disableFlipByClick={false}
              className={styles.flipbook}
              style={{}}
              startZIndex={0}
              onInit={handleInit}
              onFlip={handleFlip}
            >
              {pageElements}
            </HTMLFlipBook>
          </div>
        </div>
      </div>
    </div>
  )
})

export default LibraryFlipbookViewer
