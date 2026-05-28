import type { Metadata } from 'next'
import { Cinzel_Decorative, Crimson_Pro, Noto_Naskh_Arabic } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/ui/PageTransition'

const cinzel = Cinzel_Decorative({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
})

const crimson = Crimson_Pro({
  variable: '--font-crimson',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const arabic = Noto_Naskh_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eid-ul-azha-bice.vercel.app'
const SITE_TITLE = 'Qurbani Mubarak — Send Eid ul Adha Cards & Wishes 🏮'
const SITE_DESCRIPTION =
'Light a lantern, float a wish, and send a beautiful Eid ul Adha card to your loved ones. Celebrate Qurbani with heartfelt greetings. 🏮'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Qurbani Mubarak',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Eid ul Adha', 'Qurbani Mubarak', 'Eid wishes', 'Eid card', 'Eid 2026',
    'عيد الأضحى', 'قرباني مبارک', 'Eid greetings', 'Islamic celebration',
  ],

  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Qurbani Mubarak',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_PK',
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${crimson.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-forest text-ink">
        <Navbar />
        <main className="flex-1 pt-[86px]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}