'use client'

import SectionTitle from '@/Layouts/SectionTitle'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'


export default function BlogClient({ posts }: { posts: any[] }) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-32 pb-32 px-4">
  
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
                        className="group relative w-[250px] sm:w-[270px] rounded-xl p-[1px] bg-gradient-to-br from-emerald-400/25 via-violet-400/25 to-emerald-400/25 hover:from-emerald-400/50 hover:to-violet-400/50 transition-all"
                    >
                        <div className="relative bg-black/50 dark:bg-black/70 backdrop-blur-2xl rounded-xl overflow-hidden flex flex-col h-full">

                            {/* Date top-right */}
                            <div className="absolute top-2 right-3 text-[10px] text-white/60">
                                {post.date}
                            </div>

                            {/* Blog image */}
                            {post.image && (
                                <div className="relative h-32 w-full overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                                </div>
                            )}

                            {/* Text content */}
                            <div className="relative z-10 p-4 flex flex-col justify-between flex-grow">
                                <div>
                                    <span className="text-[9px] uppercase tracking-wider text-white/80">
                                        {post.tag}
                                    </span>
                                    <h2 className="text-base font-semibold mt-2 mb-1 bg-gradient-to-r from-emerald-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
                                        {post.title}
                                    </h2>
                                    <p className="text-white/60 text-[11px] leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4 text-xs text-white/60">
                                    <p className="text-white/80 text-[9px]">{post.author || 'AILand Team'}</p>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="relative bg-gradient-to-r from-emerald-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent font-medium after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        Read →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
