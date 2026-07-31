import { updateSupabaseSession } from '@/lib/supabase-proxy'

export async function proxy(request) {
  return updateSupabaseSession(request)
}

export const config = {
  matcher: [
    '/partner/:path*',
    '/admin/:path*',
    '/account/:path*',
  ],
}
