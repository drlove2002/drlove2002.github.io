import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const articleUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://drlove.dev/writing/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date('2025-01-01'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: 'https://drlove.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://drlove.dev/worldwide',
      lastModified: new Date('2025-06-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://drlove.dev/writing',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articleUrls,
  ]
}
