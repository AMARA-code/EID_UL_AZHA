import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './types/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pastel "Qurbani Mubarak" palette (CSS variables live in styles/globals.css)
        forest: 'rgb(var(--forest) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        terra: 'rgb(var(--terra) / <alpha-value>)',
        parchment: 'rgb(var(--parchment) / <alpha-value>)',
        dark: 'rgb(var(--dark) / <alpha-value>)',

        // Extra semantic pastels (optional but handy)
        blush: 'rgb(var(--blush) / <alpha-value>)',
        lavender: 'rgb(var(--lavender) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        rosegold: 'rgb(var(--rosegold) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        crimson: ['var(--font-crimson)', 'serif'],
        arabic: ['var(--font-arabic)', 'serif'],
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        sway: 'sway 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 1.5s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(214, 178, 166, 0.0)' },
          '50%': { boxShadow: '0 0 24px rgba(214, 178, 166, 0.55)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

