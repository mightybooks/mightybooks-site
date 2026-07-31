'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from '../account.module.css'

const initialForm = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

export default function AccountSignupForm() {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmationRequired, setConfirmationRequired] =
    useState(false)
  const router = useRouter()

  const update = (key, value) => {
    setForm(current => ({
      ...current,
      [key]: value,
    }))
  }

  const submit = async event => {
    event.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('비밀번호는 8자 이상 입력해 주세요.')
      return
    }

    if (form.password !== form.passwordConfirm) {
      setError('비밀번호 확인이 일치하지 않습니다.')
      return
    }

    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        emailRedirectTo:
          `${window.location.origin}/auth/callback?next=/account`,
        data: {
          display_name: form.displayName.trim(),
        },
      },
    })

    if (signUpError) {
      const duplicateEmail =
        signUpError.code === 'user_already_exists' ||
        signUpError.message.toLowerCase().includes('registered')

      setError(
        duplicateEmail
          ? '이미 가입된 이메일입니다. 로그인해 주세요.'
          : '회원가입을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.'
      )
      setLoading(false)
      return
    }

    if (data.user && data.user.identities?.length === 0) {
      setError('이미 가입된 이메일입니다. 로그인해 주세요.')
      setLoading(false)
      return
    }

    if (data.session) {
      router.replace('/account')
      router.refresh()
      return
    }

    setConfirmationRequired(true)
    setLoading(false)
  }

  if (confirmationRequired) {
    return (
      <main className={styles.authPage}>
        <div className={styles.authBox}>
          <span className={styles.eyebrow}>Email Confirmation</span>
          <h1 className={styles.title}>이메일을 확인해 주세요.</h1>
          <div className={styles.success} role="status">
            가입 이메일로 전송된 확인 링크를 누르면 회원가입이 완료됩니다.
          </div>
          <p className={styles.footerText}>
            인증을 마쳤나요?{' '}
            <Link href="/account/login" className={styles.textLink}>
              로그인
            </Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.authPage}>
      <div className={styles.authBox}>
        <span className={styles.eyebrow}>Mighty Books Account</span>
        <h1 className={styles.title}>회원가입</h1>
        <p className={styles.intro}>
          마이티북스에서 사용할 계정을 만들어 주세요.
        </p>

        <form onSubmit={submit}>
          <label className={styles.field}>
            <span>이름 또는 표시 이름</span>
            <input
              className={styles.input}
              autoComplete="name"
              value={form.displayName}
              onChange={event => update('displayName', event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>이메일</span>
            <input
              className={styles.input}
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={event => update('email', event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>비밀번호</span>
            <input
              className={styles.input}
              type="password"
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={event => update('password', event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>비밀번호 확인</span>
            <input
              className={styles.input}
              type="password"
              minLength={8}
              autoComplete="new-password"
              value={form.passwordConfirm}
              onChange={event => update('passwordConfirm', event.target.value)}
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
            {loading ? '가입 중…' : '회원가입'}
          </button>
        </form>

        <p className={styles.footerText}>
          이미 계정이 있나요?{' '}
          <Link href="/account/login" className={styles.textLink}>
            로그인
          </Link>
        </p>
      </div>
    </main>
  )
}
