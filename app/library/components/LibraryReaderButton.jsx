'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import LibraryFlipbookModal from './LibraryFlipbookModal'
import styles from '../library.module.css'

const NOT_FOUND_MESSAGE = '열람 가능한 전체 도서를 찾을 수 없습니다.'
const LOAD_ERROR_MESSAGE = '전체 도서를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'

function isValidReaderManifest(reader) {
  return Boolean(
    reader &&
    Number.isInteger(reader.pageCount) &&
    reader.pageCount >= 1 &&
    Number.isFinite(reader.width) &&
    reader.width > 0 &&
    Number.isFinite(reader.height) &&
    reader.height > 0 &&
    reader.pageWindowRadius === 2 &&
    typeof reader.sessionId === 'string' &&
    reader.sessionId.length > 0 &&
    typeof reader.watermark === 'string' &&
    reader.watermark.length > 0
  )
}

function isValidPageWindow(pageWindow, manifest) {
  const expiresAt = Date.parse(pageWindow?.expiresAt)

  return Boolean(
    pageWindow &&
    Number.isInteger(pageWindow.firstPage) &&
    Number.isInteger(pageWindow.lastPage) &&
    pageWindow.firstPage >= 0 &&
    pageWindow.lastPage < manifest.pageCount &&
    pageWindow.firstPage <= pageWindow.lastPage &&
    Number.isFinite(expiresAt) &&
    expiresAt > Date.now() &&
    Array.isArray(pageWindow.pages) &&
    pageWindow.pages.length === pageWindow.lastPage - pageWindow.firstPage + 1 &&
    pageWindow.pages.every((page, offset) => (
      page &&
      page.index === pageWindow.firstPage + offset &&
      typeof page.src === 'string' &&
      page.src.startsWith('https://') &&
      page.width === manifest.width &&
      page.height === manifest.height
    ))
  )
}

