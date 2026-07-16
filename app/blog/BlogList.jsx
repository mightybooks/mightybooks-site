'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './blog.module.css'
import { BLOG_CATEGORY_LABELS, BLOG_CATEGORIES } from '@/lib/blog-categories'

const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: BLOG_CATEGORIES.PUBLISHING_BUSINESS, label: BLOG_CATEGORY_LABELS.business },
  { key: BLOG_CATEGORIES.PUBLISHED_BOOKS, label: BLOG_CATEGORY_LABELS.books },
]

const tagHref = (tag) => `/blog?tag=${encodeURIComponent(tag)}`

export default function BlogPage({ initialPosts, initialQ = '', initialTag = '', fictionOnly = false }) {
  const [cat, setCat] = useState('all')
  const posts = useMemo(
    () => cat === 'all' ? initialPosts : initialPosts.filter(post => post.category === cat),
    [cat, initialPosts]
  )
  const isFiltered = Boolean(initialQ || initialTag)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.tag}>Blog</span>
        <h1 className={styles.title}>
          {fictionOnly ? <>500자 <em>소설</em></> : <>MIGHTY <em>BLOG</em></>}
        </h1>
        <div className={styles.line} />
      </div>

      {!fictionOnly && (
        <form className={styles.searchForm} action="/blog">
          <input className={styles.searchInput} type="search" name="q" defaultValue={initialQ} placeholder="검색어를 입력하세요" />
          {initialTag && <input type="hidden" name="tag" value={initialTag} />}
          <button className={styles.searchButton} type="submit">검색</button>
          {isFiltered && <Link href="/blog" className={styles.resetLink}>전체 보기</Link>}
        </form>
      )}

      {initialTag && <div className={styles.activeFilter}><span>#{initialTag}</span></div>}

      <div className={styles.tabs}>
        {fictionOnly ? (
          <Link href="/blog" className={styles.tab}>출판 블로그 전체 보기</Link>
        ) : (
          <>
            {CATEGORIES.map(category => (
              <button
                key={category.key}
                type="button"
                className={`${styles.tab} ${cat === category.key ? styles.tabActive : ''}`}
                onClick={() => setCat(category.key)}
              >
                {category.label}
              </button>
            ))}
            <Link href="/blog/500-fiction" className={styles.tab}>500자 소설</Link>
          </>
        )}
      </div>

      <div className={styles.grid}>
        {posts.length === 0 && <p className={styles.empty}>{isFiltered ? '검색 결과가 없습니다.' : '게시된 글이 없습니다.'}</p>}
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
                  <span className={styles.catBadge}>{BLOG_CATEGORY_LABELS[post.category] ?? post.category}</span>
                  <span className={styles.date}>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                </div>
                {tags.length > 0 && (
                  <div className={styles.cardTags}>
                    {tags.map(tag => <Link key={tag} href={tagHref(tag)} className={styles.cardTag}>#{tag}</Link>)}
                  </div>
                )}
                <h2 className={styles.cardTitle}><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
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
