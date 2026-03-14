import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import SectionLabel from '@/components/ui/SectionLabel'
import styles from './article.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://drlove.dev/writing/${slug}`,
    },
  }
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: 'github-dark' }]] as any,
  },
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <SectionLabel>{post.tag} · {post.readTime}</SectionLabel>
        <h1 className={styles.heading}>{post.title}</h1>
        <p className={styles.desc}>{post.description}</p>
        {post.date && (
          <time className={styles.date} dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        )}
      </header>

      <div className={styles.prose}>
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>
    </article>
  )
}
