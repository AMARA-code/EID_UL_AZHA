'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GeometricBorder from '@/components/ui/GeometricBorder'
import StarField from '@/components/ui/StarField'
import LanternWall from '@/components/sections/LanternWall'
import type { Wish } from '@/types'
import { supabase } from '@/lib/supabase'

type Language = Wish['language']

const LANGS: { value: Language; label: string }[] = [
  { value: 'English', label: 'English' },
  { value: 'Urdu', label: 'اردو' },
  { value: 'Arabic', label: 'العربية' },
]

function clampText(input: string, max: number) {
  const t = input.trim()
  return t.length <= max ? t : t.slice(0, max)
}

function WishSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div
          key={i}
          className="h-[170px] animate-pulse rounded-[22px] border border-gold/20 bg-cream/60"
        />
      ))}
    </div>
  )
}

function EmptyLantern() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-10 text-center">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(214,178,166,0.28),rgba(214,178,166,0.0)_70%)] blur-2xl" />
        <svg
          width="110"
          height="140"
          viewBox="0 0 110 140"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lanternG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(236,232,251,0.95)" />
              <stop offset="0.55" stopColor="rgba(255,250,243,0.95)" />
              <stop offset="1" stopColor="rgba(214,178,166,0.9)" />
            </linearGradient>
          </defs>
          <path
            d="M55 10c10 0 18 8 18 18v8h10v20H73v56H37V56H27V36h10v-8c0-10 8-18 18-18z"
            fill="url(#lanternG)"
            stroke="rgba(214,178,166,0.7)"
          />
          <path d="M37 56h36" stroke="rgba(26,20,34,0.18)" />
          <path d="M37 76h36" stroke="rgba(26,20,34,0.12)" />
          <path d="M55 112v16" stroke="rgba(214,178,166,0.7)" />
          <circle cx="55" cy="132" r="6" fill="rgba(214,178,166,0.85)" />
        </svg>
      </motion.div>
      <p className="font-cinzel text-xl text-ink">Be the first to light a lantern!</p>
      <p className="font-crimson text-sm text-ink/60">
        Share a short Eid wish — it will appear here for everyone.
      </p>
    </div>
  )
}

