import styles from './SectionLabel.module.css'

interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className={styles.label}>{children}</p>
  )
}
