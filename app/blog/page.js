import { createClient } from '@supabase/supabase-js'
import BlogPage from './BlogList'

export const metadata = {
  title: '출판 블로그 | 자비출판 · 책 출간 정보',
  description: '자비출판 비용, 책 출간 방법, 원고 작성 등 출판 관련 실전 정보를 제공합니다.',
}

export default async function Page() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image, created_at, category')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return <BlogPage initialPosts={data ?? []} />
}