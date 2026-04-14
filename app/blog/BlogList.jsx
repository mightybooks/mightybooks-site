'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import styles from './blog.module.css'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'business', label: '출판 비즈니스' },
  { key: 'books', label: '출간 도서' },
]

export default function BlogPage({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts)
  const [cat, setCat] = useState('all')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      let query = supabase
        .from('posts')
        .select('id, title, slug, excerpt, cover_image, created_at, category')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (cat !== 'all') query = query.eq('category', cat)

      const { data } = await query
      setPosts(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [cat])

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.tag}>Blog</span>
        <h1 className={styles.title}>MIGHTY <em>BLOG</em></h1>
        <div className={styles.line} />
      </div>

      {/* 카테고리 탭 */}
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
        {loading && <p className={styles.empty}>불러오는 중...</p>}
        {!loading && posts.length === 0 && (
          <p className={styles.empty}>게시된 글이 없습니다.</p>
        )}
        {!loading && posts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`} className={styles.card}>
            {post.cover_image && (
              <div className={styles.thumb}>
                <img src={post.cover_image} alt={post.title} />
              </div>
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
              <h2 className={styles.cardTitle}>{post.title}</h2>
              {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
              <span className={styles.readMore}>읽기 →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}