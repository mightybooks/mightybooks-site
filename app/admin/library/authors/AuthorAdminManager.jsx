'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import styles from '../library-admin.module.css'

const blank = {
  id: null, slug: '', display_name: '', status: 'draft', pen_name: '', occupation: '',
  profile_image_path: null, short_bio: '', bio_paragraphs: [], display_order: 0,
  career_sections: [], social_links: [], external_links: [], press_enabled: false, press_items: [],
}
const labels = { homepage: '홈페이지', instagram: '인스타그램', blog: '블로그', youtube: '유튜브', facebook: '페이스북', x: 'X', brunch: '브런치', other: '기타' }

async function request(path, options = {}) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw Object.assign(new Error('관리자 로그인이 만료되었습니다. 다시 로그인해 주세요.'), { auth: true })
  const response = await fetch(path, { ...options, headers: { Authorization: `Bearer ${session.access_token}`, ...options.headers } })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw Object.assign(new Error(data.error || '요청을 처리하지 못했습니다.'), { code: data.code, auth: response.status === 401 || response.status === 403 })
  return data
}
const move = (list, index, delta) => { const next = [...list]; const target = index + delta; if (target < 0 || target >= next.length) return list; [next[index], next[target]] = [next[target], next[index]]; return next.map((item, i) => ({ ...item, sort_order: i })) }

