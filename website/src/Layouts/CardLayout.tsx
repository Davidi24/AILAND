'use client'

import { useRef } from 'react'

type Props = {
  children: React.ReactNode
  dark?: boolean
  maxWidth?: string
  minWidth?: string
  padding?: string
}

export default function CardLayout({ children, maxWidth, minWidth, padding }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button, svg')) return
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
  className={`relative w-full 
  ${maxWidth ? `max-w-[${maxWidth}]` : 'max-w-md'} 
  ${minWidth ? `min-w-[${minWidth}]` : ''} 
  rounded-2xl border backdrop-blur transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
  will-change-transform hover:-translate-y-1
  border-black/5 bg-white/10 supports-backdrop-filter:bg-white/30 shadow-sm 
  hover:bg-white/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]
  dark:border-white/10 dark:bg-white/5 
  dark:hover:bg-white/10 dark:hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]`}
>

        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
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
          className={`absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none
          bg-linear-to-br from-white/70 via-white/25 to-white/10
          dark:from-white/10 dark:via-transparent dark:to-white/5`}
          style={{ transform: 'translateZ(1px)' }}
        />

        <div
          className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(200px 200px at var(--mx,50%) var(--my,50%), rgba(255,255,255,.22), transparent 70%)',
            transform: 'translateZ(2px)',
          }}
        />

        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-85 transition-opacity duration-500 dark:opacity-80 dark:group-hover:opacity-100 pointer-events-none"
          style={{
            background:
              'radial-gradient(230px 230px at var(--mx,50%) calc(var(--my,50%) + 40px), rgba(110,110,110,0.25), transparent 85%)',
            transform: 'translateZ(2px)',
          }}
        />

        <div
          className={`relative ${padding ? `p-[${padding}]` : 'p-6'} pointer-events-auto`}
          style={{ transform: 'translateZ(20px)' }}
        >

          {children}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}