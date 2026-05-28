'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import StarField from '@/components/ui/StarField'
import MoonRise from '@/components/ui/MoonRise'
import ConfettiBurst from '@/components/ui/ConfettiBurst'

// ─── Luminous falling lantern ─────────────────────────────────────────
function FallingLantern({
  x, delay, scale = 1, color, duration,
}: {
  x: string; delay: number; scale?: number; duration: number
  color: { body: string; glow: string; tassel: string }
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: x, top: 0 }}
      animate={{ y: ['0vh', '110vh'], rotate: [-4, 3, -2, 5, -3, 2, -4] }}
      transition={{
        y: { duration, repeat: Infinity, ease: 'linear', delay: -delay },
        rotate: { duration: 4 + delay * 0.3, repeat: Infinity, ease: 'easeInOut', delay: -delay },
      }}
    >
      <svg
        width={34 * scale} height={80 * scale}
        viewBox="0 0 34 80"
        aria-hidden="true"
      >
        {/* string */}
        <line x1="17" y1="0" x2="17" y2="9" stroke="rgba(26,20,34,0.25)" strokeWidth="1.2" />
        {/* top cap */}
        <rect x="10" y="9" width="14" height="6" rx="3" fill={color.body} />
        {/* outer glow halo — luminous effect */}
        <ellipse cx="17" cy="35" rx="18" ry="22" fill={color.glow} opacity="0.45" />
        <ellipse cx="17" cy="35" rx="22" ry="26" fill={color.glow} opacity="0.18" />
        {/* body */}
        <ellipse cx="17" cy="35" rx="13" ry="18" fill={color.body} opacity="0.95" />
        {/* inner warm light */}
        <ellipse cx="17" cy="36" rx="9" ry="13" fill="rgba(255,240,200,0.35)" />
        {/* highlight */}
        <ellipse cx="12" cy="28" rx="4" ry="7" fill="rgba(255,255,255,0.35)" />
        {/* rib lines */}
        <line x1="5" y1="33" x2="29" y2="33" stroke="rgba(0,0,0,0.08)" strokeWidth="0.7" />
        <line x1="5" y1="39" x2="29" y2="39" stroke="rgba(0,0,0,0.08)" strokeWidth="0.7" />
        {/* bottom cap */}
        <rect x="10" y="51" width="14" height="6" rx="3" fill={color.body} />
        {/* tassel */}
        <line x1="17" y1="57" x2="17" y2="68" stroke={color.tassel} strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="61" x2="11" y2="69" stroke={color.tassel} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
        <line x1="20" y1="61" x2="23" y2="69" stroke={color.tassel} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
      </svg>
    </motion.div>
  )
}

const LANTERNS = [
  { x: '4%',  delay: 0,  scale: 1.0,  duration: 14, color: { body: '#d9826a', glow: '#f4a882', tassel: '#b05a40' } },
  { x: '14%', delay: 4,  scale: 1.2,  duration: 18, color: { body: '#b09acc', glow: '#cfc4f0', tassel: '#806898' } },
  { x: '26%', delay: 9,  scale: 0.9,  duration: 13, color: { body: '#d6b2a6', glow: '#edcfc5', tassel: '#b08878' } },
  { x: '38%', delay: 2,  scale: 1.05, duration: 16, color: { body: '#c4816a', glow: '#e0a090', tassel: '#945040' } },
  { x: '55%', delay: 7,  scale: 1.1,  duration: 15, color: { body: '#9b8ec4', glow: '#bdb3e8', tassel: '#6b5a9a' } },
  { x: '68%', delay: 12, scale: 0.95, duration: 17, color: { body: '#d6b2a6', glow: '#edcfc5', tassel: '#b08878' } },
  { x: '80%', delay: 3,  scale: 1.0,  duration: 12, color: { body: '#d9826a', glow: '#f4a882', tassel: '#b05a40' } },
  { x: '90%', delay: 6,  scale: 1.15, duration: 19, color: { body: '#b09acc', glow: '#cfc4f0', tassel: '#806898' } },
]

