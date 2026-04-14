'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import styles from '@/app/admin/admin.module.css'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function PostEditor({ postId }) {
  const isNew = !postId
  const router = useRouter()
  const fileRef = useRef(null)
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '',
    cover_image: '', published: false, category: 'business'
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const [preview, setPreview] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/admin')
    })
    if (!isNew) {
      supabase.from('posts').select('*').eq('id', postId).single().then(({ data }) => {
        if (data) { setForm(data); setPreview(data.cover_image ?? '') }
      })
    }
  }, [postId])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const autoSlug = (title) =>
    title.toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 60)

  const uploadImage = async (file) => {
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}.${ext}`
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filename, file, { upsert: true })

    if (error) { setMsg('이미지 업로드 실패: ' + error.message); setUploading(false); return }

    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filename)

    set('cover_image', urlData.publicUrl)
    setPreview(urlData.publicUrl)
    setUploading(false)
  }

  const save = async (publish) => {
    setSaving(true); setMsg('')
    const payload = { ...form, published: publish ?? form.published }
    let error
    if (isNew) {
      ({ error } = await supabase.from('posts').insert(payload))
    } else {
      ({ error } = await supabase.from('posts').update(payload).eq('id', postId))
    }
    if (error) { setMsg('저장 실패: ' + error.message); setSaving(false); return }

    await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}&path=/blog`)

    setMsg('저장되었습니다!')
    setSaving(false)
    setTimeout(() => router.push('/admin/posts'), 800)
  }

  return (
    <div className={styles.adminWrap}>
      <div className={styles.adminHeader}>
        <div className={styles.adminLogo}><em>마이티</em>북스 ADMIN</div>
        <button onClick={() => router.push('/admin/posts')} className={styles.btnGhost}>← 목록으로</button>
      </div>
      <div className={styles.adminBody}>
        <h2 className={styles.adminTitle}>{isNew ? '새 글 작성' : '글 수정'}</h2>
        <div className={styles.form}>

          <label className={styles.label}>카테고리</label>
          <select
            className={styles.input}
            value={form.category}
            onChange={e => set('category', e.target.value)}
            style={{ cursor: 'pointer' }}
          >
            <option value="business">출판 비즈니스</option>
            <option value="books">출간 도서</option>
          </select>

          <label className={styles.label}>제목</label>
          <input
            className={styles.input}
            value={form.title}
            onChange={e => { set('title', e.target.value); if (isNew) set('slug', autoSlug(e.target.value)) }}
            placeholder="글 제목"
          />

          <label className={styles.label}>슬러그 (URL)</label>
          <input
            className={styles.input}
            value={form.slug}
            onChange={e => set('slug', e.target.value)}
            placeholder="url-slug"
          />

          <label className={styles.label}>요약</label>
          <input
            className={styles.input}
            value={form.excerpt}
            onChange={e => set('excerpt', e.target.value)}
            placeholder="한두 줄 요약"
          />

          <label className={styles.label}>커버 이미지</label>
          <div className={styles.imageUpload}>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              style={{ display: 'none' }}
              onChange={e => uploadImage(e.target.files[0])}
            />
            <button
              className={styles.btnGhost}
              onClick={() => fileRef.current.click()}
              disabled={uploading}
              type="button"
            >
              {uploading ? '업로드 중...' : '📁 이미지 선택'}
            </button>
            {preview && (
              <div className={styles.imagePreview}>
                <img src={preview} alt="preview" />
                <button
                  className={styles.imageRemove}
                  onClick={() => { set('cover_image', ''); setPreview('') }}
                  type="button"
                >✕</button>
              </div>
            )}
          </div>

          <label className={styles.label}>본문 (마크다운)</label>
          <div className={styles.editorWrap}>
            <textarea
              className={styles.textarea}
              value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder={`# 제목\n\n본문을 마크다운으로 작성하세요.\n\n**굵게**, *기울임*, [링크](url)`}
              rows={24}
            />
          </div>

          {msg && <div className={styles.msg}>{msg}</div>}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={() => save(false)} disabled={saving} className={styles.btnGhost} type="button">
              임시저장
            </button>
            <button onClick={() => save(true)} disabled={saving} className={styles.btnRed} type="button">
              {saving ? '저장 중...' : '발행하기'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}