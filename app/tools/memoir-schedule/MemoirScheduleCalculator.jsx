'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { PhoneConsultModal } from '@/app/business/components/ServiceContactCta'
import {
  EVENT_TYPES,
  RECEIPT_OPTIONS,
  calculateMemoirSchedule,
  differenceInCalendarDays,
  formatLocalDate,
  getKoreaToday,
  parseDateOnly,
} from '@/lib/tools/memoirSchedule'
import styles from '../tools.module.css'
import modalStyles from './memoirSchedule.module.css'

export default function MemoirScheduleCalculator() {
  const today = getKoreaToday()
  const [eventType, setEventType] = useState('칠순')
  const [eventDate, setEventDate] = useState('')
  const [receiptOption, setReceiptOption] = useState('week')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)
  const dateInputRef = useRef(null)
  const resultRef = useRef(null)
  const isFormValid = useMemo(() => (
    EVENT_TYPES.includes(eventType)
    && RECEIPT_OPTIONS.some(option => option.value === receiptOption)
    && Boolean(parseDateOnly(eventDate))
    && differenceInCalendarDays(eventDate, today) >= 0
  ), [eventDate, eventType, receiptOption, today])

  useEffect(() => {
    const handlePageShow = () => {
      setIsCalculating(false)
      const restoredDate = dateInputRef.current?.value || ''
      if (restoredDate) setEventDate(restoredDate)
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  useEffect(() => {
    if (!result) return
    resultRef.current?.focus({ preventScroll: true })
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [result])

  const calculate = (event) => {
    event.preventDefault()
    if (!isFormValid || isCalculating) return
    setIsCalculating(true)
    try {
      const nextResult = calculateMemoirSchedule({ eventType, eventDate, receiptOption, today })
      setError('')
      setResult(nextResult)
    } catch (calculationError) {
      setResult(null)
      setError(calculationError.message)
    } finally {
      setIsCalculating(false)
    }
  }

  const updateEventType = (value) => {
    setEventType(value)
    setResult(null)
  }

  const updateEventDate = (value) => {
    setEventDate(value)
    setResult(null)
  }

  const updateReceiptOption = (value) => {
    setReceiptOption(value)
    setResult(null)
  }

  return (
    <>
      <section className={styles.calculatorSection} aria-labelledby="calculator-title">
        <div className={styles.calculator}>
          <form className={styles.formPanel} onSubmit={calculate} noValidate>
            <h2 id="calculator-title" className={styles.panelTitle}>행사 일정 입력</h2>
            <div className={styles.field}>
              <label htmlFor="event-type">행사 종류</label>
              <select id="event-type" className={styles.select} value={eventType} onChange={event => updateEventType(event.target.value)} required>
                {EVENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="event-date">행사 날짜</label>
              <input ref={dateInputRef} id="event-date" className={styles.input} type="date" min={today} value={eventDate} onChange={event => updateEventDate(event.target.value)} required />
            </div>
            <fieldset className={styles.fieldset}>
              <legend>희망 수령 시점</legend>
              <div className={styles.radioGrid}>
                {RECEIPT_OPTIONS.map(option => (
                  <label key={option.value} className={styles.radio}>
                    <input type="radio" name="receipt" value={option.value} checked={receiptOption === option.value} onChange={() => updateReceiptOption(option.value)} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button className={styles.button} type="submit" disabled={!isFormValid || isCalculating}>
              {isCalculating ? '계산 중…' : '제작 일정 계산하기'}
            </button>
          </form>
          <aside className={styles.guidePanel}>
            <span className={styles.eyebrow}>About the schedule</span>
            <h3>한 권의 기념책에는 여러 사람의 시간이 필요합니다.</h3>
            <p>인터뷰부터 원고 작성, 가족 검토, 디자인, 교정, 인쇄와 배송까지 일반적인 자서전 제작 공정을 기준으로 역산합니다.</p>
            <div className={styles.processMini} aria-label="주요 제작 공정">
              {['상담·자료 확인', '인터뷰', '원고 작성·검토', '디자인·교정', '인쇄·배송', '안전 여유 기간'].map(item => <span key={item}>{item}</span>)}
            </div>
          </aside>
        </div>
      </section>

      {result && (
        <section className={styles.results} ref={resultRef} tabIndex={-1} aria-live="polite" aria-labelledby="result-title">
          <div className={styles.resultInner}>
            <div className={styles.resultHero}>
              <div className={styles.startCard}>
                <span id="result-title" className={styles.resultLabel}>{result.eventType} 기념책 권장 제작 시작일</span>
                <strong className={styles.startDate}>{formatLocalDate(result.recommendedStartDate)}</strong>
              </div>
              <div className={styles.statusCard}>
                <span className={styles.resultLabel}>현재 일정 상태</span>
                <h3>{result.status.title}</h3>
                <p>{result.status.description}</p>
              </div>
            </div>
            <dl className={styles.summary}>
              <div><dt>행사 날짜</dt><dd>{formatLocalDate(result.eventDate)}</dd></div>
              <div><dt>희망 수령일</dt><dd>{formatLocalDate(result.receiptDate)}</dd></div>
              <div><dt>수령일까지 남은 기간</dt><dd>{result.daysRemaining}일</dd></div>
            </dl>

            <h3 className={styles.timelineTitle}>공정별 권장 일정</h3>
            <div className={styles.timeline}>
              {result.stages.map((stage, index) => (
                <article className={styles.timelineItem} key={stage.name}>
                  <span className={styles.step}>{String(index + 1).padStart(2, '0')}</span>
                  <h4>{stage.name}</h4>
                  <p>{stage.startDate === stage.endDate ? formatLocalDate(stage.startDate) : `${formatLocalDate(stage.startDate)} — ${formatLocalDate(stage.endDate)}`}</p>
                </article>
              ))}
            </div>

            <div className={styles.notice}>
              <strong>대부분의 제작은 약 2개월 이내에 마무리됩니다. 다만 가족 검토와 수정, 인쇄 일정까지 여유 있게 확보하려면 최대 3개월 전에 시작하는 것이 안전합니다.</strong>
              수정 지연, 자료 추가, 인쇄 일정 등을 고려한 여유 기간이 포함되어 있습니다. 이 일정은 인터뷰 일정을 바로 조율할 수 있다는 전제에서 계산한 권장 일정입니다. 인터뷰 대상자의 일정, 가족 검토 기간, 공휴일, 수정 횟수 및 인쇄 사양에 따라 실제 제작 기간은 달라질 수 있습니다.
            </div>
            <div className={styles.ctaRow}>
              <button type="button" className={styles.button} onClick={() => setIsPhoneOpen(true)}>
                현재 일정으로 제작 상담하기
              </button>
              <Link href="/business/autobiography" className={styles.buttonGhost}>자서전 제작 방식 자세히 보기</Link>
            </div>
          </div>
        </section>
      )}
      {isPhoneOpen && (
        <PhoneConsultModal styles={modalStyles} onClose={() => setIsPhoneOpen(false)} />
      )}
    </>
  )
}
