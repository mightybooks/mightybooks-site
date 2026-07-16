import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://xn--hz2b41ezwf0zf9tq.com'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Post = {
  slug: string
  published?: boolean
  scheduled_at?: string | null
  created_at?: string | null
}

function isPublicPost(post: Post) {
  if (!post.published) return false
  if (!post.scheduled_at) return true

  const scheduledAt = new Date(post.scheduled_at).getTime()
  return Number.isFinite(scheduledAt) && scheduledAt <= Date.now()
}

function formatLastMod(value?: string | null) {
  if (!value) return null

  const timestamp = new Date(value).getTime()
  if (!Number.isFinite(timestamp)) return null

  return new Date(timestamp).toISOString().slice(0, 10)
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function renderUrl(loc: string, lastmod?: string | null) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`
}

export async function GET() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug, published, scheduled_at, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    return new NextResponse('Failed to generate sitemap', { status: 500 })
  }

  const publicPosts = (posts || []).filter(isPublicPost)
  const blogLastMod = formatLastMod(publicPosts[0]?.created_at)

  const urls = [
    renderUrl(`${BASE_URL}/blog`, blogLastMod),
    renderUrl(`${BASE_URL}/blog/500-fiction`, blogLastMod),
    ...publicPosts.map((post) =>
      renderUrl(
        `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
        formatLastMod(post.created_at)
      )
    ),
  ].join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
