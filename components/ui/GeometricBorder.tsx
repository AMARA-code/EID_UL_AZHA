import type { ReactNode } from 'react'

type Size = 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<Size, { pad: string; radius: string; stroke: number }> = {
  sm: { pad: 'p-4', radius: 'rounded-2xl', stroke: 1.2 },
  md: { pad: 'p-6', radius: 'rounded-[26px]', stroke: 1.4 },
  lg: { pad: 'p-8', radius: 'rounded-[30px]', stroke: 1.6 },
}

export default function GeometricBorder({
  children,
  color = 'rgba(214,178,166,0.85)',
  size = 'md',
  className = '',
}: {
  children: ReactNode
  color?: string
  size?: Size
  className?: string
}) {
  const cfg = SIZE_MAP[size]

  return (
    <div
      className={[
        'relative',
        cfg.radius,
        'border border-gold/20 bg-cream/70 shadow-[0_18px_60px_rgba(26,20,34,0.08)] backdrop-blur',
        cfg.pad,
        className,
      ].join(' ')}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(214,178,166,0.25)" />
            <stop offset="0.5" stopColor={color} />
            <stop offset="1" stopColor="rgba(236,232,251,0.25)" />
          </linearGradient>
        </defs>

        {/* Corner ornaments */}
        <g fill="none" stroke="url(#gb)" strokeWidth={cfg.stroke}>
          <path d="M6 18 L6 6 L18 6" />
          <path d="M82 6 L94 6 L94 18" />
          <path d="M94 82 L94 94 L82 94" />
          <path d="M18 94 L6 94 L6 82" />

          {/* 8-point star hints in corners */}
          <path d="M14 14 L18 10 L22 14 L18 18 Z" opacity="0.9" />
          <path d="M86 14 L82 10 L78 14 L82 18 Z" opacity="0.9" />
          <path d="M86 86 L82 90 L78 86 L82 82 Z" opacity="0.9" />
          <path d="M14 86 L18 90 L22 86 L18 82 Z" opacity="0.9" />
        </g>
      </svg>

      <div className="relative">{children}</div>
    </div>
  )
}

