import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'

export const metadata: Metadata = {
  title: 'Qurbani Mubarak — Eid ul Adha',
  description:
    'A luminous Eid ul Adha celebration: moonrise, wishes wall, and card maker.',
}

export default function Home() {
  return <HeroSection />
}
