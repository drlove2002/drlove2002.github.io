'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './worldwide.module.css'

const NODE_COLORS: Record<string, string> = {
  problem: '#e05c20',
  optimization: '#3ae8b4',
  curiosity: '#5b9bd5',
}

const BADGES: Record<string, string> = {
  problem: 'Problem',
  optimization: 'Optimization',
  curiosity: 'Curiosity',
}

interface TimelineCardProps {
  index: number
  type: 'problem' | 'optimization' | 'curiosity'
  tech: string
  why: string
}

const cardVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.09, ease: 'easeOut' as const },
  }),
  hover: {
    x: 6,
    transition: { duration: 0.2, ease: 'easeOut' as const },
  },
}

export default function TimelineCard({ index, type, tech, why }: TimelineCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const nodeColor = NODE_COLORS[type]

  // Split "A → B" into parts for styled rendering
  const parts = tech.split(' → ')
  const hasArrow = parts.length > 1

  return (
    <motion.div
      ref={ref}
      className={styles.tlCard}
      style={{ '--node-color': nodeColor } as React.CSSProperties}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover="hover"
      custom={index}
    >
      {/* Left column: number + dot */}
      <div className={styles.tlLeft}>
        <span className={styles.tlNum}>{String(index + 1).padStart(2, '0')}</span>
        <div className={styles.tlDot} />
      </div>

      {/* Right column: content */}
      <div className={styles.tlBody}>
        <span className={`${styles.tlBadge} ${styles[`tlBadge_${type}`]}`}>
          {BADGES[type]}
        </span>

        <div className={styles.tlTech}>
          {hasArrow ? (
            <>
              <span className={styles.tlFrom}>{parts[0]}</span>
              <span className={styles.tlArrow}>→</span>
              <span className={styles.tlTo}>{parts.slice(1).join(' → ')}</span>
            </>
          ) : (
            <span className={styles.tlTo}>{tech}</span>
          )}
        </div>

        <p className={styles.tlNote}>{why}</p>
      </div>
    </motion.div>
  )
}
