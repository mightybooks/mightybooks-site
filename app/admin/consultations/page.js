'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import styles from '../admin.module.css'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const SOURCES = ['오픈톡', '블로그', '네이버 검색', '웹사이트', '기존 고객 소개', '지인 소개', '인스타/스레드', '방문상담', '전화', '기타']
const INQUIRY_TYPES = ['자서전', '자비출간', '시집', '에세이', '소책자', 'ISBN/서점유통', '편집/디자인', '기타']
const MANUSCRIPT_STATUSES = ['손글씨', '한글/워드 파일', '녹음 자료', '사진 자료', '구상 단계', '혼합 자료', '기타']
const STATUSES = ['신규 문의', '1차 답변 완료', '상담 중', '견적 안내 완료', '입금 대기', '수주 성공', '이탈', '보류', '완료']
const ACTIVE_STATUSES = ['신규 문의', '1차 답변 완료', '상담 중', '견적 안내 완료', '입금 대기', '보류']
const LEAD_GRADES = ['A', 'B', 'C', 'D', '판단 불가']
const LOSS_REASONS = ['가격 부담', '타 업체 비교', '가족 상의 후 보류', '응답 없음', '분량 불확실', '제작 방식 불일치', '일정 불일치', '기타']
const RELATIONSHIP_TYPES = ['신규', '기존 고객', '기존 고객 소개', '지인 소개', '가족/내부 지인', '검색 유입', 'GPT/AI 추천', '오픈톡', '기타']
const DECISION_RESULTS = ['수주', '보류', '고객 이탈', '대표 거절', '완료', '판단 중']
const FIT_LEVELS = ['적합', '주의', '부적합', '판단 전']
const QUESTION_TAGS = [
  '손글씨 원고 가능 여부',
  '녹음 자료 정리 가능 여부',
  '가족 인터뷰 가능 여부',
  '소량 제작 가능 여부',
  'ISBN 발급 가능 여부',
  '온라인서점 등록 가능 여부',
  '인쇄비 포함 여부',
  '제작 기간',
  '가격/견적',
  '사진 보정/삽입',
  '원고 교정',
  '디자인 포함 여부',
  '저작권/소유권',
  '기타',
]

const EMPTY_FORM = {
  consulted_at: getToday(),
  customer_label: '',
  source: SOURCES[0],
  inquiry_type: INQUIRY_TYPES[0],
  manuscript_status: MANUSCRIPT_STATUSES[0],
  estimated_pages: '',
  estimated_copies: '',
  quoted_amount: '',
  confirmed_amount: '',
  relationship_type: '',
  contract_amount: '',
  production_cost_amount: '',
  estimated_profit_amount: '',
  confirmed_profit_amount: '',
  decision_result: '',
  fit_level: '',
  consultation_fee_paid: false,
  consultation_fee_amount: '',
  status: STATUSES[0],
  lead_grade: LEAD_GRADES[4],
  loss_reason: '',
  follow_up_date: '',
  question_tags: [],
  summary: '',
  memo: '',
}

const EMPTY_FILTERS = {
  period: 'thisMonth',
  startDate: '',
  endDate: '',
  source: '',
  inquiryType: '',
  status: '',
  leadGrade: '',
  relationshipType: '',
  decisionResult: '',
  fitLevel: '',
  consultationFeePaid: '',
}

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getDateRange(period, customStart, customEnd) {
  const today = new Date()
  const start = new Date(today)
  const end = new Date(today)

  if (period === 'lastMonth') {
    start.setMonth(today.getMonth() - 1, 1)
    end.setMonth(today.getMonth(), 0)
  } else if (period === 'last30') {
    start.setDate(today.getDate() - 29)
  } else if (period === 'year') {
    start.setMonth(0, 1)
  } else if (period === 'custom') {
    return { startDate: customStart, endDate: customEnd }
  } else {
    start.setDate(1)
  }

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  }
}

function toNumberOrNull(value) {
  if (value === '' || value === null || value === undefined) return null
  const number = Number(String(value).replaceAll(',', ''))
  return Number.isFinite(number) ? number : null
}

function formatMoney(amount) {
  const value = Number(amount ?? 0)
  if (!value) return '-'
  return `${value.toLocaleString('ko-KR')}원`
}

function formatPaid(value) {
  return value ? '유료상담' : '미결제'
}