export default function AuthorAdminManager() {
  const [authors, setAuthors] = useState([]), [form, setForm] = useState(blank)
  const [loading, setLoading] = useState(true), [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(''), [error, setError] = useState(''), [file, setFile] = useState(null)
  const [searchInput, setSearchInput] = useState(''), [q, setQ] = useState(''), [status, setStatus] = useState('all')
  const [page, setPage] = useState(1), [totalPages, setTotalPages] = useState(1), [total, setTotal] = useState(0)
  const [detailLoading, setDetailLoading] = useState(false)
  const load = useCallback(async () => { setLoading(true); setError(''); try { const data = await request(`/api/admin/library/authors?${new URLSearchParams({ q, status, page: String(page), pageSize: '30' })}`); setAuthors(data.authors); setTotalPages(data.totalPages); setTotal(data.total) } catch (e) { setError(e.message) } finally { setLoading(false) } }, [page, q, status])
  useEffect(() => { load() }, [load])
  useEffect(() => {
    if (!message) return undefined
    const timer = window.setTimeout(() => setMessage(''), 4500)
    return () => window.clearTimeout(timer)
  }, [message])
  const edit = async id => { if (detailLoading) return; setDetailLoading(true); setError(''); try { setForm((await request(`/api/admin/library/authors/${id}`)).author); setMessage('') } catch (e) { setError(e.message) } finally { setDetailLoading(false) } }
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }))
  const updateRow = (key, index, values) => update(key, form[key].map((row, i) => i === index ? { ...row, ...values } : row))
  const add = (key, value) => update(key, [...form[key], { ...value, sort_order: form[key].length }])
  const remove = (key, index) => update(key, form[key].filter((_, i) => i !== index).map((row, i) => ({ ...row, sort_order: i })))
  const payload = () => ({ ...form, bio_paragraphs: form.bio_paragraphs.filter(Boolean),
    social_links: form.social_links.map((x, i) => ({ ...x, sort_order: i })), external_links: form.external_links.map((x, i) => ({ ...x, sort_order: i })),
    press_items: form.press_items.map((x, i) => ({ ...x, sort_order: i })), career_sections: form.career_sections.map((s, i) => ({ ...s, sort_order: i, items: s.items.map((x, j) => ({ ...x, sort_order: j })) })) })
  const save = async e => { e.preventDefault(); if (saving) return; const isNew = !form.id; setSaving(true); setError(''); setMessage(''); try {
    const data = await request(form.id ? `/api/admin/library/authors/${form.id}` : '/api/admin/library/authors', { method: form.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload()) })
    setForm(data.author)
    if (isNew) {
      if (page !== 1) setPage(1)
      else await load()
    } else await load()
    setMessage(isNew ? '저자를 등록했습니다.' : '변경사항을 저장했습니다.')
  } catch (e) { setError(`${e.message}${e.code ? ` (${e.code})` : ''}`) } finally { setSaving(false) } }
  const destroy = async () => { if (!form.id || saving || !window.confirm('이 저자를 삭제하시겠습니까?')) return; setSaving(true); setError(''); setMessage(''); try { await request(`/api/admin/library/authors/${form.id}`, { method: 'DELETE' }); setForm(blank); if (authors.length === 1 && page > 1) setPage(current => current - 1); else await load(); setMessage('저자를 삭제했습니다.') } catch (e) { setError(`${e.message}${e.code ? ` (${e.code})` : ''}`) } finally { setSaving(false) } }
  const upload = async () => { if (!form.id || !file || saving) return; setSaving(true); setError(''); setMessage(''); const body = new FormData(); body.append('file', file); try { const data = await request(`/api/admin/library/authors/${form.id}/profile-image`, { method: 'POST', body }); update('profile_image_path', data.profile_image_path); setFile(null); setMessage('프로필 이미지를 업로드했습니다.') } catch (e) { setError(e.message) } finally { setSaving(false) } }
  const deleteImage = async () => { if (!form.id || saving || !window.confirm('프로필 이미지를 삭제하시겠습니까?')) return; setSaving(true); setError(''); setMessage(''); try { await request(`/api/admin/library/authors/${form.id}/profile-image`, { method: 'DELETE' }); update('profile_image_path', null); setMessage('프로필 이미지를 삭제했습니다.') } catch (e) { setError(e.message) } finally { setSaving(false) } }

  return <main className={styles.page}>
    <header className={styles.header}><div><Link className={styles.nav} href="/admin/library">← 서가 관리</Link><h1>저자 관리</h1></div><button className={styles.button} onClick={() => { setForm(blank); setMessage(''); setError('') }}>신규 등록</button></header>
    {message && <p className={styles.notice} role="status">{message}</p>}{error && <p className={styles.error} role="alert">{error}</p>}
    <div className={styles.layout}><aside className={styles.panel}><h2>저자 목록</h2><form className={styles.listFilters} onSubmit={event => { event.preventDefault(); setPage(1); setQ(searchInput.trim()) }}><input className={styles.input} value={searchInput} onChange={event => setSearchInput(event.target.value)} placeholder="이름 또는 slug 검색"/><select className={styles.select} value={status} onChange={event => { setStatus(event.target.value); setPage(1) }}><option value="all">전체 상태</option><option value="draft">초안</option><option value="published">공개</option><option value="archived">보관</option></select><button className={styles.small} disabled={loading}>검색</button></form><p className={styles.muted}>총 {total}명</p>{loading ? <div className={styles.skeletonList} aria-label="저자 목록 로딩"><span/><span/><span/></div> : authors.length === 0 ? <p className={styles.empty}>등록된 저자가 없습니다.</p> : <div className={styles.list}>{authors.map(a => <button className={styles.listItem} key={a.id} disabled={detailLoading} onClick={() => edit(a.id)}><span>{a.display_name}<br/><small className={styles.muted}>/{a.slug}</small></span><small>{a.status}</small></button>)}</div>}<div className={styles.pagination}><button className={styles.small} disabled={loading || page <= 1} onClick={() => setPage(current => current - 1)}>이전</button><span>{page} / {totalPages}</span><button className={styles.small} disabled={loading || page >= totalPages} onClick={() => setPage(current => current + 1)}>다음</button></div></aside>
      <form className={styles.panel} onSubmit={save} aria-busy={detailLoading}>{detailLoading && <div className={styles.detailLoading}>상세 정보를 불러오는 중…</div>}<h2>{form.id ? '저자 수정' : '저자 등록'}</h2><div className={styles.grid}>
        <label className={styles.field}>표시 이름<input className={styles.input} value={form.display_name} onChange={e => update('display_name', e.target.value)} required /></label>
        <label className={styles.field}>slug<input className={styles.input} value={form.slug} onChange={e => update('slug', e.target.value)} required /></label>
        <label className={styles.field}>필명<input className={styles.input} value={form.pen_name || ''} onChange={e => update('pen_name', e.target.value)} /></label>
        <label className={styles.field}>직함·한 줄 소개<input className={styles.input} value={form.occupation || ''} onChange={e => update('occupation', e.target.value)} /></label>
        <label className={styles.field}>공개 상태<select className={styles.select} value={form.status} onChange={e => update('status', e.target.value)}><option value="draft">초안</option><option value="published">공개</option><option value="archived">보관</option></select></label>
        <label className={styles.field}>표시 순서<input className={styles.input} type="number" min="0" value={form.display_order} onChange={e => update('display_order', Number(e.target.value))} /></label>
        <label className={`${styles.field} ${styles.full}`}>짧은 소개<input className={styles.input} value={form.short_bio || ''} onChange={e => update('short_bio', e.target.value)} /></label>
        <label className={`${styles.field} ${styles.full}`}>저자 소개 (빈 줄로 문단 구분)<textarea className={styles.textarea} value={(form.bio_paragraphs || []).join('\n\n')} onChange={e => update('bio_paragraphs', e.target.value.split(/\n\s*\n/))} /></label>
      </div>
      <section className={styles.section}><h2>프로필 이미지</h2><Image className={styles.preview} src={form.profile_image_path || '/library/authors/default-profile.svg'} width={130} height={130} alt="프로필 미리보기" /><div className={styles.toolbar}><input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setFile(e.target.files?.[0] || null)} /><button type="button" className={styles.small} disabled={!form.id || !file || saving} onClick={upload}>업로드·교체</button><button type="button" className={styles.danger} disabled={!form.id || saving} onClick={deleteImage}>이미지 삭제</button></div>{!form.id && <p className={styles.muted}>저자를 먼저 저장한 뒤 이미지를 업로드할 수 있습니다.</p>}</section>
      <ArrayEditor title="홈페이지·SNS" items={form.social_links} add={() => add('social_links', { type: 'homepage', url: '', is_visible: true })} moveItem={(i,d) => update('social_links', move(form.social_links,i,d))} removeItem={i => remove('social_links',i)}>{(item,i) => <div className={styles.grid}><label className={styles.field}>종류<select className={styles.select} value={item.type} onChange={e => updateRow('social_links',i,{type:e.target.value})}>{Object.entries(labels).map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select></label><label className={styles.field}>URL<input className={styles.input} value={item.url} onChange={e => updateRow('social_links',i,{url:e.target.value})} /></label><Check checked={item.is_visible} onChange={v => updateRow('social_links',i,{is_visible:v})} /></div>}</ArrayEditor>
      <ArrayEditor title="외부 링크 배너" items={form.external_links} add={() => add('external_links', { title:'', description:'', url:'', is_visible:true })} moveItem={(i,d) => update('external_links',move(form.external_links,i,d))} removeItem={i => remove('external_links',i)}>{(item,i) => <div className={styles.grid}><label className={styles.field}>제목<input className={styles.input} value={item.title} onChange={e => updateRow('external_links',i,{title:e.target.value})} /></label><label className={styles.field}>URL<input className={styles.input} value={item.url} onChange={e => updateRow('external_links',i,{url:e.target.value})} /></label><label className={`${styles.field} ${styles.full}`}>설명<input className={styles.input} value={item.description || ''} onChange={e => updateRow('external_links',i,{description:e.target.value})} /></label><Check checked={item.is_visible} onChange={v => updateRow('external_links',i,{is_visible:v})} /></div>}</ArrayEditor>
      <CareerEditor sections={form.career_sections} update={value => update('career_sections', value)} />
      <section className={styles.section}><h2>언론 보도</h2><Check checked={form.press_enabled} onChange={v => update('press_enabled',v)} label="내부 언론 보도 페이지 사용" /></section>
      <ArrayEditor title="보도 항목" items={form.press_items} add={() => add('press_items',{outlet_name:'',title:'',published_at:'',summary:'',source_url:'',is_visible:true})} moveItem={(i,d)=>update('press_items',move(form.press_items,i,d))} removeItem={i=>remove('press_items',i)}>{(item,i)=><div className={styles.grid}><label className={styles.field}>매체명<input className={styles.input} value={item.outlet_name} onChange={e=>updateRow('press_items',i,{outlet_name:e.target.value})}/></label><label className={styles.field}>날짜<input className={styles.input} type="date" value={item.published_at} onChange={e=>updateRow('press_items',i,{published_at:e.target.value})}/></label><label className={`${styles.field} ${styles.full}`}>기사 제목<input className={styles.input} value={item.title} onChange={e=>updateRow('press_items',i,{title:e.target.value})}/></label><label className={`${styles.field} ${styles.full}`}>요약<textarea className={styles.textarea} value={item.summary || ''} onChange={e=>updateRow('press_items',i,{summary:e.target.value})}/></label><label className={`${styles.field} ${styles.full}`}>원문 URL<input className={styles.input} value={item.source_url} onChange={e=>updateRow('press_items',i,{source_url:e.target.value})}/></label><Check checked={item.is_visible} onChange={v=>updateRow('press_items',i,{is_visible:v})}/></div>}</ArrayEditor>
      <div className={styles.toolbar}><button className={styles.button} disabled={saving}>{saving ? '저장 중…' : '저장'}</button>{form.id && <button type="button" className={styles.danger} disabled={saving} onClick={destroy}>저자 삭제</button>}</div>
      </form></div>
  </main>
}

