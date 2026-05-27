'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import StarField from '@/components/ui/StarField'
import MoonRise from '@/components/ui/MoonRise'
import ConfettiBurst from '@/components/ui/ConfettiBurst'
import AnimatedSheep3D from '@/components/ui/AnimatedSheep3D'

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
          x="3"
          y="3"
          width="94"
          height="94"
          rx="8"
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

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-86px)] items-center justify-center overflow-hidden">
      <StarField count={96} seed={11} />
      <div className="noise-overlay" />
      <ConfettiBurst />
      <MoonRise />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <GeometricFrame>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="shimmer-text font-arabic text-5xl leading-[1.2] sm:text-6xl md:text-7xl"
          >
            عيد الأضحى مبارك
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            className="mt-5 font-cinzel text-3xl tracking-wide text-ink sm:text-4xl"
          >
            Eid ul Adha Mubarak
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
            className="mx-auto mt-4 max-w-2xl font-crimson text-base text-ink/65 sm:text-lg"
          >
            May Allah accept your sacrifice and bless your family.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.1 }}
            className="mt-10 flex items-center justify-center"
          >
            <Link
              href="/wishes"
              className="group inline-flex items-center gap-2 rounded-full border border-rosegold/55 bg-transparent px-7 py-3 font-crimson text-sm font-semibold text-ink/80 transition-colors hover:bg-rosegold/20"
            >
              <span>Enter the Celebration</span>
              <span className="text-rosegold transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>
        </GeometricFrame>
      </div>

      <AnimatedSheep3D />
    </section>
  )
}
