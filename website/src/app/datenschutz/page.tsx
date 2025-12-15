'use client'

import { motion } from 'framer-motion'

export default function Datenschutz() {
  return (
    <div className="relative min-h-screen flex items-center justify-center  text-white py-32 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-10 max-w-3xl w-full shadow-[0_0_40px_-10px_rgba(167,139,250,0.3)]"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
          Datenschutzerklärung
        </h1>

        <div className="space-y-3 text-gray-300">
          <p>
            We respect your privacy. This website does not collect personal data unless you
            voluntarily provide it through a contact form.
          </p>
          <p>
            External services (e.g., Google Fonts, YouTube embeds, analytics tools)
            are only used if technically necessary or after your consent.
          </p>
          <p>
            All data collected is used solely for educational and non-commercial purposes
            within the AILand project at TU Chemnitz.
          </p>
          <p>
            For any questions, contact us at <strong>contact@ailand.com</strong>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