export default function LibraryReaderButton({ slug, title }) {
  const router = useRouter()
  const requestInFlightRef = useRef(false)
  const readerManifestRef = useRef(null)
  const pageExpiryRef = useRef(new Map())
  const pageRequestsRef = useRef(new Map())
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [pageLoadError, setPageLoadError] = useState('')
  const [readerManifest, setReaderManifest] = useState(null)

  const abortPageRequests = useCallback(() => {
    pageRequestsRef.current.forEach((controller) => controller.abort())
    pageRequestsRef.current.clear()
  }, [])

  const keepOnlyPageWindow = useCallback((firstPage, lastPage) => {
    pageExpiryRef.current.forEach((_expiresAt, pageIndex) => {
      if (pageIndex < firstPage || pageIndex > lastPage) {
        pageExpiryRef.current.delete(pageIndex)
      }
    })

    setReaderManifest((current) => {
      if (!current) return current

      let changed = false
      const nextPages = current.pages.map((page, pageIndex) => {
        if (pageIndex >= firstPage && pageIndex <= lastPage) return page
        if (!page.src) return page

        changed = true
        return {
          src: null,
          width: current.width,
          height: current.height,
        }
      })

      if (!changed) return current

      const nextManifest = { ...current, pages: nextPages }
      readerManifestRef.current = nextManifest
      return nextManifest
    })
  }, [])

  const loadReaderPages = useCallback(async (centerPage) => {
    const manifest = readerManifestRef.current
    if (!manifest || !Number.isInteger(centerPage)) return

    const firstPage = Math.max(0, centerPage - manifest.pageWindowRadius)
    const lastPage = Math.min(
      manifest.pageCount - 1,
      centerPage + manifest.pageWindowRadius
    )
    keepOnlyPageWindow(firstPage, lastPage)

    pageRequestsRef.current.forEach((controller, requestedCenter) => {
      if (requestedCenter !== centerPage) {
        controller.abort()
        pageRequestsRef.current.delete(requestedCenter)
      }
    })

    const refreshBefore = Date.now() + 30_000
    const hasFreshWindow = Array.from(
      { length: lastPage - firstPage + 1 },
      (_, offset) => firstPage + offset
    ).every((pageIndex) => (
      (pageExpiryRef.current.get(pageIndex) || 0) > refreshBefore
    ))

    if (hasFreshWindow || pageRequestsRef.current.has(centerPage)) return

    const controller = new AbortController()
    pageRequestsRef.current.set(centerPage, controller)
    setPageLoadError('')

    try {
      const query = new URLSearchParams({
        center: String(centerPage),
        session: manifest.sessionId,
      })
      const response = await fetch(
        `/api/account/books/${slug}/reader/pages?${query}`,
        {
          method: 'GET',
          credentials: 'same-origin',
          cache: 'no-store',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        }
      )

      if (response.status === 401) {
        abortPageRequests()
        readerManifestRef.current = null
        setReaderManifest(null)
        setStatus('idle')
        router.push(`/account/login?next=/library/books/${slug}`)
        return
      }

      const body = await response.json().catch(() => null)

      if (response.status === 404) {
        abortPageRequests()
        readerManifestRef.current = null
        setReaderManifest(null)
        setStatus('error')
        setErrorMessage(NOT_FOUND_MESSAGE)
        return
      }

      if (
        !response.ok ||
        body?.allowed !== true ||
        !isValidPageWindow(body.pageWindow, manifest)
      ) {
        throw new Error('Invalid reader page window')
      }

      const expiresAt = Date.parse(body.pageWindow.expiresAt)
      body.pageWindow.pages.forEach((page) => {
        pageExpiryRef.current.set(page.index, expiresAt)
      })

      setReaderManifest((current) => {
        if (!current || current.sessionId !== manifest.sessionId) return current

        const nextPages = [...current.pages]
        body.pageWindow.pages.forEach((page) => {
          nextPages[page.index] = page
        })
        const nextManifest = { ...current, pages: nextPages }
        readerManifestRef.current = nextManifest
        return nextManifest
      })
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setPageLoadError('페이지를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')
      }
    } finally {
      if (pageRequestsRef.current.get(centerPage) === controller) {
        pageRequestsRef.current.delete(centerPage)
      }
    }
  }, [abortPageRequests, keepOnlyPageWindow, router, slug])

  const openReader = async () => {
    if (requestInFlightRef.current) return

    requestInFlightRef.current = true
    setStatus('loading')
    setErrorMessage('')
    setPageLoadError('')
    abortPageRequests()
    readerManifestRef.current = null
    pageExpiryRef.current.clear()
    setReaderManifest(null)

    try {
      const response = await fetch(`/api/account/books/${slug}/reader`, {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.status === 401) {
        setStatus('idle')
        router.push(`/account/login?next=/library/books/${slug}`)
        return
      }

      const body = await response.json().catch(() => null)

      if (response.status === 404) {
        setStatus('error')
        setErrorMessage(
          typeof body?.error === 'string' && body.error
            ? body.error
            : NOT_FOUND_MESSAGE
        )
        return
      }

      if (!response.ok) {
        throw new Error('Reader request failed')
      }

      if (body?.allowed !== true || !isValidReaderManifest(body.reader)) {
        throw new Error('Invalid reader manifest')
      }

      const manifest = {
        ...body.reader,
        pages: Array.from({ length: body.reader.pageCount }, () => ({
          src: null,
          width: body.reader.width,
          height: body.reader.height,
        })),
      }
      readerManifestRef.current = manifest
      setReaderManifest(manifest)
      setStatus('open')
    } catch {
      setStatus('error')
      setErrorMessage(LOAD_ERROR_MESSAGE)
    } finally {
      requestInFlightRef.current = false
    }
  }

  const closeReader = () => {
    abortPageRequests()
    readerManifestRef.current = null
    pageExpiryRef.current.clear()
    setReaderManifest(null)
    setErrorMessage('')
    setPageLoadError('')
    setStatus('idle')
  }

  const isLoading = status === 'loading'

  return (
    <div className={styles.readerAction}>
      <button
        type="button"
        className={styles.button}
        onClick={openReader}
        disabled={isLoading}
      >
        {isLoading ? '전체 도서를 불러오는 중...' : '전체 도서 읽기'}
      </button>

      {status === 'error' && errorMessage && (
        <p className={styles.readerError} role="status">
          {errorMessage}
        </p>
      )}

      {status === 'open' && readerManifest && (
        <LibraryFlipbookModal
          title={title}
          pages={readerManifest.pages}
          mode="reader"
          watermark={readerManifest.watermark}
          onPageRangeNeeded={loadReaderPages}
          pageLoadError={pageLoadError}
          onClose={closeReader}
        />
      )}
    </div>
  )
}
