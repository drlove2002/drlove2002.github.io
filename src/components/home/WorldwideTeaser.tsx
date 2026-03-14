'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ServerStats } from '@/lib/discord'
import styles from './WorldwideTeaser.module.css'

interface WorldwideTeaserProps {
  stats: ServerStats
}

export default function WorldwideTeaser({ stats }: WorldwideTeaserProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className={styles.section}
      aria-labelledby="worldwide-teaser-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <p className={styles.label}>Case Study · 2019 — Present</p>
        <h2 id="worldwide-teaser-heading" className={styles.heading}>
          Worldwide
        </h2>
        <p className={styles.sub}>
          A Discord community I co-founded and engineered for five years — now
          serving {stats.memberCountFormatted} members and {stats.onlineCountFormatted}+ daily active users. The full story:
          3-language architecture, 6 databases, real-money economy design, and
          what went wrong.
        </p>
        <Link href="/worldwide" className={styles.cta}>
          Read the Case Study →
        </Link>
      </motion.div>
    </section>
  )
}
