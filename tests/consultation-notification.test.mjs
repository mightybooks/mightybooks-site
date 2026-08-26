import assert from 'node:assert/strict'
import test from 'node:test'
import {
  attemptConsultationNotification,
  buildConsultationNotification,
  getQuantityReviewLabel,
  getSmtpConfiguration,
  sendConsultationNotification,
} from '../lib/mail/sendConsultationNotification.mjs'
import { persistConsultation } from '../lib/publishing-guide/persistConsultation.mjs'

const smtpEnv = {
  SMTP_HOST: 'smtp.naver.com',
  SMTP_PORT: '465',
  SMTP_SECURE: 'true',
  SMTP_USER: 'smtp-user@example.com',
  SMTP_PASSWORD: 'application-password',
  MAIL_FROM: 'Mightybooks <smtp-user@example.com>',
  CONSULTATION_NOTIFICATION_EMAIL: 'operator@example.com',
}

const payload = {
  customer: {
    name: '홍길동',
    contact: 'customer@example.com',
    note: '오후 연락을 원합니다.',
  },
  answerRows: [
    ['책 종류', '에세이'],
    ['희망 형태', '종이책'],
    ['희망 부수', '1~10권'],
    ['원고 준비 상태', '이미 책처럼 편집·디자인까지 해두었습니다'],
    ['파일 형식', 'PDF'],
    ['판형 상태', '네, 최종 책 크기로 작업했습니다'],
    ['현재 책 크기', '148×210mm / A5'],
    ['수정 가능한 원본파일 보유 여부', 'PDF만 있습니다'],
    ['표지 상태', '앞·책등·뒤표지까지 완성되어 있습니다'],
    ['희망 작업', '현재 파일로 인쇄·제본만 하고 싶습니다'],
    ['사용 목적', '개인 보관'],
    ['정식 출간·서점 판매 여부', '개인 소장·증정용 제작만 필요합니다'],
  ],
  result: {
    type: 'PRINT_READY',
    title: '완성파일 기반 소량 종이책 제작',
    tasks: ['최종 판형과 여백 확인', '인쇄용 PDF 상태 점검'],
  },
  receivedAt: new Date('2026-08-26T03:00:00.000Z'),
}

test('SMTP 기본값과 필수 환경변수를 구분한다', () => {
  const configured = getSmtpConfiguration(smtpEnv)
  assert.equal(configured.host, 'smtp.naver.com')
  assert.equal(configured.port, 465)
  assert.equal(configured.secure, true)
  assert.deepEqual(configured.missing, [])

  const missing = getSmtpConfiguration({ SMTP_USER: 'only-user' })
  assert.equal(missing.host, 'smtp.naver.com')
  assert.ok(missing.missing.includes('SMTP_PASSWORD'))
  assert.ok(missing.missing.includes('MAIL_FROM'))
  assert.ok(missing.missing.includes('CONSULTATION_NOTIFICATION_EMAIL'))
})

test('SMTP 설정이 있으면 HTML과 text 메일을 transporter로 전달한다', async () => {
  let sentMessage
  const result = await sendConsultationNotification(payload, {
    env: smtpEnv,
    transporter: {
      sendMail: async message => {
        sentMessage = message
        return { messageId: 'test-message-id' }
      },
    },
  })

  assert.deepEqual(result, { status: 'sent', messageId: 'test-message-id' })
  assert.equal(sentMessage.from, smtpEnv.MAIL_FROM)
  assert.equal(sentMessage.to, smtpEnv.CONSULTATION_NOTIFICATION_EMAIL)
  assert.equal(sentMessage.replyTo, payload.customer.contact)
  assert.equal(sentMessage.subject, '[1~10권 | PRINT_READY] 출판 길라잡이 신규 상담')
  assert.match(sentMessage.html, /PRINT_READY/)
  assert.match(sentMessage.text, /인쇄용 PDF 상태 점검/)
})

test('SMTP 설정이 없으면 전송하지 않고 누락된 키를 로그에 남긴다', async () => {
  const warnings = []
  let sendCalled = false
  const result = await sendConsultationNotification(payload, {
    env: {},
    logger: { warn: (...args) => warnings.push(args) },
    transporter: { sendMail: async () => { sendCalled = true } },
  })

  assert.equal(result.status, 'skipped')
  assert.equal(sendCalled, false)
  assert.equal(warnings[0][0], 'consultation notification email skipped: SMTP configuration missing')
  assert.ok(warnings[0][1].missing.includes('SMTP_PASSWORD'))
})

test('SMTP 오류는 인증정보 없이 기록하고 상위 흐름으로 전파하지 않는다', async () => {
  const errors = []
  const smtpError = Object.assign(new Error(`authentication failed: ${smtpEnv.SMTP_PASSWORD}`), {
    code: 'EAUTH',
    command: 'AUTH PLAIN',
    responseCode: 535,
  })
  const result = await attemptConsultationNotification(payload, {
    logger: { error: (...args) => errors.push(args) },
    send: async () => { throw smtpError },
  })

  assert.deepEqual(result, { status: 'failed' })
  assert.deepEqual(errors[0][1], {
    name: 'Error', code: 'EAUTH', command: 'AUTH PLAIN', responseCode: 535,
  })
  assert.doesNotMatch(JSON.stringify(errors), /application-password/)
})

