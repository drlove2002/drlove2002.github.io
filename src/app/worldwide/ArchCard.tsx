'use client'

import { motion } from 'framer-motion'
import { use3DTilt } from '@/hooks/use3DTilt'
import styles from './worldwide.module.css'

interface ArchCardProps {
  lang: string
  role: string
  langColor: string
  glowColor: string
  desc: string
  why: string
  icon: React.ReactNode
}

export default function ArchCard({ lang, role, langColor, glowColor, desc, why, icon }: ArchCardProps) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt(10)

  return (
    <motion.div
        className={styles.archCard}
        style={{
          rotateX,
          rotateY,
          perspective: '900px',
          transformStyle: 'preserve-3d',
          '--lang-color': langColor,
          '--glow-color': glowColor,
        } as React.CSSProperties}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        <div className={styles.archCardAccent} />
        <div className={styles.archCardIcon}>{icon}</div>
        <div className={styles.archCardContent}>
          <div className={styles.archCardLang}>{lang}</div>
          <div className={styles.archCardRole}>{role}</div>
          <p className={styles.archCardDesc}>{desc}</p>
          <div className={styles.archCardBadges}>
            {why.split('\n').map((line) => (
              <span key={line} className={styles.archCardBadge}>{line}</span>
            ))}
          </div>
        </div>
      </motion.div>
  )
}
