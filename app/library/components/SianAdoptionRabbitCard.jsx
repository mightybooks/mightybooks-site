'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from '../library.module.css'

export default function SianAdoptionRabbitCard({ rabbit }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = rabbit.images?.[activeIndex]

  return (
    <article className={styles.adoptionRabbitCard}>
      <div className={styles.adoptionGallery}>
        <div className={styles.adoptionMainImage}>
          {activeImage ? (
            <Image
              src={activeImage.src}
              alt={activeImage.alt || `${rabbit.name} 사진 ${activeIndex + 1}`}
              fill
              sizes="(max-width: 720px) calc(100vw - 32px), 560px"
              className={styles.adoptionImage}
            />
          ) : (
            <div className={styles.adoptionImagePlaceholder}>
              <span>{rabbit.name}</span>
              <small>사진 준비 중</small>
            </div>
          )}
        </div>

        {rabbit.images?.length > 1 && (
          <div className={styles.adoptionThumbnails} aria-label={`${rabbit.name} 사진 선택`}>
            {rabbit.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={index === activeIndex ? styles.adoptionThumbnailActive : styles.adoptionThumbnail}
                onClick={() => setActiveIndex(index)}
                aria-label={`${rabbit.name} 사진 ${index + 1} 보기`}
                aria-pressed={index === activeIndex}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="76px"
                  className={styles.adoptionThumbnailImage}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.adoptionRabbitInfo}>
        <div className={styles.adoptionRabbitHeading}>
          <div>
            <p className={styles.sectionKicker}>Adoption Profile</p>
            <h2>{rabbit.name}</h2>
          </div>
          {rabbit.status && <span className={styles.adoptionStatus}>{rabbit.status}</span>}
        </div>

        <dl className={styles.adoptionFacts}>
          <div><dt>성별</dt><dd>{rabbit.sex}</dd></div>
          <div><dt>나이</dt><dd>{rabbit.age}</dd></div>
          <div><dt>몸무게</dt><dd>{rabbit.weight}</dd></div>
          <div><dt>구조장소</dt><dd>{rabbit.rescuePlace}</dd></div>
          <div><dt>구조날짜</dt><dd>{rabbit.rescueDate}</dd></div>
          <div><dt>중성화</dt><dd>{rabbit.neutered}</dd></div>
        </dl>

        <section className={styles.adoptionDescription}>
          <h3>특징</h3>
          <p>{rabbit.features}</p>
        </section>

        {rabbit.notes && (
          <section className={styles.adoptionDescription}>
            <h3>기타</h3>
            <p>{rabbit.notes}</p>
          </section>
        )}
      </div>
    </article>
  )
}