export default function WishesClient() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [language, setLanguage] = useState<Language>('English')

  const [openWish, setOpenWish] = useState<Wish | null>(null)
  const [reacting, setReacting] = useState(false)
  const optimisticIds = useRef<Set<string>>(new Set())

  const supabaseReady = Boolean(supabase)
  const showEmpty = !loading && wishes.length === 0

  async function fetchWishes() {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/wishes', { cache: 'no-store' })
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(j?.error || 'Failed to load wishes.')
      }
      const data = (await res.json()) as Wish[]
      setWishes(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load wishes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchWishes()
  }, [])

  useEffect(() => {
    if (!supabaseReady) return
    const channel = supabase!
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'wishes' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const w = payload.new as Wish
            if (optimisticIds.current.has(w.id)) return
            setWishes((prev) => {
              if (prev.some((x) => x.id === w.id)) return prev
              return [w, ...prev]
            })
          }
          if (payload.eventType === 'UPDATE') {
            const w = payload.new as Wish
            setWishes((prev) => prev.map((x) => (x.id === w.id ? w : x)))
            setOpenWish((cur) => (cur?.id === w.id ? w : cur))
          }
        },
      )
      .subscribe()

    return () => {
      void supabase!.removeChannel(channel)
    }
  }, [supabaseReady])

  async function submitWish(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const n = clampText(name, 30)
    const m = clampText(message, 150)
    if (!n) return setError('Please enter your name (max 30 chars).')
    if (!m) return setError('Please enter a wish (max 150 chars).')

    setSubmitting(true)

    const optimistic: Wish = {
      id: `optimistic-${crypto.randomUUID()}`,
      name: n,
      message: m,
      language,
      hearts: 0,
      created_at: new Date().toISOString(),
    }
    setWishes((prev) => [optimistic, ...prev])

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: n, message: m, language }),
      })
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(j?.error || 'Failed to submit wish.')
      }
      const created = (await res.json()) as Wish
      optimisticIds.current.add(created.id)
      setWishes((prev) => [created, ...prev.filter((x) => x.id !== optimistic.id)])
      setName('')
      setMessage('')
      setLanguage('English')
    } catch (e) {
      setWishes((prev) => prev.filter((x) => x.id !== optimistic.id))
      setError(e instanceof Error ? e.message : 'Failed to submit wish.')
    } finally {
      setSubmitting(false)
      window.setTimeout(() => optimisticIds.current.clear(), 4000)
    }
  }

  async function reactToWish(id: string) {
    setError(null)
    setReacting(true)

    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, hearts: w.hearts + 1 } : w)),
    )
    setOpenWish((cur) =>
      cur?.id === id ? { ...cur, hearts: cur.hearts + 1 } : cur,
    )

    try {
      const res = await fetch(`/api/wishes/${id}/react`, { method: 'PUT' })
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(j?.error || 'Failed to send heart.')
      }
      const updated = (await res.json()) as Wish
      setWishes((prev) => prev.map((w) => (w.id === id ? updated : w)))
      setOpenWish((cur) => (cur?.id === id ? updated : cur))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send heart.')
      await fetchWishes()
    } finally {
      setReacting(false)
    }
  }

  const divider = useMemo(
    () => (
      <div className="mx-auto mt-4 flex w-full max-w-xl items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rosegold/50 to-transparent" />
        <span className="text-rosegold">✦</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rosegold/50 to-transparent" />
      </div>
    ),
    [],
  )

  return (
    <div className="relative overflow-hidden">
      <StarField count={70} seed={21} className="opacity-70" />
      <div className="noise-overlay" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <h1 className="font-cinzel text-4xl tracking-wide text-ink sm:text-5xl">
            Light a Lantern
          </h1>
          <p className="mt-3 font-crimson text-base text-ink/60">
            Share your Eid wishes with the world.
          </p>
          {divider}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[420px_1fr] lg:items-start">
          <GeometricBorder className="relative">
            <h2 className="font-cinzel text-xl text-ink">Float a Wish</h2>
            <p className="mt-1 font-crimson text-sm text-ink/60">
              Keep it short, sincere, and beautiful.
            </p>

            {!supabaseReady ? (
              <div className="mt-4 rounded-2xl border border-rosegold/35 bg-blush/40 p-4">
                <p className="font-crimson text-sm text-ink/70">
                  Supabase isn&apos;t configured yet. Add keys in your `.env.local`
                  and reload to enable saving and realtime updates.
                </p>
              </div>
            ) : null}

            <form onSubmit={submitWish} className="mt-6 grid gap-4">
              <label className="grid gap-1">
                <span className="font-crimson text-sm font-semibold text-ink/75">
                  Your Name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 30))}
                  maxLength={30}
                  className="h-11 rounded-xl border border-gold/25 bg-cream/60 px-3 font-crimson text-sm text-ink/80 outline-none focus:ring-2 focus:ring-rosegold/55"
                  placeholder="Ayesha"
                />
              </label>

              <label className="grid gap-1">
                <span className="flex items-center justify-between font-crimson text-sm font-semibold text-ink/75">
                  <span>Your Eid Wish</span>
                  <span className="text-ink/50">{message.length}/150</span>
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 150))}
                  maxLength={150}
                  rows={4}
                  className="resize-none rounded-xl border border-gold/25 bg-cream/60 px-3 py-2 font-crimson text-sm text-ink/80 outline-none focus:ring-2 focus:ring-rosegold/55"
                  placeholder="May Allah accept your qurbani and fill your home with peace."
                />
              </label>

              <label className="grid gap-1">
                <span className="font-crimson text-sm font-semibold text-ink/75">
                  Language
                </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="h-11 rounded-xl border border-gold/25 bg-cream/60 px-3 font-crimson text-sm text-ink/80 outline-none focus:ring-2 focus:ring-rosegold/55"
                >
                  {LANGS.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-rosegold/55 bg-rosegold/15 font-crimson text-sm font-semibold text-ink/80 shadow-[0_18px_60px_rgba(214,178,166,0.20)] transition-colors hover:bg-rosegold/20 disabled:opacity-60"
              >
                {submitting ? 'Floating…' : 'Float Your Lantern 🏮'}
              </button>

              {error ? (
                <p className="rounded-xl border border-terra/40 bg-blush/40 px-3 py-2 font-crimson text-sm text-ink/70">
                  {error}
                </p>
              ) : null}
            </form>
          </GeometricBorder>

          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-crimson text-sm text-ink/60">
                {loading ? 'Loading lanterns…' : `${wishes.length} lanterns lit`}
              </p>
              <button
                type="button"
                onClick={() => void fetchWishes()}
                className="rounded-full border border-gold/25 bg-cream/60 px-4 py-2 font-crimson text-xs font-semibold text-ink/70 hover:bg-cream/70"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <WishSkeleton />
            ) : showEmpty ? (
              <EmptyLantern />
            ) : (
              <LanternWall wishes={wishes} onOpen={setOpenWish} />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openWish ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenWish(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <GeometricBorder size="md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-crimson text-sm font-semibold text-ink/85">
                      {openWish.name}
                    </p>
                    <p className="mt-0.5 font-crimson text-xs text-ink/55">
                      {new Date(openWish.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenWish(null)}
                    className="rounded-full border border-gold/25 bg-cream/60 px-3 py-1 font-crimson text-xs font-semibold text-ink/70"
                  >
                    Close
                  </button>
                </div>

                <p className="mt-4 whitespace-pre-wrap font-crimson text-sm leading-relaxed text-ink/70">
                  {openWish.message}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full border border-rosegold/35 bg-lavender/40 px-3 py-1 font-crimson text-xs text-ink/70">
                    ♥ {openWish.hearts}
                  </span>
                  <button
                    type="button"
                    disabled={reacting || openWish.id.startsWith('optimistic-')}
                    onClick={() => void reactToWish(openWish.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-rosegold/55 bg-rosegold/15 px-5 py-2 font-crimson text-xs font-semibold text-ink/80 hover:bg-rosegold/20 disabled:opacity-60"
                  >
                    <span>Send Heart</span>
                    <span className="text-rosegold">♥</span>
                  </button>
                </div>
              </GeometricBorder>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

