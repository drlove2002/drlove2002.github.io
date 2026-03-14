'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './PatternPursuitTeaser.module.css'

export default function PatternPursuitTeaser() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className={styles.section}
      aria-labelledby="pattern-pursuit-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <p className={styles.label}>Project · 2023</p>
        <h2 id="pattern-pursuit-heading" className={styles.heading}>
          Pattern Pursuit
        </h2>
        <p className={styles.sub}>
          An interactive prediction game built on 5-gram language models. Rust +
          Actix backend, TypeScript frontend, Redis for real-time state, Docker +
          AWS for deployment. Players compete against the model — and the model
          learns.
        </p>
        <a
          href="https://github.com/drlove2002/pattern_pursuit"
          className={styles.cta}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub ↗
        </a>
      </motion.div>
    </section>
  )
}
