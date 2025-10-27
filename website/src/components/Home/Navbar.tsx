'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'next-themes'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#who', label: "Who's it for" },
  { href: '#subscription', label: 'Subscription' },
  { href: '#team', label: 'Our Team' },
  { href: '#contact', label: 'Contact' },
  { href: '#blog', label: 'Blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('#home')
  const sectionIds = useMemo(() => links.map(l => l.href.replace('#', '')), [])
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    const ids = sectionIds
    const getCurrent = () => {
      const y = window.scrollY + window.innerHeight / 2
      let current: string = '#home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if (y >= top && y < bottom) {
          current = `#${id}`
          break
        }
      }
      setActive(current)
    }
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          getCurrent()
          ticking = false
        })
        ticking = true
      }
    }
    getCurrent()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', getCurrent)
    window.addEventListener('hashchange', getCurrent)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', getCurrent)
      window.removeEventListener('hashchange', getCurrent)
    }
  }, [sectionIds])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mt-4 flex h-14 items-center justify-between rounded-3xl border px-4 sm:px-6 backdrop-blur-xl border-black/5 bg-white/10 supports-[backdrop-filter]:bg-white/30 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-0 leading-none -ml-2 sm:-ml-4">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/assets/icons/ailand-a-logo.svg"
                alt="AILand logo"
                className="h-20 w-20 shrink-0"
              />
            </Link>
            <span className="hidden sm:block text-sm font-medium tracking-wide text-gray-800 dark:text-white" />
          </div>

          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl sm:hidden text-gray-900 hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ul className="hidden sm:flex items-center gap-6 md:gap-8">
            {links.map(l => {
              const isActive = active === l.href
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setActive(l.href)}
                    className={`group relative text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white/70 dark:hover:text-white ${isActive ? 'text-gray-900 dark:text-white' : ''}`}
                  >
                    {l.label}
                    <span
                      className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-emerald-300 to-violet-300 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="#signup"
              className="rounded-xl px-4 py-2 text-sm font-medium shadow-[0_8px_30px_-10px_rgba(99,102,241,0.45)] transition text-white dark:text-black bg-gradient-to-r from-emerald-300 to-violet-300 hover:shadow-[0_16px_40px_-12px_rgba(16,185,129,0.55)]"
            >
              Sign up
            </Link>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border transition border-black/10 bg-white/80 text-black hover:bg-black/5 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/15"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
              <svg viewBox="0 0 24 24" className="hidden h-5 w-5 dark:block" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`sm:hidden fixed top-20 right-4 w-[50%] max-w-xs rounded-2xl border px-5 py-4 backdrop-blur backdrop-saturate-150 transition-all duration-300 ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'} border-black/5 bg-white/5 supports-[backdrop-filter]:bg-white/55 shadow-sm dark:border-white/10 dark:bg-black/20`}
      >
        <ul className="flex flex-col text-left divide-y w-full divide-black/10 dark:divide-white/10">
          {links.map(l => {
            const isActive = active === l.href
            return (
              <li key={l.href} className="py-2">
                <Link
                  href={l.href}
                  onClick={() => {
                    setActive(l.href)
                    setOpen(false)
                  }}
                  className={`block w-full text-base font-medium text-black/60 dark:text-white/90 ${isActive ? 'text-black dark:text-white' : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-4 flex items-center justify-end gap-3">
          <Link
            href="#signup"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-2 text-sm font-medium shadow-[0_8px_30px_-10px_rgba(99,102,241,0.45)] text-white dark:text-black bg-gradient-to-r from-emerald-300 to-violet-300"
          >
            Sign up
          </Link>
          <button
            onClick={() => {
              toggleTheme()
              setOpen(false)
            }}
            aria-label="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/10 text-white hover:bg-white/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
            <svg viewBox="0 0 24 24" className="hidden h-5 w-5 dark:block" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41-1.41M17.66 17.66l1.41-1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
