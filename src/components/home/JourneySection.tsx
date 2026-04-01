import type { IconType } from 'react-icons'
import { FaChess, FaIndustry, FaChartLine, FaGlobe, FaBrain, FaBookOpen } from 'react-icons/fa'
import SectionLabel from '@/components/ui/SectionLabel'
import JourneyTimeline from './JourneyTimeline'
import styles from './JourneySection.module.css'

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

export default function JourneySection() {
  return (
    <section id="journey" className="section" aria-label="About and journey">
      <SectionLabel>The Person</SectionLabel>
      <h2 className={styles.heading}>The story so far.</h2>
      <p className={styles.intro}>
        I&apos;m Sudip Roy - systems engineer from West Bengal, India.
        I go by <span className={styles.handle}>drlove</span> online.
        I build things because I need them to exist, then scale them until they can&apos;t be ignored.
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
    </section>
  )
}
