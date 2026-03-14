'use client'

import { useMotionValue, useTransform, motion } from 'framer-motion'
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
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])

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
        className={styles.archCard}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          '--lang-color': langColor,
          '--glow-color': glowColor,
        } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
    </div>
  )
}