// ─── Cream sheep (bottom-left corner) ────────────────────────────────
function CornerSheep() {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-4 left-4 z-10"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="110" height="82" viewBox="0 0 110 82" aria-hidden="true">
        {/* tail */}
        <ellipse cx="10" cy="46" rx="7" ry="5" fill="#f0e8e4" />
        {/* body shadow */}
        <ellipse cx="53" cy="52" rx="34" ry="11" fill="rgba(214,178,166,0.2)" />
        {/* main body */}
        <ellipse cx="53" cy="42" rx="36" ry="19" fill="#f7f1f6" />
        {/* back highlight */}
        <ellipse cx="48" cy="34" rx="22" ry="7" fill="rgba(255,250,243,0.75)" />
        {/* wool tufts */}
        <circle cx="38" cy="32" r="9"  fill="rgba(255,250,243,0.8)" />
        <circle cx="50" cy="28" r="10" fill="rgba(255,250,243,0.75)" />
        <circle cx="62" cy="32" r="8"  fill="rgba(255,250,243,0.7)" />
        <circle cx="43" cy="36" r="7"  fill="rgba(255,250,243,0.55)" />
        <circle cx="57" cy="36" r="6"  fill="rgba(255,250,243,0.55)" />
        {/* neck */}
        <path d="M80 38 Q88 28 90 18 Q92 10 89 7 Q85 17 82 26Z" fill="#e8d8d0" />
        {/* head */}
        <ellipse cx="92" cy="21" rx="12" ry="10" fill="#e8d8d0" />
        {/* snout */}
        <ellipse cx="101" cy="26" rx="6.5" ry="5" fill="#d8c0b4" />
        {/* nostrils */}
        <circle cx="99" cy="27" r="1.4" fill="#3a1a08" opacity="0.6" />
        <circle cx="103" cy="27" r="1.4" fill="#3a1a08" opacity="0.6" />
        {/* ear */}
        <ellipse cx="83" cy="14" rx="4" ry="6.5" fill="#d8c0b4" transform="rotate(18 83 14)" />
        {/* horn */}
        <path d="M89 12 Q87 5 91 2 Q95 0 94 7 Q93 10 90 12" fill="#8a6040" opacity="0.55" />
        {/* eye */}
        <circle cx="95" cy="18" r="2.8" fill="#1a0e06" />
        <circle cx="96" cy="17" r="1" fill="white" opacity="0.85" />
        {/* lashes */}
        <line x1="93" y1="16" x2="92" y2="13" stroke="#1a0e06" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="95" y1="15" x2="95" y2="12" stroke="#1a0e06" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="97" y1="16" x2="98" y2="13" stroke="#1a0e06" strokeWidth="0.7" strokeLinecap="round" />
        {/* legs */}
        <rect x="24" y="58" width="7" height="18" rx="3" fill="#8a6040" />
        <rect x="36" y="60" width="7" height="16" rx="3" fill="#8a6040" />
        <rect x="60" y="60" width="7" height="16" rx="3" fill="#8a6040" />
        <rect x="72" y="58" width="7" height="18" rx="3" fill="#8a6040" />
        {/* hooves */}
        <ellipse cx="27" cy="76" rx="4.5" ry="2.2" fill="#2a1208" />
        <ellipse cx="39" cy="76" rx="4.5" ry="2.2" fill="#2a1208" />
        <ellipse cx="63" cy="76" rx="4.5" ry="2.2" fill="#2a1208" />
        <ellipse cx="75" cy="76" rx="4.5" ry="2.2" fill="#2a1208" />
      </svg>
    </motion.div>
  )
}

