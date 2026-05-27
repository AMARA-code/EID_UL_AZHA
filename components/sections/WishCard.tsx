'use client'

import type { Wish } from '@/types'
import { motion } from 'framer-motion'

const FLAG: Record<Wish['language'], string> = {
  English: '🇬🇧',
  Urdu: '🇵🇰',
  Arabic: '🇸🇦',
}

export default function WishCard({
  wish,
  onOpen,
}: {
  wish: Wish
  onOpen: (wish: Wish) => void
}) {
  const floatDuration = 3 + (Number.parseInt(wish.id.slice(0, 2), 16) % 3) // 3–5
  const floatDelay = (Number.parseInt(wish.id.slice(2, 4), 16) % 10) / 10

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(wish)}
      className="group relative w-full overflow-hidden rounded-[22px] border border-gold/25 bg-cream/70 p-4 text-left shadow-[0_20px_70px_rgba(26,20,34,0.10)] backdrop-blur transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-rosegold/55"
      initial={false}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: floatDuration,
        delay: floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute -inset-16 bg-[radial-gradient(circle,rgba(214,178,166,0.25),rgba(236,232,251,0)_62%)] blur-2xl" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-crimson text-sm font-semibold text-ink/85">
              {wish.name}
            </p>
            <p className="mt-0.5 font-crimson text-xs text-ink/55">
              {new Date(wish.created_at).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{FLAG[wish.language]}</span>
            <span className="rounded-full border border-rosegold/35 bg-lavender/40 px-2 py-0.5 font-crimson text-xs text-ink/70">
              ♥ {wish.hearts}
            </span>
          </div>
        </div>

        <p className="mt-3 line-clamp-4 font-crimson text-sm leading-relaxed text-ink/70">
          {wish.message}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-crimson text-xs text-ink/55">
            Tap to open
          </span>
          <span className="text-rosegold">🏮</span>
        </div>
      </div>
    </motion.button>
  )
}

