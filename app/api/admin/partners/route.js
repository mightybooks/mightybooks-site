import { randomBytes } from 'node:crypto'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/server-auth'

const STATUSES = ['pending', 'approved', 'rejected', 'suspended']
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function createPartnerCode() {
  const bytes = randomBytes(5)
  return `MB-${Array.from(bytes, byte => CODE_ALPHABET[byte % CODE_ALPHABET.length]).join('')}`
}

async function getUniquePartnerCode() {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = createPartnerCode()
    const { data } = await supabaseAdmin.from('partner_profiles').select('id').eq('partner_code', code).maybeSingle()
    if (!data) return code
  }
  throw new Error('파트너 코드를 생성하지 못했습니다.')
}

export async function GET(request) {
  const { isAdmin } = await requireAdmin(request)
  if (!isAdmin) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 })
  const { data, error } = await supabaseAdmin.from('partner_profiles').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: '파트너 목록을 불러오지 못했습니다.' }, { status: 500 })
  const { data: notes } = await supabaseAdmin.from('partner_admin_notes').select('partner_profile_id, internal_memo')
  const noteMap = new Map((notes || []).map(note => [note.partner_profile_id, note.internal_memo]))
  return NextResponse.json({ partners: data.map(partner => ({ ...partner, internal_memo: noteMap.get(partner.id) || '' })) })
}

export async function PATCH(request) {
  const { user, isAdmin } = await requireAdmin(request)
  if (!isAdmin) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 })

  const body = await request.json()
  if (!body.id || !STATUSES.includes(body.status)) return NextResponse.json({ error: '올바른 상태를 선택해 주세요.' }, { status: 400 })

  const { data: current } = await supabaseAdmin.from('partner_profiles').select('partner_code, approved_at').eq('id', body.id).maybeSingle()
  if (!current) return NextResponse.json({ error: '파트너 신청을 찾을 수 없습니다.' }, { status: 404 })

  const updates = {
    status: body.status,
    rejected_reason: body.rejectedReason?.trim() || null,
  }

  if (body.status === 'approved') {
    updates.partner_code = current.partner_code || await getUniquePartnerCode()
    updates.approved_at = current.approved_at || new Date().toISOString()
    updates.approved_by = user.id
    updates.rejected_reason = null
  }

  const { data, error } = await supabaseAdmin.from('partner_profiles').update(updates).eq('id', body.id).select('*').single()
  if (error) return NextResponse.json({ error: '파트너 상태를 변경하지 못했습니다.' }, { status: 500 })
  const internalMemo = body.internalMemo?.trim() || null
  const { error: noteError } = await supabaseAdmin.from('partner_admin_notes').upsert({ partner_profile_id: body.id, internal_memo: internalMemo, updated_by: user.id })
  if (noteError) return NextResponse.json({ error: '상태는 변경됐지만 내부 메모를 저장하지 못했습니다.' }, { status: 500 })
  return NextResponse.json({ partner: { ...data, internal_memo: internalMemo || '' } })
}
