import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>
        © {year} Sudip Roy
      </span>
      <span className={styles.built}>
        Built with Next.js · Hosted on GitHub Pages
      </span>
    </footer>
  )
}
