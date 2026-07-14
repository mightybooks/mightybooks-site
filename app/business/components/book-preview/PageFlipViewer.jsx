'use client'

import HTMLFlipBook from 'react-pageflip'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styles from './bookPreview.module.css'

const DEFAULT_PAGE_RATIO = 1245 / 1819

const PreviewPage = forwardRef(function PreviewPage({ src, index }, ref) {
  return (
    <div ref={ref} className={styles.bookPage} data-density="soft">
      {/* react-pageflip은 실제 DOM img 크기를 기준으로 페이지를 렌더링합니다. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`마이티북스 실제 제작 도서 내지 ${index + 1}페이지`}
        width="1245"
        height="1819"
        loading={index < 2 ? 'eager' : 'lazy'}
        draggable="false"
      />
    </div>
  )
})

const PageFlipViewer = forwardRef(function PageFlipViewer({ pages, onPageChange }, ref) {
  const bookRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 360, height: 526 })

  useEffect(() => {
    const updateDimensions = () => {
      const isNarrow = window.innerWidth <= 768
      const horizontalLimit = isNarrow
        ? window.innerWidth - 40
        : (window.innerWidth - 140) / 2
      const availableBookHeight = Math.max(100, window.innerHeight - (isNarrow ? 190 : 205))
      const verticalLimit = availableBookHeight * DEFAULT_PAGE_RATIO
      const width = Math.max(68, Math.floor(Math.min(horizontalLimit, verticalLimit, 480)))

      setDimensions({ width, height: Math.round(width / DEFAULT_PAGE_RATIO) })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useImperativeHandle(ref, () => ({
    flipPrev: () => bookRef.current?.pageFlip()?.flipPrev('top'),
    flipNext: () => bookRef.current?.pageFlip()?.flipNext('top'),
  }), [])

  const preloadNearbyPages = (pageIndex) => {
    pages.slice(pageIndex + 1, pageIndex + 4).forEach((src) => {
      const image = new window.Image()
      image.src = src
    })
  }

  return (
    <div className={styles.bookStage}>
      <HTMLFlipBook
        key={`${dimensions.width}-${dimensions.height}`}
        ref={bookRef}
        width={dimensions.width}
        height={dimensions.height}
        size="fixed"
        startPage={0}
        drawShadow
        flippingTime={850}
        usePortrait
        autoSize
        maxShadowOpacity={0.35}
        showCover={false}
        mobileScrollSupport
        swipeDistance={24}
        useMouseEvents
        clickEventForward={false}
        renderOnlyPageLengthChange
        className={styles.flipBook}
        style={{}}
        startZIndex={0}
        onInit={() => preloadNearbyPages(0)}
        onFlip={(event) => {
          const nextPage = Number(event.data)
          onPageChange(nextPage)
          preloadNearbyPages(nextPage)
        }}
      >
        {pages.map((src, index) => (
          <PreviewPage key={src} src={src} index={index} />
        ))}
      </HTMLFlipBook>
    </div>
  )
})

export default PageFlipViewer
