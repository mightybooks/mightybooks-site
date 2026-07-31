import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const FIELD_LIMITS = {
  businessName: 100,
  contactName: 50,
  phone: 30,
  businessType: 100,
  region: 100,
  websiteUrl: 500,
  snsUrl: 500,
  introductionPlan: 2000,
}

function errorResponse(code, message, status, details = {}) {
  return NextResponse.json(
    {
      code,
      error: message,
      ...details,
    },
    { status }
  )
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : null
}

function isHttpUrl(value) {
  if (!value) return true

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validateApplication(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return {
      error: '신청 내용을 확인해 주세요.',
    }
  }

  const values = Object.fromEntries(
    Object.keys(FIELD_LIMITS).map(field => [
      field,
      normalizeString(body[field]),
    ])
  )

  const requiredFields = [
    'businessName',
    'contactName',
    'phone',
    'businessType',
    'region',
    'introductionPlan',
  ]

  if (
    requiredFields.some(field => !values[field]) ||
    body.agreed !== true
  ) {
    return {
      error: '필수 입력 항목과 개인정보 수집 동의를 확인해 주세요.',
    }
  }

  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    if (values[field] !== null && values[field].length > limit) {
      return {
        error: '입력 가능한 글자 수를 초과한 항목이 있습니다.',
      }
    }
  }

  if (!values.websiteUrl && !values.snsUrl) {
    return {
      error: '업체 홈페이지 또는 주로 활동하는 SNS 주소를 하나 이상 입력해 주세요.',
    }
  }

  if (
    !isHttpUrl(values.websiteUrl) ||
    !isHttpUrl(values.snsUrl)
  ) {
    return {
      error: '홈페이지와 SNS 주소는 http 또는 https 주소만 입력해 주세요.',
    }
  }

  return {
    data: {
      ...values,
      hasOfflineStore: body.hasOfflineStore === true,
      canDisplayCards: body.canDisplayCards === true,
      canDisplayBanner: body.canDisplayBanner === true,
    },
  }
}

export async function POST(request) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return errorResponse(
      'AUTH_REQUIRED',
      '로그인 후 파트너 신청을 계속해 주세요.',
      401
    )
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('account_status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (profileError) {
    console.error('[Partner apply] Account profile lookup failed', {
      code: profileError.code,
      message: profileError.message,
    })

    return errorResponse(
      'APPLICATION_FAILED',
      '신청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      500
    )
  }

  if (!profile) {
    return errorResponse(
      'ACCOUNT_PROFILE_MISSING',
      '계정 정보를 확인할 수 없어 파트너 신청을 진행할 수 없습니다.',
      409
    )
  }

  if (profile.account_status !== 'active') {
    return errorResponse(
      'ACCOUNT_INACTIVE',
      '현재 계정 상태에서는 파트너 신청을 진행할 수 없습니다.',
      403
    )
  }

  const {
    data: existingApplication,
    error: existingApplicationError,
  } = await supabase
    .from('partner_profiles')
    .select('status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingApplicationError) {
    console.error('[Partner apply] Existing application lookup failed', {
      code: existingApplicationError.code,
      message: existingApplicationError.message,
    })

    return errorResponse(
      'APPLICATION_FAILED',
      '신청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      500
    )
  }

  if (existingApplication) {
    return errorResponse(
      'ALREADY_APPLIED',
      '이미 파트너 신청 이력이 있습니다.',
      409,
      { status: existingApplication.status }
    )
  }

  let body

  try {
    body = await request.json()
  } catch {
    return errorResponse(
      'INVALID_INPUT',
      '신청 내용을 확인해 주세요.',
      400
    )
  }

  const validation = validateApplication(body)

  if (validation.error) {
    return errorResponse(
      'INVALID_INPUT',
      validation.error,
      400
    )
  }

  if (!user.email) {
    return errorResponse(
      'APPLICATION_FAILED',
      '신청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      500
    )
  }

  const application = validation.data
  const { data, error } = await supabaseAdmin
    .from('partner_profiles')
    .insert({
      user_id: user.id,
      business_name: application.businessName,
      contact_name: application.contactName,
      email: user.email,
      phone: application.phone,
      business_type: application.businessType,
      region: application.region,
      website_url: application.websiteUrl || null,
      sns_url: application.snsUrl || null,
      introduction_plan: application.introductionPlan,
      has_offline_store: application.hasOfflineStore,
      can_display_cards: application.canDisplayCards,
      can_display_banner: application.canDisplayBanner,
      status: 'pending',
    })
    .select('id,status')
    .single()

  if (error) {
    if (error.code === '23505') {
      const { data: concurrentApplication } = await supabaseAdmin
        .from('partner_profiles')
        .select('status')
        .eq('user_id', user.id)
        .maybeSingle()

      return errorResponse(
        'ALREADY_APPLIED',
        '이미 파트너 신청 이력이 있습니다.',
        409,
        concurrentApplication
          ? { status: concurrentApplication.status }
          : {}
      )
    }

    console.error('[Partner apply] Application insert failed', {
      code: error.code,
      message: error.message,
    })

    return errorResponse(
      'APPLICATION_FAILED',
      '신청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      500
    )
  }

  return NextResponse.json(
    {
      application: data,
    },
    { status: 201 }
  )
}
