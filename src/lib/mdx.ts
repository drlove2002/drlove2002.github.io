import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/writing')

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 238)
  return `${minutes} min read`
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  tag: string
  readTime: string
  date?: string
}

export interface Post extends PostMeta {
  content: string
}

function slugify(filename: string): string {
  return filename.replace(/\.mdx?$/, '')
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f))

  const posts = files.map((filename) => {
    const slug = slugify(filename)
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      tag: data.tag ?? 'Essay',
      readTime: calculateReadTime(content),
      date: data.date ?? undefined,
    } satisfies PostMeta
  })

  // Sort newest first if dates present, otherwise preserve file order
  return posts.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date)
    return 0
  })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`)
  const filepath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null

  if (!filepath) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    tag: data.tag ?? 'Essay',
    readTime: calculateReadTime(content),
    date: data.date ?? undefined,
    content,
  }
}
