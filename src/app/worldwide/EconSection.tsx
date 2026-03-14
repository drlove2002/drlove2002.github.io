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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="4" x2="12" y2="18" />
        <line x1="5" y1="8" x2="12" y2="5" />
        <line x1="19" y1="8" x2="12" y2="5" />
        <line x1="5" y1="8" x2="5" y2="13" />
        <line x1="19" y1="8" x2="19" y2="13" />
        <path d="M3 13 L5 13 L7 13" />
        <path d="M17 13 L19 13 L21 13" />
        <line x1="8" y1="18" x2="16" y2="18" />
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 15 L8 4 L12 15" />
        <line x1="5.5" y1="11" x2="10.5" y2="11" />
        <path d="M14 15 L18 4 L22 15" />
        <line x1="15.5" y1="11" x2="20.5" y2="11" />
        <line x1="2" y1="20" x2="12" y2="20" />
        <line x1="12" y1="20" x2="22" y2="20" />
        <circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none" />
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4 L4 20" />
        <path d="M4 4 L14 4 Q19 4 19 8 Q19 12 14 12 L4 12" />
        <path d="M4 12 L16 12 Q21 12 21 16 Q21 20 16 20 L4 20" />
        <line x1="2" y1="2" x2="2" y2="22" opacity="0.3" />
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

            {/* Background icon */}
            <div className={styles.bgIcon}>{card.icon}</div>

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
                          key={j}
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
