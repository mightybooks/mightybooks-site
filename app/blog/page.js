import { createClient } from '@supabase/supabase-js'
import BlogPage from './BlogList'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export const metadata = {
  title: '출판 블로그 | 자비출판 · 책 출간 정보',
  description: '자비출판 비용, 책 출간 방법, 원고 작성 등 출판 관련 실전 정보를 제공합니다.',
}

const firstValue = (value) => Array.isArray(value) ? value[0] : value ?? ''

const normalize = (value) => String(value ?? '').trim().toLowerCase()

const isPublicPost = (post) => {
  if (!post?.published) return false
  if (!post.scheduled_at) return true

  const scheduledAt = new Date(post.scheduled_at).getTime()
  return Number.isFinite(scheduledAt) && scheduledAt <= Date.now()
}

const hasTag = (post, tag) => {
  const tags = Array.isArray(post.tags) ? post.tags : []
  return tags.some(item => normalize(item) === normalize(tag))
}

const matchesSearch = (post, q) => {
  const keyword = normalize(q)
  if (!keyword) return true

  const tags = Array.isArray(post.tags) ? post.tags : []
  const target = [
    post.title,
    post.excerpt,
    post.content,
    tags.join(' ')
  ].join(' ').toLowerCase()

  return target.includes(keyword)
}

export default async function Page({ searchParams }) {
  const params = await searchParams
  const q = firstValue(params?.q).trim()
  const tag = firstValue(params?.tag).trim()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, content, cover_image, created_at, category, tags, published, scheduled_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const posts = (data ?? [])
    .filter(isPublicPost)
    .filter(post => !tag || hasTag(post, tag))
    .filter(post => matchesSearch(post, q))
    .map(post => {
      const publicPost = { ...post }
      delete publicPost.content
      return publicPost
    })

  return <BlogPage initialPosts={posts} initialQ={q} initialTag={tag} />
}
