import type { CardConfig } from '@/types'

export type PaletteColors = {
  bg: string
  fg: string
  accent: string
  soft: string
}

export const PALETTES: Record<CardConfig['palette'], PaletteColors> = {
  forest: { bg: '#f7f1f6', fg: '#1a1422', accent: '#d6b2a6', soft: '#ece8fb' },
  night: { bg: '#1f2338', fg: '#f6f1fb', accent: '#b9c2de', soft: '#343b5f' },
  dawn: { bg: '#fff7ef', fg: '#5a4740', accent: '#dbaea2', soft: '#fbe7dc' },
  desert: { bg: '#f6ead8', fg: '#5b4538', accent: '#cf8d67', soft: '#efd9bc' },
}

const TEMPLATES = new Set<CardConfig['template']>([
  'geometric',
  'crescent',
  'kabah',
  'minimal',
])
const PALETTE_KEYS = new Set<CardConfig['palette']>(['forest', 'night', 'dawn', 'desert'])

export function resolvePreviewContent(config: CardConfig) {
  return {
    to: config.to.trim() || 'Beloved Family',
    message:
      config.message.trim() ||
      'May your home be filled with mercy, peace, and joy this Eid.',
    from: config.from.trim() || 'Qurbani Mubarak',
  }
}

export function parseCardConfig(params: URLSearchParams): CardConfig {
  const templateRaw = params.get('template') ?? 'geometric'
  const paletteRaw = params.get('palette') ?? 'forest'

  return {
    template: TEMPLATES.has(templateRaw as CardConfig['template'])
      ? (templateRaw as CardConfig['template'])
      : 'geometric',
    palette: PALETTE_KEYS.has(paletteRaw as CardConfig['palette'])
      ? (paletteRaw as CardConfig['palette'])
      : 'forest',
    to: (params.get('to') ?? '').slice(0, 40),
    message: (params.get('message') ?? '').slice(0, 100),
    from: (params.get('from') ?? '').slice(0, 40),
  }
}

export function buildCardShareUrl(config: CardConfig, origin?: string): string {
  const base =
    origin?.replace(/\/$/, '') ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    ''

  const q = new URLSearchParams({
    template: config.template,
    palette: config.palette,
    to: config.to,
    message: config.message,
    from: config.from,
  })

  if (!base) return `/cards/view?${q.toString()}`
  return `${base}/cards/view?${q.toString()}`
}
