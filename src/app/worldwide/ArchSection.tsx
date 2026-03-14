'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SiNextdotjs } from 'react-icons/si'
import { FaRust, FaPython } from 'react-icons/fa'
import styles from './archSection.module.css'

interface ArchLayer {
  id: string
  lang: string
  role: string
  langColor: string
  glowColor: string
  desc: string
  details: string[]
  tags: { label: string; variant: 'python' | 'rust' | 'next' | 'db' }[]
  icon: React.ReactNode
}

const archLayers: ArchLayer[] = [
  {
    id: 'python',
    lang: 'Python',
    role: 'Discord Gateway',
    langColor: '#5b9bd5',
    glowColor: 'rgba(91, 155, 213, 0.3)',
    desc: "Handles the Discord event stream. asyncio fits naturally with Discord's WebSocket gateway — thousands of concurrent events, all I/O bound.",
    details: [
      'Handles all Discord events via the WebSocket gateway using asyncio',
      "Best library ecosystem for Discord's API — discord.py handles rate limiting, sharding, and caching",
      'gRPC client sends all DB operations to the Rust layer — zero direct database access',
      'gRPC server exposes endpoints for the dashboard to trigger bot actions',
      'Event-driven architecture: commands, economy transactions, game logic all flow through a central dispatcher',
    ],
    tags: [
      { label: 'Async I/O', variant: 'python' },
      { label: 'Event-driven', variant: 'python' },
      { label: 'Discord libs', variant: 'python' },
      { label: 'gRPC client + server', variant: 'db' },
    ],
    icon: <FaPython />,
  },
  {
    id: 'rust',
    lang: 'Rust',
    role: 'Data Access Layer',
    langColor: '#e05c20',
    glowColor: 'rgba(224, 92, 32, 0.3)',
    desc: "Handles all database operations and real-money transactions via Axum. GC pauses are unacceptable in a payment path.",
    details: [
      "Rust's ownership model guarantees memory safety without a runtime — zero GC pauses on the financial path",
      'libSQL embedded in-process eliminates network latency for the most critical operations',
      'Axum HTTP server for real-money purchase flow — handles PayPal webhooks, receipt validation',
      'gRPC server for Python: all economy mutations (balance changes, trades, rewards) go through here',
      'gRPC client calls back to Python for bot-level actions (sending DMs, updating roles)',
    ],
    tags: [
      { label: 'No GC pauses', variant: 'rust' },
      { label: 'Memory safety', variant: 'rust' },
      { label: 'Financial path', variant: 'rust' },
      { label: 'gRPC client + server', variant: 'db' },
    ],
    icon: <FaRust />,
  },
  {
    id: 'nextjs',
    lang: 'Next.js',
    role: 'Web Dashboard',
    langColor: '#e8e4dc',
    glowColor: 'rgba(232, 228, 220, 0.15)',
    desc: 'Server-side rendered admin dashboard for monitoring server economy, user stats, and event management.',
    details: [
      'Real-time economy monitoring: balance distributions, inflation metrics, transaction volumes',
      'User management: search, ban, adjust balances, view transaction history',
      'Event management: create, schedule, and monitor community events',
      'Communicates exclusively with the Rust layer via gRPC — never touches the bot directly',
      'Deployed with Cloudflare for SSL and CDN',
    ],
    tags: [
      { label: 'SSR dashboard', variant: 'next' },
      { label: 'Edge deploy', variant: 'next' },
      { label: 'React ecosystem', variant: 'next' },
      { label: 'gRPC client', variant: 'db' },
    ],
    icon: <SiNextdotjs />,
  },
]

