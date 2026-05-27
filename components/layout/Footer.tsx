export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="relative overflow-hidden border-t border-gold/25 bg-cream/60">
        <div className="absolute inset-x-0 top-0 h-10 opacity-50">
          <svg
            viewBox="0 0 1200 60"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Decorative star border"
          >
            <defs>
              <pattern
                id="starBorder"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <g fill="none" stroke="rgba(214,178,166,0.65)" strokeWidth="1.5">
                  <path d="M24 6 L29 19 L42 24 L29 29 L24 42 L19 29 L6 24 L19 19 Z" />
                  <path
                    d="M24 12 L27 20 L35 24 L27 28 L24 36 L21 28 L13 24 L21 20 Z"
                    opacity="0.7"
                  />
                </g>
              </pattern>
              <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="rgba(255,250,243,0)" />
                <stop offset="0.12" stopColor="rgba(255,250,243,1)" />
                <stop offset="0.88" stopColor="rgba(255,250,243,1)" />
                <stop offset="1" stopColor="rgba(255,250,243,0)" />
              </linearGradient>
            </defs>
            <rect width="1200" height="60" fill="url(#starBorder)" />
            <rect width="1200" height="60" fill="url(#fade)" opacity="0.35" />
          </svg>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6">
          <div className="grid gap-6 text-center">
            <p className="font-cinzel text-sm tracking-[0.18em] text-ink/75">
              Eid ul Adha Mubarak 1446 AH
            </p>
            <p className="font-arabic text-2xl leading-relaxed text-rosegold">
              تقبل الله منا ومنكم
            </p>
            <p className="mx-auto max-w-xl font-crimson text-sm text-ink/65">
              Made with love to celebrate the spirit of sacrifice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

