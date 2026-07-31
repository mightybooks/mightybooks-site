import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AccountSignupForm from './AccountSignupForm'

export const metadata = {
  title: '회원가입 | 마이티북스',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AccountSignupPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/account')
  }

  return <AccountSignupForm />
}
