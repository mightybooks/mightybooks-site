'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import LibraryFlipbookModal from './LibraryFlipbookModal'
import styles from '../library.module.css'

const NOT_FOUND_MESSAGE = '열람 가능한 전체 도서를 찾을 수 없습니다.'
const LOAD_ERROR_MESSAGE = '전체 도서를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'

function isValidReaderManifest(reader) {
  return Boolean(
    reader &&
    Array.isArray(reader.pages) &&
    Number.isInteger(reader.pageCount) &&
    reader.pageCount >= 1 &&
    reader.pages.length === reader.pageCount &&
    Number.isFinite(reader.width) &&
    reader.width > 0 &&
    Number.isFinite(reader.height) &&
    reader.height > 0 &&
    reader.pages.every((page) => (
      page &&
      typeof page.src === 'string' &&
      page.src.length > 0 &&
      Number.isFinite(page.width) &&
      page.width > 0 &&
      Number.isFinite(page.height) &&
      page.height > 0
    ))
  )
}

export default function LibraryReaderButton({ slug, title }) {
  const router = useRouter()
  const requestInFlightRef = useRef(false)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [readerManifest, setReaderManifest] = useState(null)

  const openReader = async () => {
    if (requestInFlightRef.current) return

    requestInFlightRef.current = true
    setStatus('loading')
    setErrorMessage('')
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

      setReaderManifest(body.reader)
      setStatus('open')
    } catch {
      setStatus('error')
      setErrorMessage(LOAD_ERROR_MESSAGE)
    } finally {
      requestInFlightRef.current = false
    }
  }

  const closeReader = () => {
    setReaderManifest(null)
    setErrorMessage('')
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
          onClose={closeReader}
        />
      )}
    </div>
  )
}
