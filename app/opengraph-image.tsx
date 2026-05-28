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
          background: 'linear-gradient(160deg, #1a1428 0%, #2a1f3d 40%, #1a1428 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'serif',
        }}
      >
        {/* ── Stars scattered ── */}
        {[
          [80,  60,  3],  [180, 120, 2], [320, 45,  2.5],[460, 90,  2],
          [600, 55,  3],  [740, 110, 2], [880, 40,  2.5],[1020,80, 2],
          [1100,140, 3],  [150, 200, 2], [400, 170, 1.5],[650, 190, 2],
          [900, 160, 2.5],[1050,210, 2], [250, 490, 2],  [500, 520, 1.5],
          [750, 500, 2],  [950, 510, 2.5],[100,400, 1.5],[350, 420, 2],
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
              background: i % 3 === 0 ? 'rgba(236,232,251,0.9)' : 'rgba(214,178,166,0.75)',
            }}
          />
        ))}

        {/* ── Radial glow behind content ── */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(214,178,166,0.18) 0%, rgba(214,178,166,0.04) 55%, transparent 75%)',
            top: 65,
            left: 250,
          }}
        />

        {/* ── Three lanterns ── */}
        {/* Left lantern */}
        <div style={{ position: 'absolute', left: 72, top: -18, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 2, height: 70, background: 'rgba(214,178,166,0.5)' }} />
          <div style={{ width: 52, height: 80, borderRadius: '10px 10px 18px 18px', background: 'linear-gradient(160deg, rgba(214,178,166,0.75), rgba(255,200,150,0.65))', border: '1.5px solid rgba(214,178,166,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 24, height: 40, borderRadius: 8, background: 'rgba(255,230,180,0.4)' }} />
          </div>
          <div style={{ width: 2, height: 28, background: 'rgba(214,178,166,0.4)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(214,178,166,0.7)' }} />
        </div>

        {/* Right lantern */}
        <div style={{ position: 'absolute', right: 90, top: -10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 2, height: 60, background: 'rgba(214,178,166,0.5)' }} />
          <div style={{ width: 46, height: 72, borderRadius: '10px 10px 16px 16px', background: 'linear-gradient(160deg, rgba(214,178,166,0.7), rgba(255,200,150,0.6))', border: '1.5px solid rgba(214,178,166,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 34, borderRadius: 7, background: 'rgba(255,230,180,0.38)' }} />
          </div>
          <div style={{ width: 2, height: 24, background: 'rgba(214,178,166,0.4)' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(214,178,166,0.7)' }} />
        </div>

        {/* Far right small lantern */}
        <div style={{ position: 'absolute', right: 200, top: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.65 }}>
          <div style={{ width: 1.5, height: 45, background: 'rgba(214,178,166,0.5)' }} />
          <div style={{ width: 34, height: 54, borderRadius: '8px 8px 14px 14px', background: 'linear-gradient(160deg, rgba(214,178,166,0.65), rgba(255,200,150,0.55))', border: '1px solid rgba(214,178,166,0.45)' }} />
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
            background: 'rgba(214,178,166,0.18)',
            boxShadow: '0 0 40px rgba(214,178,166,0.22)',
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
            background: '#1a1428',
          }}
        />

        {/* ── Outer decorative border frame ── */}
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '1px solid rgba(214,178,166,0.22)',
            borderRadius: 20,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 32,
            border: '1px solid rgba(214,178,166,0.1)',
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
            <div style={{ position: 'absolute', width: 24, height: 24, borderRadius: '50%', border: '1px solid rgba(214,178,166,0.45)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(214,178,166,0.7)' }} />
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
          {/* Arabic heading */}
          <div
            style={{
              fontSize: 42,
              color: 'rgba(214,178,166,0.95)',
              letterSpacing: '0.06em',
              marginBottom: 18,
              textShadow: '0 0 40px rgba(214,178,166,0.5)',
            }}
          >
            عيد الأضحى مبارك
          </div>

          {/* Divider with star */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, width: 320 }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(214,178,166,0.6))' }} />
            <div style={{ fontSize: 18, color: 'rgba(214,178,166,0.85)' }}>✦</div>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(214,178,166,0.6), transparent)' }} />
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: 'rgba(255,252,245,0.97)',
              letterSpacing: '0.05em',
              lineHeight: 1.05,
              textShadow: '0 2px 32px rgba(214,178,166,0.3)',
              marginBottom: 20,
            }}
          >
            QURBANI
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: 'rgba(214,178,166,0.92)',
              letterSpacing: '0.12em',
              lineHeight: 1.05,
              textShadow: '0 2px 32px rgba(214,178,166,0.4)',
              marginBottom: 32,
            }}
          >
            MUBARAK
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 26,
              color: 'rgba(236,232,251,0.72)',
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
                color: 'rgba(214,178,166,0.88)',
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
            background: 'linear-gradient(to top, rgba(214,178,166,0.08), transparent)',
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  )
}