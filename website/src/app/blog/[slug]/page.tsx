import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params  // ✅ unwrap the Promise

  console.log('slug:', slug)
  console.log('file path:', path.join(process.cwd(), 'src/app/blog/posts', `${slug}.md`))

  const postsDir = path.join(process.cwd(), 'src/app/blog/posts')
  const filePath = path.join(postsDir, `${slug}.md`)

  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white pt-24 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400">
          {data.title}
        </h1>
        <p className="text-sm text-gray-400 mb-8">{data.date}</p>
        <div className="prose prose-invert prose-emerald max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
