'use client'

import { useRef } from 'react'
import type { IconType } from 'react-icons'
import { FaCogs, FaChartLine, FaSyncAlt } from 'react-icons/fa'
import { motion, useInView } from 'framer-motion'
import styles from './ValueProps.module.css'

interface Card {
  icon: IconType
  color: string
  title: string
  body: string
}

const cards: Card[] = [
  {
    icon: FaCogs,
    color: 'var(--text)',
    title: 'Systems Thinker',
    body: 'Chose Rust for the financial layer specifically because GC pauses were unacceptable in a real-money transaction path. Not because it was trendy.',
  },
  {
    icon: FaChartLine,
    color: 'var(--accent2)',
    title: 'Economy Designer',
    body: '', // filled dynamically with live member count
  },
  {
    icon: FaSyncAlt,
    color: 'var(--accent)',
    title: 'Problem-Driven Builder',
    body: 'Migrated through six database systems over five years — each migration triggered by a real failure, not a tutorial recommendation.',
  },
]

interface ValuePropsProps {
  memberCount?: string
}

export default function ValueProps({ memberCount = '50,000' }: ValuePropsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const resolvedCards = cards.map((card) =>
    card.title === 'Economy Designer'
      ? {
          ...card,
          body: `Built and balanced a virtual economy for ${memberCount} people. Inflation prevention, exploit detection, reward psychology — applied, not academic.`,
        }
      : card
  )

  return (
    <section
      className={styles.section}
      ref={ref}
      aria-label="Value propositions"
    >
      <div className={styles.grid}>
        {resolvedCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.article
              key={card.title}
              className={styles.card}
              style={{ '--card-color': card.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
            >
              <div className={styles.iconCircle} aria-hidden="true">
                <Icon />
              </div>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.body}>{card.body}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
