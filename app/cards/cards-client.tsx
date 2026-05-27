'use client'

import { useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { motion, AnimatePresence } from 'framer-motion'
import type { CardConfig } from '@/types'
import GeometricBorder from '@/components/ui/GeometricBorder'
import EidCardPreview from '@/components/cards/EidCardPreview'
import { PALETTES, buildCardShareUrl, resolvePreviewContent } from '@/lib/card-theme'

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
        {template === 'geometric' ? (
          <div className="absolute inset-2 border border-dashed border-rosegold/35" />
        ) : null}
        {template === 'kabah' ? (
          <div className="absolute bottom-2 left-1/2 h-4 w-5 -translate-x-1/2 bg-ink/65" />
        ) : null}
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

  const previewContent = useMemo(() => resolvePreviewContent(config), [config])

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
    const text = encodeURIComponent(
      `${previewContent.message}\nEid Mubarak from ${previewContent.from}\n${cardShareUrl()}`,
    )
    openShareWindow(`https://wa.me/?text=${text}`)
  }

  function shareToFacebook() {
    const url = encodeURIComponent(cardShareUrl())
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
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
                <div ref={previewRef}>
                  <EidCardPreview config={config} />
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
