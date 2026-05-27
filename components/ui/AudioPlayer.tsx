'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Status = 'idle' | 'playing' | 'error'

export default function AudioPlayer({
  src = '/sounds/takbeer.mp3',
}: {
  src?: string
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [available, setAvailable] = useState<boolean | null>(null)

  const audio = useMemo(() => {
    if (typeof window === 'undefined') return null
    return new Audio(src)
  }, [src])

  useEffect(() => {
    if (!audio) return
    audio.preload = 'auto'
    audioRef.current = audio

    const onEnded = () => setStatus('idle')
    const onError = () => {
      setStatus('error')
      setErrorMsg(
        "Audio couldn't be played. Add `public/sounds/takbeer.mp3` or try again.",
      )
    }

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.pause()
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [audio])

  useEffect(() => {
    let active = true
    const check = async () => {
      try {
        const res = await fetch(src, { method: 'HEAD' })
        if (!active) return
        setAvailable(res.ok)
        if (!res.ok) {
          setErrorMsg(
            'Takbeer file not found. Add `takbeer.mp3` to `public/sounds/`.',
          )
        }
      } catch {
        if (!active) return
        setAvailable(false)
        setErrorMsg(
          'Could not access takbeer file. Add `takbeer.mp3` to `public/sounds/`.',
        )
      }
    }
    void check()
    return () => {
      active = false
    }
  }, [src])

  const playing = status === 'playing'

  async function toggle() {
    setErrorMsg(null)
    const a = audioRef.current
    if (!a) return
    if (available === false) {
      setStatus('error')
      setErrorMsg('Takbeer file missing at `/sounds/takbeer.mp3`.')
      return
    }

    if (playing) {
      a.pause()
      a.currentTime = 0
      setStatus('idle')
      return
    }

    try {
      a.currentTime = 0
      await a.play()
      setStatus('playing')
    } catch {
      setStatus('error')
      setErrorMsg(
        "Audio couldn't be played (browser blocked autoplay or file missing).",
      )
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        disabled={available === false}
        className={[
          'group relative inline-flex items-center justify-center rounded-full px-6 py-3',
          'border border-rosegold/55 bg-cream/70 text-sm font-semibold text-ink/85',
          'shadow-[0_18px_60px_rgba(214,178,166,0.25)] backdrop-blur',
          'transition-transform hover:-translate-y-0.5 active:translate-y-0',
          'disabled:cursor-not-allowed disabled:opacity-60',
          playing ? 'animate-pulse-gold' : '',
        ].join(' ')}
      >
        <span className="mr-2 text-rosegold">🔊</span>
        {playing ? 'Stop Takbeer' : 'Play Takbeer'}
        <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(214,178,166,0.45),rgba(214,178,166,0.0)_70%)] opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
      </button>

      {errorMsg ? (
        <p className="max-w-xs text-center font-crimson text-xs text-ink/60">
          {errorMsg}
        </p>
      ) : null}
    </div>
  )
}

