'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from '../partner.module.css'

function createInitialForm(contactName = '') {
  return {
    businessName: '',
    contactName,
    email: '',
    password: '',
    phone: '',
    businessType: '',
    region: '',
    websiteUrl: '',
    snsUrl: '',
    introductionPlan: '',
    hasOfflineStore: false,
    canDisplayCards: false,
    canDisplayBanner: false,
    agreed: false,
  }
}

function PartnerApplicationFields({ form, update }) {
  return (
    <>
      <div className={styles.field}>
        <label htmlFor="partner-business-name">업체명</label>
        <input id="partner-business-name" className={styles.input} maxLength={100} value={form.businessName} onChange={event => update('businessName', event.target.value)} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="partner-contact-name">담당자명</label>
        <input id="partner-contact-name" className={styles.input} maxLength={50} autoComplete="name" value={form.contactName} onChange={event => update('contactName', event.target.value)} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="partner-phone">연락처</label>
        <input id="partner-phone" className={styles.input} type="tel" maxLength={30} autoComplete="tel" value={form.phone} onChange={event => update('phone', event.target.value)} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="partner-business-type">업종</label>
        <input id="partner-business-type" className={styles.input} maxLength={100} placeholder="예: 꽃집, 답례품" value={form.businessType} onChange={event => update('businessType', event.target.value)} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="partner-region">활동 지역</label>
        <input id="partner-region" className={styles.input} maxLength={100} value={form.region} onChange={event => update('region', event.target.value)} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="partner-website-url">홈페이지 주소</label>
        <input id="partner-website-url" className={styles.input} type="url" maxLength={500} placeholder="https://" value={form.websiteUrl} onChange={event => update('websiteUrl', event.target.value)} />
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <label htmlFor="partner-sns-url">SNS·네이버 플레이스·블로그 주소</label>
        <input id="partner-sns-url" className={styles.input} type="url" maxLength={500} placeholder="https://" value={form.snsUrl} onChange={event => update('snsUrl', event.target.value)} />
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <label htmlFor="partner-introduction-plan">마이티북스의 제휴 혜택을 어떤 고객에게, 어떤 상황에서 안내할 계획인지 적어주세요.</label>
        <textarea id="partner-introduction-plan" className={styles.textarea} maxLength={2000} value={form.introductionPlan} onChange={event => update('introductionPlan', event.target.value)} required />
      </div>
      <div className={`${styles.checks} ${styles.fieldFull}`}>
        <label className={styles.check}><input type="checkbox" checked={form.hasOfflineStore} onChange={event => update('hasOfflineStore', event.target.checked)} />오프라인 매장을 운영합니다.</label>
        <label className={styles.check}><input type="checkbox" checked={form.canDisplayCards} onChange={event => update('canDisplayCards', event.target.checked)} />고객용 안내 카드를 비치할 수 있습니다.</label>
        <label className={styles.check}><input type="checkbox" checked={form.canDisplayBanner} onChange={event => update('canDisplayBanner', event.target.checked)} />협의 후 미니 배너를 비치할 수 있습니다.</label>
        <label className={styles.check}><input type="checkbox" checked={form.agreed} onChange={event => update('agreed', event.target.checked)} required />파트너 심사를 위해 입력한 업체·담당자·연락처 정보를 수집하고 검토하는 데 동의합니다.</label>
      </div>
    </>
  )
}

