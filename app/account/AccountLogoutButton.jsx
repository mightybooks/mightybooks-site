'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from './account.module.css'

export default function AccountLogoutButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const logout = async () => {
    setLoading(true)
    setError('')

    const { error: signOutError } = await supabase.auth.signOut()

    if (signOutError) {
      setError('로그아웃하지 못했습니다. 잠시 후 다시 시도해 주세요.')
      setLoading(false)
      return
    }

    router.replace('/account/login')
    router.refresh()
  }

  return (
    <div className={styles.logoutAction}>
      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}
      <button
        type="button"
        className={styles.logout}
        onClick={logout}
        disabled={loading}
      >
        {loading ? '로그아웃 중…' : '로그아웃'}
      </button>
    </div>
  )
}
