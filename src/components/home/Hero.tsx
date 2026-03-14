'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ServerStats } from '@/lib/discord'
import StatCounter from './StatCounter'
import styles from './Hero.module.css'

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const },
  }
}

interface HeroProps {
  stats: ServerStats
}

export default function Hero({ stats }: HeroProps) {
  const counterStats = [
    { end: stats.memberCountRoundEnd, suffix: 'k+', label: 'Server Members', delay: 0 },
    { end: stats.onlineCountRoundEnd, suffix: 'k+', label: 'Daily Active Users', delay: 100 },
    { end: 5,   suffix: '',   label: 'Years in Production', delay: 200 },
    { end: 6,   suffix: '',   label: 'Database Systems',   delay: 300 },
  ]
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <motion.p className={styles.eyebrow} {...fadeUp(0)}>
        West Bengal → World
      </motion.p>

      <motion.h1 id="hero-heading" className={styles.heading} {...fadeUp(0.12)}>
        I build systems
        <br />
        <span className={styles.line2}>people live inside.</span>
      </motion.h1>

      <motion.p className={styles.sub} {...fadeUp(0.24)}>
        I build backend systems from scratch and scale them to thousands.
        <br />
        Curiosity-driven. Production-tested.
      </motion.p>

      <motion.div className={styles.ctaRow} {...fadeUp(0.36)}>
        <Link href="/worldwide" className={styles.btnPrimary}>
          See the Work
        </Link>
        <Link href="/about" className={styles.btnGhost}>
          My Story
        </Link>
      </motion.div>

      <motion.div className={styles.stats} {...fadeUp(0.48)}>
        {counterStats.map((s) => (
          <StatCounter
            key={s.label}
            end={s.end}
            suffix={s.suffix}
            label={s.label}
            delay={s.delay}
          />
        ))}
      </motion.div>
    </section>
  )
}
