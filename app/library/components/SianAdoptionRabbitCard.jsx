'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from './SianAdoption.module.css'

export default function SianAdoptionRabbitCard({ rabbit }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = rabbit.images || []
  const activeImage = images[activeIndex]

  const moveImage = (direction) => {
    if (images.length < 2) return
    setActiveIndex((current) => (current + direction + images.length) % images.length)
  }

  return (
    <article className={styles.rabbitCard}>
      <div className={styles.gallery}>
        <div className={styles.mainImageWrap}>
          {activeImage ? (
            <Image
              src={activeImage}
              alt={`${rabbit.name} 사진 ${activeIndex + 1}`}
              fill
              sizes="(max-width: 760px) calc(100vw - 32px), 540px"
              className={styles.mainImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>사진 준비 중</div>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.slideButton} ${styles.slideButtonPrev}`}
                onClick={() => moveImage(-1)}
                aria-label={`${rabbit.name} 이전 사진`}
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.slideButton} ${styles.slideButtonNext}`}
                onClick={() => moveImage(1)}
                aria-label={`${rabbit.name} 다음 사진`}
              >
                ›
              </button>
              <span className={styles.imageCount}>{activeIndex + 1} / {images.length}</span>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className={styles.thumbnails} aria-label={`${rabbit.name} 사진 목록`}>
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`${rabbit.name} 사진 ${index + 1} 보기`}
                aria-pressed={index === activeIndex}
              >
                <Image src={image} alt="" fill sizes="72px" className={styles.thumbnailImage} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.rabbitInfo}>
        <p className={styles.kicker}>Rabbit Adoption</p>
        <h2>{rabbit.name}</h2>

        <dl className={styles.facts}>
          <div><dt>성별</dt><dd>{rabbit.sex}</dd></div>
          <div><dt>나이</dt><dd>{rabbit.age}</dd></div>
          <div><dt>몸무게</dt><dd>{rabbit.weight}</dd></div>
          <div><dt>구조장소</dt><dd>{rabbit.rescuePlace}</dd></div>
          <div><dt>구조날짜</dt><dd>{rabbit.rescueDate}</dd></div>
          <div><dt>중성화</dt><dd>{rabbit.neutered}</dd></div>
        </dl>

        <section className={styles.description}>
          <h3>특징</h3>
          <p>{rabbit.features}</p>
        </section>

        <section className={styles.description}>
          <h3>기타</h3>
          <p>{rabbit.notes}</p>
        </section>
      </div>
    </article>
  )
}
