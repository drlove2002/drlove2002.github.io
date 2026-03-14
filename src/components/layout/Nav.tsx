'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const links = [
  { href: '/', label: 'Home' },
  { href: '/worldwide', label: 'Worldwide' },
  { href: '/writing', label: 'Writing' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.logo}>
        Sudip Roy <span className={styles.dot}>·</span> drlove
      </Link>

      {/* Desktop links */}
      <ul className={styles.links} role="list">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${styles.link} ${isActive(href) ? styles.active : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger button — mobile only */}
      <button
        className={styles.hamburger}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`${styles.bar} ${open ? styles.bar1Open : ''}`} />
        <span className={`${styles.bar} ${open ? styles.bar2Open : ''}`} />
        <span className={`${styles.bar} ${open ? styles.bar3Open : ''}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className={styles.mobileMenu} role="dialog" aria-modal="true">
          <ul className={styles.mobileLinks} role="list">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.mobileLink} ${isActive(href) ? styles.mobileLinkActive : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
