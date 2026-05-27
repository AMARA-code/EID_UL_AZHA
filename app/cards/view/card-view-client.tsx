'use client'

import { Suspense, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import EidCardPreview from '@/components/cards/EidCardPreview'
import { parseCardConfig } from '@/lib/card-theme'

function CardViewInner() {
  const params = useSearchParams()
  const config = useMemo(() => parseCardConfig(params), [params])

  return (
    <div className="flex min-h-[calc(100vh-86px)] flex-col items-center justify-center px-4 py-8">
      <EidCardPreview config={config} />
      <Link
        href="/cards"
        className="mt-6 font-crimson text-xs text-ink/50 underline-offset-2 hover:text-ink/70 hover:underline"
      >
        Create your own card
      </Link>
    </div>
  )
}

export default function CardViewClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-86px)] items-center justify-center font-crimson text-sm text-ink/60">
          Loading card…
        </div>
      }
    >
      <CardViewInner />
    </Suspense>
  )
}
