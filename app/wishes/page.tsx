import type { Metadata } from 'next'
import WishesClient from './wishes-client'

export const metadata: Metadata = {
  title: 'Light a Lantern — Qurbani Mubarak',
  description: 'Share your Eid wishes with the world as floating lanterns.',
}

export default function WishesPage() {
  return <WishesClient />
}