test('DB 저장 성공 후에만 이메일을 시도한다', async () => {
  const order = []
  const result = await persistConsultation(
    { record: { summary: '상담' }, notification: payload },
    {
      insert: async () => { order.push('db'); return { error: null } },
      notify: async () => { order.push('email'); return { status: 'sent' } },
    }
  )

  assert.deepEqual(order, ['db', 'email'])
  assert.equal(result.saved, true)
  assert.equal(result.notification.status, 'sent')
})

test('SMTP 실패 또는 미설정이어도 DB 저장 성공 상태를 유지한다', async () => {
  for (const notificationStatus of ['failed', 'skipped']) {
    const result = await persistConsultation(
      { record: {}, notification: payload },
      {
        insert: async () => ({ error: null }),
        notify: async () => ({ status: notificationStatus }),
      }
    )
    assert.equal(result.saved, true)
    assert.equal(result.notification.status, notificationStatus)
  }
})

test('DB 저장 실패 시 이메일을 호출하지 않는다', async () => {
  let notifyCalled = false
  const dbError = { code: 'DB_ERROR', message: 'insert failed' }
  const result = await persistConsultation(
    { record: {}, notification: payload },
    {
      insert: async () => ({ error: dbError }),
      notify: async () => { notifyCalled = true },
    }
  )

  assert.equal(result.saved, false)
  assert.equal(result.error, dbError)
  assert.equal(notifyCalled, false)
})

test('메일 본문에 고객·길라잡이·시스템 판정 항목이 빠짐없이 포함된다', () => {
  const message = buildConsultationNotification(payload)
  for (const expected of [
    '홍길동', 'customer@example.com', '오후 연락을 원합니다.', '접수 시각',
    ...payload.answerRows.flat(), 'PRINT_READY', payload.result.title, ...payload.result.tasks,
  ]) {
    assert.match(message.text, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
})

test('브라우저 analytics 이벤트에는 상담 개인정보를 포함하지 않는다', async () => {
  const source = await import('node:fs/promises').then(fs => fs.readFile(
    new URL('../components/publishing-guide/PublishingGuide.jsx', import.meta.url), 'utf8'
  ))
  const contactEventDetails = source.match(/trackGuideEvent\('publishing_guide_contact',\s*\{([^}]+)\}/s)?.[1] || ''
  assert.match(contactEventDetails, /result_type/)
  assert.doesNotMatch(contactEventDetails, /form|name|contact|note/)
})

test('새 수량 구간별 내부 판단 라벨을 이메일 전용으로 구분한다', () => {
  assert.equal(getQuantityReviewLabel('1~10권'), '초소량')
  assert.equal(getQuantityReviewLabel('11~29권'), '소량')
  assert.equal(getQuantityReviewLabel('30~49권'), '경계구간')
  for (const quantity of ['50~100권', '101~300권', '301권 이상']) {
    assert.equal(getQuantityReviewLabel(quantity), '일반 제작견적 검토')
  }
  assert.equal(getQuantityReviewLabel('아직 모르겠습니다'), null)
})

test('A~D·J: 수량과 판단 코드를 제목과 최상단 내부판정에 표시한다', () => {
  const expectations = [
    ['1~10권', 'PRINT_READY', '초소량'],
    ['11~29권', 'PRINT_FIX', '소량'],
    ['30~49권', 'REFORMAT_PDF', '경계구간'],
    ['50~100권', 'PRINT_READY', '일반 제작견적 검토'],
  ]
  for (const [quantity, type, review] of expectations) {
    const answerRows = payload.answerRows.map(row => row[0] === '희망 부수' ? ['희망 부수', quantity] : row)
    const message = buildConsultationNotification({
      ...payload,
      answerRows,
      result: { ...payload.result, type },
    })
    assert.equal(message.subject, `[${quantity} | ${type}] 출판 길라잡이 신규 상담`)
    assert.equal(message.text.indexOf('내부판정'), 0)
    assert.match(message.text, new RegExp(`희망 부수: ${quantity}`))
    assert.match(message.text, new RegExp(`판단 코드: ${type}`))
    assert.match(message.text, new RegExp(`수량 판단: ${review}`))
    assert.ok(message.html.indexOf('내부판정') < message.html.indexOf('고객 정보'))
  }
})

test('H: 전자책 전용 상담 제목에는 부수 없음 표현을 억지로 넣지 않는다', () => {
  const answerRows = payload.answerRows.map(row => row[0] === '희망 부수' ? ['희망 부수', ''] : row)
  const message = buildConsultationNotification({
    ...payload,
    answerRows,
    result: { ...payload.result, type: 'EBOOK', title: '전자책 중심 제작이 적합합니다.' },
  })
  assert.equal(message.subject, '[EBOOK] 출판 길라잡이 신규 상담')
  assert.doesNotMatch(message.subject, /없음|해당 없음/)
  assert.match(message.text, /희망 부수: 해당 없음 \(전자책 전용\)/)
})

test('K: 1~10권 REFORMAT_PDF 조합을 제목과 내부판정에서 함께 확인한다', () => {
  const message = buildConsultationNotification({
    ...payload,
    result: {
      ...payload.result,
      type: 'REFORMAT_PDF',
      title: '현재 PDF를 기준으로 재편집 가능 범위를 먼저 확인해야 합니다.',
    },
  })
  assert.equal(message.subject, '[1~10권 | REFORMAT_PDF] 출판 길라잡이 신규 상담')
  assert.match(message.text, /판단 코드: REFORMAT_PDF/)
  assert.match(message.text, /추천 방향: 현재 PDF를 기준으로 재편집 가능 범위를 먼저 확인해야 합니다\./)
})
