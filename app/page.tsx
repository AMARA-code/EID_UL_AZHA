import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'

export const metadata: Metadata = {
  title: 'Qurbani Mubarak — Eid ul Adha',
  description:
    'A luminous Eid ul Adha celebration: moonrise, wishes wall, card maker, and giving.',
}

export default function Home() {
  return <HeroSection />
}
