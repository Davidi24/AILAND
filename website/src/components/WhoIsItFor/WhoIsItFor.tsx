'use client'

import SchoolIcon from '@mui/icons-material/School'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { motion } from 'framer-motion'

export default function WhoIsItFor() {
  const items = [
    {
      icon: <SchoolIcon fontSize="large" />,
      title: 'Researchers & Scientists',
      points: ['Map citation networks', 'Explore protein links', 'Collaborate globally'],
    },
    {
      icon: <BusinessCenterIcon fontSize="large" />,
      title: 'Enterprises & Business Analysts',
      points: ['Optimize supply chains', 'Model financial risks', 'Map customer journeys'],
    },
    {
      icon: <MenuBookIcon fontSize="large" />,
      title: 'Education & e-Learning',
      points: ['Create visual lessons', 'Design AR exhibits', 'Engage students easily'],
    },
  ]

  return (
    <section
      id="who"
      className="relative flex flex-col items-center justify-center overflow-hidden py-40"
    >
      

      <div className="relative w-full max-w-6xl px-10">
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-violet-300 to-emerald-300 opacity-90
  [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]
  [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" />



        {/* dots exactly under each circle on the line */}
        <div className="pointer-events-none absolute inset-x-10 top-1/2 grid grid-cols-3 -translate-y-1/2 z-10">
          {items.map((_, i) => (
            <span
              key={`dot-${i}`}
              className="mx-auto block w-2.5 h-2.5 rounded-full bg-white ring-2 ring-white/30 shadow-[0_0_12px_rgba(255,255,255,0.7)]"
            />
          ))}
        </div>

        {/* content in the same 3 columns to keep perfect alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 items-start">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-10">
                <div className="absolute inset-0 blur-2xl opacity-60 bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400 rounded-full" />
                <div className="w-23 h-23 flex items-center justify-center rounded-full bg-gray-900/60 border border-white/10 shadow-[0_0_30px_rgba(150,250,200,0.15)] backdrop-blur-md hover:scale-105 transition-transform duration-500">
                  <div className="text-white/90">{item.icon}</div>
                </div>
              </div>

              <h3 className="mt-10 text-lg font-semibold bg-gradient-to-r from-violet-300 to-emerald-300 bg-clip-text text-transparent">
                {item.title}
              </h3>
              <ul className="mt-2 space-y-1 text-gray-400 text-sm">
                {item.points.map((p, j) => (
                  <li key={j} className="hover:text-white transition">
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