/* ── Modal rendered via portal to escape transform stacking context ── */
function Modal({ layer, onClose }: { layer: ArchLayer; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!mounted) return null

  return createPortal(
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <motion.div
        className={styles.modal}
        style={{
          '--lang-color': layer.langColor,
          '--glow-color': layer.glowColor,
        } as React.CSSProperties}
        initial={{ opacity: 0, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className={styles.modalAccent} />
        <div className={styles.modalIconWatermark}>{layer.icon}</div>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIconCircle}>{layer.icon}</div>
            <div>
              <h3 className={styles.modalLang}>{layer.lang}</h3>
              <span className={styles.modalRole}>{layer.role}</span>
            </div>
          </div>
          <p className={styles.modalDesc}>{layer.desc}</p>
          <div className={styles.tagRow}>
            {layer.tags.map((tag) => (
              <span key={tag.label} className={`${styles.tag} ${styles[`tag_${tag.variant}`]}`}>
                {tag.label}
              </span>
            ))}
          </div>
          <div className={styles.detailsDivider} />
          <ul className={styles.detailsList}>
            {layer.details.map((d, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, ease: 'easeOut' as const }}
              >
                {d}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>,
    document.body
  )
}

/* ── Node graph connection diagram ────────────────────────────────── */
function NodeGraph() {
  /*
   * Layout:  Python(left) ← Rust(center) → Next.js(right)
   * viewBox 600×120 — nodes at y=60, labels at y=96
   * Flow: Rust (server) sends to both clients via gRPC
   */
  const py  = { x: 100, y: 55 }
  const rs  = { x: 300, y: 55 }
  const nxt = { x: 500, y: 55 }

  // Edge positions (outside node radius 22)
  const pyR  = py.x + 24   // right edge of Python
  const rsL  = rs.x - 24   // left edge of Rust
  const rsR  = rs.x + 24   // right edge of Rust
  const nxtL = nxt.x - 24  // left edge of Next.js

  // Midpoints of each segment
  const midLeft  = (pyR + rsL) / 2
  const midRight = (rsR + nxtL) / 2
  const y = py.y

  return (
    <div className={styles.nodeGraph}>
      <svg viewBox="0 0 600 120" className={styles.nodeSvg} aria-hidden="true">
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="gradPyRs" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5b9bd5" />
            <stop offset="100%" stopColor="#e05c20" />
          </linearGradient>
          <linearGradient id="gradNxRs" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#e8e4dc" />
            <stop offset="100%" stopColor="#3ae8b4" />
          </linearGradient>
        </defs>

        {/* ── Connection lines (edges) ─────────────────────────────── */}
        <line x1={pyR} y1={y} x2={rsL} y2={y}
          stroke="url(#gradPyRs)" strokeWidth="1.5" opacity="0.45" />
        <line x1={rsR} y1={y} x2={nxtL} y2={y}
          stroke="url(#gradNxRs)" strokeWidth="1.5" opacity="0.45" />

        {/* ── Labels above lines ───────────────────────────────────── */}
        <text x={midLeft} y={y - 14} fill="#7baed4" fontSize="9"
          fontFamily="var(--font-mono)" textAnchor="middle" opacity="0.65"
          letterSpacing="0.12em">gRPC</text>
        <text x={midRight} y={y - 14} fill="#888" fontSize="9"
          fontFamily="var(--font-mono)" textAnchor="middle" opacity="0.65"
          letterSpacing="0.12em">gRPC</text>

        {/* ── Animated particles (server → clients) ────────────────── */}
        {/* Rust → Python  (3 staggered, orange — server sends to gateway) */}
        {[0, 0.7, 1.4].map((delay, i) => (
          <circle key={`rp${i}`} r={4 - i * 0.5} fill="#e05c20" filter="url(#particleGlow)">
            <animateMotion dur="2s" repeatCount="indefinite" begin={`${delay}s`}
              path={`M ${rsL},${y} L ${pyR},${y}`} />
            <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2s"
              repeatCount="indefinite" begin={`${delay}s`} />
          </circle>
        ))}
        {/* Rust → Next.js  (3 staggered — server sends to dashboard) */}
        {[0, 0.8, 1.5].map((delay, i) => (
          <circle key={`rn${i}`} r={4 - i * 0.5} fill="#e05c20" filter="url(#particleGlow)">
            <animateMotion dur="2s" repeatCount="indefinite" begin={`${delay}s`}
              path={`M ${rsR},${y} L ${nxtL},${y}`} />
            <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2s"
              repeatCount="indefinite" begin={`${delay}s`} />
          </circle>
        ))}

        {/* ── Service nodes ────────────────────────────────────────── */}
        {/* Python */}
        <circle cx={py.x} cy={y} r="22" fill="rgba(53,114,165,0.1)"
          stroke="#5b9bd5" strokeWidth="1.5" filter="url(#nodeGlow)" />
        <circle cx={py.x} cy={y} r="22" fill="none" stroke="#5b9bd5" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x={py.x} y={y + 1} fill="#5b9bd5" fontSize="14" fontFamily="var(--font-mono)"
          fontWeight="700" textAnchor="middle" dominantBaseline="middle">PY</text>
        <text x={py.x} y={y + 40} fill="#5b9bd5" fontSize="8" fontFamily="var(--font-mono)"
          textAnchor="middle" opacity="0.55">Gateway</text>

        {/* Rust */}
        <circle cx={rs.x} cy={y} r="22" fill="rgba(224,92,32,0.1)"
          stroke="#e05c20" strokeWidth="1.5" filter="url(#nodeGlow)" />
        <circle cx={rs.x} cy={y} r="22" fill="none" stroke="#e05c20" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin="1s" />
        </circle>
        <text x={rs.x} y={y + 1} fill="#e05c20" fontSize="14" fontFamily="var(--font-mono)"
          fontWeight="700" textAnchor="middle" dominantBaseline="middle">RS</text>
        <text x={rs.x} y={y + 40} fill="#e05c20" fontSize="8" fontFamily="var(--font-mono)"
          textAnchor="middle" opacity="0.55">Data Layer</text>

        {/* Next.js */}
        <circle cx={nxt.x} cy={y} r="22" fill="rgba(232,228,220,0.05)"
          stroke="#e8e4dc" strokeWidth="1.5" filter="url(#nodeGlow)" />
        <circle cx={nxt.x} cy={y} r="22" fill="none" stroke="#e8e4dc" strokeWidth="0.5" opacity="0.2">
          <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" begin="2s" />
          <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" begin="2s" />
        </circle>
        <text x={nxt.x} y={y + 1} fill="#e8e4dc" fontSize="14" fontFamily="var(--font-mono)"
          fontWeight="700" textAnchor="middle" dominantBaseline="middle">NX</text>
        <text x={nxt.x} y={y + 40} fill="#e8e4dc" fontSize="8" fontFamily="var(--font-mono)"
          textAnchor="middle" opacity="0.45">Dashboard</text>
      </svg>
    </div>
  )
}

export default function ArchSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedLayer = selected ? archLayers.find((l) => l.id === selected) ?? null : null

  return (
    <div className={styles.wrapper}>
      {/* Cards grid */}
      <div className={styles.cardGrid}>
        {archLayers.map((layer) => (
          <div
            key={layer.id}
            className={styles.card}
            style={{
              '--lang-color': layer.langColor,
              '--glow-color': layer.glowColor,
            } as React.CSSProperties}
            onClick={() => setSelected(layer.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setSelected(layer.id) }}
          >
            <div className={styles.accentBar} />
            <div className={styles.iconWatermark}>{layer.icon}</div>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>{layer.icon}</div>
                <div>
                  <h3 className={styles.langName}>{layer.lang}</h3>
                  <span className={styles.roleName}>{layer.role}</span>
                </div>
              </div>
              <p className={styles.desc}>{layer.desc}</p>
              <div className={styles.tagRow}>
                {layer.tags.map((tag) => (
                  <span key={tag.label} className={`${styles.tag} ${styles[`tag_${tag.variant}`]}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className={styles.expandHint}>
                <span className={styles.expandLabel}>Click to expand</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Node graph connection diagram */}
      <NodeGraph />

      {/* Modal via portal */}
      <AnimatePresence>
        {selectedLayer && (
          <Modal layer={selectedLayer} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
