import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Qurbani Mubarak — Light a Lantern, Share a Wish'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #ece8fb 0%, #f7f1f6 35%, #fff5f8 65%, #fff9f3 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'serif',
        }}
      >
        {/* ── Soft radial blush glow top-left ── */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(250,232,241,0.85) 0%, rgba(247,241,246,0.3) 55%, transparent 75%)',
            top: -80,
            left: -60,
          }}
        />

        {/* ── Soft radial lavender glow bottom-right ── */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(236,232,251,0.7) 0%, rgba(247,241,246,0.2) 55%, transparent 75%)',
            bottom: -60,
            right: -40,
          }}
        />

        {/* ── Rosegold center glow ── */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(214,178,166,0.12) 0%, rgba(214,178,166,0.04) 55%, transparent 75%)',
            top: 90,
            left: 250,
          }}
        />

        {/* ── Scattered soft dots (stars) ── */}
        {[
          [80,  60,  2.5], [180, 110, 1.8], [320, 40,  2],  [460, 85,  1.8],
          [600, 50,  2.5], [740, 100, 1.8], [880, 38,  2],  [1020,75,  1.8],
          [1100,130, 2.5], [150, 190, 1.8], [400, 160, 1.5],[650, 180, 1.8],
          [900, 155, 2],   [1050,200, 1.8], [250, 480, 1.8],[500, 510, 1.5],
          [750, 495, 1.8], [950, 505, 2],   [100, 390, 1.5],[350, 410, 1.8],
        ].map(([x, y, r], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: r * 2,
              height: r * 2,
              borderRadius: '50%',
              background: i % 3 === 0
                ? 'rgba(214,178,166,0.55)'
                : i % 3 === 1
                ? 'rgba(215,154,168,0.4)'
                : 'rgba(236,232,251,0.8)',
            }}
          />
        ))}

        {/* ── Three lanterns ── */}
        {/* Left lantern */}
        <div style={{ position: 'absolute', left: 72, top: -18, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 2, height: 70, background: 'rgba(214,178,166,0.5)' }} />
          <div style={{
            width: 52, height: 80,
            borderRadius: '10px 10px 18px 18px',
            background: 'linear-gradient(160deg, rgba(214,178,166,0.6), rgba(255,200,150,0.5))',
            border: '1.5px solid rgba(214,178,166,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 24, height: 40, borderRadius: 8, background: 'rgba(255,220,180,0.45)' }} />
          </div>
          <div style={{ width: 2, height: 28, background: 'rgba(214,178,166,0.4)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(214,178,166,0.6)' }} />
        </div>

        {/* Right lantern */}
        <div style={{ position: 'absolute', right: 90, top: -10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 2, height: 60, background: 'rgba(214,178,166,0.5)' }} />
          <div style={{
            width: 46, height: 72,
            borderRadius: '10px 10px 16px 16px',
            background: 'linear-gradient(160deg, rgba(214,178,166,0.55), rgba(255,200,150,0.45))',
            border: '1.5px solid rgba(214,178,166,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 20, height: 34, borderRadius: 7, background: 'rgba(255,220,180,0.4)' }} />
          </div>
          <div style={{ width: 2, height: 24, background: 'rgba(214,178,166,0.4)' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(214,178,166,0.6)' }} />
        </div>

        {/* Far right small lantern */}
        <div style={{ position: 'absolute', right: 200, top: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.55 }}>
          <div style={{ width: 1.5, height: 45, background: 'rgba(214,178,166,0.5)' }} />
          <div style={{
            width: 34, height: 54,
            borderRadius: '8px 8px 14px 14px',
            background: 'linear-gradient(160deg, rgba(214,178,166,0.5), rgba(255,200,150,0.4))',
            border: '1px solid rgba(214,178,166,0.4)',
          }} />
          <div style={{ width: 1.5, height: 18, background: 'rgba(214,178,166,0.35)' }} />
        </div>

        {/* ── Crescent moon top-right ── */}
        <div
          style={{
            position: 'absolute',
            right: 130,
            top: 55,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(214,178,166,0.25)',
            boxShadow: '0 0 30px rgba(214,178,166,0.2)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 108,
            top: 46,
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#f0eaf8',  /* matches bg to create crescent cutout */
          }}
        />

        {/* ── Outer decorative border frame ── */}
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '1px solid rgba(214,178,166,0.35)',
            borderRadius: 20,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 32,
            border: '1px solid rgba(214,178,166,0.18)',
            borderRadius: 16,
          }}
        />

        {/* ── Corner ornaments ── */}
        {[[40, 40], [1160, 40], [40, 590], [1160, 590]].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - 12,
              top: y - 12,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ position: 'absolute', width: 24, height: 24, borderRadius: '50%', border: '1px solid rgba(214,178,166,0.5)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(214,178,166,0.65)' }} />
          </div>
        ))}

        {/* ── Main content ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '0 80px',
          }}
        >
          {/* Top heading */}
          <div
            style={{
              fontSize: 38,
              color: 'rgba(215,154,168,0.9)',
              letterSpacing: '0.1em',
              marginBottom: 18,
              fontWeight: 400,
            }}
          >
            EID UL ADHA MUBARAK
          </div>

          {/* Divider with star */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, width: 320 }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(214,178,166,0.55))' }} />
            <div style={{ fontSize: 18, color: 'rgba(214,178,166,0.8)' }}>✦</div>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(214,178,166,0.55), transparent)' }} />
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: 'rgba(26,20,34,0.88)',
              letterSpacing: '0.05em',
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            QURBANI
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: 'rgba(214,178,166,1)',
              letterSpacing: '0.12em',
              lineHeight: 1.05,
              marginBottom: 32,
            }}
          >
            MUBARAK
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: 'rgba(26,20,34,0.45)',
              letterSpacing: '0.18em',
              fontWeight: 400,
              marginBottom: 36,
            }}
          >
            LIGHT A LANTERN  ·  SHARE A WISH  ·  SEND A CARD
          </div>

          {/* Bottom pill badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 32px',
              borderRadius: 50,
              border: '1.5px solid rgba(214,178,166,0.45)',
              background: 'rgba(214,178,166,0.1)',
            }}
          >
            <div style={{ fontSize: 20 }}>🏮</div>
            <div
              style={{
                fontSize: 18,
                color: 'rgba(26,20,34,0.65)',
                letterSpacing: '0.12em',
              }}
            >
              EID UL ADHA 2026
            </div>
            <div style={{ fontSize: 20 }}>🏮</div>
          </div>
        </div>

        {/* ── Bottom ground glow ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: 'linear-gradient(to top, rgba(214,178,166,0.1), transparent)',
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  )
}