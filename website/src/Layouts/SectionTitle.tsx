'use client'

import { motion } from 'framer-motion'

type Props = {
  title: string
  subtitle: string
}

export default function SectionTitle({ title, subtitle }: Props) {
  const words = title.split(' ')
  const lastWord = words.pop()
  const firstWords = words.join(' ')

  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl font-semibold tracking-tight text-gray-800 dark:text-white sm:text-5xl flex justify-center space-x-3 leading-[1.15]
"
      >
        {firstWords && <div>{firstWords}</div>}
        {lastWord && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-emerald-300">
            {lastWord}
          </span>
        )}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-1 text-lg leading-8 text-gray-600 dark:text-white/70"
      >
        {subtitle}
      </motion.p>
    </div>
  )
}
