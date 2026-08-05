import 'server-only'

import { createHmac, randomUUID } from 'node:crypto'

const READER_SESSION_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function maskEmail(email) {
  if (typeof email !== 'string') return null

  const separator = email.lastIndexOf('@')
  if (separator <= 0 || separator === email.length - 1) return null

  const localPart = email.slice(0, separator)
  const domain = email.slice(separator + 1)
  const visibleLength = Math.min(3, Math.max(1, localPart.length))

  return `${localPart.slice(0, visibleLength)}***@${domain}`
}

function formatKoreanDate(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]))

  return `${values.year}-${values.month}-${values.day}`
}

export function createReaderSession(user) {
  const id = randomUUID()
  const maskedEmail = maskEmail(user?.email)
  const viewer = maskedEmail || `회원 ${user?.id?.slice(-8) || 'unknown'}`

  return {
    id,
    watermark: `열람자 ${viewer} · ${formatKoreanDate(new Date())} · ${id.slice(0, 8)}`,
  }
}

export function isValidReaderSessionId(value) {
  return typeof value === 'string' && READER_SESSION_PATTERN.test(value)
}

function getClientReference(request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const userAgent = request.headers.get('user-agent') || ''
  const fingerprint = `${forwardedFor || 'unknown'}\n${userAgent}`
  const secret = process.env.READER_AUDIT_HASH_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!secret) return null

  return createHmac('sha256', secret)
    .update(fingerprint)
    .digest('hex')
    .slice(0, 16)
}

export function logReaderAuditEvent(event, {
  request,
  user,
  bookId,
  sessionId,
  ...details
}) {
  console.info('[Library reader audit]', {
    event,
    occurredAt: new Date().toISOString(),
    userRef: user?.id?.slice(-8) || null,
    bookId: bookId || null,
    sessionId: sessionId || null,
    clientRef: request ? getClientReference(request) : null,
    ...details,
  })
}
