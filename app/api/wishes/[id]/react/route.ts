import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Wish } from '@/types'

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export async function PUT(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = getServerSupabase()
  if (!supabase) {
    return jsonError(
      'Supabase env is missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      500,
    )
  }

  const { id } = await params
  if (!id) return jsonError('Missing wish id.')

  try {
    // Read current hearts then update. (In Supabase SQL you can also use an RPC for atomic inc.)
    const { data: current, error: selErr } = await supabase
      .from('wishes')
      .select('hearts')
      .eq('id', id)
      .single()
    if (selErr) return jsonError(selErr.message, 500)

    const nextHearts = (current?.hearts ?? 0) + 1
    const { data, error } = await supabase
      .from('wishes')
      .update({ hearts: nextHearts })
      .eq('id', id)
      .select('id,name,message,language,hearts,created_at')
      .single()

    if (error) return jsonError(error.message, 500)
    return NextResponse.json(data satisfies Wish)
  } catch {
    return jsonError('Failed to react to wish.', 500)
  }
}

