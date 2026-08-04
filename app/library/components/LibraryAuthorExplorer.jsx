'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../library.module.css'

const INITIAL_AUTHOR_COUNT = 8

function AuthorCard({ author }) {
  const authorLabel = author.penName || author.displayName

  return (
    <Link
      href={`/${author.slug}`}
      className={styles.authorCard}
      aria-label={`${authorLabel} 저자 서가 보기`}
    >
      <Image
        className={styles.authorAvatar}
        src={author.profileImage}
        width={112}
        height={112}
        sizes="112px"
        alt={`${authorLabel} 프로필`}
      />
      <h3>{authorLabel}</h3>
      {author.occupation && <p>{author.occupation}</p>}
      <span>서가 보기 <span aria-hidden="true">→</span></span>
    </Link>
  )
}

export default function LibraryAuthorExplorer({ authors }) {
  const [expanded, setExpanded] = useState(false)
  const visibleAuthors = expanded ? authors : authors.slice(0, INITIAL_AUTHOR_COUNT)
  const hasMore = authors.length > INITIAL_AUTHOR_COUNT

  return (
    <>
      <div className={styles.authorGrid}>
        {visibleAuthors.map((author) => (
          <AuthorCard key={author.slug} author={author} />
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          className={styles.moreButton}
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? '접기' : '전체 저자 보기'}
        </button>
      )}
    </>
  )
}