// ─── Camel (bottom-right corner, facing left) ─────────────────────────
function CornerCamel() {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-2 right-4 z-10"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
    >
      <svg width="160" height="104" viewBox="0 0 170 110" style={{ transform: 'scaleX(-1)' }} aria-hidden="true">
        {/* tail */}
        <path d="M14 58 Q8 64 10 74 Q12 80 18 76" stroke="#9a6840" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="18" cy="76" rx="5" ry="3.5" fill="#9a6840" />
        {/* body shadow */}
        <ellipse cx="76" cy="72" rx="52" ry="13" fill="rgba(138,92,48,0.3)" />
        {/* main body */}
        <ellipse cx="76" cy="60" rx="52" ry="23" fill="#c49060" />
        {/* back highlight */}
        <ellipse cx="70" cy="50" rx="34" ry="9" fill="#e8c090" opacity="0.4" />
        {/* hump */}
        <ellipse cx="78" cy="42" rx="20" ry="17" fill="#c49060" />
        <ellipse cx="78" cy="36" rx="14" ry="11" fill="#dea870" opacity="0.5" />
        <ellipse cx="78" cy="29" rx="8"  ry="5"  fill="#8a5c30" opacity="0.3" />
        {/* neck */}
        <path d="M116 54 Q124 42 128 26 Q130 16 128 8" stroke="#b07840" strokeWidth="15" fill="none" strokeLinecap="round" />
        <path d="M116 54 Q124 42 128 26 Q130 16 128 8" stroke="#e0b878" strokeWidth="5"  fill="none" strokeLinecap="round" opacity="0.3" />
        {/* head */}
        <ellipse cx="134" cy="18" rx="16" ry="12" fill="#b07840" />
        {/* snout */}
        <ellipse cx="147" cy="24" rx="9"  ry="7.5" fill="#9a6030" opacity="0.85" />
        <ellipse cx="148" cy="25" rx="7"  ry="5.5" fill="#b07840" opacity="0.7" />
        {/* lip */}
        <path d="M143 28 Q148 32 153 28" stroke="#3a1808" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.55" />
        <circle cx="144" cy="28" r="1.8" fill="#3a1808" opacity="0.45" />
        <circle cx="151" cy="28" r="1.8" fill="#3a1808" opacity="0.45" />
        {/* ear */}
        <ellipse cx="121" cy="10" rx="4.5" ry="7.5" fill="#b07840" transform="rotate(-15 121 10)" />
        {/* eye */}
        <ellipse cx="138" cy="14" rx="4" ry="3.5" fill="#180c04" />
        <circle  cx="139" cy="13" r="1.4" fill="white" opacity="0.9" />
        <line x1="136" y1="11" x2="135" y2="8"  stroke="#180c04" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="138" y1="10" x2="138" y2="7"  stroke="#180c04" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="141" y1="11" x2="142" y2="8"  stroke="#180c04" strokeWidth="0.9" strokeLinecap="round" />
        {/* rosegold saddle dots */}
        <circle cx="52" cy="63" r="2.2" fill="rgba(214,178,166,0.7)" />
        <circle cx="62" cy="65" r="2.2" fill="rgba(214,178,166,0.7)" />
        <circle cx="72" cy="66" r="2.2" fill="rgba(214,178,166,0.7)" />
        <circle cx="82" cy="66" r="2.2" fill="rgba(214,178,166,0.7)" />
        <circle cx="92" cy="65" r="2.2" fill="rgba(214,178,166,0.7)" />
        <circle cx="102" cy="63" r="2.2" fill="rgba(214,178,166,0.7)" />
        {/* legs */}
        <rect x="22"  y="80" width="10" height="28" rx="4" fill="#8a5030" />
        <rect x="38"  y="82" width="10" height="26" rx="4" fill="#8a5030" />
        <rect x="102" y="82" width="10" height="26" rx="4" fill="#8a5030" />
        <rect x="118" y="80" width="10" height="28" rx="4" fill="#8a5030" />
        {/* hooves */}
        <ellipse cx="27"  cy="108" rx="7.5" ry="3.5" fill="#2a1208" />
        <ellipse cx="43"  cy="108" rx="7.5" ry="3.5" fill="#2a1208" />
        <ellipse cx="107" cy="108" rx="7.5" ry="3.5" fill="#2a1208" />
        <ellipse cx="123" cy="108" rx="7.5" ry="3.5" fill="#2a1208" />
      </svg>
    </motion.div>
  )
}

// ─── Geometric SVG frame ──────────────────────────────────────────────
function GeometricFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <svg
        className="pointer-events-none absolute -inset-6 h-[calc(100%+48px)] w-[calc(100%+48px)]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.rect
          x="3" y="3" width="94" height="94" rx="8"
          fill="none"
          stroke="rgba(214,178,166,0.85)"
          strokeWidth="1.4"
          strokeDasharray="360"
          initial={{ strokeDashoffset: 360, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 1.35, ease: 'easeOut' }}
        />
        <g fill="none" stroke="rgba(214,178,166,0.7)" strokeWidth="1.2">
          <path d="M13 13 L17 9 L21 13 L17 17 Z" />
          <path d="M87 13 L83 9 L79 13 L83 17 Z" />
          <path d="M87 87 L83 91 L79 87 L83 83 Z" />
          <path d="M13 87 L17 91 L21 87 L17 83 Z" />
        </g>
      </svg>
      <div className="relative rounded-[28px] border border-gold/20 bg-cream/70 px-6 py-10 text-center shadow-[0_22px_90px_rgba(26,20,34,0.10)] backdrop-blur sm:px-10">
        {children}
      </div>
    </div>
  )
}

