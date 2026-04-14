'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import styles from './admin.module.css'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async (e) => {
    e.preventDefault()
    setLoading(true); setErr('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
    if (error) { setErr('이메일 또는 비밀번호가 틀렸습니다.'); setLoading(false) }
    else router.push('/admin/posts')
  }

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginBox}>
        <div className={styles.loginLogo}><em>마이티</em>북스 ADMIN</div>
        <form onSubmit={login}>
          <input className={styles.input} type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className={styles.input} type="password" placeholder="비밀번호" value={pw} onChange={e => setPw(e.target.value)} required />
          {err && <div className={styles.err}>{err}</div>}
          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}