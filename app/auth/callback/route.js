import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

function getSafeNext(value) {
  return (
    typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//')
  )
    ? value
    : '/account'
}

export async function GET(request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const nextPath = getSafeNext(url.searchParams.get('next'))

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(new URL(nextPath, url.origin))
    }

    console.error('[Auth callback] Code exchange failed', {
      code: error.code,
      message: error.message,
    })
  }

  return NextResponse.redirect(
    new URL('/account/login?error=confirmation', url.origin)
  )
}
