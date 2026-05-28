'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GeometricBorder from '@/components/ui/GeometricBorder'
import StarField from '@/components/ui/StarField'
import LanternWall from '@/components/sections/LanternWall'
import type { Wish } from '@/types'
import { supabase } from '@/lib/supabase'

type Language = Wish['language']

const LANGS: { value: Language; label: string; flag: string }[] = [
  { value: 'English', label: 'English',  flag: '🇬🇧' },
  { value: 'Urdu',    label: 'اردو',     flag: '🇵🇰' },
  { value: 'Arabic',  label: 'العربية',  flag: '🇸🇦' },
]

const FORM_STYLES = `
@keyframes formCardEntrance {
  from { opacity: 0; transform: translateY(18px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
@keyframes inputFocusGlow {
  from { box-shadow: 0 0 0 0 rgba(214,178,166,0); }
  to   { box-shadow: 0 0 0 3px rgba(214,178,166,0.35); }
}
@keyframes submitPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(214,178,166,0); }
  50%       { box-shadow: 0 8px 28px rgba(214,178,166,0.45); }
}
@keyframes floatIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.wish-form-card {
  animation: formCardEntrance 0.5s cubic-bezier(0.22,1,0.36,1) both;
}
.wish-field input,
.wish-field textarea,
.wish-field select {
  width: 100%;
  border-radius: 14px;
  border: 1.5px solid rgba(214,178,166,0.35);
  background: rgba(255,252,247,0.7);
  padding: 10px 14px;
  font-family: var(--font-crimson, Georgia, serif);
  font-size: 15px;
  color: rgba(26,20,34,0.85);
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  backdrop-filter: blur(4px);
}
.wish-field input::placeholder,
.wish-field textarea::placeholder {
  color: rgba(26,20,34,0.32);
}
.wish-field input:focus,
.wish-field textarea:focus,
.wish-field select:focus {
  border-color: rgba(214,178,166,0.75);
  background: rgba(255,252,247,0.92);
  box-shadow: 0 0 0 3px rgba(214,178,166,0.22);
}
.wish-field textarea {
  resize: none;
  line-height: 1.65;
}
.wish-field select {
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(26,20,34,0.45)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
.wish-field label span {
  font-family: var(--font-cinzel, serif);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(26,20,34,0.55);
  font-weight: 500;
}
`

function clampText(input: string, max: number) {
  const t = input.trim()
  return t.length <= max ? t : t.slice(0, max)
}

function WishSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-[170px] animate-pulse rounded-[22px]"
          style={{
            background: 'linear-gradient(145deg, rgba(255,252,245,0.6), rgba(255,248,238,0.4))',
            border: '1.5px solid rgba(214,178,166,0.25)',
            animationDelay: `${i * 0.07}s`,
          }}
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
        <svg width="110" height="140" viewBox="0 0 110 140" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lanternG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(236,232,251,0.95)" />
              <stop offset="0.55" stopColor="rgba(255,250,243,0.95)" />
              <stop offset="1" stopColor="rgba(214,178,166,0.9)" />
            </linearGradient>
          </defs>
          <path d="M55 10c10 0 18 8 18 18v8h10v20H73v56H37V56H27V36h10v-8c0-10 8-18 18-18z" fill="url(#lanternG)" stroke="rgba(214,178,166,0.7)" />
          <path d="M37 56h36" stroke="rgba(26,20,34,0.18)" />
          <path d="M37 76h36" stroke="rgba(26,20,34,0.12)" />
          <path d="M55 112v16" stroke="rgba(214,178,166,0.7)" />
          <circle cx="55" cy="132" r="6" fill="rgba(214,178,166,0.85)" />
        </svg>
      </motion.div>
      <p className="font-cinzel text-xl text-ink">Be the first to light a lantern!</p>
      <p className="font-crimson text-sm text-ink/60">Share a short Eid wish — it will appear here for everyone.</p>
    </div>
  )
}

/* ── Success burst ── */
function SuccessBurst({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[24px] text-center"
      style={{ background: 'rgba(255,252,247,0.97)', backdropFilter: 'blur(8px)' }}
    >
      <motion.span
        className="text-5xl"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🏮
      </motion.span>
      <p className="font-cinzel text-lg text-ink">Your lantern is floating!</p>
      <p className="font-crimson text-sm text-ink/60">May your wish reach the heavens.</p>
    </motion.div>
  )
}

