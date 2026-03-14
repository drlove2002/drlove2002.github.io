import type { IconType } from 'react-icons'
import { FaXTwitter } from 'react-icons/fa6'
import { FiMail, FiGithub, FiLinkedin, FiMessageCircle, FiBookOpen } from 'react-icons/fi'
import SectionLabel from '@/components/ui/SectionLabel'
import styles from './ContactSection.module.css'

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

interface ContactSectionProps {
  memberCount: string
}

export default function ContactSection({ memberCount }: ContactSectionProps) {
  const contacts = getContacts(memberCount)

  return (
    <section id="contact" className={`section ${styles.contactSection}`} aria-label="Contact">
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
    </section>
  )
}
