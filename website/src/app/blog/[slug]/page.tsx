import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import CardLayout from '@/Layouts/CardLayout'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const postsDir = path.join(process.cwd(), 'src/app/blog/posts')
  const filePath = path.join(postsDir, `${slug}.md`)


  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return (
    <div className="flex flex-col items-center justify-start overflow-hidden px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-6">
      <CardLayout maxWidth="max-w-full" padding="0rem">
        <article className="relative w-full mx-auto transition-colors duration-300">
          {data.image && (
            <div className="relative w-full overflow-hidden mb-0 group rounded-t-2xl">
              <div className="relative w-full h-[180px] sm:h-[220px] md:h-[240px] lg:h-[280px] overflow-hidden">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  priority
                  style={{
                    maskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                  }}
                />
              </div>

              <div className="absolute top-3 left-3 sm:top-4 sm:left-5 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm text-gray-200 dark:text-gray-200 bg-black/40 dark:bg-black/40 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                <PersonOutlineIcon className="!text-emerald-400 !text-xs sm:!text-base" />
                <span className="font-medium text-white dark:text-white/90">{data.author || 'AILand Team'}</span>
                <span>•</span>
                <span className="text-gray-300 dark:text-gray-400">{data.date}</span>
              </div>
            </div>
          )}

          <div className="px-3 sm:px-6 md:px-10 mt-6 transition-colors duration-300">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {data.tags &&
                  Array.isArray(data.tags) &&
                  data.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-[2px] sm:py-[3px] rounded-full text-[10px] sm:text-xs font-medium bg-gradient-to-r from-emerald-500/10 to-violet-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-400/20 hover:border-emerald-400/40 transition"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-violet-500 to-emerald-600 dark:from-emerald-400 dark:via-violet-400 dark:to-emerald-400 leading-snug tracking-tight text-left">
                {data.title}
              </h1>
            </div>

            <div className="prose max-w-none prose-img:rounded-xl leading-relaxed text-justify text-[14px] sm:text-base transition-colors duration-300 text-gray-800 dark:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </article>
      </CardLayout>
    </div>
  )
}