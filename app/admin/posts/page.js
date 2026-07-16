'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import styles from '../admin.module.css'
import { BLOG_CATEGORY_LABELS, BLOG_CATEGORY_OPTIONS } from '@/lib/blog-categories'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const router = useRouter()

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/admin')
    })
    supabase
      .from('posts').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? [])
        setLoading(false)
      })
  }, [router])

  const togglePublish = async (id, current) => {
    await supabase.from('posts').update({ published: !current }).eq('id', id)
    fetchPosts()
  }

  const deletePost = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('posts').delete().eq('id', id)
    fetchPosts()
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  return (
    <div className={styles.adminWrap}>
      <div className={styles.adminHeader}>
        <div className={styles.adminLogo}><em>마이티</em>북스 ADMIN</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/admin/posts/new" className={styles.btnRed}>+ 새 글 작성</Link>
          <button onClick={logout} className={styles.btnGhost}>로그아웃</button>
        </div>
      </div>
      <div className={styles.adminBody}>
        <Link href="/admin/dashboard" className={styles.backLink}>← 관리자 메뉴로 돌아가기</Link>
        <h2 className={styles.adminTitle}>블로그 글 관리</h2>
        <select className={styles.input} value={category} onChange={event => setCategory(event.target.value)}>
          <option value="all">전체 카테고리</option>
          {BLOG_CATEGORY_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {loading ? <p>불러오는 중...</p> : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>제목</th><th>슬러그</th><th>상태</th><th>작성일</th><th>관리</th>
              </tr>
            </thead>
            <tbody>
              {posts.filter(p => category === 'all' || p.category === category).map(p => (
                <tr key={p.id}>
                  <td>{p.title}<br /><small>{BLOG_CATEGORY_LABELS[p.category] ?? p.category}</small></td>
                  <td style={{ color: 'var(--gray)', fontSize: '12px' }}>{p.slug}</td>
                  <td>
                    <button
                      onClick={() => togglePublish(p.id, p.published)}
                      className={p.published ? styles.badgeOn : styles.badgeOff}
                    >
                      {p.published ? '발행됨' : '비공개'}
                    </button>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--gray)' }}>
                    {new Date(p.created_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <Link href={`/admin/posts/${p.id}/edit`} className={styles.btnSmall}>수정</Link>
                    <button onClick={() => deletePost(p.id)} className={styles.btnSmallDanger}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