function Check({ checked, onChange, label='노출' }) { return <label className={styles.check}><input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} />{label}</label> }
function ArrayEditor({ title, items, add, moveItem, removeItem, children }) { return <section className={styles.section}><div className={styles.header}><h2>{title}</h2><button type="button" className={styles.small} onClick={add}>추가</button></div>{items.map((item,i)=><div className={styles.rowCard} key={item.id || `${title}-${i}`}>{children(item,i)}<div className={styles.rowActions}><button type="button" className={styles.small} onClick={()=>moveItem(i,-1)}>위</button><button type="button" className={styles.small} onClick={()=>moveItem(i,1)}>아래</button><button type="button" className={styles.danger} onClick={()=>removeItem(i)}>삭제</button></div></div>)}</section> }
function CareerEditor({ sections, update }) { const change=(i,v)=>update(sections.map((s,j)=>j===i?{...s,...v}:s)); return <section className={styles.section}><div className={styles.header}><h2>주요 이력 (선택)</h2><button type="button" className={styles.small} onClick={()=>update([...sections,{title:'',sort_order:sections.length,items:[]}])}>섹션 추가</button></div>{sections.map((section,i)=><div className={styles.rowCard} key={section.id||i}><label className={styles.field}>섹션 제목<input className={styles.input} value={section.title} onChange={e=>change(i,{title:e.target.value})}/></label>{section.items.map((item,j)=><div className={styles.rowCard} key={item.id||j}><select className={styles.select} value={item.item_type} onChange={e=>change(i,{items:section.items.map((x,k)=>k===j?{...x,item_type:e.target.value}:x)})}><option value="text">텍스트</option><option value="structured">구조화</option></select>{item.item_type==='text'?<input className={styles.input} value={item.body||''} onChange={e=>change(i,{items:section.items.map((x,k)=>k===j?{...x,body:e.target.value}:x)})}/>:['organization','work','period'].map(key=><input key={key} className={styles.input} placeholder={key} value={item[key]||''} onChange={e=>change(i,{items:section.items.map((x,k)=>k===j?{...x,[key]:e.target.value}:x)})}/>) }<button type="button" className={styles.danger} onClick={()=>change(i,{items:section.items.filter((_,k)=>k!==j).map((x,k)=>({...x,sort_order:k}))})}>항목 삭제</button></div>)}<div className={styles.rowActions}><button type="button" className={styles.small} onClick={()=>change(i,{items:[...section.items,{item_type:'text',body:'',organization:null,work:null,period:null,sort_order:section.items.length}]})}>항목 추가</button><button type="button" className={styles.danger} onClick={()=>update(sections.filter((_,j)=>j!==i).map((s,j)=>({...s,sort_order:j})))}>섹션 삭제</button></div></div>)}</section> }
