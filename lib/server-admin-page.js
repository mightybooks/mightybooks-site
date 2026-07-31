import 'server-only'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function requireAdminPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/admin')
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc(
    'is_admin'
  )

  if (adminError) {
    console.error('[Admin page auth] Admin lookup failed', {
      code: adminError.code,
      message: adminError.message,
    })

    throw new Error('관리자 권한을 확인하지 못했습니다.')
  }

  if (!isAdmin) {
    redirect('/admin')
  }

  return {
    user,
  }
}
