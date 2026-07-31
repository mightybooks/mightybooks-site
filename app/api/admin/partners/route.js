import { randomBytes } from 'node:crypto'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/server-auth'

const STATUSES = ['pending', 'on_hold', 'approved', 'rejected', 'suspended']
const VIEWS = ['review', 'approved']
const REVIEW_STATUSES = ['pending', 'on_hold']
const APPROVED_STATUSES = ['approved', 'suspended']
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function errorResponse(code, message, status) {
  return NextResponse.json(
    {
      code,
      error: message,
    },
    {
      status,
    }
  )
}

function isUuid(value) {
  return typeof value === 'string' && UUID_PATTERN.test(value)
}

function createPartnerCode() {
  const bytes = randomBytes(5)
  return `MB-${Array.from(bytes, byte => CODE_ALPHABET[byte % CODE_ALPHABET.length]).join('')}`
}

function logDatabaseError(context, error) {
  console.error(context, {
    code: error.code,
    message: error.message,
  })
}

function hasRpcError(error, name) {
  return (
    error?.code === name ||
    (typeof error?.message === 'string' &&
      error.message.includes(name))
  )
}

function isPartnerCodeCollision(error) {
  if (error?.code !== '23505') return false

  const details = [
    error.details,
    error.message,
    error.hint,
  ]
    .filter(value => typeof value === 'string')
    .join(' ')
    .toLowerCase()

  return (
    details.includes('partner_code') ||
    details.includes('partner_profiles_partner_code_key')
  )
}

async function updatePartnerStatusAtomically({
  partnerId,
  status,
  updatedBy,
  rejectedReason,
  internalMemo,
}) {
  const maxAttempts = status === 'approved' ? 8 : 1

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const partnerCode =
      status === 'approved'
        ? createPartnerCode()
        : null

    const { data, error } = await supabaseAdmin.rpc(
      'update_partner_status_with_note',
      {
        p_partner_profile_id: partnerId,
        p_new_status: status,
        p_updated_by: updatedBy,
        p_rejected_reason: rejectedReason,
        p_internal_memo: internalMemo,
        p_partner_code: partnerCode,
      }
    )

    if (!error) {
      return {
        data,
        error: null,
      }
    }

    if (
      status !== 'approved' ||
      !isPartnerCodeCollision(error)
    ) {
      return {
        data: null,
        error,
      }
    }
  }

  return {
    data: null,
    error: {
      code: 'PARTNER_CODE_GENERATION_FAILED',
      message: 'Unable to allocate a unique partner code',
    },
  }
}

function rpcErrorResponse(error) {
  if (
    hasRpcError(error, 'PARTNER_NOT_FOUND') ||
    error?.code === 'P0002'
  ) {
    return errorResponse(
      'PARTNER_NOT_FOUND',
      '파트너 신청을 찾을 수 없습니다.',
      404
    )
  }

  if (hasRpcError(error, 'INVALID_STATUS_TRANSITION')) {
    return errorResponse(
      'INVALID_STATUS_TRANSITION',
      '현재 상태에서는 요청한 상태로 변경할 수 없습니다.',
      409
    )
  }

  if (hasRpcError(error, 'REJECTED_REASON_REQUIRED')) {
    return errorResponse(
      'REJECTED_REASON_REQUIRED',
      '승인 거절 사유를 입력해 주세요.',
      400
    )
  }

  if (hasRpcError(error, 'REJECTED_REASON_TOO_LONG')) {
    return errorResponse(
      'REJECTED_REASON_TOO_LONG',
      '승인 거절 사유는 1,000자 이내로 입력해 주세요.',
      400
    )
  }

  if (hasRpcError(error, 'INTERNAL_MEMO_TOO_LONG')) {
    return errorResponse(
      'INTERNAL_MEMO_TOO_LONG',
      '내부 메모는 5,000자 이내로 입력해 주세요.',
      400
    )
  }

  if (hasRpcError(error, 'INVALID_STATUS')) {
    return errorResponse(
      'INVALID_STATUS',
      '올바른 상태를 선택해 주세요.',
      400
    )
  }

  if (hasRpcError(error, 'VALID_PARTNER_CODE_REQUIRED')) {
    return errorResponse(
      'VALID_PARTNER_CODE_REQUIRED',
      '파트너 코드를 발급하지 못했습니다.',
      500
    )
  }

  if (
    hasRpcError(error, 'ADMIN_REQUIRED') ||
    error?.code === '42501'
  ) {
    return errorResponse(
      'ADMIN_REQUIRED',
      '관리자 권한이 필요합니다.',
      403
    )
  }

  if (hasRpcError(error, 'PARTNER_CODE_GENERATION_FAILED')) {
    return errorResponse(
      'PARTNER_CODE_GENERATION_FAILED',
      '파트너 코드를 생성하지 못했습니다.',
      500
    )
  }

  logDatabaseError(
    '[Admin partners PATCH] Atomic update failed',
    error
  )

  return errorResponse(
    'PARTNER_UPDATE_FAILED',
    '파트너 상태를 변경하지 못했습니다.',
    500
  )
}

