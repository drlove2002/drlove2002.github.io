import type { Metadata } from 'next'
import Link from 'next/link'
import { getServerStats } from '@/lib/discord'
import SectionLabel from '@/components/ui/SectionLabel'
import Chip from '@/components/ui/Chip'
import ArchSection from './ArchSection'
import EconSection from './EconSection'
import TimelineCard from './TimelineCard'
import styles from './worldwide.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getServerStats()
  return {
    title: 'Worldwide — Case Study',
    description: `Full case study: 3-language architecture, 6-database evolution, real-money economy design, and production failures. Five years of building Worldwide Discord — ${stats.memberCountFormatted} members.`,
  }
}

const dbTimeline = [
  {
    trigger: '🔴 Problem: Concurrent Writes Crash',
    type: 'problem' as const,
    tech: 'Raw JSON File → MongoDB Sharded Cluster',
    why: "JSON files can't handle concurrent writes. Multiple economy transactions crashing the bot was the forcing function to learn proper databases. Chose MongoDB's sharded cluster specifically for write throughput.",
  },
  {
    trigger: '🔴 Problem: Query Latency',
    type: 'problem' as const,
    tech: 'Added Redis Caching Layer',
    why: 'As member count grew, read latency became noticeable in user-facing interactions. Redis caching for hot data (active user economy states) brought response times down significantly.',
  },
  {
    trigger: '🔴 Problem: Relational Data Needs',
    type: 'problem' as const,
    tech: 'MongoDB → PostgreSQL as Primary',
    why: "The economy system developed complex relational requirements — transactions, balances, event histories — that document stores aren't built for. Migrated to PostgreSQL while keeping Redis as the caching layer.",
  },
  {
    trigger: '🟢 Optimization: Network Overhead',
    type: 'optimization' as const,
    tech: 'libSQL Embedded in Rust Process',
    why: 'Built the Rust Data Access Layer with gRPC for Python communication. Then took it further: embedded libSQL directly inside the Rust process to eliminate network round-trips for the most latency-sensitive operations entirely.',
  },
  {
    trigger: '🔵 Curiosity: Can We Do Better?',
    type: 'curiosity' as const,
    tech: 'Partial Custom Redis Implementation',
    why: "Wasn't satisfied with off-the-shelf Redis behavior for specific caching patterns. Built parts of a custom Redis implementation to achieve better results for the specific access patterns of the economy system.",
  },
]

