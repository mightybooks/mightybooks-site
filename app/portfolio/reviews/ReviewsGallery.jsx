'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import styles from './reviews.module.css'

const reviews = [
  {
    id: 'letter-three-books',
    src: '/image/review/01review.webp',
    title: '세 권의 책을 함께 만든 저자의 손편지',
    description: '세 권의 책을 모두 마이티북스를 통해 출간한 저자께서 남겨주신 감사 손편지입니다. 다시 맡겨주신 기록은 마이티북스가 가장 중요하게 여기는 신뢰의 증거입니다.',
    size: 'large',
    alt: '세 권의 책을 마이티북스와 함께 만든 저자의 손편지',
  },
  {
    id: 'paid-consulting',
    src: '/image/review/02review.webp',
    title: '원고 기획 방향을 점검한 유료상담',
    description: '무작정 투고하거나 출간을 서두르기보다, 원고의 문제와 가능성을 먼저 확인하는 것도 방법입니다. 마이티북스는 원고 검토와 출간 방향 상담을 진행합니다.',
    size: 'wide',
    alt: '원고 기획 방향을 점검하는 마이티북스 유료상담 기록',
  },
  {
    id: 'daegu-autobiography',
    src: '/image/review/03review.webp',
    title: '대구 사무실에서 진행한 자서전 상담',
    description: '녹취 자료를 바탕으로 자서전을 준비 중인 분과 실제 사무실에서 상담을 진행한 모습입니다. 마이티북스는 대구·경상권 방문 상담과 전국 비대면 상담을 함께 지원합니다.',
    size: 'large',
    alt: '대구 사무실에서 진행한 자서전 제작 상담 장면',
  },
  {
    id: 'printing-scene',
    src: '/image/review/04review.webp',
    title: '인터뷰 기반 도서가 인쇄되는 현장',
    description: '실제 인터뷰를 바탕으로 제작된 도서가 인쇄·제작되고 있는 현장입니다. 상담에서 시작된 기록이 한 권의 책으로 완성되는 과정을 보여줍니다.',
    size: 'tall',
    alt: '인터뷰 기반 도서가 인쇄 제작되고 있는 현장',
  },
  {
    id: 'open-chat',
    src: '/image/review/05review.webp',
    title: '온라인 오픈톡 실시간 상담',
    description: '마이티북스는 방문 상담뿐 아니라 온라인 오픈톡을 통한 실시간 상담도 진행합니다. 원고 상태, 제작 부수, ISBN 등록, 소량 제작 여부 등을 빠르게 확인할 수 있습니다.',
    size: 'small',
    alt: '온라인 오픈톡으로 진행한 마이티북스 실시간 상담',
  },
  {
    id: 'company-booklet',
    src: '/image/review/06review.webp',
    title: '기업 교육자료 소책자 제작',
    description: '기업 교육자료와 내부 소책자도 목적과 사용 환경에 맞춰 제작할 수 있습니다. 단순 출력물이 아니라 실제로 배포 가능한 책 형태의 결과물을 지향합니다.',
    size: 'wide',
    alt: '기업 교육자료를 소책자로 제작한 마이티북스 결과물',
  },
  {
    id: 'handwritten-manuscript',
    src: '/image/review/07review.webp',
    title: '손글씨 원고도 책이 될 수 있습니다',
    description: '손글씨로 완성된 원고도 상담을 통해 책 제작 가능성을 검토할 수 있습니다. 원고 입력, 정리, 편집 범위에 따라 제작 방식과 견적이 달라집니다.',
    size: 'tall',
    alt: '책 제작 상담을 위한 손글씨 원고 기록',
  },
]

function shuffleItems(items) {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

export default function ReviewsGallery() {
  const [items, setItems] = useState(reviews)
  const [activeIndex, setActiveIndex] = useState(null)
  const closeButtonRef = useRef(null)
  const activeReview = activeIndex === null ? null : items[activeIndex]

  const showPrevious = useCallback(() => {
    setActiveIndex(index => (index === null ? index : (index - 1 + items.length) % items.length))
  }, [items.length])

  const showNext = useCallback(() => {
    setActiveIndex(index => (index === null ? index : (index + 1) % items.length))
  }, [items.length])

  useEffect(() => {
    const shuffleTimer = window.setTimeout(() => {
      setItems(shuffleItems(reviews))
    }, 0)

    return () => window.clearTimeout(shuffleTimer)
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, showNext, showPrevious])

  return (
    <>
      <section className={styles.gallery} aria-label="마이티북스 리뷰후기 이미지 갤러리">
        {items.map((review, index) => (
          <button
            key={review.id}
            type="button"
            className={`${styles.galleryItem} ${styles[review.size]}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`${review.title} 크게 보기`}
          >
            <Image
              src={review.src}
              alt={review.alt}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
            <span className={styles.itemShade} />
            <span className={styles.itemText}>
              <span>{review.title}</span>
            </span>
          </button>
        ))}
      </section>

      {activeReview && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null)
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className={`${styles.modalButton} ${styles.closeButton}`}
              onClick={() => setActiveIndex(null)}
              aria-label="리뷰후기 모달 닫기"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <button
              type="button"
              className={`${styles.modalButton} ${styles.prevButton}`}
              onClick={showPrevious}
              aria-label="이전 리뷰후기 보기"
            >
              <ChevronLeft size={26} aria-hidden="true" />
            </button>

            <div className={styles.modalImageWrap}>
              <Image
                src={activeReview.src}
                alt={activeReview.alt}
                fill
                sizes="(max-width: 768px) 92vw, 68vw"
                priority
              />
            </div>

            <div className={styles.modalCopy}>
              <p className={styles.modalCount}>{activeIndex + 1} / {items.length}</p>
              <h2 id="review-modal-title">{activeReview.title}</h2>
              <p>{activeReview.description}</p>
            </div>

            <button
              type="button"
              className={`${styles.modalButton} ${styles.nextButton}`}
              onClick={showNext}
              aria-label="다음 리뷰후기 보기"
            >
              <ChevronRight size={26} aria-hidden="true" />
            </button>
          </section>
        </div>
      )}
    </>
  )
}
