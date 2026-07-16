'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from '../partner.module.css'
import loginStyles from './login.module.css'

export default function PartnerLoginForm(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const [resending,setResending]=useState(false)
  const [resendMessage,setResendMessage]=useState('')
  const [resendError,setResendError]=useState('')
  const [cooldown,setCooldown]=useState(0)
  const router=useRouter()

  useEffect(()=>{
    if(cooldown<=0)return
    const timer=window.setInterval(()=>setCooldown(current=>Math.max(0,current-1)),1000)
    return()=>window.clearInterval(timer)
  },[cooldown])

  const submit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    setError('')
    const {data,error:loginError}=await supabase.auth.signInWithPassword({email,password})
    if(loginError){setLoading(false);setError('이메일 또는 비밀번호를 확인해 주세요.');return}
    const {data:profile}=await supabase.from('partner_profiles').select('status').eq('user_id',data.user.id).maybeSingle()
    if(!profile){await supabase.auth.signOut();setLoading(false);setError('파트너 신청 프로필이 없는 계정입니다.');return}
    router.push(profile.status==='approved'?'/partner/dashboard':'/partner/pending')
    router.refresh()
  }

  const resendConfirmation=async()=>{
    const normalizedEmail=email.trim()
    setResendMessage('')
    setResendError('')
    if(!normalizedEmail){setResendError('가입할 때 사용한 이메일을 먼저 입력해 주세요.');return}
    if(resending||cooldown>0)return
    setResending(true)
    try{
      const {error:resendAuthError}=await supabase.auth.resend({
        type:'signup',
        email:normalizedEmail,
        options:{emailRedirectTo:`${window.location.origin}/partner/pending`},
      })
      if(resendAuthError){
        console.error('[Partner login] Confirmation resend failed',{
          status:resendAuthError.status,
          code:resendAuthError.code,
        })
        const rateLimited=resendAuthError.status===429||resendAuthError.code==='over_email_send_rate_limit'||resendAuthError.message.toLowerCase().includes('rate limit')
        setResendError(rateLimited?'너무 자주 요청했습니다. 잠시 후 다시 시도해 주세요.':'인증 메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }
      setResendMessage('인증 메일을 다시 보냈습니다. 메일함과 스팸함을 확인해 주세요.')
      setCooldown(60)
    }catch(unexpectedError){
      console.error('[Partner login] Unexpected confirmation resend failure',{
        name:unexpectedError instanceof Error?unexpectedError.name:'UnknownError',
      })
      setResendError('인증 메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.')
    }finally{
      setResending(false)
    }
  }

  return <main className={styles.authWrap}><div className={styles.authBox}><span className={styles.eyebrow}>Partner Login</span><h1>파트너 로그인</h1><p className={styles.authIntro}>승인 여부와 파트너 코드를 확인하는 사업자 파트너 전용 로그인입니다.</p><form onSubmit={submit}><div className={styles.field}><label>이메일</label><input className={styles.input} type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div><div className={styles.field} style={{marginTop:'16px'}}><label>비밀번호</label><input className={styles.input} type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>{error&&<div className={styles.error} role="alert">{error}</div>}<button className={styles.submit} disabled={loading} style={{marginTop:'20px'}}>{loading?'로그인 중…':'로그인'}</button></form><div className={loginStyles.resendBox}><button type="button" className={loginStyles.resendButton} onClick={resendConfirmation} disabled={resending||cooldown>0}>{resending?'전송 중…':cooldown>0?`다시 보내기 (${cooldown}초)`:'이메일 인증 메일 다시 보내기'}</button>{resendMessage&&<div className={styles.success} role="status">{resendMessage}</div>}{resendError&&<div className={styles.error} role="alert">{resendError}</div>}</div><p className={styles.authFooter}>파트너 계정이 없나요? <Link href="/partner/signup" className={styles.textLink}>파트너십 신청하기</Link></p></div></main>
}
