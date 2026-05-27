import type { Metadata } from 'next'
import CardsClient from './cards-client'

export const metadata: Metadata = {
  title: 'Create Your Eid Card — Qurbani Mubarak',
  description: 'Design and download beautiful Eid ul Adha greeting cards.',
}

export default function CardsPage() {
  return <CardsClient />
}

