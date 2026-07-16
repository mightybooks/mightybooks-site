import { createClient } from '@supabase/supabase-js'
import BlogPage from '../BlogList'
import { BLOG_CATEGORIES } from '@/lib/blog-categories'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export const metadata = {
  title: '500자 소설 | 마이티북스 블로그',
  description: '문수림 작가의 500자 소설 정의, 형식론, 비교와 창작론을 모았습니다.',
  alternates: { canonical: '/blog/500-fiction' },
  openGraph: {
    title: '500자 소설 | 마이티북스 블로그',
    description: '문수림 작가의 500자 소설 정의, 형식론, 비교와 창작론을 모았습니다.',
    url: '/blog/500-fiction',
    type: 'website',
  },
}

const isPublicPost = (post) => {
  if (!post?.published) return false
  if (!post.scheduled_at) return true
  const scheduledAt = new Date(post.scheduled_at).getTime()
  return Number.isFinite(scheduledAt) && scheduledAt <= Date.now()
}

export default async function FiveHundredFictionPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image, created_at, category, tags, published, scheduled_at')
    .eq('category', BLOG_CATEGORIES.FIVE_HUNDRED_FICTION)
    .eq('published', true)
    .order('created_at', { ascending: false })

  return <BlogPage initialPosts={(data ?? []).filter(isPublicPost)} fictionOnly />
}
