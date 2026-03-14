'use client'

import { useMotionValue, useTransform, motion } from 'framer-motion'
import styles from './worldwide.module.css'

interface EconCardProps {
  index: number
  title: string
  body: string
  icon: React.ReactNode
}

export default function EconCard({ index, title, body, icon }: EconCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        className={styles.econCard}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        <div className={styles.econCardTopBorder} />
        <div className={styles.econCardIcon}>{icon}</div>
        <div className={styles.econCardInner}>
          <span className={styles.econCardNum}>{String(index + 1).padStart(2, '0')}</span>
          <h3 className={styles.econCardTitle}>{title}</h3>
          <p className={styles.econCardBody}>{body}</p>
        </div>
      </motion.div>
    </div>
  )
}