export default function WishesClient() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [language, setLanguage] = useState<Language>('English')

  const [openWish, setOpenWish] = useState<Wish | null>(null)
  const [reacting, setReacting] = useState(false)
  const optimisticIds = useRef<Set<string>>(new Set())

  const supabaseReady = Boolean(supabase)
  const showEmpty = !loading && wishes.length === 0
  const msgLeft = 150 - message.length

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

  useEffect(() => { void fetchWishes() }, [])

  useEffect(() => {
    if (!supabaseReady) return
    const channel = supabase!
      .channel('wishes-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wishes' }, (payload) => {
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
      })
      .subscribe()
    return () => { void supabase!.removeChannel(channel) }
  }, [supabaseReady])

  async function submitWish(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const n = clampText(name, 30)
    const m = clampText(message, 150)
    if (!n) return setError('Please enter your name.')
    if (!m) return setError('Please enter a wish.')
    setSubmitting(true)

    const optimistic: Wish = {
      id: `optimistic-${crypto.randomUUID()}`,
      name: n, message: m, language,
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
      setName(''); setMessage(''); setLanguage('English')
      setSubmitted(true)
    } catch (e) {
      setWishes((prev) => prev.filter((x) => x.id !== optimistic.id))
      setError(e instanceof Error ? e.message : 'Failed to submit wish.')
    } finally {
      setSubmitting(false)
      window.setTimeout(() => optimisticIds.current.clear(), 4000)
    }
  }

  async function reactToWish(id: string) {
    setError(null); setReacting(true)
    setWishes((prev) => prev.map((w) => (w.id === id ? { ...w, hearts: w.hearts + 1 } : w)))
    setOpenWish((cur) => cur?.id === id ? { ...cur, hearts: cur.hearts + 1 } : cur)
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

  const divider = useMemo(() => (
    <div className="mx-auto mt-4 flex w-full max-w-xl items-center justify-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rosegold/50 to-transparent" />
      <span className="text-rosegold">✦</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rosegold/50 to-transparent" />
    </div>
  ), [])

  return (
    <div className="relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: FORM_STYLES }} />
      <StarField count={70} seed={21} className="opacity-70" />
      <div className="noise-overlay" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {/* Page header */}
        <div className="text-center">
          <h1 className="font-cinzel text-4xl tracking-wide text-ink sm:text-5xl">Light a Lantern</h1>
          <p className="mt-3 font-crimson text-base text-ink/60">Share your Eid wishes with the world.</p>
          {divider}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[420px_1fr] lg:items-start">

          {/* ════════════════════════════════════
              FLOAT A WISH form card
          ════════════════════════════════════ */}
          <div className="wish-form-card relative">
            <div
              className="relative overflow-hidden rounded-[28px]"
              style={{
                background: 'linear-gradient(160deg, rgba(255,254,250,0.95) 0%, rgba(255,248,238,0.92) 100%)',
                border: '1.5px solid rgba(214,178,166,0.45)',
                boxShadow: '0 8px 40px rgba(214,178,166,0.22), 0 2px 8px rgba(26,20,34,0.07)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {/* Top gradient bar */}
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(214,178,166,0.9) 30%, rgba(236,232,251,0.8) 60%, rgba(214,178,166,0.6) 80%, transparent 100%)',
                }}
              />

              {/* Corner ornament — top right */}
              <div className="pointer-events-none absolute right-5 top-5 opacity-15">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <path d="M24 4 L27 18 L41 24 L27 30 L24 44 L21 30 L7 24 L21 18 Z" fill="rgba(214,178,166,1)" />
                </svg>
              </div>

              <div className="relative p-6 sm:p-8">
                {/* Card header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏮</span>
                    <div>
                      <h2
                        className="font-cinzel text-xl tracking-wide text-ink"
                        style={{ textShadow: 'none' }}
                      >
                        Float a Wish
                      </h2>
                      <p className="mt-0.5 font-crimson text-sm text-ink/55">
                        Keep it sincere and beautiful.
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="mt-4 h-px w-full"
                    style={{ background: 'linear-gradient(90deg, rgba(214,178,166,0.5), rgba(214,178,166,0.15) 70%, transparent)' }}
                  />
                </div>

                {!supabaseReady && (
                  <div
                    className="mb-5 rounded-[14px] p-4"
                    style={{
                      background: 'rgba(214,178,166,0.12)',
                      border: '1px solid rgba(214,178,166,0.35)',
                    }}
                  >
                    <p className="font-crimson text-sm text-ink/70">
                      Supabase isn't configured yet. Add keys in <code className="rounded bg-black/8 px-1">.env.local</code> to enable saving.
                    </p>
                  </div>
                )}

                {/* ── FORM ── */}
                <form onSubmit={submitWish} className="relative grid gap-5">
                  <AnimatePresence>
                    {submitted && (
                      <SuccessBurst onDone={() => setSubmitted(false)} />
                    )}
                  </AnimatePresence>

                  {/* Name */}
                  <div className="wish-field grid gap-2">
                    <label>
                      <span>Your Name</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value.slice(0, 30))}
                        maxLength={30}
                        placeholder="e.g. Ayesha"
                        autoComplete="given-name"
                      />
                    </label>
                  </div>

                  {/* Message */}
                  <div className="wish-field grid gap-2">
                    <label>
                      <div className="mb-2 flex items-center justify-between">
                        <span>Your Eid Wish</span>
                        <span
                          className="font-crimson text-xs"
                          style={{
                            color: msgLeft <= 20 ? 'rgba(200,80,60,0.75)' : 'rgba(26,20,34,0.38)',
                            transition: 'color 0.2s',
                          }}
                        >
                          {message.length}/150
                        </span>
                      </div>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value.slice(0, 150))}
                        maxLength={150}
                        rows={4}
                        placeholder="May Allah accept your qurbani and fill your home with peace…"
                      />
                    </label>
                    {/* Progress bar */}
                    <div className="h-0.5 overflow-hidden rounded-full" style={{ background: 'rgba(214,178,166,0.2)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${(message.length / 150) * 100}%`,
                          background: msgLeft <= 20
                            ? 'rgba(200,80,60,0.6)'
                            : 'linear-gradient(90deg, rgba(214,178,166,0.8), rgba(214,178,166,0.5))',
                        }}
                      />
                    </div>
                  </div>

                  {/* Language */}
                  <div className="wish-field grid gap-2">
                    <label>
                      <span>Language</span>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                      >
                        {LANGS.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.flag} {l.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="relative overflow-hidden font-cinzel text-sm font-semibold tracking-wide text-ink/85 transition-all duration-300 disabled:opacity-55"
                    style={{
                      height: 50,
                      borderRadius: 16,
                      background: submitting
                        ? 'rgba(214,178,166,0.18)'
                        : 'linear-gradient(135deg, rgba(214,178,166,0.28) 0%, rgba(236,232,251,0.22) 100%)',
                      border: '1.5px solid rgba(214,178,166,0.6)',
                      animation: !submitting ? 'submitPulse 3s ease-in-out infinite' : 'none',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {/* Shimmer sweep */}
                    {!submitting && (
                      <span
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                          animation: 'shimmerPass 3.5s ease-in-out infinite',
                        }}
                      />
                    )}
                    <span className="relative flex items-center justify-center gap-2">
                      {submitting ? (
                        <>
                          <span
                            className="inline-block"
                            style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}
                          >
                            ✦
                          </span>
                          Sending your wish…
                        </>
                      ) : (
                        <>Float Your Lantern <span>🏮</span></>
                      )}
                    </span>
                  </button>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="rounded-[12px] px-4 py-2.5 font-crimson text-sm"
                        style={{
                          background: 'rgba(200,80,60,0.08)',
                          border: '1px solid rgba(200,80,60,0.3)',
                          color: 'rgba(180,60,40,0.85)',
                        }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Bottom glow */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                style={{
                  background: 'linear-gradient(to top, rgba(214,178,166,0.1), transparent)',
                }}
              />
            </div>
          </div>

          {/* ── Right panel: lantern wall ── */}
          <div className="relative">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">✦</span>
                <p className="font-cinzel text-sm tracking-wide text-ink/65">
                  {loading ? 'Lighting lanterns…' : `${wishes.length} lantern${wishes.length !== 1 ? 's' : ''} lit`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void fetchWishes()}
                className="rounded-full border border-gold/25 bg-cream/60 px-4 py-1.5 font-cinzel text-xs tracking-wide text-ink/65 transition-colors hover:bg-cream/80"
                style={{ fontSize: '11px', letterSpacing: '0.07em' }}
              >
                Refresh
              </button>
            </div>

            {loading ? <WishSkeleton /> : showEmpty ? <EmptyLantern /> : (
              <LanternWall wishes={wishes} onOpen={setOpenWish} />
            )}
          </div>
        </div>
      </div>

      {/* ── Open wish modal ── */}
      <AnimatePresence>
        {openWish && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(26,20,34,0.45)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenWish(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative overflow-hidden rounded-[26px] p-6 sm:p-8"
                style={{
                  background: 'linear-gradient(160deg, rgba(255,254,250,0.97), rgba(255,248,238,0.97))',
                  border: '1.5px solid rgba(214,178,166,0.45)',
                  boxShadow: '0 24px 80px rgba(26,20,34,0.28)',
                }}
              >
                {/* Top bar */}
                <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(214,178,166,0.9), rgba(236,232,251,0.8), transparent)' }} />

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-cinzel text-xs font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, rgba(214,178,166,0.45), rgba(236,232,251,0.45))',
                        border: '1.5px solid rgba(214,178,166,0.5)',
                        color: 'rgba(26,20,34,0.7)',
                      }}
                    >
                      {openWish.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-cinzel text-base font-semibold tracking-wide text-ink/90">
                        {openWish.name}
                      </p>
                      <p className="mt-0.5 font-crimson text-xs text-ink/45">
                        {new Date(openWish.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenWish(null)}
                    className="rounded-full font-cinzel text-xs tracking-wide text-ink/55 transition-colors hover:text-ink/80"
                    style={{
                      padding: '6px 14px',
                      background: 'rgba(26,20,34,0.06)',
                      border: '1px solid rgba(26,20,34,0.12)',
                      fontSize: '11px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Close
                  </button>
                </div>

                {/* Divider */}
                <div className="my-5 h-px" style={{ background: 'linear-gradient(90deg, rgba(214,178,166,0.4), rgba(214,178,166,0.1) 60%, transparent)' }} />

                {/* Message */}
                <div
                  className="relative"
                  dir={openWish.language === 'Urdu' || openWish.language === 'Arabic' ? 'rtl' : 'ltr'}
                >
                  <span
                    className="pointer-events-none absolute -left-1 -top-3 font-serif text-5xl leading-none select-none"
                    style={{ color: 'rgba(214,178,166,0.25)' }}
                    aria-hidden
                  >
                    "
                  </span>
                  <p
                    className="pl-3 font-crimson leading-relaxed text-ink/80"
                    style={{ fontSize: 16, lineHeight: 1.75 }}
                  >
                    {openWish.message}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-crimson text-sm"
                    style={{
                      background: 'rgba(214,178,166,0.15)',
                      border: '1px solid rgba(214,178,166,0.4)',
                      color: 'rgba(26,20,34,0.6)',
                    }}
                  >
                    <span style={{ color: '#d6b2a6' }}>♥</span> {openWish.hearts}
                  </span>
                  <button
                    type="button"
                    disabled={reacting || openWish.id.startsWith('optimistic-')}
                    onClick={() => void reactToWish(openWish.id)}
                    className="inline-flex items-center gap-2 font-cinzel text-xs font-semibold tracking-wide text-ink/80 transition-all hover:scale-[1.03] disabled:opacity-50"
                    style={{
                      padding: '10px 20px',
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, rgba(214,178,166,0.28), rgba(236,232,251,0.22))',
                      border: '1.5px solid rgba(214,178,166,0.55)',
                      fontSize: '12px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span style={{ color: '#c4927e', fontSize: 15 }}>♥</span>
                    Send Heart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}