export async function GET(request) {
  const { isAdmin } = await requireAdmin(request)

  if (!isAdmin) {
    return errorResponse(
      'ADMIN_REQUIRED',
      '관리자 권한이 필요합니다.',
      403
    )
  }

  const requestedView =
    new URL(request.url).searchParams.get('view')
  const view = requestedView ?? 'review'

  if (!VIEWS.includes(view)) {
    return errorResponse(
      'INVALID_VIEW',
      '올바른 목록 구분을 선택해 주세요.',
      400
    )
  }

  const visibleStatuses =
    view === 'approved'
      ? APPROVED_STATUSES
      : REVIEW_STATUSES

  const { data, error } = await supabaseAdmin
    .from('partner_profiles')
    .select('*')
    .in('status', visibleStatuses)
    .order('created_at', { ascending: false })

  if (error) {
    logDatabaseError(
      '[Admin partners GET] Partner list lookup failed',
      error
    )

    return errorResponse(
      'PARTNER_LIST_FETCH_FAILED',
      '파트너 목록을 불러오지 못했습니다.',
      500
    )
  }

  const { data: notes, error: notesError } = await supabaseAdmin
    .from('partner_admin_notes')
    .select('partner_profile_id, internal_memo')

  if (notesError) {
    logDatabaseError(
      '[Admin partners GET] Partner notes lookup failed',
      notesError
    )

    return errorResponse(
      'PARTNER_NOTES_FETCH_FAILED',
      '파트너 내부 메모를 불러오지 못했습니다.',
      500
    )
  }

  const noteMap = new Map(
    (notes ?? []).map(note => [
      note.partner_profile_id,
      note.internal_memo,
    ])
  )

  const {
    data: statusRows,
    error: countError,
  } = await supabaseAdmin
    .from('partner_profiles')
    .select('status')

  if (countError) {
    logDatabaseError(
      '[Admin partners GET] Partner counts lookup failed',
      countError
    )

    return errorResponse(
      'PARTNER_COUNTS_FETCH_FAILED',
      '파트너 현황을 불러오지 못했습니다.',
      500
    )
  }

  const counts = Object.fromEntries(
    STATUSES.map(status => [status, 0])
  )

  for (const row of statusRows ?? []) {
    counts[row.status] = (counts[row.status] || 0) + 1
  }

  return NextResponse.json({
    partners: (data ?? []).map(partner => ({
      ...partner,
      internal_memo: noteMap.get(partner.id) || '',
    })),
    counts,
  })
}

export async function PATCH(request) {
  const { user, isAdmin } = await requireAdmin(request)

  if (!isAdmin) {
    return errorResponse(
      'ADMIN_REQUIRED',
      '관리자 권한이 필요합니다.',
      403
    )
  }

  let body

  try {
    body = await request.json()
  } catch {
    return errorResponse(
      'INVALID_JSON',
      '요청 형식을 확인해 주세요.',
      400
    )
  }

  if (
    !body ||
    typeof body !== 'object' ||
    Array.isArray(body)
  ) {
    return errorResponse(
      'INVALID_BODY',
      '요청 내용을 확인해 주세요.',
      400
    )
  }

  if (!isUuid(body.id)) {
    return errorResponse(
      'INVALID_PARTNER_ID',
      '올바른 파트너 신청 ID가 필요합니다.',
      400
    )
  }

  if (
    typeof body.status !== 'string' ||
    !STATUSES.includes(body.status)
  ) {
    return errorResponse(
      'INVALID_STATUS',
      '올바른 상태를 선택해 주세요.',
      400
    )
  }

  if (
    body.rejectedReason !== undefined &&
    body.rejectedReason !== null &&
    typeof body.rejectedReason !== 'string'
  ) {
    return errorResponse(
      'INVALID_REJECTED_REASON',
      '승인 거절 사유를 확인해 주세요.',
      400
    )
  }

  const rejectedReason =
    typeof body.rejectedReason === 'string'
      ? body.rejectedReason.trim() || null
      : null

  if (rejectedReason && rejectedReason.length > 1000) {
    return errorResponse(
      'REJECTED_REASON_TOO_LONG',
      '승인 거절 사유는 1,000자 이내로 입력해 주세요.',
      400
    )
  }

  if (body.status === 'rejected' && !rejectedReason) {
    return errorResponse(
      'REJECTED_REASON_REQUIRED',
      '승인 거절 사유를 입력해 주세요.',
      400
    )
  }

  if (
    body.internalMemo !== undefined &&
    body.internalMemo !== null &&
    typeof body.internalMemo !== 'string'
  ) {
    return errorResponse(
      'INVALID_INTERNAL_MEMO',
      '내부 메모를 확인해 주세요.',
      400
    )
  }

  const internalMemo =
    typeof body.internalMemo === 'string'
      ? body.internalMemo.trim() || null
      : null

  if (internalMemo && internalMemo.length > 5000) {
    return errorResponse(
      'INTERNAL_MEMO_TOO_LONG',
      '내부 메모는 5,000자 이내로 입력해 주세요.',
      400
    )
  }

  const { data, error } =
    await updatePartnerStatusAtomically({
      partnerId: body.id,
      status: body.status,
      updatedBy: user.id,
      rejectedReason,
      internalMemo,
    })

  if (error) {
    return rpcErrorResponse(error)
  }

  if (
    data === null ||
    data === undefined ||
    (Array.isArray(data) && data.length === 0)
  ) {
    console.error(
      '[Admin partners PATCH] Atomic update returned no partner'
    )

    return errorResponse(
      'PARTNER_UPDATE_FAILED',
      '파트너 상태를 변경하지 못했습니다.',
      500
    )
  }

  return NextResponse.json({
    partner: data,
  })
}
