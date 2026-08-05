'use client'

import { ChevronLeft, ChevronRight, Maximize, Minus, Plus, Volume2, VolumeX, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import LibraryFlipbookViewer from './LibraryFlipbookViewer'
import styles from './libraryFlipbook.module.css'

const subscribeToClientMount = () => () => {}
const PAGE_TURN_SOUND_STORAGE_KEY = 'mightybooks-library-page-turn-sound'
const PAGE_TURN_SOUND_CHANGE_EVENT = 'mightybooks-library-page-turn-sound-change'
const subscribeToSoundSetting = (callback) => {
  window.addEventListener('storage', callback)
  window.addEventListener(PAGE_TURN_SOUND_CHANGE_EVENT, callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(PAGE_TURN_SOUND_CHANGE_EVENT, callback)
  }
}
const getSoundSettingSnapshot = () => {
  try {
    return window.localStorage.getItem(PAGE_TURN_SOUND_STORAGE_KEY) === 'off'
  } catch {
    return false
  }
}

export default function LibraryFlipbookModal({
  title,
  pages,
  mode,
  watermark,
  onPageRangeNeeded,
  pageLoadError,
  onClose,
}) {
  const mounted = useSyncExternalStore(subscribeToClientMount, () => true, () => false)
  const isSoundMuted = useSyncExternalStore(
    subscribeToSoundSetting,
    getSoundSettingSnapshot,
    () => false
  )
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const viewerRef = useRef(null)
  const pageTurnAudioRef = useRef(null)
  const soundMutedRef = useRef(isSoundMuted)
  const lastSoundTimeRef = useRef(0)
  const pendingPageRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [pendingPage, setPendingPage] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [viewerReady, setViewerReady] = useState(false)
  const isReaderMode = mode === 'reader'
  const modeLabel = isReaderMode ? 'Full book reader' : 'High-resolution sample'
  const closeLabel = isReaderMode ? '전체 도서 닫기' : '샘플 닫기'
  const dialogTitleId = isReaderMode ? 'library-reader-title' : 'library-sample-title'
  const totalPages = pages.length
  const displayedPageIndex = pendingPage ?? currentPage
  const currentPageNumber = totalPages > 0
    ? Math.min(displayedPageIndex + 1, totalPages)
    : 0
  const progressPercent = totalPages > 0
    ? (currentPageNumber / totalPages) * 100
    : 0
  const safeProgressPercent = Math.min(100, Math.max(0, progressPercent))

  const previous = useCallback(() => viewerRef.current?.flipPrev(), [])
  const next = useCallback(() => viewerRef.current?.flipNext(), [])
  const playPageTurnSound = useCallback(() => {
    const audio = pageTurnAudioRef.current
    if (!audio || soundMutedRef.current) return

    const now = Date.now()
    if (now - lastSoundTimeRef.current < 120) return
    lastSoundTimeRef.current = now
    audio.pause()
    audio.currentTime = 0
    const playPromise = audio.play()
    playPromise?.catch?.(() => {})
  }, [])
  const handlePageChange = useCallback((pageIndex, { shouldPlaySound } = {}) => {
    setCurrentPage(pageIndex)
    pendingPageRef.current = null
    setPendingPage(null)
    if (shouldPlaySound) playPageTurnSound()
  }, [playPageTurnSound])
  const toggleSound = useCallback(() => {
    const nextValue = !isSoundMuted
    soundMutedRef.current = nextValue
    if (nextValue) pageTurnAudioRef.current?.pause()
    try {
      window.localStorage.setItem(
        PAGE_TURN_SOUND_STORAGE_KEY,
        nextValue ? 'off' : 'on'
      )
      window.dispatchEvent(new Event(PAGE_TURN_SOUND_CHANGE_EVENT))
    } catch {}
  }, [isSoundMuted])
  const updatePendingPage = useCallback((event) => {
    const nextPage = Math.min(
      Math.max(totalPages - 1, 0),
      Math.max(0, Number(event.target.value))
    )
    pendingPageRef.current = nextPage
    setPendingPage(nextPage)
  }, [totalPages])
  const commitPendingPage = useCallback(() => {
    const targetPage = pendingPageRef.current
    pendingPageRef.current = null
    setPendingPage(null)
    if (targetPage === null || targetPage === currentPage) return
    viewerRef.current?.turnToPage(targetPage)
  }, [currentPage])
  const cancelPendingPage = useCallback(() => {
    pendingPageRef.current = null
    setPendingPage(null)
  }, [])
  const zoomOut = () => setZoom((value) => Math.max(1, Number((value - .25).toFixed(2))))
  const zoomIn = () => setZoom((value) => Math.min(3, Number((value + .25).toFixed(2))))

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await dialogRef.current?.requestFullscreen?.()
    } else {
      await document.exitFullscreen?.()
    }
  }

  useEffect(() => {
    soundMutedRef.current = isSoundMuted
  }, [isSoundMuted])

  useEffect(() => {
    if (!isReaderMode) return
    onPageRangeNeeded?.(currentPage)
  }, [currentPage, isReaderMode, onPageRangeNeeded])

  useEffect(() => {
    const audio = new Audio('/library/audio/page-turn.mp3')
    audio.preload = 'auto'
    audio.volume = .35
    pageTurnAudioRef.current = audio

    return () => {
      audio.pause()
      pageTurnAudioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase()
      if (isReaderMode && (event.ctrlKey || event.metaKey) && (key === 's' || key === 'p')) {
        event.preventDefault()
        return
      }
      if (event.key === 'Escape' && !document.fullscreenElement) onClose()
      if (event.target instanceof HTMLInputElement && event.target.type === 'range') return
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isReaderMode, mounted, next, onClose, previous])

  useEffect(() => {
    if (!mounted || !isReaderMode) return

    const dialog = dialogRef.current
    if (!dialog) return

    const preventCopyOrSave = (event) => event.preventDefault()
    const restrictedEvents = [
      'contextmenu',
      'copy',
      'cut',
      'dragstart',
      'selectstart',
    ]

    restrictedEvents.forEach((eventName) => {
      dialog.addEventListener(eventName, preventCopyOrSave)
    })

    return () => {
      restrictedEvents.forEach((eventName) => {
        dialog.removeEventListener(eventName, preventCopyOrSave)
      })
    }
  }, [isReaderMode, mounted])

  if (!mounted) return null

  return createPortal(
    <div
      className={`${styles.backdrop} ${isReaderMode ? styles.readerBackdrop : ''}`}
      onMouseDown={onClose}
      role="presentation"
    >
      <section
        ref={dialogRef}
        className={`${styles.dialog} ${isReaderMode ? styles.copyRestricted : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <span>{modeLabel}</span>
            <h2 id={dialogTitleId}>{title}</h2>
          </div>
          <div className={styles.headerTools}>
            <button type="button" onClick={toggleFullscreen} aria-label="전체화면 전환" title="전체화면">
              <Maximize size={19} aria-hidden="true" />
            </button>
            <button ref={closeRef} type="button" onClick={onClose} aria-label={closeLabel} title="닫기">
              <X size={21} aria-hidden="true" />
            </button>
          </div>
        </header>

        <LibraryFlipbookViewer
          ref={viewerRef}
          title={title}
          pages={pages}
          mode={mode}
          watermark={isReaderMode ? watermark : null}
          loadCenterPage={displayedPageIndex}
          zoom={zoom}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onReadyChange={setViewerReady}
          pageLoadError={pageLoadError}
          onRetryPage={() => onPageRangeNeeded?.(currentPage)}
        />

        <footer className={styles.controls}>
          <div className={styles.paging}>
            <button type="button" onClick={previous} disabled={!viewerReady || currentPage === 0}>
              <ChevronLeft size={19} aria-hidden="true" /> 이전
            </button>
            <p aria-live="polite"><strong>{currentPageNumber}</strong> / {totalPages}</p>
            <button type="button" onClick={next} disabled={!viewerReady || currentPage === totalPages - 1}>
              다음 <ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.utilityControls}>
            <button
              type="button"
              className={styles.soundButton}
              onClick={toggleSound}
              aria-label={isSoundMuted ? '페이지 넘김 소리 켜기' : '페이지 넘김 소리 끄기'}
              aria-pressed={isSoundMuted}
              title={isSoundMuted ? '페이지 넘김 소리 켜기' : '페이지 넘김 소리 끄기'}
              data-muted={isSoundMuted}
            >
              {isSoundMuted
                ? <VolumeX size={18} aria-hidden="true" />
                : <Volume2 size={18} aria-hidden="true" />}
            </button>
            <div className={styles.zoomControls} aria-label="확대 및 축소">
              <button type="button" onClick={zoomOut} disabled={zoom === 1} aria-label="축소"><Minus size={18} /></button>
              <span>{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={zoomIn} disabled={zoom === 3} aria-label="확대"><Plus size={18} /></button>
            </div>
          </div>
          <div className={styles.readingProgress}>
            <div className={styles.progressLabels}>
              <span>{currentPageNumber} / {totalPages}</span>
              <span>{Math.round(safeProgressPercent)}%</span>
            </div>
            <input
              className={styles.progressRange}
              type="range"
              min="0"
              max={Math.max(totalPages - 1, 0)}
              step="1"
              value={displayedPageIndex}
              disabled={!viewerReady || totalPages <= 1}
              aria-label={isReaderMode ? '전체 도서에서 읽을 페이지 선택' : '샘플에서 읽을 페이지 선택'}
              aria-valuetext={`${currentPageNumber} / ${totalPages}페이지, ${Math.round(safeProgressPercent)}%`}
              style={{ '--reading-progress': `${safeProgressPercent}%` }}
              onChange={updatePendingPage}
              onPointerUp={commitPendingPage}
              onPointerCancel={cancelPendingPage}
              onKeyUp={commitPendingPage}
              onBlur={commitPendingPage}
            />
            <p>남은 페이지 {Math.max(totalPages - currentPageNumber, 0)}쪽</p>
          </div>
        </footer>
        <p className={styles.hint}>
          좌우 버튼·방향키·스와이프로 넘기고, 확대 후 스크롤해 읽을 수 있습니다.
          {isReaderMode ? ' 전체본에는 복사·저장 제한이 적용됩니다.' : ''}
        </p>
      </section>
    </div>,
    document.body
  )
}
