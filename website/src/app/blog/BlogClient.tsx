'use client'

import dynamic from 'next/dynamic'
import SectionTitle from '@/Layouts/SectionTitle'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import CardLayout from '@/Layouts/CardLayout'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function BlogClient({ posts }: { posts: any[] }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

    useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pb-32 px-4">
      <SectionTitle
        title="AILand Blog"
        subtitle="Stories, reports, and insights from our journey in AI-powered immersive knowledge visualization."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center max-w-6xl"
      >
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative w-[250px] sm:w-[270px] rounded-xl p-[1px] transition-all"
          >
            <CardLayout  maxWidth="max-w-full"  minWidth="full">
              <div className="-m-6 relative rounded-2xl overflow-hidden flex flex-col h-full">
                {post.image && (
                  <div className="relative h-32 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                )}

                <div
                  className={`relative z-10 p-4 flex flex-col justify-between flex-grow ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  <div>
                    <div
                      className={`flex items-center justify-between text-[9px] ${
                        isDark ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      <span className="uppercase tracking-wider">{post.tag}</span>
                      <span>{post.date}</span>
                    </div>

                    <h2 className="text-base font-semibold mt-4 mb-1 bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                      {post.title}
                    </h2>

                    <p
                      className={`text-[11px] leading-relaxed line-clamp-3 ${
                        isDark ? 'text-white/60' : 'text-gray-600'
                      }`}
                    >
                      {post.excerpt}
                    </p>
                  </div>

                  <div
                    className={`flex items-center justify-between mt-4 text-xs ${
                      isDark ? 'text-white/60' : 'text-gray-600'
                    }`}
                  >
                    <p className={`${isDark ? 'text-white/80' : 'text-gray-800'} text-[9px]`}>
                      {post.author || 'AILand Team'}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={`relative bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent font-medium after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 ${
                        isDark ? 'after:bg-white/80' : 'after:bg-gray-800/50'
                      } after:transition-all after:duration-300 hover:after:w-full`}
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </CardLayout>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
