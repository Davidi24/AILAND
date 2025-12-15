'use client'

export default function Blurs() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-violet-400/25 blur-[100px]" />
      <div className="absolute -right-64 top-60 h-72 w-72 rounded-full bg-violet-500/30 blur-[100px]" />
      <div className="absolute -right-20 bottom-56 h-64 w-64 rounded-full bg-emerald-400/25 blur-[90px]" />
      <div className="absolute -left-28 top-48 h-72 w-72 rounded-full bg-emerald-400/30 blur-[100px]" />
      <div className="absolute -left-40 bottom-64 h-64 w-64 rounded-full bg-sky-400/25 blur-[90px]" />
    </div>
  )
}