export default async function WorldwidePage() {
  const stats = await getServerStats()

  return (
    <article className="section">
      <SectionLabel>Case Study · 2019 — Present</SectionLabel>
      <h1 className={styles.heading}>Worldwide Discord Platform</h1>
      <p className={styles.lead}>
        A real-time community platform with an economy system, games, and events — serving{' '}
        {stats.memberCountFormatted} members with {stats.onlineCountFormatted}+ daily active users.
        Built from scratch. No playbook.
      </p>

      <div className={styles.chipRow}>
        <Chip label="Python · Gateway" variant="python" />
        <Chip label="Rust · Data Layer" variant="rust" />
        <Chip label="Next.js · Dashboard" variant="next" />
        <Chip label="PostgreSQL" variant="db" />
        <Chip label="Redis" variant="db" />
        <Chip label="gRPC" variant="rust" />
        <Chip label="Axum" variant="rust" />
        <Chip label="libSQL" variant="db" />
      </div>

      <div className={styles.btnRow}>
        <a href="https://discord.gg/worldwide" className={styles.btnGhost}>🎮 Visit Server ↗</a>
        <a href="https://worldwide-dc.com/" className={styles.btnGhost}>📊 Live Dashboard ↗</a>
      </div>

      {/* Section 01: Architecture */}
      <section className={styles.block}>
        <div className={styles.numberedHeader}>
          <span className={styles.sectionNum}>01</span>
          <SectionLabel>System Architecture — Why Three Languages</SectionLabel>
        </div>
        <h2 className={styles.subheading}>Three languages, one system</h2>
        <p className={styles.body}>
          The system has three layers. Each was built in a different language — not to show off, but
          because each layer has fundamentally different requirements that made different tools correct.
        </p>

        <ArchSection />
      </section>

      {/* Section 02: Database Evolution */}
      <section className={styles.block}>
        <div className={styles.numberedHeader}>
          <span className={styles.sectionNum}>02</span>
          <SectionLabel>The Database Evolution — Driven by Real Failures</SectionLabel>
        </div>
        <h2 className={styles.subheading}>Six databases. Real reasons.</h2>
        <p className={styles.body}>
          This is the most honest part of the case study. Every database migration happened because
          something broke, something scaled poorly, or something cost too much latency.
        </p>

        <div className={styles.tlWrapper}>
          {dbTimeline.map(({ type, tech, why }, i) => (
            <TimelineCard key={tech} index={i} type={type} tech={tech} why={why} />
          ))}
        </div>
      </section>

      {/* Section 03: Economy Design */}
      <section className={styles.block}>
        <div className={styles.numberedHeader}>
          <span className={styles.sectionNum}>03</span>
          <SectionLabel>Economy Design — Engineering Meets Behavioral Psychology</SectionLabel>
        </div>
        <h2 className={styles.subheading}>Designing for real stakes</h2>

        <blockquote className={styles.pullQuote}>
          &ldquo;A virtual economy with {stats.memberCountFormatted} participants behaves like a real economy. Inflation,
          exploitation, reward psychology, and trust — all of it applies.&rdquo;
        </blockquote>

        <EconSection />
      </section>

      {/* Section 04: What Went Wrong */}
      <section className={styles.block}>
        <div className={styles.numberedHeader}>
          <span className={styles.sectionNum}>04</span>
          <SectionLabel>What Went Wrong — The Honest Section</SectionLabel>
        </div>
        <h2 className={styles.subheading}>What actually went wrong</h2>
        <p className={styles.body}>
          Anyone can list achievements.
          Only someone who actually built something can describe what they got wrong.
        </p>

        <div className={styles.highlightBox}>
          <p>
            <strong style={{ color: 'var(--accent2)' }}>The JSON File Crash.</strong>{' '}
            In the early days, user data lived in a raw JSON file. The bot asynchronously read and
            wrote virtual currency balances — concurrent access crashed it multiple times a day.
            Users would lose currency mid-transaction. This was the forcing function to learn
            databases properly: the fix wasn&apos;t a patch, it was a full migration to
            MongoDB&apos;s sharded cluster, chosen for write throughput. Lesson: storage choices that
            seem &ldquo;good enough&rdquo; at small scale become architectural liabilities the moment
            concurrency enters the picture.
          </p>
        </div>

        <div className={styles.highlightBox}>
          <p>
            <strong style={{ color: 'var(--accent2)' }}>The Cache Bug Incident.</strong>{' '}
            A bug in the Redis cache layer caused three days of user economy data to be lost
            permanently. Partial recovery from logs was possible but not complete. Response: publicly
            acknowledged the issue to the {stats.memberCountFormatted}-member community, compensated affected users with
            virtual currency. Long-term fix: added comprehensive test coverage, log points throughout
            the transaction path, and auto-recovery mechanisms. Lesson: transparency with users is not
            optional. Systems fail. Response to failure is what builds trust.
          </p>
        </div>
      </section>

      {/* Section 05: What's Next */}
      <section className={styles.block}>
        <div className={styles.numberedHeader}>
          <span className={styles.sectionNum}>05</span>
          <SectionLabel>What&apos;s Next</SectionLabel>
        </div>
        <h2 className={styles.subheading}>What&apos;s Next</h2>
        <p className={styles.whatNext}>
          Five years of building Worldwide taught me that the most interesting engineering problems
          live at the intersection of systems design, behavioral economics, and distributed data.
          The next step is taking these skills into teams and environments that operate at real
          scale — distributed systems, high-reliability infrastructure, companies where architecture
          decisions matter. The next platform won&apos;t be a Discord bot. But the same thinking
          will apply.{' '}
          <Link href="/#journey" style={{ color: 'var(--accent)' }}>Read the full story →</Link>
        </p>
      </section>
    </article>
  )
}