// ─── Ambient orbs ─────────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute left-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(236,232,251,0.7) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-100px] top-[10%] h-[360px] w-[360px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(250,232,241,0.65) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: -3 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[15%] left-[30%] h-[300px] w-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(214,178,166,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: -6 }}
      />
    </>
  )
}

// ─── Floating crescent ────────────────────────────────────────────────
function FloatingCrescent() {
  return (
    <motion.div
      className="pointer-events-none absolute right-[8%] top-[8%]"
      animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r="26" fill="rgba(214,178,166,0.12)" />
        <circle cx="28" cy="28" r="20" fill="rgba(214,178,166,0.55)" />
        <circle cx="36" cy="22" r="16" fill="rgba(247,241,246,1)" />
        <circle cx="14" cy="14" r="1.5" fill="rgba(214,178,166,0.8)" />
        <circle cx="44" cy="36" r="1.2" fill="rgba(214,178,166,0.7)" />
        <circle cx="10" cy="32" r="1"   fill="rgba(214,178,166,0.6)" />
      </svg>
    </motion.div>
  )
}

// ─── Sparkles ─────────────────────────────────────────────────────────
function Sparkles() {
  const sparkles = [
    { x: '12%', y: '18%', size: 8, delay: 0   },
    { x: '88%', y: '12%', size: 6, delay: 0.8 },
    { x: '6%',  y: '55%', size: 5, delay: 1.6 },
    { x: '94%', y: '50%', size: 7, delay: 0.4 },
    { x: '45%', y: '8%',  size: 5, delay: 1.2 },
    { x: '75%', y: '65%', size: 4, delay: 2.0 },
    { x: '20%', y: '72%', size: 6, delay: 0.6 },
  ]
  return (
    <>
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ left: s.x, top: s.y }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 0 L5.8 4.2 L10 5 L5.8 5.8 L5 10 L4.2 5.8 L0 5 L4.2 4.2 Z" fill="rgba(214,178,166,0.9)" />
          </svg>
        </motion.div>
      ))}
    </>
  )
}

// ─── Main HeroSection ─────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-86px)] items-center justify-center overflow-hidden">
      {/* Background */}
      <StarField count={96} seed={11} />
      <div className="noise-overlay" />
      <AmbientOrbs />


      {/* Crescent + sparkles */}
      <FloatingCrescent />
      <Sparkles />

      {/* Confetti + moon */}
      <ConfettiBurst />
      <MoonRise />

      {/* ── Card ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <GeometricFrame>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/50"
          >
            <span className="text-rosegold">✦</span> Eid ul Adha Special <span className="text-rosegold">✦</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="shimmer-text font-arabic text-5xl leading-[1.2] sm:text-6xl md:text-7xl"
          >
            عيد الأضحى مبارك
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.55 }}
            className="mx-auto mt-5 mb-5 h-px w-24 bg-gradient-to-r from-transparent via-rosegold/60 to-transparent"
          />

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            className="font-cinzel text-3xl tracking-wide text-ink sm:text-4xl"
          >
            Eid ul Adha Mubarak
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.85 }}
            className="mx-auto mt-4 max-w-2xl font-crimson text-base text-ink/60 sm:text-lg"
          >
            May Allah accept your sacrifice and bless your family with peace, joy, and abundance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.1 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/wishes"
              className="group inline-flex items-center gap-2 rounded-full border border-rosegold/55 bg-transparent px-7 py-3 font-crimson text-sm font-semibold text-ink/80 transition-all duration-300 hover:bg-rosegold/20 hover:shadow-[0_0_24px_rgba(214,178,166,0.4)]"
            >
              <span>Enter the Celebration</span>
              <span className="text-rosegold transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/cards"
              className="group inline-flex items-center gap-2 rounded-full border border-lavender/60 bg-lavender/20 px-7 py-3 font-crimson text-sm font-semibold text-ink/70 transition-all duration-300 hover:bg-lavender/40"
            >
              <span>Send a Card</span>
              <span className="text-ink/40 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </motion.div>
        </GeometricFrame>
      </div>

      {/* Corner animals */}
      <CornerSheep />
      <CornerCamel />
    </section>
  )
}