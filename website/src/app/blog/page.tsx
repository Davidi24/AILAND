import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogClient from './BlogClient'

export const metadata = {
  title: 'AILand Blog',
}

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), 'src/app/blog/posts')
  const files = fs.readdirSync(postsDir)

  const posts = files.map((filename) => {
    const filePath = path.join(postsDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)
    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      tag: data.tag,
      excerpt: data.excerpt,
      image: data.image,
    }
  })

  return (
    <>
      <BlogClient posts={posts} />
    </>
  )

}
