import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { persistConsultation } from '@/lib/publishing-guide/persistConsultation.mjs'
import {
  buildGuideCopyText,
  getConsultationAnswerRows,
  getEstimatedCopies,
  getGuideResult,
  getOptionLabel,
  pruneHiddenGuideAnswers,
  validateGuideAnswers,
} from '@/components/publishing-guide/publishingGuideData'

const LIMITS = { name: 50, contact: 100, note: 1000 }

export const runtime = 'nodejs'

function clean(value, limit) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, limit)
}

function errorResponse(message, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

function getInquiryType(bookType) {
  return {
    autobiography: '자서전', poetry: '시집', anthology: '기타', essay: '에세이',
    novel: '자비출간', professional: '자비출간', institutional: '소책자', other: '기타',
  }[bookType] || '기타'
}

function getManuscriptStatus(manuscript) {
  return {
    writing: '구상 단계', interview: '녹음 자료', handwritten: '손글씨',
    computer: '한글/워드 파일', designed: '혼합 자료',
  }[manuscript] || '기타'
}

export async function POST(request) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 25000) return errorResponse('전송 내용이 너무 큽니다.', 413)

  let body
  try {
    body = await request.json()
  } catch {
    return errorResponse('상담 요청 내용을 확인해 주세요.')
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return errorResponse('상담 요청 내용을 확인해 주세요.')
  }
  if (body.website) return NextResponse.json({ received: true }, { status: 201 })

  const name = clean(body.name, LIMITS.name)
  const contact = clean(body.contact, LIMITS.contact)
  const note = clean(body.note, LIMITS.note)
  if (!name || contact.length < 5 || body.consent !== true) {
    return errorResponse('이름, 연락처와 개인정보 수집 동의를 확인해 주세요.')
  }
  if (
    String(body.name || '').trim().length > LIMITS.name ||
    String(body.contact || '').trim().length > LIMITS.contact ||
    String(body.note || '').trim().length > LIMITS.note
  ) {
    return errorResponse('입력 가능한 글자 수를 초과했습니다.')
  }
  const answers = pruneHiddenGuideAnswers(body.answers)
  if (!validateGuideAnswers(answers)) {
    return errorResponse('출판 길라잡이 선택 내용을 다시 확인해 주세요.')
  }

  const result = getGuideResult(answers)
  const receivedAt = new Date()
  const guideSummary = buildGuideCopyText(answers, result)
  const summary = `${guideSummary}\n연락처: ${contact}${note ? `\n추가 내용: ${note}` : ''}`
  const questionTags = [
    ['1-10', '11-29', '30-49'].includes(answers.quantity) ? '소량 제작 가능 여부' : null,
    answers.needs?.includes('proofreading') ? '원고 교정' : null,
    answers.needs?.includes('interior') || answers.needs?.includes('cover-design') ? '디자인 포함 여부' : null,
    ['formal', 'distribution'].includes(answers.publication) ? 'ISBN 발급 가능 여부' : null,
    answers.publication === 'distribution' ? '온라인서점 등록 가능 여부' : null,
  ].filter(Boolean)

  const record = {
    source: '웹사이트',
    inquiry_type: getInquiryType(answers.bookType),
    manuscript_status: getManuscriptStatus(answers.manuscript),
    estimated_copies: getEstimatedCopies(answers.quantity),
    status: '신규 문의',
    lead_grade: '판단 불가',
    relationship_type: '신규',
    fit_level: '판단 전',
    question_tags: questionTags,
    customer_label: name,
    summary,
    memo: `출판 길라잡이 결과 유형: ${result.type}\n희망 형태: ${getOptionLabel('format', answers.format)}`,
  }

  const answerRows = getConsultationAnswerRows(answers)
  const notification = {
    customer: { name, contact, note },
    answerRows,
    result,
    receivedAt,
  }
  const persistence = await persistConsultation(
    { record, notification },
    { insert: value => supabaseAdmin.from('consultation_logs').insert(value) }
  )

  if (!persistence.saved) {
    console.error('[Publishing guide] Consultation insert failed', {
      code: persistence.error?.code,
      message: persistence.error?.message,
    })
    return errorResponse('상담 요청을 접수하지 못했습니다. 잠시 후 다시 시도해 주세요.', 500)
  }

  return NextResponse.json({ received: true }, { status: 201 })
}
