'use client'

import type { CardConfig } from '@/types'
import { PALETTES, resolvePreviewContent } from '@/lib/card-theme'
import TemplateArtwork from '@/components/cards/TemplateArtwork'

/* Shimmer + hover effects injected once */
const CARD_STYLES = `
@keyframes shimmerPass {
  0%   { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
}
@keyframes cardEntrance {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to   { opacity: 1; transform: scale(1)    translateY(0); }
}
.eid-card-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255,255,255,0.12) 50%,
    transparent 60%
  );
  animation: shimmerPass 3.2s ease-in-out infinite;
  pointer-events: none;
  border-radius: inherit;
}
.eid-card-root {
  animation: cardEntrance 0.45s cubic-bezier(0.22,1,0.36,1) both;
}
`

export default function EidCardPreview({
  config,
  className = '',
}: {
  config: CardConfig
  className?: string
}) {
  const palette = PALETTES[config.palette]
  const content = resolvePreviewContent(config)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CARD_STYLES }} />

      {/*
        Responsive wrapper:
        - On mobile  : w-full, max-w-[320px], auto height via aspect-ratio
        - On sm+      : grows to max-w-[400px]
        - Fixed 400×560 inner div for html2canvas (visually scaled via CSS)
      */}
      <div
        className={[
          'eid-card-root mx-auto w-full',
          className,
        ].join(' ')}
        style={{ maxWidth: 400 }}
      >
        {/* Aspect-ratio shell so the card scales on every screen */}
        <div style={{ position: 'relative', paddingBottom: '140%' /* 560/400 */ }}>
          <div
            className="eid-card-shimmer"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 24,
              border: `1.5px solid ${palette.accent}`,
              boxShadow: `
                0 4px 24px rgba(0,0,0,0.18),
                0 0 0 1px ${palette.accent}22,
                0 24px 64px ${palette.accent}28
              `,
              overflow: 'hidden',
              transition: 'box-shadow 0.4s ease',
            }}
          >
            {/* ── Artwork layer ── */}
            <TemplateArtwork template={config.template} palette={palette} />

            {/* ── Content layer ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '7%',
                color: palette.fg,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
              }}
            >
              {/* Inner decorative border */}
              <div
                style={{
                  position: 'absolute',
                  inset: '3.5%',
                  borderRadius: 18,
                  border: `1px solid ${palette.accent}55`,
                  pointerEvents: 'none',
                }}
              />

              {/* ── Top section ── */}
              <div style={{ position: 'relative' }}>
                {/* Arabic heading */}
                <p
                  style={{
                    fontFamily: 'var(--font-arabic, serif)',
                    fontSize: 'clamp(20px, 5.5vw, 30px)',
                    color: palette.accent,
                    lineHeight: 1.4,
                    textShadow: `0 0 18px ${palette.accent}66`,
                    letterSpacing: '0.04em',
                  }}
                >
                  عيد الأضحى مبارك
                </p>

                {/* To field */}
                {content.to && (
                  <p
                    style={{
                      marginTop: '6%',
                      fontFamily: 'var(--font-cinzel, serif)',
                      fontSize: 'clamp(11px, 2.8vw, 16px)',
                      letterSpacing: '0.06em',
                      opacity: 0.85,
                    }}
                  >
                    To: {content.to}
                  </p>
                )}
              </div>

              {/* ── Middle section — message ── */}
              <div style={{ position: 'relative', padding: '0 6%' }}>
                {/* Decorative quote marks */}
                <span
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: '4%',
                    fontFamily: 'Georgia, serif',
                    fontSize: 48,
                    color: palette.accent,
                    opacity: 0.2,
                    lineHeight: 1,
                  }}
                >
                  "
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-crimson, Georgia, serif)',
                    fontSize: 'clamp(13px, 3.2vw, 18px)',
                    lineHeight: 1.65,
                    opacity: 0.92,
                  }}
                >
                  {content.message}
                </p>
              </div>

              {/* ── Bottom section ── */}
              <div style={{ position: 'relative' }}>
                {/* Small divider */}
                <div
                  style={{
                    width: '30%',
                    height: 1,
                    margin: '0 auto 8%',
                    background: `linear-gradient(90deg, transparent, ${palette.accent}88, transparent)`,
                  }}
                />

                {content.from && (
                  <p
                    style={{
                      fontFamily: 'var(--font-cinzel, serif)',
                      fontSize: 'clamp(11px, 2.8vw, 15px)',
                      letterSpacing: '0.08em',
                      opacity: 0.8,
                    }}
                  >
                    From: {content.from}
                  </p>
                )}

                {/* Small crescent + star ornament */}
                <p
                  style={{
                    marginTop: '5%',
                    fontSize: 'clamp(12px, 2.5vw, 15px)',
                    opacity: 0.45,
                    letterSpacing: '0.3em',
                  }}
                >
                  ☽ ✦ ☾
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}