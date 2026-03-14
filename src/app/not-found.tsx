import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '6rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          color: 'var(--text)',
        }}
      >
        Nothing here.
      </h1>
      <p style={{ color: 'var(--muted)', maxWidth: '400px', lineHeight: '1.7' }}>
        That page doesn&apos;t exist. Probably a bad link, or you found a gap in the
        architecture.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          letterSpacing: '0.04em',
          color: 'var(--accent)',
          borderBottom: '1px solid rgba(232, 124, 58, 0.4)',
          paddingBottom: '2px',
          width: 'fit-content',
        }}
      >
        ← Back home
      </Link>
    </div>
  )
}
