'use client'

import { useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { motion, AnimatePresence } from 'framer-motion'
import type { CardConfig } from '@/types'
import GeometricBorder from '@/components/ui/GeometricBorder'
import EidCardPreview from '@/components/cards/EidCardPreview'
import { PALETTES, buildCardShareUrl, resolvePreviewContent } from '@/lib/card-theme'
import type { PaletteColors } from '@/lib/card-theme'

const TEMPLATE_ITEMS: { key: CardConfig['template']; label: string; icon: string }[] = [
  { key: 'geometric', label: 'Geometric', icon: '✦' },
  { key: 'crescent',  label: 'Crescent',  icon: '☽' },
  { key: 'kabah',     label: "Ka'bah",    icon: '🕋' },
  { key: 'minimal',   label: 'Minimal',   icon: '◇' },
]

const PALETTE_ITEMS: { key: CardConfig['palette']; label: string }[] = [
  { key: 'forest',  label: 'Forest'  },
  { key: 'night',   label: 'Night'   },
  { key: 'dawn',    label: 'Dawn'    },
  { key: 'desert',  label: 'Desert'  },
]

const DEFAULT_CONFIG: CardConfig = {
  template: 'geometric',
  palette: 'forest',
  to: '',
  message: '',
  from: '',
}

/* ── Premium template thumbnail ── */
function TemplateThumb({
  item,
  active,
  palette,
  onClick,
}: {
  item: (typeof TEMPLATE_ITEMS)[number]
  active: boolean
  palette: PaletteColors
  onClick: () => void
}) {
  const pal = palette
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-1.5 focus:outline-none"
    >
      <div
        className="relative overflow-hidden transition-all duration-300"
        style={{
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: 14,
          border: active
            ? `2px solid ${pal.accent}`
            : `1.5px solid ${pal.accent}44`,
          background: pal.bg,
          boxShadow: active
            ? `0 0 0 3px ${pal.accent}22, 0 8px 24px ${pal.accent}28`
            : '0 2px 8px rgba(0,0,0,0.08)',
          transform: active ? 'scale(1.04)' : 'scale(1)',
        }}
      >
        {/* Tiny SVG preview per template */}
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full">
          <rect width="60" height="80" fill={pal.bg} />

          {item.key === 'geometric' && (
            <>
              <pattern id={`tpat-${item.key}`} width="12" height="12" patternUnits="userSpaceOnUse">
                <polygon points="6,1 8,5 12,6 8,7 6,11 4,7 0,6 4,5" fill="none" stroke={pal.accent} strokeOpacity="0.45" strokeWidth="0.5" />
              </pattern>
              <rect width="60" height="80" fill={`url(#tpat-${item.key})`} />
              <path d="M30 22 L33 31 L42 31 L35 37 L38 46 L30 41 L22 46 L25 37 L18 31 L27 31 Z" fill={pal.accent} fillOpacity="0.7" />
            </>
          )}

          {item.key === 'crescent' && (
            <>
              <defs>
                <radialGradient id="tglow-c" cx="70%" cy="25%" r="40%">
                  <stop offset="0%" stopColor={pal.accent} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={pal.accent} stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="60" height="80" fill="url(#tglow-c)" />
              <circle cx="42" cy="18" r="13" fill={pal.accent} fillOpacity="0.15" />
              <path d="M36 8c-6 3-10 9-10 16 0 9 7 16 16 16 3 0 6-1 9-3-3 5-8 9-14 9-9 0-16-7-16-16 0-9 7-16 16-16z" fill={pal.accent} fillOpacity="0.9" />
              {[1,2,3,4,5].map(i => (
                <circle key={i} cx={8 + i * 10} cy={50 + (i%2) * 6} r="1.2" fill={pal.soft} fillOpacity="0.7" />
              ))}
            </>
          )}

          {item.key === 'kabah' && (
            <>
              {Array.from({length:8}).map((_,i) => (
                <line key={i} x1="30" y1="52" x2={i*8} y2="0" stroke={pal.soft} strokeOpacity="0.25" strokeWidth="0.4" />
              ))}
              <rect x="18" y="38" width="24" height="26" rx="1" fill={pal.fg} fillOpacity="0.8" />
              <path d="M18 38 L22 32 L38 32 L42 38 Z" fill={pal.fg} fillOpacity="0.6" />
              <rect x="18" y="44" width="24" height="3" fill={pal.accent} fillOpacity="0.9" />
              <rect x="28" y="52" width="6" height="9" rx="1" fill={pal.accent} fillOpacity="0.85" />
            </>
          )}

          {item.key === 'minimal' && (
            <>
              {[8,12,16].map((r,i) => (
                <circle key={i} cx="30" cy="32" r={r} fill="none" stroke={pal.accent} strokeOpacity={0.5 - i*0.12} strokeWidth="0.6" strokeDasharray={i % 2 === 0 ? '3 4' : 'none'} />
              ))}
              <path d="M30 20 L32 26 L38 26 L33 30 L35 36 L30 33 L25 36 L27 30 L22 26 L28 26 Z" fill={pal.accent} fillOpacity="0.65" />
            </>
          )}

          {/* Outer frame */}
          <rect x="2" y="2" width="56" height="76" rx="5" fill="none" stroke={pal.accent} strokeOpacity="0.5" strokeWidth="0.8" />
        </svg>

        {/* Active glow overlay */}
        {active && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: 12,
              background: `radial-gradient(ellipse at 50% 0%, ${pal.accent}18, transparent 70%)`,
            }}
          />
        )}
      </div>

      <p
        className="font-crimson text-[11px] sm:text-xs transition-colors duration-200"
        style={{ color: active ? pal.accent : 'inherit', opacity: active ? 1 : 0.6 }}
      >
        {item.icon} {item.label}
      </p>
    </button>
  )
}

