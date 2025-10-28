'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import Card from './Caard'
import items from './data'

export default function Services() {
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme === 'dark'

  const cardRefs = useRef<HTMLDivElement[]>([])
  const [lineVisible, setLineVisible] = useState(false)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ioCards = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('opacity-0', 'translate-y-6')
          e.target.classList.add('opacity-100', 'translate-y-0')
        }
      })
    }, { threshold: 0.25 })
    cardRefs.current.forEach(el => el && ioCards.observe(el))

    const ioLine = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && setLineVisible(true))
    }, { threshold: 0 })
    if (lineRef.current) {
      ioLine.observe(lineRef.current)
      requestAnimationFrame(() => {
        const r = lineRef.current!.getBoundingClientRect()
        const inView = r.top <= window.innerHeight
        if (inView) setLineVisible(true)
      })
    }

    return () => {
      ioCards.disconnect()
      ioLine.disconnect()
    }
  }, [])

  return (
    <section className="relative min-h-[110vh] overflow-hidden transition-colors duration-500 text-black dark:text-white">
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="text-center mb-14">
          <h2
            className={`text-4xl font-bold tracking-tight bg-linear-to-r bg-clip-text text-transparent ${
              dark
                ? 'from-emerald-300 via-violet-300 to-emerald-300'
                : 'from-emerald-400 via-violet-400 to-emerald-400'
            }`}
          >
            Our Services
          </h2>
        </div>

        <div
          ref={lineRef}
          className={`pointer-events-none absolute inset-0 hidden sm:flex justify-center mt-24 transition-all duration-1800 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
            lineVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
        >
          <div className="relative h-full w-[3px] overflow-visible">
            <div
              className={`absolute inset-0 rounded-full bg-linear-to-b ${
                dark
                  ? 'from-emerald-300 via-violet-300 to-emerald-300'
                  : 'from-emerald-400 via-violet-400 to-emerald-400'
              } animate-pulse-slow`}
              style={{
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0, transparent 80px, black 130px, black calc(100% - 40px), transparent 100%)',
                maskImage:
                  'linear-gradient(to bottom, transparent 0, transparent 80px, black 130px, black calc(100% - 40px), transparent 100%)',
              }}
            />
            <div
              className="absolute left-1/2 top-0 h-full w-[22px] -translate-x-1/2 blur-2xl"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(139,92,246,0.40), rgba(16,185,129,0.40), rgba(139,92,246,0.40))',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0, transparent 80px, black 130px, black calc(100% - 40px), transparent 100%)',
                maskImage:
                  'linear-gradient(to bottom, transparent 0, transparent 80px, black 130px, black calc(100% - 40px), transparent 100%)',
              }}
            />
          </div>
        </div>

        <div className="space-y-10 relative">
          {items.map((it, idx) => (
            <div
              key={it.title}
              ref={el => {
                if (el) cardRefs.current[idx] = el
              }}
              className={`opacity-0 translate-y-6 transition-all duration-700 ${
                idx % 2
                  ? 'flex justify-end sm:translate-x-0 translate-x-3'
                  : 'flex justify-start sm:translate-x-0 -translate-x-3'
              }`}
            >
              <Card
                icon={it.icon}
                title={it.title}
                text={it.text}
                align={idx % 2 ? 'right' : 'left'}
                dark={dark}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0% { opacity: .6; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.02); }
          100% { opacity: .6; transform: scaleY(1); }
        }
        .animate-pulse-slow { animation: pulse-slow 3.5s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
