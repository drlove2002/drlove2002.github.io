'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './JourneyTimeline.module.css'

const milestones = [
  {
    year: '2016',
    title: 'Curiosity Sparked',
    desc: 'How video games worked \u2192 hacking Wi-Fi \u2192 first systems lesson.',
  },
  {
    year: '2018',
    title: 'Game Engines',
    desc: 'Unity, Unreal Engine \u2014 realized backend was more interesting than rendering.',
  },
  {
    year: '2019',
    title: 'Worldwide Born',
    desc: 'Co-founded a Discord community. First Python bot. First DB: a JSON file.',
  },
  {
    year: '2020',
    title: 'B.Sc. CS Begins',
    desc: 'University of Calcutta. Theory met practice \u2014 the bot was already handling thousands.',
  },
  {
    year: '2022',
    title: 'The Rust Pivot',
    desc: 'Rewrote the data layer in Rust. GC pauses were unacceptable for real-money transactions.',
  },
  {
    year: '2023',
    title: 'Pattern Pursuit',
    desc: 'Final year project: prediction game. Rust + Actix + Redis + AWS.',
  },
  {
    year: '2024',
    title: 'M.Sc. & Beyond',
    desc: 'Pursuing M.Sc. CS. Worldwide at scale. Looking for the next challenge.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

export default function JourneyTimeline() {
  return (
    <div className={styles.timeline}>
      {milestones.map((m, i) => (
        <Milestone key={m.year} index={i} {...m} />
      ))}
    </div>
  )
}

function Milestone({ index, year, title, desc }: { index: number; year: string; title: string; desc: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={styles.milestone}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index}
    >
      <div className={styles.dot} />
      <p className={styles.year}>{year}</p>
      <p className={styles.title}>{title}</p>
      <p className={styles.desc}>{desc}</p>
    </motion.div>
  )
}
