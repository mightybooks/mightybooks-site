import { NextResponse } from 'next/server'
import { attemptGeneralInquiryNotification } from '@/lib/mail/sendConsultationNotification.mjs'
import { validateGeneralInquiry } from '@/lib/mail/generalInquiryValidation.mjs'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const rateLimitStoreKey = Symbol.for('mightybooks.generalInquiryRateLimit')

export const runtime = 'nodejs'

function errorResponse(message, status = 400, headers) {
  return NextResponse.json({ error: message }, { status, headers })
}

function getClientKey(request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const address = forwarded || request.headers.get('x-real-ip')?.trim()
  if (address) return address
  return `unknown:${(request.headers.get('user-agent') || 'no-user-agent').slice(0, 120)}`
}

function isRateLimited(request, now = Date.now()) {
  const store = globalThis[rateLimitStoreKey] || new Map()
  globalThis[rateLimitStoreKey] = store
  const key = getClientKey(request)
  const previous = store.get(key)

  if (!previous || now - previous.startedAt >= RATE_LIMIT_WINDOW_MS) {
    store.set(key, { count: 1, startedAt: now })
    return false
  }

  previous.count += 1
  if (store.size > 1000) {
    for (const [storedKey, entry] of store) {
      if (now - entry.startedAt >= RATE_LIMIT_WINDOW_MS) store.delete(storedKey)
    }
  }
  return previous.count > RATE_LIMIT_MAX_REQUESTS
}

export async function POST(request) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 15000) return errorResponse('전송 내용이 너무 큽니다.', 413)

  let body
  try {
    body = await request.json()
  } catch {
    return errorResponse('문의 내용을 확인해 주세요.')
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return errorResponse('문의 내용을 확인해 주세요.')
  }

  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ received: true }, { status: 201 })
  }
  if (isRateLimited(request)) {
    return errorResponse('문의가 연속으로 접수되었습니다. 잠시 후 다시 시도해 주세요.', 429, { 'Retry-After': '600' })
  }

  const validation = validateGeneralInquiry(body)
  if (!validation.valid) return errorResponse(validation.error)

  const notification = await attemptGeneralInquiryNotification({
    ...validation.inquiry,
    receivedAt: new Date(),
  })
  if (notification.status !== 'sent') {
    return errorResponse('문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 503)
  }

  return NextResponse.json({ received: true }, { status: 201 })
}
