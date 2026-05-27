'use client'

import { motion } from 'framer-motion'

export default function MoonRise() {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2.5, ease: 'easeOut' }}
      className="pointer-events-none absolute right-6 top-10 z-10 sm:right-12 sm:top-14"
      aria-hidden="true"
    >
      <div className="relative">
        <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(214,178,166,0.55),rgba(214,178,166,0.0)_65%)] blur-2xl" />
        <svg
          width="180"
          height="180"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="moonG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(236,232,251,0.95)" />
              <stop offset="0.55" stopColor="rgba(255,250,243,0.95)" />
              <stop offset="1" stopColor="rgba(214,178,166,0.9)" />
            </linearGradient>
          </defs>
          {/* Crescent: big circle - smaller offset circle */}
          <path
            d="M120 28c-8 5-22 16-28 38-6 22-1 47 15 65 16 18 41 25 65 20-11 20-33 34-58 34-38 0-69-31-69-69 0-34 25-62 57-68 6-1 12-1 18 0z"
            fill="url(#moonG)"
            opacity="0.95"
          />
          <g fill="rgba(214,178,166,0.85)">
            <path d="M155 64 l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
            <path
              d="M132 108 l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"
              opacity="0.75"
            />
          </g>
        </svg>
      </div>
    </motion.div>
  )
}

