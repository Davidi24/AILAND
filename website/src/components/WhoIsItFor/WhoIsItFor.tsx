'use client'

import SchoolIcon from '@mui/icons-material/School'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { motion } from 'framer-motion'
import SectionTitle from '@/Layouts/SectionTitle'

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
      className="relative flex flex-col items-center px-4 sm:px-6 justify-center mx-auto max-w-7xl overflow-hidden"
    >
      <SectionTitle
        title="Who’s It For"
        subtitle="Built for researchers, enterprises, and educators—map networks, model insights, and teach in 3D."
      />

      <div className="mt-15 relative w-full max-w-6xl px-2 sm:px-10">
        {/* connecting line */}
        <div
          className="hidden md:block absolute left-0 right-0 top-1/2 h-[1px] 
          bg-gradient-to-r from-white via-black/55 to-white dark:from-violet-300 dark:via-emerald-300   dark:to-violet-300 opacity-90
          [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]
          [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        />

        {/* dots */}
        <div className="hidden md:grid pointer-events-none absolute inset-x-10 top-1/2 grid-cols-3 -translate-y-1/2 z-10">
          {items.map((_, i) => (
            <span
              key={`dot-${i}`}
              className="mx-auto block w-2.5 h-2.5 rounded-full bg-white dark:bg-white ring-2 ring-gray-300 dark:ring-white/30 shadow-[0_0_12px_rgba(0,0,0,0.3)] dark:shadow-[0_0_12px_rgba(255,255,255,0.7)]"
            />
          ))}
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 items-start">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center px-4 sm:px-6"
            >
              {/* glowing circle */}
              <div className="relative mb-6 sm:mb-10">
                {/* soft glow behind */}
                <div className="absolute inset-0 blur-2xl opacity-60 bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400 rounded-full" />

                {/* gradient border wrapper */}
                <div className="p-[3px] rounded-full bg-gradient-to-r from-emerald-300 to-violet-300 dark:bg-none">
                  {/* inner circle */}
                  <div
                    className="w-20 h-20 sm:w-23 sm:h-23 flex items-center justify-center rounded-full
      bg-gray-100 dark:bg-gray-900/60
      shadow-[0_0_30px_rgba(150,250,200,0.15)] dark:shadow-[0_0_30px_rgba(150,250,200,0.15)]
      backdrop-blur-md hover:scale-105 transition-transform duration-500"
                  >
                    <div className="text-gray-700 dark:text-white/90">{item.icon}</div>
                  </div>
                </div>
              </div>


              {/* title */}
              <h3
                className="mt-3 sm:mt-10 text-base sm:text-lg font-semibold 
                bg-gradient-to-r from-black/80 to-black/80 dark:from-violet-300 dark:to-emerald-300 
                bg-clip-text text-transparent"
              >
                {item.title}
              </h3>

              {/* points */}
              <ul
                className="mt-1 sm:mt-2 space-y-1 text-gray-500 dark:text-gray-400 text-sm sm:text-base"
              >
                {item.points.map((p, j) => (
                  <li
                    key={j}
                    className="hover:text-gray-900 dark:hover:text-white transition"
                  >
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
