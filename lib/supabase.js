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

const supabaseFetch = async (input, init = {}) => {
  const headers = new Headers(init.headers)

  // Supabase adds these headers itself, but setting them at the final fetch
  // boundary prevents an incomplete client option merge from dropping them.
  headers.set('apikey', supabaseAnonKey)
  if (!headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${supabaseAnonKey}`)
  }

  const response = await globalThis.fetch(input, { ...init, headers })
  const requestUrl = typeof input === 'string' ? input : input.url

  if (!response.ok && requestUrl.includes('/auth/v1/signup')) {
    console.error('[Partner signup] Supabase HTTP request failed', JSON.stringify({
      url: requestUrl,
      status: response.status,
      hasApiKeyHeader: headers.has('apikey'),
      apiKeyLength: headers.get('apikey')?.length ?? 0,
      hasAuthorizationHeader: headers.has('Authorization'),
    }))
  }

  return response
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  isSingleton: false,
  global: {
    fetch: supabaseFetch,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  },
})
