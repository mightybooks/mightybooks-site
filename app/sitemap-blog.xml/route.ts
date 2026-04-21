import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 👉 이 한 줄 추가 (캐시 방지, 최신 글 바로 반영)
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const baseUrl = 'https://마이티북스.com';

  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug');

  if (error) {
    return new NextResponse('Failed to generate sitemap', { status: 500 });
  }

  const urls = (posts || [])
    .map((post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
`)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>

  ${urls}

</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-store', // 👉 이것도 추가
    },
  });
}