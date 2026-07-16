import 'server-only'
import { supabaseAdmin } from '@/lib/supabase-admin'

export function getBearerToken(request) {
  const authorization = request.headers.get('authorization') || ''
  return authorization.startsWith('Bearer ') ? authorization.slice(7) : null
}

export async function getAuthenticatedUser(request) {
  const token = getBearerToken(request)
  if (!token) return null
  const { data, error } = await supabaseAdmin.auth.getUser(token)
  return error ? null : data.user
}

export async function requireAdmin(request) {
  const user = await getAuthenticatedUser(request)
  if (!user) return { user: null, isAdmin: false }
  const { data } = await supabaseAdmin.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  return { user, isAdmin: Boolean(data) }
}
