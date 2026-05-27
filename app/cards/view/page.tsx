import type { Metadata } from 'next'
import CardViewClient from './card-view-client'

export const metadata: Metadata = {
  title: 'Your Eid Card — Qurbani Mubarak',
  description: 'A shared Eid ul Adha greeting card.',
}

export default function CardViewPage() {
  return <CardViewClient />
}
