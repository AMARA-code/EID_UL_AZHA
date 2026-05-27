'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type NavItem = {
  href: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/wishes', label: 'Wishes' },
  { href: '/cards', label: 'Cards' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const activeHref = useMemo(() => {
    const found = NAV_ITEMS.find((i) => isActive(pathname, i.href))
    return found?.href ?? '/'
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={[
            'mt-3 rounded-2xl border transition-all',
            scrolled
              ? 'border-gold/35 bg-cream/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(26,20,34,0.10)]'
              : 'border-transparent bg-transparent',
          ].join(' ')}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-rosegold/50"
              aria-label="Qurbani Mubarak home"
            >
              <span className="text-xl text-rosegold drop-shadow-[0_6px_20px_rgba(214,178,166,0.35)]">
                ☪
              </span>
              <span className="font-cinzel text-base tracking-wide text-ink/90 group-hover:text-ink">
                Qurbani Mubarak
              </span>
            </Link>

            <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
              {NAV_ITEMS.map((item) => {
                const active = item.href === activeHref
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      'relative rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                      'text-ink/70 hover:text-ink',
                      active ? 'text-ink' : '',
                    ].join(' ')}
                  >
                    <span>{item.label}</span>
                    {active ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-rosegold"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </Link>
                )
              })}
            </nav>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-gold/30 bg-cream/60 px-3 py-2 text-sm font-medium text-ink/80 backdrop-blur sm:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <span className="sr-only">Toggle menu</span>
              <span className="font-crimson">{open ? '✕' : '☰'}</span>
            </button>
          </div>

          <AnimatePresence>
            {open ? (
              <motion.div
                id="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="sm:hidden"
              >
                <div className="px-4 pb-4 pt-1 sm:px-6">
                  <div className="rounded-2xl border border-gold/25 bg-cream/70 p-2 backdrop-blur-xl">
                    {NAV_ITEMS.map((item) => {
                      const active = isActive(pathname, item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={[
                            'flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium',
                            active ? 'bg-lavender/60 text-ink' : 'text-ink/75',
                          ].join(' ')}
                        >
                          <span>{item.label}</span>
                          <span className="text-rosegold">{active ? '✦' : '→'}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

