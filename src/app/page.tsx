import type { Metadata } from 'next'
import { getServerStats } from '@/lib/discord'
import Hero from '@/components/home/Hero'
import StackStrip from '@/components/home/StackStrip'
import ValueProps from '@/components/home/ValueProps'
import WorldwideTeaser from '@/components/home/WorldwideTeaser'
import PatternPursuitTeaser from '@/components/home/PatternPursuitTeaser'

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getServerStats()
  return {
    title: 'Sudip Roy — drlove',
    description: `Systems engineer from West Bengal. Built Worldwide — a Discord community of ${stats.memberCountFormatted} with a virtual economy, Python/Rust/gRPC stack, and 6 databases over 5 years.`,
    openGraph: {
      title: 'Sudip Roy — drlove',
      description: 'I build systems people live inside.',
      url: 'https://drlove.dev',
    },
  }
}

export default async function HomePage() {
  const stats = await getServerStats()

  return (
    <>
      <Hero stats={stats} />
      <StackStrip />
      <ValueProps memberCount={stats.memberCountFormatted} />
      <hr className="divider" />
      <WorldwideTeaser stats={stats} />
      <hr className="divider" />
      <PatternPursuitTeaser />
    </>
  )
}
