'use client'

import { motion } from 'framer-motion'

function Leg({ delay }: { delay: number }) {
  return (
    <motion.div
      className="h-7 w-2.5 origin-top rounded-full bg-ink/35"
      animate={{ rotateX: [18, -22, 18] }}
      transition={{
        duration: 0.55,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{ transformStyle: 'preserve-3d' }}
    />
  )
}

function WoolPuff({
  x,
  y,
  size,
  z,
}: {
  x: number
  y: number
  size: number
  z: number
}) {
  return (
    <div
      className="absolute rounded-full bg-gradient-to-br from-cream to-lavender/80 shadow-[inset_-4px_-4px_10px_rgba(26,20,34,0.12)]"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `translateZ(${z}px)`,
      }}
    />
  )
}

export default function AnimatedSheep3D() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(255,250,243,0),rgba(236,232,251,0.75))]" />

      <motion.div
        className="absolute bottom-8 left-0"
        animate={{ x: ['-12vw', '88vw', '-12vw'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          style={{ perspective: 900, transformStyle: 'preserve-3d' }}
          animate={{ rotateY: [0, 0, 180, 180, 0] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.48, 0.52, 0.96, 1],
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0, -4, 0], rotateZ: [-2, 2, -2] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="relative h-24 w-44"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <WoolPuff x={8} y={18} size={34} z={8} />
              <WoolPuff x={34} y={8} size={40} z={14} />
              <WoolPuff x={62} y={14} size={36} z={10} />
              <WoolPuff x={88} y={22} size={30} z={6} />
              <WoolPuff x={108} y={30} size={24} z={4} />

              <motion.div
                className="absolute left-[118px] top-[22px] h-9 w-11 rounded-full bg-gradient-to-br from-cream to-blush/70"
                style={{ transform: 'translateZ(20px)' }}
                animate={{ rotateZ: [-4, 4, -4] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute right-1 top-2 h-2 w-2 rounded-full bg-ink/70" />
                <div className="absolute right-0 top-1 h-4 w-3 rounded-full bg-ink/25" />
              </motion.div>

              <div
                className="absolute bottom-0 left-6 flex gap-3"
                style={{ transform: 'translateZ(12px) rotateX(28deg)' }}
              >
                <Leg delay={0} />
                <Leg delay={0.27} />
                <Leg delay={0.13} />
                <Leg delay={0.4} />
              </div>

              <motion.div
                className="absolute -left-1 top-8 h-3 w-8 rounded-full bg-ink/20"
                style={{ transform: 'translateZ(2px)' }}
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
