'use client'

import { useMemo } from 'react'

type Star = {
  top: string
  left: string
  size: number
  duration: number
  delay: number
  color: string
  opacity: number
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

export default function StarField({
  count = 90,
  seed = 42,
  className = '',
}: {
  count?: number
  seed?: number
  className?: string
}) {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(seed)
    const colors = [
      'rgba(255,255,255,0.9)',
      'rgba(214,178,166,0.95)',
      'rgba(236,232,251,0.95)',
    ]
    return Array.from({ length: count }).map(() => {
      const size = 1 + rand() * 2.2
      const duration = 2.4 + rand() * 2.8
      const delay = rand() * 2.5
      const opacity = 0.25 + rand() * 0.6
      const color = colors[Math.floor(rand() * colors.length)] ?? colors[0]
      return {
        top: `${rand() * 100}%`,
        left: `${rand() * 100}%`,
        size,
        duration,
        delay,
        color,
        opacity,
      }
    })
  }, [count, seed])

  return (
    <div
      className={[
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      ].join(' ')}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            filter: 'blur(0.2px)',
          }}
        />
      ))}
    </div>
  )
}

