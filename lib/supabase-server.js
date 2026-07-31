import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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
    `[Supabase server client] Missing required environment variable(s): ${missingEnvironmentVariables.join(', ')}`
  )
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(
              ({ name, value, options }) => {
                cookieStore.set(name, value, options)
              }
            )
          } catch {
            /*
             * Server Component에서는 쿠키를 직접 수정할 수 없습니다.
             * 세션 갱신은 루트 proxy.js에서 처리합니다.
             */
          }
        },
      },
    }
  )
}