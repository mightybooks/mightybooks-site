import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server-auth'

export async function GET(request) {
  const { isAdmin } = await requireAdmin(request)
  return isAdmin
    ? NextResponse.json({ admin: true })
    : NextResponse.json({ admin: false }, { status: 403 })
}
