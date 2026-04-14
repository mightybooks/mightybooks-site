// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path') ?? '/blog'

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath(path)
  revalidatePath('/blog/[slug]', 'page')
  return NextResponse.json({ revalidated: true, path })
}