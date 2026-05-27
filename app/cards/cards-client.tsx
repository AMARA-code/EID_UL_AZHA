'use client'

import { useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { motion, AnimatePresence } from 'framer-motion'
import type { CardConfig } from '@/types'
import GeometricBorder from '@/components/ui/GeometricBorder'

type PaletteColors = {
  bg: string
  fg: string
  accent: string
  soft: string
}

const PALETTES: Record<CardConfig['palette'], PaletteColors> = {
  forest: { bg: '#f7f1f6', fg: '#1a1422', accent: '#d6b2a6', soft: '#ece8fb' },
  night: { bg: '#1f2338', fg: '#f6f1fb', accent: '#b9c2de', soft: '#343b5f' },
  dawn: { bg: '#fff7ef', fg: '#5a4740', accent: '#dbaea2', soft: '#fbe7dc' },
  desert: { bg: '#f6ead8', fg: '#5b4538', accent: '#cf8d67', soft: '#efd9bc' },
}

const TEMPLATE_ITEMS: { key: CardConfig['template']; label: string }[] = [
  { key: 'geometric', label: 'Geometric' },
  { key: 'crescent', label: 'Crescent' },
  { key: 'kabah', label: "Ka'bah" },
  { key: 'minimal', label: 'Minimal' },
]

const PALETTE_ITEMS: { key: CardConfig['palette']; label: string }[] = [
  { key: 'forest', label: 'Forest' },
  { key: 'night', label: 'Night' },
  { key: 'dawn', label: 'Dawn' },
  { key: 'desert', label: 'Desert' },
]

const DEFAULT_CONFIG: CardConfig = {
  template: 'geometric',
  palette: 'forest',
  to: '',
  message: '',
  from: '',
}

function TemplateArtwork({
  template,
  palette,
}: {
  template: CardConfig['template']
  palette: PaletteColors
}) {
  if (template === 'minimal') {
    return (
      <div className="absolute inset-0 rounded-[24px]" style={{ background: palette.bg }}>
        <div
          className="absolute inset-3 rounded-[18px] border"
          style={{ borderColor: `${palette.accent}` }}
        />
      </div>
    )
  }

  if (template === 'crescent') {
    return (
      <div className="absolute inset-0 rounded-[24px] overflow-hidden" style={{ background: palette.bg }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cresGlow" cx="75%" cy="18%" r="40%">
              <stop offset="0%" stopColor={palette.accent} stopOpacity="0.55" />
              <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="560" fill={palette.bg} />
          <circle cx="310" cy="95" r="95" fill="url(#cresGlow)" />
          <path
            d="M278 32c-34 14-58 48-58 88 0 53 43 96 96 96 22 0 43-8 59-20-17 32-50 54-88 54-56 0-102-46-102-102 0-57 46-102 102-102 1 0 2 0 3 0-4-5-8-10-12-14z"
            fill={palette.accent}
            fillOpacity="0.85"
          />
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`s-${i}`}
              d={`M${40 + ((i * 21) % 320)} ${50 + ((i * 33) % 180)} l4 9 9 4-9 4-4 9-4-9-9-4 9-4z`}
              fill={palette.soft}
              opacity="0.75"
            />
          ))}
        </svg>
      </div>
    )
  }

  if (template === 'kabah') {
    return (
      <div className="absolute inset-0 rounded-[24px] overflow-hidden" style={{ background: palette.bg }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="560" fill={palette.bg} />
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`r-${i}`}
              x1="200"
              y1="370"
              x2={i * 20}
              y2="0"
              stroke={palette.soft}
              strokeOpacity="0.5"
            />
          ))}
          <rect x="130" y="290" width="140" height="140" rx="6" fill={palette.fg} fillOpacity="0.78" />
          <rect x="130" y="320" width="140" height="12" fill={palette.accent} fillOpacity="0.95" />
          <rect x="236" y="342" width="20" height="40" fill={palette.accent} fillOpacity="0.85" />
        </svg>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 rounded-[24px] overflow-hidden" style={{ background: palette.bg }}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="eightStar" width="52" height="52" patternUnits="userSpaceOnUse">
            <path
              d="M26 6 L31 20 L46 26 L31 32 L26 46 L21 32 L6 26 L21 20 Z"
              fill="none"
              stroke={palette.accent}
              strokeOpacity="0.55"
              strokeWidth="1.2"
            />
          </pattern>
        </defs>
        <rect width="400" height="560" fill="url(#eightStar)" />
      </svg>
    </div>
  )
}

