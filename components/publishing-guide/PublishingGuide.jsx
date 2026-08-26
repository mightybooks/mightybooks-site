'use client'

import { useEffect, useMemo, useState } from 'react'
import { KAKAO_URL } from '@/app/business/components/ServiceContactCta'
import {
  applyGuideAnswer,
  buildGuideCopyText,
  GUIDE_QUESTIONS,
  getFileFormatNotice,
  getGuideResult,
  getResultStatusSummary,
  getVisibleQuestions,
} from './publishingGuideData'
import styles from './publishingGuide.module.css'

function trackGuideEvent(name, detail = {}) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(name, { detail }))
  if (typeof window.gtag === 'function') window.gtag('event', name, detail)
}

function copyTextFallback(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

export default function PublishingGuide({ variant = 'page', onComplete }) {
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [fileNoticeType, setFileNoticeType] = useState(null)
  const [copyStatus, setCopyStatus] = useState('')
  const [form, setForm] = useState({ name: '', contact: '', note: '', consent: false, website: '' })
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const questions = useMemo(() => getVisibleQuestions(answers), [answers])
  const currentQuestion = questions[currentIndex]
  const result = useMemo(() => completed ? getGuideResult(answers) : null, [answers, completed])
  const summary = useMemo(() => completed ? getResultStatusSummary(answers) : [], [answers, completed])

  useEffect(() => {
    if (currentIndex >= questions.length) setCurrentIndex(Math.max(0, questions.length - 1))
  }, [currentIndex, questions.length])

  const start = () => {
    setStarted(true)
    trackGuideEvent('publishing_guide_start', { variant })
  }

  const moveAfterAnswer = nextAnswers => {
    const nextQuestions = getVisibleQuestions(nextAnswers)
    const position = nextQuestions.findIndex(question => question.id === currentQuestion.id)
    if (position >= nextQuestions.length - 1) {
      setCompleted(true)
      const nextResult = getGuideResult(nextAnswers)
      trackGuideEvent('publishing_guide_complete', { result_type: nextResult.type, variant })
      onComplete?.(nextResult)
      return
    }
    setCurrentIndex(position + 1)
    trackGuideEvent('publishing_guide_step', { step: position + 2, question_id: nextQuestions[position + 1].id, variant })
  }

  const chooseSingle = value => {
    const nextAnswers = applyGuideAnswer(answers, currentQuestion.id, value)
    setAnswers(nextAnswers)
    const fileNotice = currentQuestion.id === 'fileFormat' ? getFileFormatNotice(value) : null
    if (fileNotice) {
      setFileNoticeType(value)
      return
    }
    setFileNoticeType(null)
    moveAfterAnswer(nextAnswers)
  }

  const continueAfterFileNotice = () => {
    setFileNoticeType(null)
    moveAfterAnswer(answers)
  }

  const toggleMultiple = value => {
    const current = Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id] : []
    let next
    if (value === 'unknown') {
      next = current.includes('unknown') ? [] : ['unknown']
    } else {
      next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current.filter(item => item !== 'unknown'), value]
    }
    const nextAnswers = applyGuideAnswer(answers, currentQuestion.id, next)
    setAnswers(nextAnswers)
  }

  const goBack = () => {
    setFileNoticeType(null)
    if (currentIndex === 0) {
      setStarted(false)
      return
    }
    setCurrentIndex(index => index - 1)
  }

  const reset = () => {
    setStarted(false)
    setAnswers({})
    setCurrentIndex(0)
    setCompleted(false)
    setFileNoticeType(null)
    setCopyStatus('')
    setSubmitStatus('idle')
    setSubmitMessage('')
    setForm({ name: '', contact: '', note: '', consent: false, website: '' })
  }

  const copyResult = async () => {
    const text = buildGuideCopyText(answers, result)
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text)
      else copyTextFallback(text)
      setCopyStatus('상담 내용이 복사되었습니다.')
    } catch {
      copyTextFallback(text)
      setCopyStatus('상담 내용이 복사되었습니다.')
    }
  }

  const submitConsultation = async event => {
    event.preventDefault()
    setSubmitStatus('submitting')
    setSubmitMessage('')
    trackGuideEvent('publishing_guide_contact', { result_type: result.type, variant })
    try {
      const response = await fetch('/api/publishing-guide/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, answers }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || '상담 요청을 접수하지 못했습니다.')
      setSubmitStatus('success')
      setSubmitMessage('상담 요청이 접수되었습니다. 확인 후 안내드리겠습니다.')
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error.message || '잠시 후 다시 시도해 주세요.')
    }
  }

  if (!started) {
    return (
      <div className={`${styles.guide} ${variant === 'modal' ? styles.guideModal : ''}`}>
        <span className={styles.eyebrow}>Publishing Guide</span>
        <h2 className={styles.introTitle}>내 책은 어디서부터<br /><em>맡기면 될까요?</em></h2>
        <p className={styles.introText}>준비된 원고가 있든 없든, 완성된 PDF가 있든 없든 괜찮습니다. 현재 상태만 알려주세요. 딱 필요한 제작 방향만 안내해드립니다.</p>
        <ul className={styles.introPoints}>
          <li>질문은 앞선 답에 따라 필요한 항목만 이어집니다.</li>
          <li>가격을 자동 계산하거나 개인정보를 먼저 요구하지 않습니다.</li>
          <li>결과를 확인한 뒤 원할 때만 상담을 신청하시면 됩니다.</li>
        </ul>
        <button type="button" className={styles.primaryButton} onClick={start}>1분 출판 길라잡이 시작</button>
      </div>
    )
  }

  if (completed && result) {
    return (
      <div className={`${styles.guide} ${styles.resultView} ${variant === 'modal' ? styles.guideModal : ''}`} aria-live="polite">
        <span className={styles.eyebrow}>추천 제작 방식</span>
        <h2 className={styles.resultTitle}>{result.title}</h2>
        <p className={styles.resultDescription}>{result.summary}</p>

        {result.notes.length > 0 && (
          <section className={styles.resultNotes} aria-label="현재 답변에 따른 추가 안내">
            {result.notes.map(note => (
              <article key={note.id} className={styles.resultNote}>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </section>
        )}

        <div className={styles.resultGrid}>
          <section className={styles.resultPanel} aria-labelledby="guide-status-heading">
            <h3 id="guide-status-heading">현재 상태</h3>
            <dl className={styles.summaryList}>
              {summary.map(item => <div key={item.id}><dt>{item.shortLabel}</dt><dd>{item.value}</dd></div>)}
            </dl>
          </section>
          <section className={styles.resultPanel} aria-labelledby="guide-tasks-heading">
            <h3 id="guide-tasks-heading">예상되는 주요 작업</h3>
            <ul className={styles.taskList}>{result.tasks.map(task => <li key={task}>{task}</li>)}</ul>
          </section>
        </div>

        {result.publicationNote && (
          <div className={styles.publicationNote}>
            <strong>{result.publicationNote.title}</strong>
            <p>{result.publicationNote.text}</p>
          </div>
        )}
        <p className={styles.disclaimer}>현재 선택하신 내용을 기준으로 한 사전 안내입니다. 실제 제작 범위와 견적은 원고 및 파일 확인 후 결정됩니다.</p>

        <div className={styles.shareActions}>
          <button type="button" className={styles.secondaryButton} onClick={copyResult}>상담 내용 복사</button>
          <a
            className={styles.kakaoButton}
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGuideEvent('publishing_guide_openchat', { result_type: result.type, variant })}
          >카카오 오픈톡으로 상담</a>
          <button type="button" className={styles.textButton} onClick={reset}>처음부터 다시 확인</button>
        </div>
        {copyStatus && <p className={styles.statusMessage}>{copyStatus} 오픈톡에서 붙여넣어 주세요.</p>}

        <section className={styles.contactSection} aria-labelledby="guide-contact-heading">
          <div>
            <span className={styles.eyebrow}>Request Consultation</span>
            <h3 id="guide-contact-heading">상담 신청하기</h3>
            <p>길라잡이 선택 내용은 자동으로 함께 전달됩니다.</p>
          </div>
          {submitStatus === 'success' ? (
            <div role="status">
              <p className={styles.successMessage}>{submitMessage}</p>
              <p className={styles.responseTime}>업무 시간 중에는 빠르게 답변드릴 수 있습니다. 업무 외 시간에 보내주신 문의도 최대 24시간 이내에 확인 후 회신드립니다.</p>
            </div>
          ) : (
            <form className={styles.contactForm} onSubmit={submitConsultation}>
              <label>이름<input name="name" value={form.name} maxLength={50} required onChange={event => setForm({ ...form, name: event.target.value })} /></label>
              <label>전화번호 또는 이메일<input name="contact" value={form.contact} maxLength={100} required onChange={event => setForm({ ...form, contact: event.target.value })} /></label>
              <label className={styles.fullField}>추가로 남길 내용 <span>(선택)</span><textarea name="note" value={form.note} maxLength={1000} rows={3} onChange={event => setForm({ ...form, note: event.target.value })} /></label>
              <label className={styles.honeypot} aria-hidden="true">웹사이트<input name="website" value={form.website} tabIndex={-1} autoComplete="off" onChange={event => setForm({ ...form, website: event.target.value })} /></label>
              <label className={`${styles.consentField} ${styles.fullField}`}><input type="checkbox" checked={form.consent} required onChange={event => setForm({ ...form, consent: event.target.checked })} /><span>상담 답변을 위한 개인정보 수집·이용에 동의합니다.</span></label>
              <button className={`${styles.primaryButton} ${styles.fullField}`} type="submit" disabled={submitStatus === 'submitting'}>{submitStatus === 'submitting' ? '접수 중...' : '상담 요청 접수'}</button>
              <p className={`${styles.responseTime} ${styles.fullField}`}>업무 시간 중에는 빠르게 답변드릴 수 있습니다. 업무 외 시간에 보내주신 문의도 최대 24시간 이내에 확인 후 회신드립니다.</p>
              {submitMessage && <p className={`${styles.formMessage} ${styles.fullField}`}>{submitMessage}</p>}
            </form>
          )}
        </section>
      </div>
    )
  }

  const selected = currentQuestion?.multiple && Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id] : []
  const progressPosition = GUIDE_QUESTIONS.findIndex(question => question.id === currentQuestion?.id) + 1
  const fileNotice = getFileFormatNotice(fileNoticeType)

  if (fileNotice) {
    return (
      <div className={`${styles.guide} ${styles.questionView} ${variant === 'modal' ? styles.guideModal : ''}`}>
        <div className={styles.progressTop}>
          <span>STEP {currentIndex + 1}</span>
          <div className={styles.progressTrack}><span style={{ width: `${(progressPosition / GUIDE_QUESTIONS.length) * 100}%` }} /></div>
        </div>
        <div className={styles.chatLabel}>파일 제작 조건 안내</div>
        <section className={styles.fileNoticeCard} aria-live="polite">
          <h2>{fileNotice.title}</h2>
          <p>{fileNotice.body}</p>
          <p className={styles.fileNoticeSupport}>{fileNotice.support}</p>
        </section>
        <div className={styles.navigationRow}>
          <button type="button" className={styles.secondaryButton} onClick={() => setFileNoticeType(null)}>파일 형식 다시 선택</button>
          <button type="button" className={styles.primaryButton} onClick={continueAfterFileNotice}>확인했습니다. 계속하기</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.guide} ${styles.questionView} ${variant === 'modal' ? styles.guideModal : ''}`}>
      <div className={styles.progressTop}>
        <span>STEP {currentIndex + 1}</span>
        <div className={styles.progressTrack}><span style={{ width: `${(progressPosition / GUIDE_QUESTIONS.length) * 100}%` }} /></div>
      </div>
      <div className={styles.chatLabel}>마이티북스 출판 길라잡이</div>
      <h2 className={styles.questionTitle}>{currentQuestion.title}</h2>
      {currentQuestion.help && <p className={styles.questionHelp}>{currentQuestion.help}</p>}
      <div className={styles.optionGrid} role={currentQuestion.multiple ? 'group' : undefined} aria-label={currentQuestion.title}>
        {currentQuestion.options.map(item => (
          <button
            key={item.value}
            type="button"
            className={`${styles.optionButton} ${selected.includes(item.value) ? styles.optionSelected : ''}`}
            aria-pressed={currentQuestion.multiple ? selected.includes(item.value) : undefined}
            onClick={() => currentQuestion.multiple ? toggleMultiple(item.value) : chooseSingle(item.value)}
          >{item.label}</button>
        ))}
      </div>
      <div className={styles.navigationRow}>
        <button type="button" className={styles.secondaryButton} onClick={goBack}>뒤로</button>
        {currentQuestion.multiple && (
          <button type="button" className={styles.primaryButton} disabled={!selected.length} onClick={() => moveAfterAnswer(answers)}>다음</button>
        )}
      </div>
    </div>
  )
}