function truncate(value, length = 80) {
  if (!value) return ''
  return value.length > length ? `${value.slice(0, length)}...` : value
}

function getConsultationSummary(records) {
  return {
    total: records.length,
    quoted: records.filter(record => record.quoted_amount !== null).length,
    won: records.filter(record => ['수주 성공', '완료'].includes(record.status)).length,
    lost: records.filter(record => record.status === '이탈').length,
    active: records.filter(record => ACTIVE_STATUSES.includes(record.status)).length,
    quotedRevenue: records.reduce((sum, record) => sum + Number(record.quoted_amount ?? 0), 0),
    confirmedRevenue: records.reduce((sum, record) => sum + Number(record.confirmed_amount ?? 0), 0),
    contractRevenue: records.reduce((sum, record) => sum + Number(record.contract_amount ?? 0), 0),
    productionCost: records.reduce((sum, record) => sum + Number(record.production_cost_amount ?? 0), 0),
    estimatedProfit: records.reduce((sum, record) => sum + Number(record.estimated_profit_amount ?? 0), 0),
    confirmedProfit: records.reduce((sum, record) => sum + Number(record.confirmed_profit_amount ?? 0), 0),
    decisionWon: records.filter(record => ['수주', '완료'].includes(record.decision_result)).length,
    ownerRejected: records.filter(record => record.decision_result === '대표 거절').length,
    decisionPending: records.filter(record => ['보류', '판단 중'].includes(record.decision_result)).length,
    paidConsultations: records.filter(record => record.consultation_fee_paid).length,
    aLeads: records.filter(record => record.lead_grade === 'A').length,
  }
}

function getTopCounts(records, field, limit = 5) {
  const counts = records.reduce((acc, record) => {
    const value = record[field]
    if (!value) return acc
    acc[value] = (acc[value] ?? 0) + 1
    return acc
  }, {})

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
}

function getQuestionTagCounts(records) {
  const counts = records.reduce((acc, record) => {
    ;(record.question_tags ?? []).forEach(tag => {
      acc[tag] = (acc[tag] ?? 0) + 1
    })
    return acc
  }, {})

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
}

function getBooleanCounts(records, field) {
  const paid = records.filter(record => record[field]).length
  const unpaid = records.length - paid
  return [
    [formatPaid(true), paid],
    [formatPaid(false), unpaid],
  ].filter(([, count]) => count > 0)
}

function normalizeRecord(record) {
  return {
    consulted_at: record.consulted_at,
    customer_label: record.customer_label || null,
    source: record.source,
    inquiry_type: record.inquiry_type,
    manuscript_status: record.manuscript_status,
    estimated_pages: toNumberOrNull(record.estimated_pages),
    estimated_copies: toNumberOrNull(record.estimated_copies),
    quoted_amount: toNumberOrNull(record.quoted_amount),
    confirmed_amount: toNumberOrNull(record.confirmed_amount),
    relationship_type: record.relationship_type || null,
    contract_amount: toNumberOrNull(record.contract_amount),
    production_cost_amount: toNumberOrNull(record.production_cost_amount),
    estimated_profit_amount: toNumberOrNull(record.estimated_profit_amount),
    confirmed_profit_amount: toNumberOrNull(record.confirmed_profit_amount),
    decision_result: record.decision_result || null,
    fit_level: record.fit_level || null,
    consultation_fee_paid: Boolean(record.consultation_fee_paid),
    consultation_fee_amount: toNumberOrNull(record.consultation_fee_amount),
    status: record.status,
    lead_grade: record.lead_grade,
    loss_reason: record.loss_reason || null,
    follow_up_date: record.follow_up_date || null,
    question_tags: record.question_tags,
    summary: record.summary,
    memo: record.memo || null,
    updated_at: new Date().toISOString(),
  }
}

