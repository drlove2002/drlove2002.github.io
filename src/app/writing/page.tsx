import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { getAllPosts } from '@/lib/mdx'
import styles from './writing.module.css'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Technical writing by Sudip Roy — systems engineering, virtual economy design, database evolution, and community lessons.',
}

export default async function WritingPage() {
  const posts = await getAllPosts()

  return (
    <section className="section">
      <SectionLabel>Technical Writing</SectionLabel>
      <h1 className={styles.heading}>Things I&apos;ve written.</h1>
      <p className={styles.sub}>
        Long-form pieces on systems engineering, economics, and what five years of
        running infrastructure at scale actually teaches you.
      </p>

      <ul className={styles.list} role="list">
        {posts.map((post) => (
          <li key={post.slug} className={styles.item}>
            <Link href={`/writing/${post.slug}`} className={styles.itemLink}>
              <div className={styles.itemMeta}>
                <span className={styles.tag}>{post.tag}</span>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.desc}>{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
