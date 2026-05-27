'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type Particle = {
  id: string
  x: number
  y: number
  rotate: number
  delay: number
  duration: number
  char: string
  size: number
  opacity: number
  color: string
}

function mulberry32(seed: number) {
  return function () {
    // eslint-disable-next-line no-bitwise
    let t = (seed += 0x6d2b79f5)
    // eslint-disable-next-line no-bitwise
    t = Math.imul(t ^ (t >>> 15), t | 1)
    // eslint-disable-next-line no-bitwise
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    // eslint-disable-next-line no-bitwise
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function ConfettiBurst({
  count = 30,
  seed = 7,
  delayMs = 1000,
}: {
  count?: number
  seed?: number
  delayMs?: number
}) {
  const [go, setGo] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setGo(true), delayMs)
    return () => window.clearTimeout(t)
  }, [delayMs])

  const particles = useMemo<Particle[]>(() => {
    const rand = mulberry32(seed)
    const chars = ['☪', '✦', '✧', '✺']
    const colors = [
      'rgba(214,178,166,0.95)',
      'rgba(236,232,251,0.95)',
      'rgba(215,154,168,0.9)',
    ]
    return Array.from({ length: count }).map((_, i) => {
      const x = (rand() - 0.5) * 360
      const y = -220 - rand() * 120
      const rotate = (rand() - 0.5) * 220
      const delay = rand() * 0.2
      const duration = 1.8 + rand() * 0.6
      const size = 14 + rand() * 12
      const opacity = 0.65 + rand() * 0.35
      const char = chars[Math.floor(rand() * chars.length)] ?? '✦'
      const color = colors[Math.floor(rand() * colors.length)] ?? colors[0]
      return {
        id: `${i}-${Math.floor(rand() * 1e9)}`,
        x,
        y,
        rotate,
        delay,
        duration,
        char,
        size,
        opacity,
        color,
      }
    })
  }, [count, seed])

  if (!go) return null

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center">
      <div className="relative h-[1px] w-[1px]">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 40, opacity: 0, rotate: 0 }}
            animate={{
              x: p.x,
              y: [40, p.y, 120 + Math.abs(p.x) * 0.15],
              opacity: [0, p.opacity, 0],
              rotate: [0, p.rotate, p.rotate * 1.6],
            }}
            transition={{
              delay: p.delay,
              duration: p.duration,
              ease: 'easeOut',
              times: [0, 0.55, 1],
            }}
            className="absolute left-0 top-0 select-none"
            style={{
              fontSize: p.size,
              color: p.color,
              filter: 'drop-shadow(0 10px 24px rgba(214,178,166,0.25))',
            }}
          >
            {p.char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