export default function CardsClient() {
  const [config, setConfig] = useState<CardConfig>(DEFAULT_CONFIG)
  const [downloading, setDownloading] = useState(false)
  const [shareMsg, setShareMsg] = useState<string | null>(null)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const previewContent = useMemo(() => resolvePreviewContent(config), [config])
  const currentPalette = PALETTES[config.palette]

  function cardShareUrl() {
    return buildCardShareUrl(config, window.location.origin)
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
    const url = cardShareUrl()
    const text = `${previewContent.message}\nEid Mubarak from ${previewContent.from}\n${url}`
    try {
      await navigator.clipboard.writeText(text)
      setShareMsg('Card link copied. Paste it into the app.')
    } catch {
      setShareMsg('Could not copy link automatically.')
    }
  }

  function openShareWindow(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  function shareToWhatsApp() {
    const text = encodeURIComponent(`${previewContent.message}\nEid Mubarak from ${previewContent.from}\n${cardShareUrl()}`)
    openShareWindow(`https://wa.me/?text=${text}`)
  }
  function shareToFacebook() {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardShareUrl())}`)
  }
  async function shareToInstagram() {
    await copyShareText()
    openShareWindow('https://www.instagram.com/')
  }
  async function shareToTikTok() {
    await copyShareText()
    openShareWindow('https://www.tiktok.com/upload')
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12 sm:px-6">
      {/* ── Page header ── */}
      <div className="text-center">
        <h1 className="font-cinzel text-3xl tracking-wide text-ink sm:text-4xl lg:text-5xl">
          Create Your Eid Card
        </h1>
        <p className="mt-2 font-crimson text-sm text-ink/60 sm:text-base">
          Design a beautiful card to share with loved ones.
        </p>
      </div>

      {/*
        Layout:
        Mobile  : single column, preview stacks below controls
        lg+     : two columns — controls left, preview right (sticky)
      */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-8">

        {/* ── Left panel: controls ── */}
        <GeometricBorder>
          <div className="grid gap-6 sm:gap-8">

            {/* Templates */}
            <section>
              <p className="font-cinzel text-base text-ink sm:text-lg">Templates</p>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                {TEMPLATE_ITEMS.map((t) => (
                  <TemplateThumb
                    key={t.key}
                    item={t}
                    active={config.template === t.key}
                    palette={currentPalette}
                    onClick={() => setConfig((p) => ({ ...p, template: t.key }))}
                  />
                ))}
              </div>
            </section>

            {/* Palettes */}
            <section>
              <p className="font-cinzel text-base text-ink sm:text-lg">Color Palette</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {PALETTE_ITEMS.map((p) => {
                  const c = PALETTES[p.key]
                  const isActive = config.palette === p.key
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setConfig((old) => ({ ...old, palette: p.key }))}
                      className="rounded-xl p-2 text-left transition-all duration-200"
                      style={{
                        border: isActive ? `2px solid ${c.accent}` : `1.5px solid ${c.accent}33`,
                        background: isActive ? `${c.accent}12` : `${c.bg}88`,
                        boxShadow: isActive ? `0 0 0 3px ${c.accent}18` : 'none',
                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                      }}
                    >
                      <div className="flex gap-1">
                        <span className="h-4 w-4 rounded-full border border-black/10 sm:h-5 sm:w-5" style={{ background: c.bg }} />
                        <span className="h-4 w-4 rounded-full border border-black/10 sm:h-5 sm:w-5" style={{ background: c.accent }} />
                        <span className="h-4 w-4 rounded-full border border-black/10 sm:h-5 sm:w-5" style={{ background: c.soft }} />
                      </div>
                      <p className="mt-1 font-crimson text-[11px] text-ink/65 sm:text-xs">{p.label}</p>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Text fields */}
            <section className="grid gap-3">
              <label className="grid gap-1">
                <span className="font-crimson text-xs font-semibold text-ink/75 sm:text-sm">To:</span>
                <input
                  value={config.to}
                  onChange={(e) => setConfig((p) => ({ ...p, to: e.target.value.slice(0, 40) }))}
                  placeholder="Recipient's name"
                  className="h-10 rounded-xl border border-gold/25 bg-cream/60 px-3 font-crimson text-sm outline-none transition-shadow focus:ring-2 focus:ring-rosegold/55 sm:h-11"
                />
              </label>
              <label className="grid gap-1">
                <span className="font-crimson text-xs font-semibold text-ink/75 sm:text-sm">Message:</span>
                <textarea
                  value={config.message}
                  onChange={(e) => setConfig((p) => ({ ...p, message: e.target.value.slice(0, 100) }))}
                  maxLength={100}
                  rows={3}
                  placeholder="Your heartfelt message…"
                  className="resize-none rounded-xl border border-gold/25 bg-cream/60 px-3 py-2 font-crimson text-sm outline-none transition-shadow focus:ring-2 focus:ring-rosegold/55"
                />
                <span className="font-crimson text-xs text-ink/45">{config.message.length}/100</span>
              </label>
              <label className="grid gap-1">
                <span className="font-crimson text-xs font-semibold text-ink/75 sm:text-sm">From:</span>
                <input
                  value={config.from}
                  onChange={(e) => setConfig((p) => ({ ...p, from: e.target.value.slice(0, 40) }))}
                  placeholder="Your name"
                  className="h-10 rounded-xl border border-gold/25 bg-cream/60 px-3 font-crimson text-sm outline-none transition-shadow focus:ring-2 focus:ring-rosegold/55 sm:h-11"
                />
              </label>
            </section>
          </div>
        </GeometricBorder>

        {/* ── Right panel: preview + actions ── */}
        <div className="grid gap-4 lg:sticky lg:top-6">
          <GeometricBorder>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${config.template}-${config.palette}`}
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Capture ref targets the inner responsive card */}
                <div ref={previewRef}>
                  <EidCardPreview config={config} />
                </div>
              </motion.div>
            </AnimatePresence>
          </GeometricBorder>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => void onDownload()}
              disabled={downloading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-rosegold/60 bg-rosegold/15 px-4 py-2.5 font-crimson text-xs font-semibold text-ink/80 transition-colors hover:bg-rosegold/25 disabled:opacity-50 sm:text-sm"
            >
              <span>{downloading ? '⏳' : '💾'}</span>
              {downloading ? 'Rendering…' : 'Download'}
            </button>
            <button
              type="button"
              onClick={() => setShowShareOptions((v) => !v)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-cream/70 px-4 py-2.5 font-crimson text-xs font-semibold text-ink/80 transition-colors hover:bg-cream/90 sm:text-sm"
            >
              <span>📤</span> Share
            </button>
          </div>

          {/* Share options panel */}
          <AnimatePresence>
            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="grid grid-cols-2 gap-2 rounded-2xl border border-gold/25 bg-cream/70 p-3 sm:grid-cols-4"
              >
                {[
                  { label: 'WhatsApp',  emoji: '💬', fn: shareToWhatsApp },
                  { label: 'Instagram', emoji: '📸', fn: shareToInstagram },
                  { label: 'Facebook',  emoji: '👥', fn: shareToFacebook },
                  { label: 'TikTok',    emoji: '🎵', fn: shareToTikTok },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => void s.fn()}
                    className="flex flex-col items-center gap-1 rounded-xl border border-gold/20 bg-white/40 px-2 py-2.5 font-crimson text-[11px] font-semibold text-ink/75 transition-colors hover:bg-white/70 sm:text-xs"
                  >
                    <span className="text-lg">{s.emoji}</span>
                    {s.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {shareMsg && (
            <p className="font-crimson text-xs text-ink/55">{shareMsg}</p>
          )}
        </div>
      </div>
    </div>
  )
}