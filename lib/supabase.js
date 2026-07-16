'use client'

import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim()
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim()

const missingEnvironmentVariables = [
  !supabaseUrl && 'NEXT_PUBLIC_SUPABASE_URL',
  !supabaseAnonKey && 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
].filter(Boolean)

if (missingEnvironmentVariables.length > 0) {
  throw new Error(
    `[Supabase browser client] Missing required environment variable(s): ${missingEnvironmentVariables.join(', ')}`
  )
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
