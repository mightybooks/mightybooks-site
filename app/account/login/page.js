import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AccountLoginForm from './AccountLoginForm'

export const metadata = {
  title: '로그인 | 마이티북스',
  robots: {
    index: false,
    follow: false,
  },
}

function getSafeNext(value) {
  return (
    typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//')
  )
    ? value
    : '/account'
}

export default async function AccountLoginPage({ searchParams }) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/account')
  }

  const query = await searchParams
  const nextPath = getSafeNext(query.next)
  const confirmationFailed = query.error === 'confirmation'

  return (
    <AccountLoginForm
      nextPath={nextPath}
      confirmationFailed={confirmationFailed}
    />
  )
}
