'use client'

import { useRef } from 'react'

type Props = {
  icon: string
  title: string
  text: string
  align: 'left' | 'right'
  dark?: boolean
}

export default function Card({ icon, title, text, align }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const sideClass = align === 'right' ? '-left-16' : '-right-16'
  const gradDir = align === 'right' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
  const dotSide = align === 'right' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    const px = x / r.width - 0.5
    const py = y / r.height - 0.5
    el.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 8).toFixed(2)}deg`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', `0deg`)
    el.style.setProperty('--ry', `0deg`)
  }

  return (
    <div
      className="group perspective-1000"
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={ref}
        className={`relative w-full max-w-md rounded-2xl border backdrop-blur-2xl
        transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
        will-change-transform hover:-translate-y-1
        bg-white/40 border-white/60 shadow-[0_22px_80px_rgba(2,6,23,0.14)]
        dark:bg-white/10 dark:border-white/10 dark:shadow-[0_14px_60px_rgba(0,0,0,0.42)]`}
        style={{
          transform: 'rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(16,185,129,.55), rgba(139,92,246,.55), rgba(16,185,129,.55))',
            filter: 'blur(8px)',
            mask: 'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
            WebkitMask: 'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: 1,
            transform: 'translateZ(1px)',
            animation: 'spin 8s linear infinite',
          }}
        />

        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-700
          bg-linear-to-br from-white/70 via-white/25 to-white/10
          dark:from-white/10 dark:via-transparent dark:to-white/5`}
          style={{ transform: 'translateZ(1px)' }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-0 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(200px 200px at var(--mx,50%) var(--my,50%), rgba(255,255,255,.22), transparent 70%)',
            transform: 'translateZ(2px)',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-85 transition-opacity duration-500 dark:opacity-80 dark:group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(230px 230px at var(--mx,50%) calc(var(--my,50%) + 40px), rgba(110,110,110,0.25), transparent 85%)',
            transform: 'translateZ(2px)',
          }}
        />

        <div className={`absolute top-1/2 ${sideClass} h-0.5 w-16 -translate-y-1/2`} style={{ transform: 'translateZ(30px)' }}>
          <div className={`h-0.5 w-full ${gradDir} from-emerald-300 to-violet-300 opacity-70 group-hover:opacity-100`} />
          <span className={`absolute top-1/2 ${dotSide} -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white ring-2 ring-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.6)]`} />
          <span
            className={`pointer-events-none absolute top-1/2 ${dotSide} -translate-y-1/2 h-6 w-6 rounded-full blur-md`}
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.35), rgba(139,92,246,0.25) 60%, transparent)' }}
          />
        </div>

        <div className="relative p-6" style={{ transform: 'translateZ(20px)' }}>
          <div className="mb-3 flex items-center gap-3">
            <div
              className={[
                'relative grid h-10 w-10 place-items-center rounded-full ring-1 transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)]',
                'group-hover:scale-105',
                'bg-sky-200/60 ring-sky-300',
                'group-hover:ring-transparent group-hover:shadow-[0_0_24px_rgba(139,92,246,0.24),0_0_18px_rgba(16,185,129,0.22)]',
                'dark:bg-cyan-300/10 dark:ring-cyan-100/20',
              ].join(' ')}
              style={{ transform: 'translateZ(25px)' }}
            >
              <span className="text-slate-900 dark:text-white text-lg">{icon}</span>
              <span className="pointer-events-none absolute inset-0 rounded-full blur-xl transition-opacity duration-700 dark:bg-cyan-200/25" />
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h3>
          </div>

          <div className="relative overflow-hidden transition-[max-height,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-12 group-hover:max-h-40 group-hover:drop-shadow-sm">
            <p className="text-slate-700 dark:text-white/80 text-sm leading-relaxed">{text}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}