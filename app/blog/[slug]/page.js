import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './post.module.css'

export const revalidate = 0
export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

function isPublicPost(post) {
  if (!post?.published) return false
  if (!post.scheduled_at) return true

  const scheduledAt = new Date(post.scheduled_at).getTime()
  return Number.isFinite(scheduledAt) && scheduledAt <= Date.now()
}

async function getPost(slug) {
  const supabase = getSupabase()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (!isPublicPost(post)) return null

  return post
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: '글을 찾을 수 없습니다 | 마이티북스',
      description: '요청하신 게시글을 찾을 수 없습니다.',
    }
  }

  return {
    title: `${post.title} | 마이티북스 블로그`,
    description:
      post.excerpt ||
      '마이티북스 블로그 글입니다.',
    openGraph: {
      title: post.title,
      description: post.excerpt || '마이티북스 블로그 글입니다.',
      images: post.cover_image ? [post.cover_image] : [],
      type: 'article',
    },
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()
  const tags = Array.isArray(post.tags) ? post.tags : []

  return (
    <article className={styles.wrap}>
      {post.cover_image && (
        <div className={styles.cover}>
          <img src={post.cover_image} alt={`${post.title} 대표 이미지`} />
          <div className={styles.coverOverlay} />
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.meta}>
          <time
            className={styles.date}
            dateTime={new Date(post.created_at).toISOString()}
          >
            {new Date(post.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <h1 className={styles.title}>{post.title} | 마이티북스 블로그</h1>

        <p className={styles.seoLine}>
          {post.title}에 대한 마이티북스 출판 블로그 글입니다.
        </p>

        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map(tag => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className={styles.tag}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <div className={styles.divider} />

        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content ?? ''}
          </ReactMarkdown>
        </div>

        <div className={styles.bottomNav}>
          <Link href="/blog" className={styles.backLink}>
            ← 블로그 목록으로 돌아가기
          </Link>
        </div>
        <div className={styles.bottomNav}>
          <Link href="/support/guide" className={styles.backLink}>
            ← 출판 가이드 보기
          </Link>
        </div>

      </div>
    </article>
  )
}
