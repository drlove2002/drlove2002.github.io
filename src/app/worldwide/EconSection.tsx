'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './econSection.module.css'

interface EconItem {
  title: string
  body: string
  details: string[]
  icon: React.ReactNode
  accent: string
}

const economyCards: EconItem[] = [
  {
    title: 'Inflation Prevention',
    body: 'Controlling money supply through sinks and faucets — events that remove currency must balance events that generate it.',
    details: [
      'Dynamic sink/faucet ratio adjusted weekly based on total circulating supply',
      'Automated inflation alerts when money supply grows >5% per week',
      'Tax mechanics on high-value trades act as organic currency sinks',
      'Seasonal events designed with net-negative currency impact',
    ],
    accent: '#e87c3a',
    // Balance scale — equilibrium of supply and demand
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </svg>
    ),
  },
  {
    title: 'Exploit Detection',
    body: 'Rate limiting, anomaly detection on transaction patterns, and rollback mechanisms for economic exploits.',
    details: [
      'Per-user transaction velocity limits with exponential backoff',
      'Statistical anomaly detection flags unusual accumulation patterns',
      'Automated rollback system can revert exploited transactions within 24h',
      'Honeypot items and trade routes designed to catch exploit scripts',
    ],
    accent: '#3ae8b4',
    // Shield — protection and security against exploits
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Reward Psychology',
    body: 'Variable ratio reinforcement schedules in gambling and games. Daily streaks. Loss aversion mechanics. Applied behavioral economics.',
    details: [
      'Variable ratio reinforcement keeps engagement unpredictable and compelling',
      'Daily streak system with escalating rewards and loss aversion on breaks',
      'Near-miss mechanics in gambling games increase perceived closeness to winning',
      'Cooldown timers create artificial scarcity and anticipation loops',
    ],
    accent: '#c084fc',
    // Brain — behavioral psychology and decision-making
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66Z" />
      </svg>
    ),
  },
  {
    title: 'Real Money Bridge',
    body: 'Real currency purchase flow via Axum API. Trust, security, and UX around financial transactions in a gaming context.',
    details: [
      'PayPal integration via Axum handles payment processing and webhooks',
      'Double-entry bookkeeping ensures every real-money transaction is auditable',
      'Fraud detection layer blocks suspicious purchase patterns before charge',
      'Instant delivery with automatic retry and manual override for edge cases',
    ],
    accent: '#facc15',
    // Coin with dollar sign — real-money transactions
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1" />
        <path d="M12 6v2m0 8v2" />
      </svg>
    ),
  },
]

export default function EconSection() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className={styles.grid}>
      {economyCards.map((card, i) => {
        const isExpanded = expanded === i
        return (
          <motion.div
            key={card.title}
            className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
            style={{ '--card-accent': card.accent } as React.CSSProperties}
            onClick={() => setExpanded(isExpanded ? null : i)}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Accent top line */}
            <div className={styles.topLine} />

            <div className={styles.inner}>
              <div className={styles.header}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.iconSmall}>{card.icon}</div>
              </div>

              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.body}>{card.body}</p>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className={styles.details}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' as const }}
                  >
                    <div className={styles.detailsDivider} />
                    <ul className={styles.detailsList}>
                      {card.details.map((d, j) => (
                        <motion.li
                          key={d}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.06, ease: 'easeOut' as const }}
                        >
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.expandHint}>
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={styles.expandArrow}
                >
                  &#8964;
                </motion.span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
