/*
SQL (run in Supabase):

CREATE TABLE wishes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  message text NOT NULL,
  language text DEFAULT 'English',
  hearts int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
*/

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Wish } from '@/types'

const ALLOWED_LANGUAGES = new Set<Wish['language']>(['English', 'Urdu', 'Arabic'])

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

export async function GET() {
  const supabase = getServerSupabase()
  if (!supabase) {
    return jsonError(
      'Supabase env is missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      500,
    )
  }

  try {
    const { data, error } = await supabase
      .from('wishes')
      .select('id,name,message,language,hearts,created_at')
      .order('created_at', { ascending: false })

    if (error) return jsonError(error.message, 500)
    return NextResponse.json((data ?? []) satisfies Wish[])
  } catch {
    return jsonError('Failed to fetch wishes.', 500)
  }
}

export async function POST(req: Request) {
  const supabase = getServerSupabase()
  if (!supabase) {
    return jsonError(
      'Supabase env is missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      500,
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return jsonError('Invalid JSON body.')
  }

  const raw = body as Partial<{
    name: unknown
    message: unknown
    language: unknown
  }>

  const name = typeof raw.name === 'string' ? raw.name.trim() : ''
  const message = typeof raw.message === 'string' ? raw.message.trim() : ''
  const language = typeof raw.language === 'string' ? raw.language.trim() : 'English'

  if (!name || name.length > 30) return jsonError('Name is required (max 30 chars).')
  if (!message || message.length > 150)
    return jsonError('Wish message is required (max 150 chars).')
  if (!ALLOWED_LANGUAGES.has(language as Wish['language']))
    return jsonError('Language must be English, Urdu, or Arabic.')

  try {
    const { data, error } = await supabase
      .from('wishes')
      .insert({ name, message, language })
      .select('id,name,message,language,hearts,created_at')
      .single()

    if (error) return jsonError(error.message, 500)
    return NextResponse.json(data satisfies Wish, { status: 201 })
  } catch {
    return jsonError('Failed to create wish.', 500)
  }
}

