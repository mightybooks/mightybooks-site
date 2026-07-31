import 'server-only'
import { supabaseAdmin } from '@/lib/supabase-admin'

export function getBearerToken(request) {
  const authorization = request.headers.get('authorization') || ''

  return authorization.startsWith('Bearer ')
    ? authorization.slice(7)
    : null
}

export async function getAuthenticatedUser(request) {
  const token = getBearerToken(request)

  if (!token) {
    return null
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token)

  return error ? null : data.user
}

export async function requireAdmin(request) {
  const user = await getAuthenticatedUser(request)

  if (!user) {
    return {
      user: null,
      isAdmin: false,
      role: null,
      accountStatus: null,
    }
  }

  const [profileResult, rolesResult] = await Promise.all([
    supabaseAdmin
      .from('profiles')
      .select('account_status')
      .eq('user_id', user.id)
      .maybeSingle(),

    supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['admin', 'staff'])
      .order('role', { ascending: true })
      .limit(1),
  ])

  if (profileResult.error || rolesResult.error) {
    console.error('[Admin API auth] Admin lookup failed', {
      profileError: profileResult.error
        ? {
            code: profileResult.error.code,
            message: profileResult.error.message,
          }
        : null,

      roleError: rolesResult.error
        ? {
            code: rolesResult.error.code,
            message: rolesResult.error.message,
          }
        : null,
    })

    return {
      user,
      isAdmin: false,
      role: null,
      accountStatus: null,
    }
  }

  const accountStatus =
    profileResult.data?.account_status ?? null

  const role =
    rolesResult.data?.[0]?.role ?? null

  const isAdmin =
    accountStatus === 'active'
    && (role === 'admin' || role === 'staff')

  return {
    user,
    isAdmin,
    role,
    accountStatus,
  }
}