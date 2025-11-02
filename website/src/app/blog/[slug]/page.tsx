
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const postsDir = path.join(process.cwd(), 'src/app/blog/posts')
  const filePath = path.join(postsDir, `${slug}.md`)

  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(80,200,180,0.08),transparent_70%)]" />

      <article className="relative max-w-4xl mx-auto px-6 pt-32 pb-32">
        {data.image && (
          <div className="relative w-full h-[380px] rounded-2xl overflow-hidden mb-10 shadow-[0_0_30px_rgba(130,80,255,0.2)]">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}

        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-widest text-emerald-400/80 mb-2">{data.tag}</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400">
            {data.title}
          </h1>
          <p className="text-sm text-gray-400">{data.date}</p>
        </div>

        <div className="prose prose-invert prose-emerald max-w-none prose-img:rounded-xl prose-headings:text-white prose-p:text-gray-300">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
