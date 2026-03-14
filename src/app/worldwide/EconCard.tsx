'use client'

import { motion } from 'framer-motion'
import { use3DTilt } from '@/hooks/use3DTilt'
import styles from './worldwide.module.css'

interface EconCardProps {
  index: number
  title: string
  body: string
  icon: React.ReactNode
}

export default function EconCard({ index, title, body, icon }: EconCardProps) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt(8)

  return (
    <motion.div
        className={styles.econCard}
        style={{ rotateX, rotateY, perspective: '900px', transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
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
  )
}