function TemplateThumb({
  template,
  active,
  onClick,
}: {
  template: CardConfig['template']
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'overflow-hidden rounded-xl border p-1 transition-colors',
        active ? 'border-rosegold/70 bg-rosegold/10' : 'border-gold/20 bg-cream/50',
      ].join(' ')}
    >
      <div className="relative h-16 w-12 rounded-lg bg-cream/80">
        <div className="absolute inset-1 rounded-md border border-rosegold/35" />
        {template === 'crescent' ? <div className="absolute right-2 top-2 text-[10px]">☪</div> : null}
        {template === 'geometric' ? <div className="absolute inset-2 border border-dashed border-rosegold/35" /> : null}
        {template === 'kabah' ? <div className="absolute bottom-2 left-1/2 h-4 w-5 -translate-x-1/2 bg-ink/65" /> : null}
      </div>
    </button>
  )
}

export default function CardsClient() {
  const [config, setConfig] = useState<CardConfig>(DEFAULT_CONFIG)
  const [downloading, setDownloading] = useState(false)
  const [shareMsg, setShareMsg] = useState<string | null>(null)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const palette = PALETTES[config.palette]

  function getShareUrl() {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
    if (envUrl) return envUrl
    return window.location.href
  }

  async function onDownload() {
    const node = previewRef.current
    if (!node) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(node, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      })
      const link = document.createElement('a')
      link.download = 'eid-card.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  async function copyShareText() {
    const text = `${previewContent.message} — ${previewContent.from}\n${getShareUrl()}`
    try {
      await navigator.clipboard.writeText(text)
      setShareMsg('Caption + link copied. Paste it into the app.')
    } catch {
      setShareMsg('Could not copy caption automatically.')
    }
  }

  function openShareWindow(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  function shareToWhatsApp() {
    const text = encodeURIComponent(
      `${previewContent.message}\nEid Mubarak from ${previewContent.from}\n${getShareUrl()}`,
    )
    openShareWindow(`https://wa.me/?text=${text}`)
  }

  function shareToFacebook() {
    const url = encodeURIComponent(getShareUrl())
    const quote = encodeURIComponent(
      `${previewContent.message} — ${previewContent.from}`,
    )
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`)
  }

  async function shareToInstagram() {
    await copyShareText()
    openShareWindow('https://www.instagram.com/')
  }

  async function shareToTikTok() {
    await copyShareText()
    openShareWindow('https://www.tiktok.com/upload')
  }

  const previewContent = useMemo(
    () => ({
      to: config.to || 'Beloved Family',
      message:
        config.message || 'May your home be filled with mercy, peace, and joy this Eid.',
      from: config.from || 'Qurbani Mubarak',
    }),
    [config],
  )

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-cinzel text-4xl tracking-wide text-ink sm:text-5xl">
          Create Your Eid Card
        </h1>
        <p className="mt-3 font-crimson text-base text-ink/60">
          Design a beautiful card to share with loved ones.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_440px]">
        <GeometricBorder>
          <div className="grid gap-6">
            <section>
              <p className="font-cinzel text-lg text-ink">Templates</p>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {TEMPLATE_ITEMS.map((t) => (
                  <div key={t.key} className="text-center">
                    <TemplateThumb
                      template={t.key}
                      active={config.template === t.key}
                      onClick={() => setConfig((p) => ({ ...p, template: t.key }))}
                    />
                    <p className="mt-1 font-crimson text-xs text-ink/65">{t.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="font-cinzel text-lg text-ink">Color Palette</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PALETTE_ITEMS.map((p) => {
                  const c = PALETTES[p.key]
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setConfig((old) => ({ ...old, palette: p.key }))}
                      className={[
                        'rounded-xl border p-2 text-left transition-colors',
                        config.palette === p.key
                          ? 'border-rosegold/70 bg-rosegold/10'
                          : 'border-gold/20 bg-cream/50',
                      ].join(' ')}
                    >
                      <div className="flex gap-1">
                        <span className="h-5 w-5 rounded-full border" style={{ background: c.bg }} />
                        <span className="h-5 w-5 rounded-full border" style={{ background: c.accent }} />
                        <span className="h-5 w-5 rounded-full border" style={{ background: c.soft }} />
                      </div>
                      <p className="mt-1 font-crimson text-xs text-ink/65">{p.label}</p>
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="grid gap-3">
              <label className="grid gap-1">
                <span className="font-crimson text-sm font-semibold text-ink/75">To:</span>
                <input
                  value={config.to}
                  onChange={(e) => setConfig((p) => ({ ...p, to: e.target.value.slice(0, 40) }))}
                  className="h-11 rounded-xl border border-gold/25 bg-cream/60 px-3 font-crimson text-sm outline-none focus:ring-2 focus:ring-rosegold/55"
                />
              </label>
              <label className="grid gap-1">
                <span className="font-crimson text-sm font-semibold text-ink/75">Message:</span>
                <textarea
                  value={config.message}
                  onChange={(e) =>
                    setConfig((p) => ({ ...p, message: e.target.value.slice(0, 100) }))
                  }
                  maxLength={100}
                  rows={4}
                  className="resize-none rounded-xl border border-gold/25 bg-cream/60 px-3 py-2 font-crimson text-sm outline-none focus:ring-2 focus:ring-rosegold/55"
                />
                <span className="font-crimson text-xs text-ink/55">{config.message.length}/100</span>
              </label>
              <label className="grid gap-1">
                <span className="font-crimson text-sm font-semibold text-ink/75">From:</span>
                <input
                  value={config.from}
                  onChange={(e) => setConfig((p) => ({ ...p, from: e.target.value.slice(0, 40) }))}
                  className="h-11 rounded-xl border border-gold/25 bg-cream/60 px-3 font-crimson text-sm outline-none focus:ring-2 focus:ring-rosegold/55"
                />
              </label>
            </section>
          </div>
        </GeometricBorder>

        <div className="grid gap-4">
          <GeometricBorder>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${config.template}-${config.palette}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mx-auto"
              >
                <div
                  ref={previewRef}
                  className="relative overflow-hidden rounded-[24px] border shadow-[0_28px_80px_rgba(26,20,34,0.18)]"
                  style={{
                    width: 400,
                    height: 560,
                    borderColor: `${palette.accent}`,
                    color: palette.fg,
                  }}
                >
                  <TemplateArtwork template={config.template} palette={palette} />
                  <div className="absolute inset-0 p-8">
                    <div
                      className="absolute inset-3 rounded-[20px] border"
                      style={{ borderColor: `${palette.accent}` }}
                    />
                    <div className="relative flex h-full flex-col justify-between text-center">
                      <div>
                        <p className="font-arabic text-[30px]" style={{ color: palette.accent }}>
                          عيد الأضحى مبارك
                        </p>
                        <p className="mt-3 font-cinzel text-lg tracking-wide">To: {previewContent.to}</p>
                      </div>
                      <p className="mx-auto max-w-[290px] font-crimson text-[18px] leading-relaxed">
                        {previewContent.message}
                      </p>
                      <p className="font-cinzel text-lg">From: {previewContent.from}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </GeometricBorder>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void onDownload()}
              disabled={downloading}
              className="inline-flex items-center rounded-full border border-rosegold/60 bg-rosegold/15 px-5 py-2.5 font-crimson text-sm font-semibold text-ink/80 hover:bg-rosegold/20 disabled:opacity-60"
            >
              {downloading ? 'Rendering…' : 'Download Card 💾'}
            </button>
            <button
              type="button"
              onClick={() => setShowShareOptions((v) => !v)}
              className="inline-flex items-center rounded-full border border-gold/30 bg-cream/70 px-5 py-2.5 font-crimson text-sm font-semibold text-ink/80 hover:bg-cream/85"
            >
              Share Card 📤
            </button>
          </div>
          <AnimatePresence>
            {showShareOptions ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="grid grid-cols-2 gap-2 rounded-2xl border border-gold/25 bg-cream/70 p-3 sm:grid-cols-4"
              >
                <button
                  type="button"
                  onClick={shareToWhatsApp}
                  className="rounded-xl border border-gold/20 bg-white/40 px-3 py-2 font-crimson text-xs font-semibold text-ink/75 hover:bg-white/60"
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={shareToInstagram}
                  className="rounded-xl border border-gold/20 bg-white/40 px-3 py-2 font-crimson text-xs font-semibold text-ink/75 hover:bg-white/60"
                >
                  Instagram
                </button>
                <button
                  type="button"
                  onClick={shareToFacebook}
                  className="rounded-xl border border-gold/20 bg-white/40 px-3 py-2 font-crimson text-xs font-semibold text-ink/75 hover:bg-white/60"
                >
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={shareToTikTok}
                  className="rounded-xl border border-gold/20 bg-white/40 px-3 py-2 font-crimson text-xs font-semibold text-ink/75 hover:bg-white/60"
                >
                  TikTok
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
          {shareMsg ? <p className="font-crimson text-xs text-ink/60">{shareMsg}</p> : null}
        </div>
      </div>
    </div>
  )
}

