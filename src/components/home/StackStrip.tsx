import Chip from '@/components/ui/Chip'
import styles from './StackStrip.module.css'

const stack = [
  { label: 'Python',      variant: 'python', tooltip: 'Used for: Discord gateway layer' },
  { label: 'Rust',        variant: 'rust',   tooltip: 'Used for: Data access layer & financial transactions' },
  { label: 'gRPC',        variant: 'rust',   tooltip: 'Used for: Python ↔ Rust inter-process communication' },
  { label: 'Axum',        variant: 'rust',   tooltip: 'Used for: HTTP layer inside the Rust service' },
  { label: 'Next.js',     variant: 'next',   tooltip: 'Used for: Web dashboard & this portfolio' },
  { label: 'PostgreSQL',  variant: 'db',     tooltip: 'Used for: Primary relational database' },
  { label: 'Redis',       variant: 'db',     tooltip: 'Used for: Caching hot economy state' },
  { label: 'MongoDB',     variant: 'db',     tooltip: 'Used for: Earlier document store (migrated away)' },
  { label: 'libSQL',      variant: 'db',     tooltip: 'Used for: Embedded DB inside Rust - zero network latency' },
  { label: 'AWS',         variant: 'next',   tooltip: 'Used for: Cloud hosting & infra' },
  { label: 'Cloudflare',  variant: 'next',   tooltip: 'Used for: Edge deployment & CDN' },
] as const

export default function StackStrip() {
  return (
    <div className={styles.strip}>
      <span className={styles.label}>Production Stack →</span>
      <div className={styles.chips} role="list" aria-label="Technology stack">
        {stack.map(({ label, variant, tooltip }) => (
          <div key={label} role="listitem">
            <Chip label={label} variant={variant} tooltip={tooltip} />
          </div>
        ))}
      </div>
    </div>
  )
}