export default function AdminConsultations() {
  const [checking, setChecking] = useState(true)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const loadRecords = useCallback(async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('consultation_logs')
      .select('*')
      .order('consulted_at', { ascending: false })
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      setRecords([])
    } else {
      setError('')
      setRecords(data ?? [])
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/admin')
        return
      }

      setChecking(false)
      loadRecords()
    })
  }, [loadRecords, router])

  const filteredRecords = useMemo(() => {
    const range = getDateRange(filters.period, filters.startDate, filters.endDate)

    return records.filter(record => {
      if (range.startDate && record.consulted_at < range.startDate) return false
      if (range.endDate && record.consulted_at > range.endDate) return false
      if (filters.source && record.source !== filters.source) return false
      if (filters.inquiryType && record.inquiry_type !== filters.inquiryType) return false
      if (filters.status && record.status !== filters.status) return false
      if (filters.leadGrade && record.lead_grade !== filters.leadGrade) return false
      if (filters.relationshipType && record.relationship_type !== filters.relationshipType) return false
      if (filters.decisionResult && record.decision_result !== filters.decisionResult) return false
      if (filters.fitLevel && record.fit_level !== filters.fitLevel) return false
      if (filters.consultationFeePaid && String(Boolean(record.consultation_fee_paid)) !== filters.consultationFeePaid) return false
      return true
    })
  }, [filters, records])

  const summary = useMemo(() => getConsultationSummary(filteredRecords), [filteredRecords])
  const topPanels = useMemo(() => ([
    ['유입 경로 TOP 5', getTopCounts(filteredRecords, 'source')],
    ['문의 유형 TOP 5', getTopCounts(filteredRecords, 'inquiry_type')],
    ['원고 상태 TOP 5', getTopCounts(filteredRecords, 'manuscript_status')],
    ['반복 질문 TOP 10', getQuestionTagCounts(filteredRecords)],
    ['이탈 사유 TOP 5', getTopCounts(filteredRecords, 'loss_reason')],
    ['리드 등급별 건수', getTopCounts(filteredRecords, 'lead_grade', LEAD_GRADES.length)],
    ['관계 유형 TOP', getTopCounts(filteredRecords, 'relationship_type')],
    ['판단 결과별 건수', getTopCounts(filteredRecords, 'decision_result', DECISION_RESULTS.length)],
    ['제작 적합도별 건수', getTopCounts(filteredRecords, 'fit_level', FIT_LEVELS.length)],
    ['유료상담 여부별 건수', getBooleanCounts(filteredRecords, 'consultation_fee_paid')],
  ]), [filteredRecords])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const updateForm = (field, value) => {
    setForm(current => ({ ...current, [field]: value }))
  }

  const updateFilter = (field, value) => {
    setFilters(current => ({ ...current, [field]: value }))
  }

  const resetForm = () => {
    setEditingId(null)
    setForm({ ...EMPTY_FORM, consulted_at: getToday(), question_tags: [] })
    setFormOpen(false)
    setMessage('')
    setError('')
  }

  const startCreate = () => {
    setEditingId(null)
    setForm({ ...EMPTY_FORM, consulted_at: getToday(), question_tags: [] })
    setFormOpen(true)
    setMessage('')
    setError('')
  }

  const startEdit = record => {
    setEditingId(record.id)
    setForm({
      consulted_at: record.consulted_at ?? getToday(),
      customer_label: record.customer_label ?? '',
      source: record.source ?? SOURCES[0],
      inquiry_type: record.inquiry_type ?? INQUIRY_TYPES[0],
      manuscript_status: record.manuscript_status ?? MANUSCRIPT_STATUSES[0],
      estimated_pages: record.estimated_pages ?? '',
      estimated_copies: record.estimated_copies ?? '',
      quoted_amount: record.quoted_amount ?? '',
      confirmed_amount: record.confirmed_amount ?? '',
      relationship_type: record.relationship_type ?? '',
      contract_amount: record.contract_amount ?? '',
      production_cost_amount: record.production_cost_amount ?? '',
      estimated_profit_amount: record.estimated_profit_amount ?? '',
      confirmed_profit_amount: record.confirmed_profit_amount ?? '',
      decision_result: record.decision_result ?? '',
      fit_level: record.fit_level ?? '',
      consultation_fee_paid: Boolean(record.consultation_fee_paid),
      consultation_fee_amount: record.consultation_fee_amount ?? '',
      status: record.status ?? STATUSES[0],
      lead_grade: record.lead_grade ?? LEAD_GRADES[4],
      loss_reason: record.loss_reason ?? '',
      follow_up_date: record.follow_up_date ?? '',
      question_tags: record.question_tags ?? [],
      summary: record.summary ?? '',
      memo: record.memo ?? '',
    })
    setFormOpen(true)
    setMessage('')
    setError('')
  }

  const toggleQuestionTag = tag => {
    setForm(current => {
      const tags = current.question_tags.includes(tag)
        ? current.question_tags.filter(item => item !== tag)
        : [...current.question_tags, tag]
      return { ...current, question_tags: tags }
    })
  }

  const saveRecord = async event => {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    const payload = normalizeRecord(form)
    const query = editingId
      ? supabase.from('consultation_logs').update(payload).eq('id', editingId)
      : supabase.from('consultation_logs').insert(payload)

    const { error: saveError } = await query

    if (saveError) {
      setError(saveError.message)
    } else {
      const successMessage = editingId ? '상담기록을 수정했습니다.' : '상담기록을 저장했습니다.'
      resetForm()
      setMessage(successMessage)
      await loadRecords()
    }

    setSaving(false)
  }

  const deleteRecord = async id => {
    if (!confirm('이 상담기록을 삭제하시겠습니까?')) return

    const { error: deleteError } = await supabase
      .from('consultation_logs')
      .delete()
      .eq('id', id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage('상담기록을 삭제했습니다.')
    await loadRecords()
  }

  return (
    <div className={styles.adminWrap}>
      <div className={styles.adminHeader}>
        <div className={styles.adminLogo}><em>마이티</em>북스 ADMIN</div>
        <button onClick={logout} className={styles.btnGhost}>로그아웃</button>
      </div>
      <div className={styles.adminBody}>
        <Link href="/admin/dashboard" className={styles.backLink}>← 관리자 메뉴로 돌아가기</Link>
        <div className={styles.adminTitleRow}>
          <div>
            <h2 className={styles.adminTitle}>상담기록 관리</h2>
            <p className={styles.adminDescription}>자서전, 자비출간, 시집, 에세이 제작 문의와 상담 기록을 관리합니다.</p>
          </div>
          <button type="button" className={styles.btnRed} onClick={startCreate}>+ 상담기록 추가</button>
        </div>

        {checking ? <p>확인 중...</p> : (
          <>
            {error && <div className={styles.err}>{error}</div>}
            {message && <div className={styles.msg}>{message}</div>}

            {formOpen && (
              <form className={styles.consultationForm} onSubmit={saveRecord}>
                <div className={styles.sectionHeader}>
                  <h3>{editingId ? '상담기록 수정' : '상담기록 신규 입력'}</h3>
                  <button type="button" className={styles.btnGhost} onClick={resetForm}>닫기</button>
                </div>
                <div className={styles.formGrid}>
                  <label>상담일<input className={styles.input} type="date" value={form.consulted_at} onChange={event => updateForm('consulted_at', event.target.value)} required /></label>
                  <label>고객 식별명<input className={styles.input} value={form.customer_label} onChange={event => updateForm('customer_label', event.target.value)} placeholder="예: 7월 자서전 문의 A" /></label>
                  <SelectField label="유입 경로" value={form.source} options={SOURCES} onChange={value => updateForm('source', value)} />
                  <SelectField label="문의 유형" value={form.inquiry_type} options={INQUIRY_TYPES} onChange={value => updateForm('inquiry_type', value)} />
                  <SelectField label="원고 상태" value={form.manuscript_status} options={MANUSCRIPT_STATUSES} onChange={value => updateForm('manuscript_status', value)} />
                  <SelectField label="진행 상태" value={form.status} options={STATUSES} onChange={value => updateForm('status', value)} />
                  <SelectField label="리드 등급" value={form.lead_grade} options={LEAD_GRADES} onChange={value => updateForm('lead_grade', value)} />
                  <label>후속 연락 예정일<input className={styles.input} type="date" value={form.follow_up_date} onChange={event => updateForm('follow_up_date', event.target.value)} /></label>
                  <NumberField label="예상 페이지 수" value={form.estimated_pages} onChange={value => updateForm('estimated_pages', value)} />
                  <NumberField label="예상 제작 부수" value={form.estimated_copies} onChange={value => updateForm('estimated_copies', value)} />
                  <NumberField label="제시 견적 금액" value={form.quoted_amount} onChange={value => updateForm('quoted_amount', value)} />
                  <NumberField label="확정 금액" value={form.confirmed_amount} onChange={value => updateForm('confirmed_amount', value)} />
                  <SelectField label="관계 유형" value={form.relationship_type} options={RELATIONSHIP_TYPES} onChange={value => updateForm('relationship_type', value)} includeEmpty />
                  <NumberField label="총 계약금" value={form.contract_amount} onChange={value => updateForm('contract_amount', value)} />
                  <NumberField label="제작비" value={form.production_cost_amount} onChange={value => updateForm('production_cost_amount', value)} />
                  <NumberField label="예상 실수익" value={form.estimated_profit_amount} onChange={value => updateForm('estimated_profit_amount', value)} />
                  <NumberField label="확정 실수익" value={form.confirmed_profit_amount} onChange={value => updateForm('confirmed_profit_amount', value)} />
                  <SelectField label="판단 결과" value={form.decision_result} options={DECISION_RESULTS} onChange={value => updateForm('decision_result', value)} includeEmpty />
                  <SelectField label="제작 적합도" value={form.fit_level} options={FIT_LEVELS} onChange={value => updateForm('fit_level', value)} includeEmpty />
                  <label className={styles.inlineCheckField}>
                    유료상담 결제 여부
                    <span>
                      <input type="checkbox" checked={form.consultation_fee_paid} onChange={event => updateForm('consultation_fee_paid', event.target.checked)} />
                      유료상담 결제 완료
                    </span>
                  </label>
                  <NumberField label="유료상담 금액" value={form.consultation_fee_amount} onChange={value => updateForm('consultation_fee_amount', value)} />
                  <SelectField label="이탈 사유" value={form.loss_reason} options={LOSS_REASONS} onChange={value => updateForm('loss_reason', value)} includeEmpty />
                </div>
                <label className={styles.fullField}>상담 요약<textarea className={styles.textarea} rows={4} value={form.summary} onChange={event => updateForm('summary', event.target.value)} required /></label>
                <label className={styles.fullField}>내부 메모<textarea className={styles.textarea} rows={3} value={form.memo} onChange={event => updateForm('memo', event.target.value)} /></label>
                <div className={styles.tagBox}>
                  <div className={styles.fieldTitle}>반복 질문 태그</div>
                  <div className={styles.tagGrid}>
                    {QUESTION_TAGS.map(tag => (
                      <label key={tag} className={styles.checkLabel}>
                        <input type="checkbox" checked={form.question_tags.includes(tag)} onChange={() => toggleQuestionTag(tag)} />
                        <span>{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.btnRed} disabled={saving}>{saving ? '저장 중...' : editingId ? '수정 저장' : '상담기록 저장'}</button>
                  <button type="button" className={styles.btnGhost} onClick={resetForm}>취소</button>
                </div>
              </form>
            )}

            <div className={styles.filterPanel}>
              <div className={styles.sectionHeader}>
                <h3>기간/조건 필터</h3>
                <button type="button" className={styles.btnSmall} onClick={() => setFilters(EMPTY_FILTERS)}>필터 초기화</button>
              </div>
              <div className={styles.filterGrid}>
                <SelectField label="기간" value={filters.period} onChange={value => updateFilter('period', value)} options={[['thisMonth', '이번 달'], ['lastMonth', '지난 달'], ['last30', '최근 30일'], ['year', '올해'], ['custom', '직접 선택']]} />
                <label>시작일<input className={styles.input} type="date" value={filters.startDate} disabled={filters.period !== 'custom'} onChange={event => updateFilter('startDate', event.target.value)} /></label>
                <label>종료일<input className={styles.input} type="date" value={filters.endDate} disabled={filters.period !== 'custom'} onChange={event => updateFilter('endDate', event.target.value)} /></label>
                <SelectField label="문의 유형" value={filters.inquiryType} options={INQUIRY_TYPES} onChange={value => updateFilter('inquiryType', value)} includeEmpty />
                <SelectField label="유입 경로" value={filters.source} options={SOURCES} onChange={value => updateFilter('source', value)} includeEmpty />
                <SelectField label="진행 상태" value={filters.status} options={STATUSES} onChange={value => updateFilter('status', value)} includeEmpty />
                <SelectField label="리드 등급" value={filters.leadGrade} options={LEAD_GRADES} onChange={value => updateFilter('leadGrade', value)} includeEmpty />
                <SelectField label="관계 유형" value={filters.relationshipType} options={RELATIONSHIP_TYPES} onChange={value => updateFilter('relationshipType', value)} includeEmpty />
                <SelectField label="판단 결과" value={filters.decisionResult} options={DECISION_RESULTS} onChange={value => updateFilter('decisionResult', value)} includeEmpty />
                <SelectField label="제작 적합도" value={filters.fitLevel} options={FIT_LEVELS} onChange={value => updateFilter('fitLevel', value)} includeEmpty />
                <SelectField label="유료상담 여부" value={filters.consultationFeePaid} options={[['true', '유료상담'], ['false', '미결제']]} onChange={value => updateFilter('consultationFeePaid', value)} includeEmpty />
              </div>
            </div>

            <div className={styles.metricGrid}>
              <Metric label="총 문의" value={`${summary.total}건`} />
              <Metric label="견적 제시" value={`${summary.quoted}건`} />
              <Metric label="수주 성공" value={`${summary.won}건`} />
              <Metric label="이탈" value={`${summary.lost}건`} />
              <Metric label="상담 중" value={`${summary.active}건`} />
              <Metric label="예상 매출" value={formatMoney(summary.quotedRevenue)} />
              <Metric label="확정 매출" value={formatMoney(summary.confirmedRevenue)} />
              <Metric label="확정 실수익" value={formatMoney(summary.confirmedProfit)} />
              <Metric label="예상 실수익" value={formatMoney(summary.estimatedProfit)} />
              <Metric label="총 계약금 합계" value={formatMoney(summary.contractRevenue)} />
              <Metric label="제작비 합계" value={formatMoney(summary.productionCost)} />
              <Metric label="수주 건수" value={`${summary.decisionWon}건`} />
              <Metric label="대표 거절" value={`${summary.ownerRejected}건`} />
              <Metric label="보류/판단 중" value={`${summary.decisionPending}건`} />
              <Metric label="유료상담" value={`${summary.paidConsultations}건`} />
              <Metric label="A급 리드" value={`${summary.aLeads}건`} />
            </div>

            <div className={styles.topGrid}>
              {topPanels.map(([title, items]) => <TopList key={title} title={title} items={items} />)}
            </div>

            <div className={styles.sectionHeader}>
              <h3>상담 목록</h3>
              <span className={styles.resultCount}>{filteredRecords.length}건</span>
            </div>
            {loading ? <p>불러오는 중...</p> : (
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>상담일</th><th>고객 식별명</th><th>문의 유형</th><th>유입 경로</th><th>관계 유형</th><th>상담 요약</th><th>진행 상태</th><th>판단 결과</th><th>제작 적합도</th><th>확정 실수익</th><th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map(record => (
                      <tr key={record.id}>
                        <td>{record.consulted_at}</td>
                        <td>{record.customer_label || '-'}</td>
                        <td>{record.inquiry_type}</td>
                        <td>{record.source}</td>
                        <td>{record.relationship_type || '-'}</td>
                        <td className={styles.summaryCell}>{truncate(record.summary)}</td>
                        <td>{record.status}</td>
                        <td>{record.decision_result || '-'}</td>
                        <td>{record.fit_level || '-'}</td>
                        <td>{formatMoney(record.confirmed_profit_amount)}</td>
                        <td><div className={styles.rowActions}><button type="button" className={styles.btnSmall} onClick={() => startEdit(record)}>수정</button><button type="button" className={styles.btnSmallDanger} onClick={() => deleteRecord(record.id)}>삭제</button></div></td>
                      </tr>
                    ))}
                    {!filteredRecords.length && <tr><td colSpan="11">조건에 맞는 상담기록이 없습니다.</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function SelectField({ label, value, options, onChange, includeEmpty = false }) {
  return (
    <label>
      {label}
      <select className={styles.input} value={value} onChange={event => onChange(event.target.value)}>
        {includeEmpty && <option value="">전체</option>}
        {options.map(option => {
          const optionValue = Array.isArray(option) ? option[0] : option
          const optionLabel = Array.isArray(option) ? option[1] : option
          return <option key={optionValue} value={optionValue}>{optionLabel}</option>
        })}
      </select>
    </label>
  )
}

function NumberField({ label, value, onChange }) {
  return (
    <label>
      {label}
      <input className={styles.input} type="number" min="0" value={value} onChange={event => onChange(event.target.value)} />
    </label>
  )
}

function Metric({ label, value }) {
  return (
    <div className={styles.metricCard}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function TopList({ title, items }) {
  return (
    <div className={styles.topPanel}>
      <h3>{title}</h3>
      {items.length ? (
        <ol>
          {items.map(([label, count]) => (
            <li key={label}><span>{label}</span><strong>{count}건</strong></li>
          ))}
        </ol>
      ) : <p>데이터 없음</p>}
    </div>
  )
}
