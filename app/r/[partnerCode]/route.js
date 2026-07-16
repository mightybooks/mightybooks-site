import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request,{params}){const {partnerCode}=await params;const code=String(partnerCode||'').toUpperCase();const {data}=await supabaseAdmin.from('partner_profiles').select('id').eq('partner_code',code).eq('status','approved').maybeSingle();const destination=data?'/support/diagnosis':'/partner';return NextResponse.redirect(new URL(destination,request.url))}
