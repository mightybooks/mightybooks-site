import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

const supabaseUrl = (
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
).trim()

const supabaseAnonKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
).trim()

const missingEnvironmentVariables = [
  !supabaseUrl && 'NEXT_PUBLIC_SUPABASE_URL',
  !supabaseAnonKey && 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
].filter(Boolean)

if (missingEnvironmentVariables.length > 0) {
  throw new Error(
    `[Supabase proxy client] Missing required environment variable(s): ${missingEnvironmentVariables.join(', ')}`
  )
}

export async function updateSupabaseSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet, headers = {}) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          supabaseResponse = NextResponse.next({
            request,
          })

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })

          Object.entries(headers).forEach(([key, value]) => {
            supabaseResponse.headers.set(key, value)
          })
        },
      },
    }
  )

  /*
   * 저장된 세션을 그대로 신뢰하지 않고 JWT를 검증하면서,
   * 필요한 경우 만료된 인증 쿠키를 갱신합니다.
   */
  await supabase.auth.getClaims()

  return supabaseResponse
}