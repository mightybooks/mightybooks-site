/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { verifyAdminSession } from '@/lib/admin-client'
import styles from '../admin.module.css'
import partnerStyles from './partners.module.css'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim()
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim()

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('[Admin Supabase client] NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const statusLabels = { pending: '승인 대기', on_hold: '승인 보류', approved: '승인 업체', suspended: '제휴 중지' }

function Modal({ title, children, onClose, actions }) {
  useEffect(() => {
    const closeOnEscape = event => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return <div className={partnerStyles.modalBackdrop} onMouseDown={event => {
    if (event.target === event.currentTarget) onClose()
  }}>
    <section className={partnerStyles.modal} role="dialog" aria-modal="true" aria-labelledby="partner-modal-title">
      <button className={partnerStyles.modalClose} onClick={onClose} aria-label="팝업 닫기">×</button>
      <h2 id="partner-modal-title">{title}</h2>
      <div className={partnerStyles.modalBody}>{children}</div>
      <div className={partnerStyles.modalActions}>{actions || <button className={styles.btnRed} onClick={onClose} autoFocus>확인</button>}</div>
    </section>
  </div>
}

function PartnerDetails({ partner }) {
  return <dl className={partnerStyles.details}>
    <div><dt>담당자</dt><dd>{partner.contact_name}</dd></div>
    <div><dt>이메일</dt><dd>{partner.email}</dd></div>
    <div><dt>연락처</dt><dd>{partner.phone}</dd></div>
    <div><dt>업종·지역</dt><dd>{partner.business_type} / {partner.region}</dd></div>
    <div className={partnerStyles.wide}><dt>홈페이지·SNS</dt><dd>{[partner.website_url, partner.sns_url].filter(Boolean).map(url => <a key={url} href={url} target="_blank" rel="noopener noreferrer">{url}</a>)}</dd></div>
    <div className={partnerStyles.wide}><dt>활용 계획</dt><dd>{partner.introduction_plan}</dd></div>
    <div className={partnerStyles.wide}><dt>매장·홍보물</dt><dd>오프라인 매장 {partner.has_offline_store ? '있음' : '없음'} / 카드 {partner.can_display_cards ? '가능' : '미정'} / 배너 {partner.can_display_banner ? '가능' : '미정'}</dd></div>
  </dl>
}

export default function PartnerAdminManager({ mode }) {
  const isApprovedView = mode === 'approved'
  const visibleStatuses = isApprovedView ? ['approved', 'suspended'] : ['pending', 'on_hold']
  const [partners, setPartners] = useState([])
  const [counts, setCounts] = useState({ pending: 0, on_hold: 0, approved: 0, suspended: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingId, setSavingId] = useState(null)
  const [resultModal, setResultModal] = useState(null)
  const [rejectTarget, setRejectTarget] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const router = useRouter()

  const getToken = async () => {
    const { data } = await supabase.auth.getSession()
    return data.session?.access_token
  }

  const load = async () => {
    const token = await getToken()
    if (!token) {
      router.replace('/admin')
      return
    }
    const response = await fetch(`/api/admin/partners?view=${mode}`, { headers: { Authorization: `Bearer ${token}` } })
    if (response.status === 403) {
      await supabase.auth.signOut()
      router.replace('/admin')
      return
    }
    const body = await response.json()
    if (!response.ok) {
      setError(body.error || '파트너 목록을 불러오지 못했습니다.')
      setLoading(false)
      return
    }
    setPartners(body.partners)
    setCounts(body.counts)
    setLoading(false)
  }

  useEffect(() => {
    verifyAdminSession(supabase).then(ok => {
      if (!ok) {
        supabase.auth.signOut().then(() => router.replace('/admin'))
        return
      }
      load()
    })
  }, [])

  const updateLocal = (id, key, value) => setPartners(current => current.map(item => item.id === id ? { ...item, [key]: value } : item))

  const closeResult = () => {
    if (resultModal?.partner) {
      const updated = resultModal.partner
      setPartners(current => visibleStatuses.includes(updated.status)
        ? current.map(item => item.id === updated.id ? updated : item)
        : current.filter(item => item.id !== updated.id))
      load()
    }
    setResultModal(null)
  }

  const save = async (partner, status, rejectedReason = partner.rejected_reason, successCopy) => {
    if (savingId) return
    setSavingId(partner.id)
    setError('')
    try {
      const token = await getToken()
      const response = await fetch('/api/admin/partners', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: partner.id, status, rejectedReason, internalMemo: partner.internal_memo }),
      })
      const body = await response.json()
      if (!response.ok) throw new Error(body.error)
      setRejectTarget(null)
      setRejectReason('')
      setResultModal({ title: successCopy.title, message: successCopy.message(partner.business_name), partner: body.partner })
    } catch (saveError) {
      console.error('[Admin partners] Update failed', saveError)
      setRejectTarget(null)
      setRejectReason('')
      setResultModal({ title: '처리 실패', message: '상태를 변경하지 못했습니다. 잠시 후 다시 시도해 주세요.' })
    } finally {
      setSavingId(null)
    }
  }

  const approve = partner => save(partner, 'approved', null, {
    title: '승인 완료',
    message: name => `${name}의 파트너 승인이 완료되었습니다. 해당 업체는 승인 업체 관리 페이지로 이동되었습니다.`,
  })
  const hold = partner => save(partner, 'on_hold', null, {
    title: '승인 보류', message: name => `${name}의 파트너 신청을 보류 상태로 변경했습니다.`,
  })
  const suspend = partner => save(partner, 'suspended', null, {
    title: '제휴 중지', message: name => `${name}의 제휴를 중지했습니다.`,
  })
  const resume = partner => save(partner, 'approved', null, {
    title: '제휴 재개', message: name => `${name}의 제휴를 다시 활성화했습니다.`,
  })
  const saveMemo = partner => save(partner, partner.status, null, {
    title: '메모 저장 완료', message: name => `${name}의 관리자 메모를 저장했습니다.`,
  })

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  return <div className={styles.adminWrap}>
    <div className={styles.adminHeader}><div className={styles.adminLogo}><em>마이티</em>북스 ADMIN</div><button onClick={logout} className={styles.btnGhost}>로그아웃</button></div>
    <div className={styles.adminBody}>
      <Link href="/admin/dashboard" className={styles.backLink}>← 관리자 메뉴로 돌아가기</Link>
      <nav className={partnerStyles.tabs} aria-label="파트너 관리 메뉴">
        <Link href="/admin/partners" className={!isApprovedView ? partnerStyles.activeTab : ''}>신규 승인 관리 <span>{counts.pending + counts.on_hold}</span></Link>
        <Link href="/admin/partners/approved" className={isApprovedView ? partnerStyles.activeTab : ''}>승인 업체 관리 <span>{counts.approved + counts.suspended}</span></Link>
      </nav>
      <div className={styles.adminTitleRow}><div><h1 className={styles.adminTitle}>{isApprovedView ? '승인 업체 관리' : '신규 파트너 승인 관리'}</h1><p className={styles.adminDescription}>{isApprovedView ? `승인 업체 ${counts.approved}건 · 제휴 중지 ${counts.suspended}건` : `승인 대기 ${counts.pending}건 · 승인 보류 ${counts.on_hold}건`}</p></div></div>
      {error && <div className={partnerStyles.error}>{error}</div>}
      {loading ? <p>불러오는 중...</p> : partners.length === 0 ? <div className={styles.emptyPanel}><p>{isApprovedView ? '승인 또는 제휴 중지된 업체가 없습니다.' : '현재 심사할 파트너 신청이 없습니다.'}</p></div> : <div className={partnerStyles.list}>{partners.map(partner => <article className={partnerStyles.card} key={partner.id}>
        <div className={partnerStyles.heading}><div><span>{statusLabels[partner.status]}</span><h2>{partner.business_name}</h2><p>신청일 {new Date(partner.created_at).toLocaleString('ko-KR')}</p>{isApprovedView && partner.approved_at && <p>승인일 {new Date(partner.approved_at).toLocaleString('ko-KR')}</p>}</div>{partner.partner_code && <strong>{partner.partner_code}</strong>}</div>
        <PartnerDetails partner={partner}/>
        {isApprovedView && <div className={partnerStyles.notes}><label>관리자 조율 메모<textarea value={partner.internal_memo || ''} onChange={event => updateLocal(partner.id, 'internal_memo', event.target.value)}/></label></div>}
        <div className={partnerStyles.actions}>{isApprovedView ? <>
          <button disabled={savingId === partner.id} onClick={() => saveMemo(partner)} className={styles.btnGhost}>{savingId === partner.id ? '처리 중…' : '메모 저장'}</button>
          {partner.status === 'approved' ? <button disabled={savingId === partner.id} onClick={() => suspend(partner)} className={styles.btnGhost}>제휴 중지</button> : <button disabled={savingId === partner.id} onClick={() => resume(partner)} className={styles.btnRed}>제휴 재개</button>}
        </> : <>
          <button disabled={savingId === partner.id} onClick={() => approve(partner)} className={styles.btnRed}>{savingId === partner.id ? '처리 중…' : '승인'}</button>
          <button disabled={savingId === partner.id} onClick={() => { setRejectTarget(partner); setRejectReason(partner.rejected_reason || '') }} className={styles.btnGhost}>승인 거절</button>
          <button disabled={savingId === partner.id} onClick={() => hold(partner)} className={styles.btnGhost}>승인 보류</button>
        </>}</div>
      </article>)}</div>}
    </div>
    {rejectTarget && <Modal title="승인 거절 사유" onClose={() => { if (!savingId) setRejectTarget(null) }} actions={<><button className={styles.btnGhost} disabled={Boolean(savingId)} onClick={() => setRejectTarget(null)}>취소</button><button className={styles.btnRed} disabled={Boolean(savingId) || !rejectReason.trim()} onClick={() => save(rejectTarget, 'rejected', rejectReason, { title: '승인 거절', message: name => `${name}의 파트너 신청을 거절했습니다. 해당 업체는 승인 대기 목록에서 제외되었습니다.` })}>{savingId ? '처리 중…' : '거절 처리'}</button></>}><label className={partnerStyles.rejectField}>거절 사유<textarea value={rejectReason} onChange={event => setRejectReason(event.target.value)} autoFocus/></label></Modal>}
    {resultModal && <Modal title={resultModal.title} onClose={closeResult}><p>{resultModal.message}</p></Modal>}
  </div>
}
