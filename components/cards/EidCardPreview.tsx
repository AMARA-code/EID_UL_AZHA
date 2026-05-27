import type { CardConfig } from '@/types'
import { PALETTES, resolvePreviewContent } from '@/lib/card-theme'
import TemplateArtwork from '@/components/cards/TemplateArtwork'

export default function EidCardPreview({
  config,
  className = '',
}: {
  config: CardConfig
  className?: string
}) {
  const palette = PALETTES[config.palette]
  const content = resolvePreviewContent(config)

  return (
    <div
      className={[
        'relative overflow-hidden rounded-[24px] border shadow-[0_28px_80px_rgba(26,20,34,0.18)]',
        className,
      ].join(' ')}
      style={{
        width: 400,
        height: 560,
        borderColor: palette.accent,
        color: palette.fg,
      }}
    >
      <TemplateArtwork template={config.template} palette={palette} />
      <div className="absolute inset-0 p-8">
        <div
          className="absolute inset-3 rounded-[20px] border"
          style={{ borderColor: palette.accent }}
        />
        <div className="relative flex h-full flex-col justify-between text-center">
          <div>
            <p className="font-arabic text-[30px]" style={{ color: palette.accent }}>
              عيد الأضحى مبارك
            </p>
            <p className="mt-3 font-cinzel text-lg tracking-wide">To: {content.to}</p>
          </div>
          <p className="mx-auto max-w-[290px] font-crimson text-[18px] leading-relaxed">
            {content.message}
          </p>
          <p className="font-cinzel text-lg">From: {content.from}</p>
        </div>
      </div>
    </div>
  )
}
