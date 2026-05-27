'use client'

import type { Wish } from '@/types'
import WishCard from '@/components/sections/WishCard'

export default function LanternWall({
  wishes,
  onOpen,
}: {
  wishes: Wish[]
  onOpen: (wish: Wish) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {wishes.map((w) => (
        <WishCard key={w.id} wish={w} onOpen={onOpen} />
      ))}
    </div>
  )
}

