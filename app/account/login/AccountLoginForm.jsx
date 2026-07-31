'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from '../account.module.css'

export default function AccountLoginForm({
  nextPath,
  confirmationFailed,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(
    confirmationFailed
      ? '이메일 인증을 완료하지 못했습니다. 확인 링크를 다시 열어 주세요.'
      : ''
  )
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = async event => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

    if (signInError) {
      setError('이메일 또는 비밀번호를 확인해 주세요.')
      setLoading(false)
      return
    }

    router.replace(nextPath)
    router.refresh()
  }

  return (
    <main className={styles.authPage}>
      <div className={styles.authBox}>
        <span className={styles.eyebrow}>Mighty Books Account</span>
        <h1 className={styles.title}>로그인</h1>
        <p className={styles.intro}>
          마이티북스 계정으로 로그인해 주세요.
        </p>

        <form onSubmit={submit}>
          <label className={styles.field}>
            <span>이메일</span>
            <input
              className={styles.input}
              type="email"
              autoComplete="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>비밀번호</span>
            <input
              className={styles.input}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </label>

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          <button
            className={styles.submit}
            type="submit"
            disabled={loading}
          >
            {loading ? '로그인 중…' : '로그인'}
          </button>
        </form>

        <p className={styles.footerText}>
          계정이 없나요?{' '}
          <Link href="/account/signup" className={styles.textLink}>
            회원가입
          </Link>
        </p>
      </div>
    </main>
  )
}
