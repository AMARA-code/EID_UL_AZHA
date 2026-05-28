'use client'

import type { CardConfig } from '@/types'
import type { PaletteColors } from '@/lib/card-theme'

/* ─────────────────────────────────────────────
   All animations are pure CSS injected once.
   We use a style tag so html2canvas / download
   still captures the static SVG correctly.
───────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes twinkle {
  0%,100% { opacity: 0.15; transform: scale(0.7); }
  50%      { opacity: 1;    transform: scale(1.2); }
}
@keyframes moonGlow {
  0%,100% { filter: drop-shadow(0 0 6px currentColor); }
  50%      { filter: drop-shadow(0 0 22px currentColor); }
}
@keyframes lanternSway {
  0%,100% { transform: rotate(-8deg) translateY(0); }
  50%      { transform: rotate(8deg)  translateY(4px); }
}
@keyframes kaabaSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes kaabaFloat {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-6px); }
}
@keyframes shimmer {
  0%   { stroke-dashoffset: 600; opacity: 0.3; }
  50%  { opacity: 1; }
  100% { stroke-dashoffset: 0;   opacity: 0.3; }
}
@keyframes starDrift {
  0%   { transform: translateY(0)   rotate(0deg); opacity: 0.7; }
  100% { transform: translateY(-8px) rotate(20deg); opacity: 0.2; }
}
@keyframes borderPulse {
  0%,100% { stroke-opacity: 0.4; }
  50%      { stroke-opacity: 1; }
}
@keyframes patternDrift {
  from { transform: rotate(0deg) scale(1.0); }
  to   { transform: rotate(8deg) scale(1.05); }
}
@keyframes softPulse {
  0%,100% { opacity: 0.55; }
  50%      { opacity: 0.85; }
}
`

function StyleTag() {
  return <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
}

/* ══════════════════════════════════════════════
   MINIMAL template — elegant layered rings
══════════════════════════════════════════════ */
function MinimalArtwork({ palette }: { palette: PaletteColors }) {
  return (
    <div className="absolute inset-0 rounded-[24px]" style={{ background: palette.bg }}>
      <StyleTag />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 560"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="minBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={palette.soft} stopOpacity="0.35" />
            <stop offset="100%" stopColor={palette.bg} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="minGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="0.12" />
            <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft background wash */}
        <rect width="400" height="560" fill="url(#minBg)" />
        <ellipse cx="200" cy="220" rx="180" ry="180" fill="url(#minGlow)" />

        {/* Concentric decorative rings — each pulses at offset */}
        {[140, 110, 80, 52].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke={palette.accent}
            strokeWidth={i === 0 ? 0.6 : 0.4}
            strokeDasharray={i % 2 === 0 ? '4 6' : '1 8'}
            style={{
              animation: `borderPulse ${2.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Centre 8-pointed star */}
        <path
          d="M200 152 L210 184 L244 184 L217 204 L228 236 L200 218 L172 236 L183 204 L156 184 L190 184 Z"
          fill={palette.accent}
          fillOpacity="0.22"
          stroke={palette.accent}
          strokeWidth="0.8"
          strokeOpacity="0.6"
          style={{ animation: 'softPulse 3s ease-in-out infinite' }}
        />

        {/* Corner flourishes */}
        {[
          [16, 16], [384, 16], [16, 544], [384, 544],
        ].map(([cx, cy], i) => (
          <g key={i} style={{ transformOrigin: `${cx}px ${cy}px`, animation: `softPulse ${2 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
            <circle cx={cx} cy={cy} r="18" fill="none" stroke={palette.accent} strokeWidth="0.6" strokeOpacity="0.5" />
            <circle cx={cx} cy={cy} r="10" fill="none" stroke={palette.accent} strokeWidth="0.4" strokeOpacity="0.4" />
            <circle cx={cx} cy={cy} r="3" fill={palette.accent} fillOpacity="0.6" />
          </g>
        ))}

        {/* Outer border frame */}
        <rect
          x="12" y="12" width="376" height="536" rx="20"
          fill="none"
          stroke={palette.accent}
          strokeWidth="0.8"
          strokeOpacity="0.45"
          strokeDasharray="8 5"
          style={{ animation: 'shimmer 6s linear infinite' }}
          strokeDashoffset="0"
        />
        <rect
          x="20" y="20" width="360" height="520" rx="16"
          fill="none"
          stroke={palette.soft}
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />

        {/* Scattered micro dots */}
        {Array.from({ length: 28 }).map((_, i) => {
          const x = 30 + (i * 53 + i * i * 3) % 340
          const y = 30 + (i * 71 + i * 17) % 500
          return (
            <circle
              key={`d-${i}`}
              cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1}
              fill={palette.accent}
              style={{
                animation: `twinkle ${1.5 + (i % 5) * 0.5}s ease-in-out infinite`,
                animationDelay: `${(i * 0.17) % 3}s`,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════
   CRESCENT template — moon + stars + lanterns
══════════════════════════════════════════════ */
function CrescentArtwork({ palette }: { palette: PaletteColors }) {
  const stars = Array.from({ length: 32 }).map((_, i) => ({
    x: 18 + (i * 47 + i * i * 5) % 364,
    y: 12 + (i * 61 + i * 11) % 300,
    r: i % 4 === 0 ? 2.8 : i % 3 === 0 ? 2 : 1.4,
    delay: (i * 0.19) % 3,
    dur: 1.2 + (i % 7) * 0.35,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[24px]" style={{ background: palette.bg }}>
      <StyleTag />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 560"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="skyGrad" cx="70%" cy="15%" r="55%">
            <stop offset="0%" stopColor={palette.soft} stopOpacity="0.45" />
            <stop offset="100%" stopColor={palette.bg} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="0.5" />
            <stop offset="60%" stopColor={palette.accent} stopOpacity="0.08" />
            <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Sky backdrop */}
        <rect width="400" height="560" fill="url(#skyGrad)" />

        {/* Moon halo bloom */}
        <ellipse
          cx="290" cy="105" rx="92" ry="92"
          fill="url(#moonHalo)"
          style={{ animation: 'moonGlow 3.5s ease-in-out infinite', color: palette.accent }}
        />

        {/* Moon crescent shape */}
        <g filter="url(#softGlow)" style={{ color: palette.accent, animation: 'moonGlow 3.5s ease-in-out infinite' }}>
          <circle cx="290" cy="105" r="68" fill={palette.accent} fillOpacity="0.18" />
          <circle cx="290" cy="105" r="56" fill="none" stroke={palette.accent} strokeWidth="1.5" strokeOpacity="0.6" />
          <path
            d="M252 55c-22 12-37 36-37 63 0 42 34 76 76 76 18 0 34-6 47-16-14 24-40 41-70 41-45 0-81-36-81-81 0-45 36-81 81-81 1.5 0 3 0 4.5 0-7-8-13-15-20-2z"
            fill={palette.accent}
            fillOpacity="0.92"
            filter="url(#glow)"
          />
        </g>

        {/* Stars */}
        {stars.map((s, i) => (
          <g key={`st-${i}`}>
            {/* 4-point star shape for bigger ones */}
            {s.r > 2 ? (
              <path
                d={`M${s.x} ${s.y - s.r * 2.5} L${s.x + s.r * 0.7} ${s.y - s.r * 0.7} L${s.x + s.r * 2.5} ${s.y} L${s.x + s.r * 0.7} ${s.y + s.r * 0.7} L${s.x} ${s.y + s.r * 2.5} L${s.x - s.r * 0.7} ${s.y + s.r * 0.7} L${s.x - s.r * 2.5} ${s.y} L${s.x - s.r * 0.7} ${s.y - s.r * 0.7} Z`}
                fill={palette.soft}
                style={{
                  animation: `twinkle ${s.dur}s ease-in-out infinite`,
                  animationDelay: `${s.delay}s`,
                }}
              />
            ) : (
              <circle
                cx={s.x} cy={s.y} r={s.r}
                fill={palette.soft}
                style={{
                  animation: `twinkle ${s.dur}s ease-in-out infinite`,
                  animationDelay: `${s.delay}s`,
                }}
              />
            )}
          </g>
        ))}

        {/* Lanterns — 3 hanging from top */}
        {[
          { x: 55,  topY: -10, swayDir: 1,  delay: 0 },
          { x: 200, topY: -18, swayDir: -1, delay: 0.4 },
          { x: 345, topY: -8,  swayDir: 1,  delay: 0.8 },
        ].map((l, i) => (
          <g
            key={`ln-${i}`}
            style={{
              transformOrigin: `${l.x}px ${l.topY + 20}px`,
              animation: `lanternSway ${3.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${l.delay}s`,
            }}
          >
            {/* String */}
            <line x1={l.x} y1={l.topY} x2={l.x} y2={l.topY + 55} stroke={palette.accent} strokeWidth="0.8" strokeOpacity="0.5" />
            {/* Body */}
            <ellipse cx={l.x} cy={l.topY + 72} rx="14" ry="22" fill={palette.accent} fillOpacity="0.75" />
            {/* Top cap */}
            <rect x={l.x - 9} y={l.topY + 50} width="18" height="7" rx="3" fill={palette.accent} fillOpacity="0.9" />
            {/* Bottom tassel */}
            <line x1={l.x} y1={l.topY + 94} x2={l.x} y2={l.topY + 110} stroke={palette.accent} strokeWidth="1.2" strokeOpacity="0.6" />
            {/* Glow inside */}
            <ellipse cx={l.x} cy={l.topY + 72} rx="7" ry="12" fill={palette.soft} fillOpacity="0.4" style={{ animation: `softPulse ${2 + i * 0.3}s ease-in-out infinite` }} />
          </g>
        ))}

        {/* Ground arch / decorative bottom strip */}
        <path
          d="M0 480 Q200 430 400 480 L400 560 L0 560 Z"
          fill={palette.accent}
          fillOpacity="0.08"
        />
        <path
          d="M0 490 Q200 445 400 490"
          fill="none"
          stroke={palette.accent}
          strokeWidth="0.8"
          strokeOpacity="0.4"
          strokeDasharray="6 4"
        />

        {/* Outer border */}
        <rect x="12" y="12" width="376" height="536" rx="20"
          fill="none" stroke={palette.accent} strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="10 6"
        />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════
   KA'BAH template — architectural + radiance
══════════════════════════════════════════════ */
function KabahArtwork({ palette }: { palette: PaletteColors }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[24px]" style={{ background: palette.bg }}>
      <StyleTag />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 560"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="skyKa" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor={palette.soft} stopOpacity="0.3" />
            <stop offset="100%" stopColor={palette.bg} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="kabaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="0.55" />
            <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
          </radialGradient>
          <filter id="kaGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width="400" height="560" fill="url(#skyKa)" />

        {/* Radiance rays from Ka'bah centre */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2
          const x2 = 200 + Math.cos(angle) * 320
          const y2 = 360 + Math.sin(angle) * 320
          return (
            <line
              key={`ray-${i}`}
              x1="200" y1="360"
              x2={x2} y2={y2}
              stroke={palette.soft}
              strokeOpacity={i % 3 === 0 ? 0.22 : 0.1}
              strokeWidth={i % 6 === 0 ? 0.9 : 0.5}
            />
          )
        })}

        {/* Glow orb behind Ka'bah */}
        <ellipse cx="200" cy="360" rx="100" ry="80" fill="url(#kabaGlow)" style={{ animation: 'softPulse 4s ease-in-out infinite' }} />

        {/* Ka'bah body — floating */}
        <g style={{ transformOrigin: '200px 370px', animation: 'kaabaFloat 4s ease-in-out infinite' }}>
          {/* Shadow */}
          <ellipse cx="200" cy="445" rx="65" ry="10" fill={palette.fg} fillOpacity="0.18" />

          {/* Main cube */}
          <rect x="138" y="300" width="124" height="134" rx="4" fill={palette.fg} fillOpacity="0.82" filter="url(#kaGlow)" />

          {/* Top perspective face */}
          <path d="M138 300 L168 278 L232 278 L262 300 Z" fill={palette.fg} fillOpacity="0.65" />
          <path d="M232 278 L262 300 L262 434 L232 412 Z" fill={palette.fg} fillOpacity="0.45" />

          {/* Kiswah gold band */}
          <rect x="138" y="332" width="124" height="14" fill={palette.accent} fillOpacity="0.95" />
          <rect x="168" y="332" width="124" height="14" fill={palette.accent} fillOpacity="0.6" />

          {/* Arabic calligraphy hint on band */}
          <text x="200" y="343" textAnchor="middle" fill={palette.bg} fontSize="7" fontFamily="serif" opacity="0.85">بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ</text>

          {/* Door */}
          <rect x="178" y="362" width="32" height="50" rx="3" fill={palette.accent} fillOpacity="0.88" />
          <rect x="180" y="364" width="28" height="46" rx="2" fill="none" stroke={palette.bg} strokeWidth="0.8" strokeOpacity="0.5" />
          {/* Door arch */}
          <path d="M178 374 Q194 360 210 374" fill="none" stroke={palette.bg} strokeWidth="0.7" strokeOpacity="0.5" />

          {/* Corner columns */}
          {[138, 258].map((x, i) => (
            <rect key={i} x={x - 4} y="295" width="8" height="143" rx="2" fill={palette.accent} fillOpacity="0.35" />
          ))}
        </g>

        {/* Stars in sky */}
        {Array.from({ length: 18 }).map((_, i) => {
          const x = 20 + (i * 59 + i * i * 7) % 360
          const y = 20 + (i * 41 + i * 13) % 200
          return (
            <circle
              key={`ks-${i}`}
              cx={x} cy={y} r={i % 3 === 0 ? 2 : 1.2}
              fill={palette.soft}
              style={{
                animation: `twinkle ${1.5 + (i % 5) * 0.4}s ease-in-out infinite`,
                animationDelay: `${(i * 0.22) % 2.8}s`,
              }}
            />
          )
        })}

        {/* Spinning halo ring around Ka'bah */}
        <circle
          cx="200" cy="360" r="84"
          fill="none"
          stroke={palette.accent}
          strokeWidth="0.6"
          strokeOpacity="0.3"
          strokeDasharray="6 8"
          style={{ animation: 'kaabaSpin 18s linear infinite', transformOrigin: '200px 360px' }}
        />
        <circle
          cx="200" cy="360" r="98"
          fill="none"
          stroke={palette.accent}
          strokeWidth="0.4"
          strokeOpacity="0.2"
          strokeDasharray="3 12"
          style={{ animation: 'kaabaSpin 28s linear infinite reverse', transformOrigin: '200px 360px' }}
        />

        {/* Ground plane */}
        <path d="M0 440 Q200 415 400 440 L400 560 L0 560 Z" fill={palette.accent} fillOpacity="0.06" />
        <path d="M0 452 Q200 428 400 452" fill="none" stroke={palette.accent} strokeWidth="0.7" strokeOpacity="0.3" strokeDasharray="8 5" />

        {/* Border */}
        <rect x="12" y="12" width="376" height="536" rx="20"
          fill="none" stroke={palette.accent} strokeWidth="0.9" strokeOpacity="0.4" strokeDasharray="10 6" />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════
   GEOMETRIC template — Islamic tessellation
══════════════════════════════════════════════ */
function GeometricArtwork({ palette }: { palette: PaletteColors }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[24px]" style={{ background: palette.bg }}>
      <StyleTag />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 560"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 8-pointed star tile */}
          <pattern id="islamicTile" width="56" height="56" patternUnits="userSpaceOnUse">
            {/* Outer octagon */}
            <polygon
              points="16,4 40,4 52,16 52,40 40,52 16,52 4,40 4,16"
              fill="none"
              stroke={palette.accent}
              strokeOpacity="0.28"
              strokeWidth="0.9"
            />
            {/* Inner 8-star */}
            <path
              d="M28 10 L31 21 L42 18 L35 27 L42 36 L31 33 L28 44 L25 33 L14 36 L21 27 L14 18 L25 21 Z"
              fill="none"
              stroke={palette.soft}
              strokeOpacity="0.22"
              strokeWidth="0.7"
            />
            <circle cx="28" cy="28" r="3" fill={palette.accent} fillOpacity="0.15" />
          </pattern>

          {/* Larger centrepiece star pattern */}
          <radialGradient id="geoGlow" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stopColor={palette.soft} stopOpacity="0.3" />
            <stop offset="100%" stopColor={palette.bg} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Tiling background */}
        <rect width="400" height="560" fill="url(#islamicTile)" />
        <rect width="400" height="560" fill="url(#geoGlow)" />

        {/* Animated large central mandala */}
        <g style={{ transformOrigin: '200px 200px', animation: 'kaabaSpin 40s linear infinite' }}>
          {/* 8 large petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const x = 200 + Math.cos(angle) * 70
            const y = 200 + Math.sin(angle) * 70
            return (
              <ellipse
                key={`petal-${i}`}
                cx={x} cy={y}
                rx="18" ry="32"
                fill={palette.accent}
                fillOpacity="0.14"
                stroke={palette.accent}
                strokeOpacity="0.35"
                strokeWidth="0.8"
                transform={`rotate(${(i / 8) * 360}, ${x}, ${y})`}
              />
            )
          })}
        </g>

        {/* Counter-rotating inner ring */}
        <g style={{ transformOrigin: '200px 200px', animation: 'kaabaSpin 25s linear infinite reverse' }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2
            const x = 200 + Math.cos(angle) * 44
            const y = 200 + Math.sin(angle) * 44
            return (
              <circle
                key={`dot-${i}`}
                cx={x} cy={y} r={i % 3 === 0 ? 3.5 : 2}
                fill={palette.accent}
                fillOpacity={i % 3 === 0 ? 0.7 : 0.35}
              />
            )
          })}
        </g>

        {/* Static centre star */}
        <path
          d="M200 160 L210 188 L240 188 L217 206 L226 234 L200 218 L174 234 L183 206 L160 188 L190 188 Z"
          fill={palette.accent}
          fillOpacity="0.7"
          stroke={palette.soft}
          strokeWidth="0.8"
          strokeOpacity="0.5"
          style={{ animation: 'softPulse 3.5s ease-in-out infinite' }}
        />

        {/* 4 corner medallions */}
        {[[34, 34], [366, 34], [34, 526], [366, 526]].map(([cx, cy], i) => (
          <g key={`med-${i}`}>
            <circle cx={cx} cy={cy} r="22" fill="none" stroke={palette.accent} strokeOpacity="0.4" strokeWidth="0.8" />
            <circle cx={cx} cy={cy} r="14" fill={palette.accent} fillOpacity="0.1" stroke={palette.accent} strokeOpacity="0.35" strokeWidth="0.6" />
            {/* Small 4-star inside */}
            <path
              d={`M${cx} ${cy - 8} L${cx + 3} ${cy - 3} L${cx + 8} ${cy} L${cx + 3} ${cy + 3} L${cx} ${cy + 8} L${cx - 3} ${cy + 3} L${cx - 8} ${cy} L${cx - 3} ${cy - 3} Z`}
              fill={palette.accent}
              fillOpacity="0.55"
              style={{ animation: `twinkle ${2 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
            />
          </g>
        ))}

        {/* Mid-card horizontal band dividers */}
        <line x1="30" y1="290" x2="370" y2="290" stroke={palette.accent} strokeOpacity="0.25" strokeWidth="0.7" strokeDasharray="4 6" />
        <line x1="30" y1="298" x2="370" y2="298" stroke={palette.accent} strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="30" y1="440" x2="370" y2="440" stroke={palette.accent} strokeOpacity="0.25" strokeWidth="0.7" strokeDasharray="4 6" />
        <line x1="30" y1="448" x2="370" y2="448" stroke={palette.accent} strokeOpacity="0.15" strokeWidth="0.5" />

        {/* Mid-card side medallions */}
        {[[22, 365], [378, 365]].map(([cx, cy], i) => (
          <g key={`side-${i}`} style={{ animation: `softPulse ${2.8 + i * 0.5}s ease-in-out infinite` }}>
            <circle cx={cx} cy={cy} r="16" fill="none" stroke={palette.accent} strokeOpacity="0.45" strokeWidth="0.8" />
            <circle cx={cx} cy={cy} r="8" fill={palette.accent} fillOpacity="0.18" />
          </g>
        ))}

        {/* Double outer border */}
        <rect x="10" y="10" width="380" height="540" rx="20"
          fill="none" stroke={palette.accent} strokeWidth="1" strokeOpacity="0.5"
          style={{ animation: 'borderPulse 4s ease-in-out infinite' }}
        />
        <rect x="16" y="16" width="368" height="528" rx="16"
          fill="none" stroke={palette.accent} strokeWidth="0.5" strokeOpacity="0.25"
        />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN EXPORT — routes to the right artwork
══════════════════════════════════════════════ */
export default function TemplateArtwork({
  template,
  palette,
}: {
  template: CardConfig['template']
  palette: PaletteColors
}) {
  if (template === 'minimal')   return <MinimalArtwork  palette={palette} />
  if (template === 'crescent')  return <CrescentArtwork palette={palette} />
  if (template === 'kabah')     return <KabahArtwork    palette={palette} />
  return                               <GeometricArtwork palette={palette} />
}