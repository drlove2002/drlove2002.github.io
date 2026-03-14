import type { Metadata } from 'next'
import type { IconType } from 'react-icons'
import { FaChess, FaIndustry, FaChartLine, FaGlobe, FaBrain, FaBookOpen } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiMail, FiGithub, FiLinkedin, FiMessageCircle, FiBookOpen } from 'react-icons/fi'
import { getServerStats } from '@/lib/discord'
import SectionLabel from '@/components/ui/SectionLabel'
import JourneyTimeline from './JourneyTimeline'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About & Contact',
  description:
    'Sudip Roy — CS student, systems engineer, aspiring CTO. Background, interests, and how to get in touch.',
}

interface Contact {
  type: string
  value: string
  href: string
  icon: IconType
  color: string
  note: string | null
}

function getContacts(memberCount: string): Contact[] {
  return [
    {
      type: 'Email',
      value: 'sudiproy20yo@gmail.com',
      href: 'mailto:sudiproy20yo@gmail.com',
      icon: FiMail,
      color: 'var(--accent)',
      note: null,
    },
    {
      type: 'GitHub',
      value: 'github.com/drlove2002',
      href: 'https://github.com/drlove2002',
      icon: FiGithub,
      color: '#e8e4dc',
      note: 'Personal account. Worldwide org repos are private (IP protection) — architecture documented in the case study.',
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/drlove2002',
      href: 'https://linkedin.com/in/drlove2002',
      icon: FiLinkedin,
      color: '#5b9bd5',
      note: null,
    },
    {
      type: 'Discord Community',
      value: 'Worldwide Server',
      href: 'https://discord.gg/worldwide',
      icon: FiMessageCircle,
      color: '#7289da',
      note: `${memberCount}+ members. The thing this portfolio is about.`,
    },
    {
      type: 'X / Twitter',
      value: '@drlove_2002',
      href: 'https://x.com/drlove_2002',
      icon: FaXTwitter,
      color: '#e8e4dc',
      note: null,
    },
    {
      type: 'Case Study',
      value: 'Worldwide — Full Breakdown',
      href: '/worldwide',
      icon: FiBookOpen,
      color: 'var(--accent2)',
      note: 'Architecture, economy design, incidents — the whole story.',
    },
  ]
}

interface Interest {
  icon: IconType
  label: string
  subtitle: string
  color: string
}

const interests: Interest[] = [
  { icon: FaChess, label: 'Chess', subtitle: 'Long-term tradeoffs & positional thinking', color: 'var(--text)' },
  { icon: FaIndustry, label: 'Factorio', subtitle: 'Logistics optimization & resource flow', color: 'var(--accent)' },
  { icon: FaChartLine, label: 'Economics', subtitle: 'Market dynamics & incentive design', color: 'var(--accent2)' },
  { icon: FaGlobe, label: 'Geopolitics', subtitle: 'Systems thinking at civilizational scale', color: 'var(--python)' },
  { icon: FaBrain, label: 'Psychology', subtitle: 'User behavior & decision architecture', color: '#c084fc' },
  { icon: FaBookOpen, label: 'Philosophy', subtitle: 'First-principles reasoning', color: 'var(--rust)' },
]

export default async function AboutPage() {
  const stats = await getServerStats()
  const contacts = getContacts(stats.memberCountFormatted)

  return (
    <article className="section">
      <SectionLabel>The Person</SectionLabel>
      <h1 className={styles.heading}>About.</h1>

      <p className={styles.intro}>
        I&apos;m Sudip Roy — systems engineer from West Bengal, India.
        I go by <span className={styles.handle}>drlove</span> online.
      </p>

      <div className={styles.twoCol}>
        <div>
          <h3 className={styles.sideTitle}>The Journey</h3>
          <JourneyTimeline />
        </div>

        <div>
          <h3 className={styles.sideTitle}>Outside the Code</h3>
          <p className={styles.sideNote}>
            The interests that don&apos;t look like CS but completely inform how I build systems:
          </p>

          <div className={styles.interestGrid}>
            {interests.map(({ icon: Icon, label, subtitle, color }) => (
              <div
                key={label}
                className={styles.interestCard}
                style={{ '--item-color': color } as React.CSSProperties}
              >
                <div className={styles.interestAccentBar} />
                <div className={styles.interestWatermark}>
                  <Icon />
                </div>
                <div className={styles.interestContent}>
                  <div className={styles.interestIconCircle}>
                    <Icon />
                  </div>
                  <div>
                    <p className={styles.interestLabel}>{label}</p>
                    <p className={styles.interestSub}>{subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.contactSection}>
        <SectionLabel>Get in Touch</SectionLabel>
        <p className={styles.contactSub}>
          Open to conversations about engineering, systems design, and interesting problems.
        </p>

        <div className={styles.contactGrid}>
          {contacts.map(({ type, value, href, icon: Icon, color, note }) => (
            <div
              key={type}
              className={styles.contactItem}
              style={{ '--channel-color': color } as React.CSSProperties}
            >
              <div className={styles.contactHeader}>
                <div className={styles.contactIconCircle}>
                  <Icon />
                </div>
                <div>
                  <p className={styles.contactType}>{type}</p>
                  <a href={href} className={styles.contactValue} target="_blank" rel="noopener noreferrer">
                    {value}
                    <span className={styles.contactArrow}>&#8599;</span>
                  </a>
                </div>
              </div>
              {note && <p className={styles.contactNote}>{note}</p>}
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
