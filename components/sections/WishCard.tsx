'use client'

import type { Wish } from '@/types'
import { motion } from 'framer-motion'

const FLAG: Record<Wish['language'], string> = {
  English: '🇬🇧',
  Urdu: '🇵🇰',
  Arabic: '🇸🇦',
}

const WISH_CARD_STYLES = `
@keyframes wishFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-7px) rotate(0.4deg); }
  66%       { transform: translateY(-4px) rotate(-0.3deg); }
}
@keyframes lanternGlow {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50%       { opacity: 0.85; transform: scale(1.08); }
}
@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  25%       { transform: scale(1.25); }
  50%       { transform: scale(1); }
  75%       { transform: scale(1.15); }
}
`

export default function WishCard({
  wish,
  onOpen,
}: {
  wish: Wish
  onOpen: (wish: Wish) => void
}) {
  const seed = Number.parseInt(wish.id.replace(/\D/g, '').slice(0, 4) || '1234', 10)
  const floatDuration = 3.8 + (seed % 24) / 10        // 3.8 – 6.2 s
  const floatDelay   = (seed % 18) / 10               // 0 – 1.8 s

  const isRtl = wish.language === 'Urdu' || wish.language === 'Arabic'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: WISH_CARD_STYLES }} />

      <motion.button
        type="button"
        onClick={() => onOpen(wish)}
        className="group relative w-full overflow-hidden rounded-[22px] border text-left focus:outline-none focus:ring-2 focus:ring-rosegold/55"
        style={{
          background: 'linear-gradient(145deg, rgba(255,252,245,0.88) 0%, rgba(255,248,238,0.82) 100%)',
          borderColor: 'rgba(214,178,166,0.38)',
          boxShadow: '0 4px 24px rgba(26,20,34,0.08), 0 1px 3px rgba(26,20,34,0.06)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: `wishFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
        }}
        whileHover={{
          y: -6,
          boxShadow: '0 16px 48px rgba(214,178,166,0.35), 0 4px 12px rgba(26,20,34,0.10)',
          borderColor: 'rgba(214,178,166,0.72)',
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        }}
        whileTap={{ scale: 0.98 }}
        initial={false}
      >
        {/* Warm glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(214,178,166,0.22) 0%, transparent 70%)',
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(214,178,166,0.85), transparent)',
          }}
        />

        <div className="relative p-4 sm:p-5">
          {/* ── Header row ── */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* Name with initials avatar */}
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-cinzel text-[10px] font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, rgba(214,178,166,0.55), rgba(236,232,251,0.55))',
                    border: '1px solid rgba(214,178,166,0.5)',
                    color: 'rgba(26,20,34,0.75)',
                  }}
                >
                  {wish.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-cinzel text-sm font-semibold tracking-wide text-ink/90">
                    {wish.name}
                  </p>
                  <p className="font-crimson text-[11px] text-ink/45">
                    {new Date(wish.created_at).toLocaleDateString(undefined, {
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Right badges */}
            <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
              <span className="text-base leading-none">{FLAG[wish.language]}</span>
              {wish.hearts > 0 && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-crimson text-[11px] font-semibold"
                  style={{
                    background: 'rgba(214,178,166,0.22)',
                    border: '1px solid rgba(214,178,166,0.45)',
                    color: 'rgba(26,20,34,0.65)',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      animation: wish.hearts > 0 ? `heartBeat 2.4s ease-in-out infinite` : 'none',
                      color: '#d6b2a6',
                    }}
                  >
                    ♥
                  </span>
                  {wish.hearts}
                </span>
              )}
            </div>
          </div>

          {/* ── Message ── */}
          <div
            className="relative mt-3.5"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Subtle quote mark */}
            <span
              className="pointer-events-none absolute -left-0.5 -top-2 font-serif text-3xl leading-none select-none"
              style={{ color: 'rgba(214,178,166,0.3)' }}
              aria-hidden
            >
              "
            </span>
            <p
              className="line-clamp-3 pl-3 font-crimson leading-relaxed text-ink/80"
              style={{
                fontSize: isRtl ? '15px' : '14px',
                letterSpacing: isRtl ? '0' : '0.01em',
              }}
            >
              {wish.message}
            </p>
          </div>

          {/* ── Footer ── */}
          <div className="mt-4 flex items-center justify-between border-t pt-3" style={{ borderColor: 'rgba(214,178,166,0.25)' }}>
            <span
              className="font-crimson text-[11px] tracking-widest uppercase"
              style={{ color: 'rgba(26,20,34,0.38)' }}
            >
              Tap to open
            </span>
            {/* Animated lantern icon */}
            <span
              className="text-lg leading-none"
              style={{
                display: 'inline-block',
                animation: `lanternGlow ${floatDuration * 0.8}s ease-in-out ${floatDelay}s infinite`,
              }}
            >
              🏮
            </span>
          </div>
        </div>
      </motion.button>
    </>
  )
}