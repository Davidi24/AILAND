'use client'

import { motion } from 'framer-motion'

export default function Impressum() {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white py-32 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-10 max-w-3xl w-full shadow-[0_0_40px_-10px_rgba(100,255,218,0.3)]"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
          Impressum
        </h1>

        <div className="space-y-3 text-gray-300">
          <p><strong>Responsible for content:</strong></p>
          <p>AILand Team – TU Chemnitz</p>
          <p>Reichenhainer Straße 70, 09126 Chemnitz, Germany</p>
          <p>Email: contact@ailand.com</p>
          <p>
            This website is a student project within the “Planspiel” module at Technische Universität Chemnitz.
            It is not a commercial service.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
