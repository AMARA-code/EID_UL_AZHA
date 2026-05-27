import type { CardConfig } from '@/types'
import type { PaletteColors } from '@/lib/card-theme'

export default function TemplateArtwork({
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
          style={{ borderColor: palette.accent }}
        />
      </div>
    )
  }

  if (template === 'crescent') {
    return (
      <div
        className="absolute inset-0 overflow-hidden rounded-[24px]"
        style={{ background: palette.bg }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 560"
          xmlns="http://www.w3.org/2000/svg"
        >
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
      <div
        className="absolute inset-0 overflow-hidden rounded-[24px]"
        style={{ background: palette.bg }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 560"
          xmlns="http://www.w3.org/2000/svg"
        >
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
          <rect
            x="130"
            y="290"
            width="140"
            height="140"
            rx="6"
            fill={palette.fg}
            fillOpacity="0.78"
          />
          <rect
            x="130"
            y="320"
            width="140"
            height="12"
            fill={palette.accent}
            fillOpacity="0.95"
          />
          <rect
            x="236"
            y="342"
            width="20"
            height="40"
            fill={palette.accent}
            fillOpacity="0.85"
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[24px]"
      style={{ background: palette.bg }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 560"
        xmlns="http://www.w3.org/2000/svg"
      >
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
