import nodemailer from 'nodemailer'

const SMTP_DEFAULTS = {
  host: 'smtp.naver.com',
  port: 465,
  secure: true,
}

const REQUIRED_ENV_KEYS = [
  'SMTP_USER',
  'SMTP_PASSWORD',
  'MAIL_FROM',
  'CONSULTATION_NOTIFICATION_EMAIL',
]

function cleanEnvironmentValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatReceivedAt(receivedAt) {
  const date = receivedAt instanceof Date ? receivedAt : new Date(receivedAt)
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    dateStyle: 'long',
    timeStyle: 'medium',
  }).format(date)
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function getQuantityReviewLabel(quantity) {
  return {
    '1~10권': '초소량',
    '11~29권': '소량',
    '30~49권': '경계구간',
    '50~100권': '일반 제작견적 검토',
    '101~300권': '일반 제작견적 검토',
    '301권 이상': '일반 제작견적 검토',
  }[quantity] || null
}

export function getSmtpConfiguration(env = process.env) {
  const missing = REQUIRED_ENV_KEYS.filter(key => !cleanEnvironmentValue(env[key]))
  const configuredPort = cleanEnvironmentValue(env.SMTP_PORT)
  const configuredSecure = cleanEnvironmentValue(env.SMTP_SECURE).toLowerCase()
  const port = configuredPort ? Number(configuredPort) : SMTP_DEFAULTS.port
  if (!Number.isInteger(port) || port < 1 || port > 65535) missing.push('SMTP_PORT')
  if (configuredSecure && !['true', 'false'].includes(configuredSecure)) missing.push('SMTP_SECURE')

  return {
    missing,
    host: cleanEnvironmentValue(env.SMTP_HOST) || SMTP_DEFAULTS.host,
    port,
    secure: configuredSecure
      ? configuredSecure === 'true'
      : SMTP_DEFAULTS.secure,
    user: cleanEnvironmentValue(env.SMTP_USER),
    password: cleanEnvironmentValue(env.SMTP_PASSWORD),
    from: cleanEnvironmentValue(env.MAIL_FROM),
    to: cleanEnvironmentValue(env.CONSULTATION_NOTIFICATION_EMAIL),
  }
}

export function buildConsultationNotification({ customer, answerRows, result, receivedAt }) {
  const receivedAtText = formatReceivedAt(receivedAt)
  const quantity = answerRows.find(([label]) => label === '희망 부수')?.[1] || ''
  const quantityReview = getQuantityReviewLabel(quantity)
  const internalRows = [
    ['희망 부수', quantity || (result.type === 'EBOOK' ? '해당 없음 (전자책 전용)' : '해당 없음')],
    ...(quantityReview ? [['수량 판단', quantityReview]] : []),
    ['판단 코드', result.type],
    ['추천 방향', result.title],
  ]
  const customerRows = [
    ['이름', customer.name],
    ['연락처', customer.contact],
    ...(isEmail(customer.contact) ? [['이메일', customer.contact]] : []),
    ['추가 메모', customer.note || '없음'],
    ['접수 시각', receivedAtText],
  ]
  const systemRows = [
    ['최종 result type', result.type],
    ['추천 제작 방식', result.title],
    ['주요 예상 작업', result.tasks.join(', ')],
  ]
  const allSections = [
    ['내부판정', internalRows],
    ['고객 정보', customerRows],
    ['길라잡이 결과', answerRows],
    ['시스템 판정', systemRows],
  ]
  const text = allSections
    .map(([heading, rows]) => `${heading}\n${rows.map(([label, value]) => `- ${label}: ${value || '해당 없음'}`).join('\n')}`)
    .join('\n\n')
  const htmlSections = allSections.map(([heading, rows]) => {
    const internal = heading === '내부판정'
    return `
    <section style="${internal ? 'margin-top:24px;padding:18px;background:#f3f3f3;border:2px solid #222;' : ''}">
    <h2 style="margin:${internal ? '0' : '24px'} 0 8px;font-size:${internal ? '20px' : '18px'};color:#111;">${escapeHtml(heading)}</h2>
    <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;background:#fff;">
      ${rows.map(([label, value]) => `
        <tr>
          <th style="width:180px;padding:8px;border:1px solid #ddd;background:#f6f6f6;text-align:left;vertical-align:top;">${escapeHtml(label)}</th>
          <td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(value || '해당 없음')}</td>
        </tr>`).join('')}
    </table></section>`
  }).join('')

  const subjectPrefix = quantity ? `${quantity} | ${result.type}` : result.type

  return {
    subject: `[${subjectPrefix}] 출판 길라잡이 신규 상담`,
    text,
    html: `<!doctype html><html lang="ko"><body style="margin:0;padding:24px;background:#f2f2f2;font-family:Arial,'Noto Sans KR',sans-serif;color:#222;"><main style="max-width:760px;margin:0 auto;padding:24px;background:#fff;"><h1 style="margin:0 0 8px;font-size:22px;">출판 길라잡이 신규 상담 요청</h1><p style="margin:0;color:#666;">상담자가 선택한 내용과 시스템 판정입니다.</p>${htmlSections}</main></body></html>`,
    replyTo: isEmail(customer.contact) ? customer.contact : undefined,
  }
}

export async function sendConsultationNotification(payload, options = {}) {
  const logger = options.logger || console
  const config = getSmtpConfiguration(options.env || process.env)
  if (config.missing.length) {
    logger.warn('consultation notification email skipped: SMTP configuration missing', { missing: config.missing })
    return { status: 'skipped', reason: 'configuration-missing', missing: config.missing }
  }

  const transporter = options.transporter || nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: { user: config.user, pass: config.password },
  })
  const message = buildConsultationNotification(payload)
  const info = await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
  })
  return { status: 'sent', messageId: info.messageId }
}

export function getSafeMailError(error) {
  return {
    name: typeof error?.name === 'string' ? error.name : 'Error',
    code: typeof error?.code === 'string' ? error.code : undefined,
    command: typeof error?.command === 'string' ? error.command : undefined,
    responseCode: Number.isInteger(error?.responseCode) ? error.responseCode : undefined,
  }
}

export async function attemptConsultationNotification(payload, options = {}) {
  const logger = options.logger || console
  const send = options.send || sendConsultationNotification
  try {
    return await send(payload, options)
  } catch (error) {
    logger.error('[Publishing guide] Consultation notification email failed', getSafeMailError(error))
    return { status: 'failed' }
  }
}