export default function PartnerSignupForm({ mode, accountEmail = '', initialContactName = '' }) {
  const isMember = mode === 'member'
  const [form, setForm] = useState(() => createInitialForm(initialContactName))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showLoginContinuation, setShowLoginContinuation] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const update = (key, value) => setForm(current => ({ ...current, [key]: value }))

  const submitGuestApplication = async () => {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/partner/pending`,
        data: {
          display_name: form.contactName.trim(),
          account_type: 'partner',
          business_name: form.businessName.trim(),
          contact_name: form.contactName.trim(),
          phone: form.phone.trim(),
          business_type: form.businessType.trim(),
          region: form.region.trim(),
          website_url: form.websiteUrl.trim(),
          sns_url: form.snsUrl.trim(),
          introduction_plan: form.introductionPlan.trim(),
          has_offline_store: form.hasOfflineStore,
          can_display_cards: form.canDisplayCards,
          can_display_banner: form.canDisplayBanner,
        },
      },
    })

    if (signUpError) {
      console.error('[Partner signup] Supabase signUp failed', { message: signUpError.message, status: signUpError.status, code: signUpError.code })
      const duplicateEmail = signUpError.code === 'user_already_exists' || signUpError.message.toLowerCase().includes('registered')
      setError(duplicateEmail ? '이미 마이티북스에 가입한 이메일이라면 로그인한 뒤 현재 계정으로 파트너 신청을 계속해 주세요.' : '가입을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.')
      setShowLoginContinuation(duplicateEmail)
      return
    }

    if (data.user && data.user.identities?.length === 0) {
      setError('이미 마이티북스에 가입한 이메일이라면 로그인한 뒤 현재 계정으로 파트너 신청을 계속해 주세요.')
      setShowLoginContinuation(true)
      return
    }

    setSubmitted(true)
    if (data.session) {
      router.replace('/partner/pending')
      router.refresh()
      return
    }
    setSuccess(true)
  }

  const submitMemberApplication = async () => {
    const response = await fetch('/api/partner/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: form.businessName,
        contactName: form.contactName,
        phone: form.phone,
        businessType: form.businessType,
        region: form.region,
        websiteUrl: form.websiteUrl,
        snsUrl: form.snsUrl,
        introductionPlan: form.introductionPlan,
        hasOfflineStore: form.hasOfflineStore,
        canDisplayCards: form.canDisplayCards,
        canDisplayBanner: form.canDisplayBanner,
        agreed: form.agreed,
      }),
    })
    const body = await response.json()

    if (response.ok) {
      setSubmitted(true)
      router.replace('/partner/pending')
      router.refresh()
      return
    }
    if (response.status === 401 && body.code === 'AUTH_REQUIRED') {
      router.replace('/account/login?next=/partner/signup')
      router.refresh()
      return
    }
    if (response.status === 409 && body.code === 'ALREADY_APPLIED') {
      router.replace(body.status === 'approved' ? '/partner/dashboard' : '/partner/pending')
      router.refresh()
      return
    }
    if ((response.status === 403 && body.code === 'ACCOUNT_INACTIVE') || body.code === 'ACCOUNT_PROFILE_MISSING' || (response.status === 400 && body.code === 'INVALID_INPUT')) {
      setError(body.error)
      return
    }
    setError('신청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.')
  }

  const submit = async event => {
    event.preventDefault()
    if (loading || submitted || !form.agreed) return
    if (!form.websiteUrl.trim() && !form.snsUrl.trim()) {
      setError('업체 홈페이지 또는 주로 활동하는 SNS 주소를 하나 이상 입력해 주세요.')
      return
    }

    setLoading(true)
    setError('')
    setShowLoginContinuation(false)
    try {
      if (isMember) await submitMemberApplication()
      else await submitGuestApplication()
    } catch (unexpectedError) {
      console.error('[Partner signup] Unexpected application failure', { name: unexpectedError instanceof Error ? unexpectedError.name : 'UnknownError' })
      setError('신청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  if (success) return <main className={styles.authWrap}><div className={styles.statusCard}><span className={styles.statusBadge}>이메일 확인 필요</span><h1>파트너 신청 계정을 확인해 주세요.</h1><p>가입 이메일로 전송된 확인 링크를 누르면 현재 신청 계정으로 로그인되고 파트너 상태 화면으로 이동합니다.</p><p>이미 마이티북스에 가입한 이메일이라면 로그인한 뒤 현재 계정으로 파트너 신청을 계속해 주세요.</p><div className={styles.actions}><Link href="/account/login?next=/partner/signup" className={styles.primary}>로그인하고 신청 계속하기</Link><Link href="/partner" className={styles.secondary}>안내 페이지로</Link></div></div></main>

  return <main className={styles.authWrap}><div className={styles.authBox}><span className={styles.eyebrow}>Partner Application</span><h1>사업자 파트너 신청</h1><p className={styles.authIntro}>{isMember ? '현재 로그인한 마이티북스 계정으로 파트너십 심사를 신청합니다.' : '계정을 만들면서 파트너십 심사를 함께 신청합니다.'}</p><form onSubmit={submit} className={styles.formGrid}>
    {isMember ? <div className={`${styles.field} ${styles.fieldFull}`}><span className={styles.fieldLabel}>계정 이메일</span><div className={styles.readonlyValue}>{accountEmail}</div></div> : <><div className={styles.field}><label htmlFor="partner-email">로그인 이메일</label><input id="partner-email" className={styles.input} type="email" autoComplete="email" value={form.email} onChange={event => update('email', event.target.value)} required /></div><div className={styles.field}><label htmlFor="partner-password">비밀번호</label><input id="partner-password" className={styles.input} type="password" minLength={8} autoComplete="new-password" value={form.password} onChange={event => update('password', event.target.value)} required /></div></>}
    <PartnerApplicationFields form={form} update={update} />
    {error && <div className={`${styles.error} ${styles.fieldFull}`} role="alert">{error}</div>}
    {showLoginContinuation && <div className={styles.fieldFull}><Link href="/account/login?next=/partner/signup" className={styles.primary}>로그인하고 신청 계속하기</Link></div>}
    <div className={styles.fieldFull}><button className={styles.submit} disabled={loading || submitted || !form.agreed}>{loading ? '신청 중…' : '파트너십 신청하기'}</button></div>
  </form>{!isMember && <p className={styles.authFooter}>이미 마이티북스 회원이신가요? <Link href="/account/login?next=/partner/signup" className={styles.textLink}>로그인 후 파트너 신청을 계속할 수 있습니다.</Link></p>}</div></main>
}
