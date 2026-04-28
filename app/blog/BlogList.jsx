'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './blog.module.css'

const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'business', label: '출판 비즈니스' },
  { key: 'books', label: '출간 도서' },
]

const tagHref = (tag) => `/blog?tag=${encodeURIComponent(tag)}`

export default function BlogPage({ initialPosts, initialQ = '', initialTag = '' }) {
  const [cat, setCat] = useState('all')

  const posts = useMemo(() => {
    if (cat === 'all') return initialPosts
    return initialPosts.filter(post => post.category === cat)
  }, [cat, initialPosts])

  const isFiltered = Boolean(initialQ || initialTag)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.tag}>Blog</span>
        <h1 className={styles.title}>MIGHTY <em>BLOG</em></h1>
        <div className={styles.line} />
      </div>

      <form className={styles.searchForm} action="/blog">
        <input
          className={styles.searchInput}
          type="search"
          name="q"
          defaultValue={initialQ}
          placeholder="검색어를 입력하세요"
        />
        {initialTag && <input type="hidden" name="tag" value={initialTag} />}
        <button className={styles.searchButton} type="submit">검색</button>
        {isFiltered && (
          <Link href="/blog" className={styles.resetLink}>전체보기</Link>
        )}
      </form>

      {initialTag && (
        <div className={styles.activeFilter}>
          <span>#{initialTag}</span>
        </div>
      )}

      <div className={styles.tabs}>
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            className={`${styles.tab} ${cat === c.key ? styles.tabActive : ''}`}
            onClick={() => setCat(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {posts.length === 0 && (
          <p className={styles.empty}>
            {isFiltered ? '검색 결과가 없습니다' : '게시된 글이 없습니다.'}
          </p>
        )}

        {posts.map(post => {
          const tags = Array.isArray(post.tags) ? post.tags : []

          return (
            <article key={post.id} className={styles.card}>
              {post.cover_image && (
                <Link href={`/blog/${post.slug}`} className={styles.thumb}>
                  <img src={post.cover_image} alt={post.title} />
                </Link>
              )}
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.catBadge}>
                    {CATEGORIES.find(c => c.key === post.category)?.label ?? post.category}
                  </span>
                  <span className={styles.date}>
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>

                {tags.length > 0 && (
                  <div className={styles.cardTags}>
                    {tags.map(tag => (
                      <Link
                        key={tag}
                        href={tagHref(tag)}
                        className={styles.cardTag}
                        onClick={event => event.stopPropagation()}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

                <h2 className={styles.cardTitle}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
                <Link href={`/blog/${post.slug}`} className={styles.readMore}>읽기</Link>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
