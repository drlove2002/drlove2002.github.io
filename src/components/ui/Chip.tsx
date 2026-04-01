import styles from './Chip.module.css'

type ChipVariant = 'python' | 'rust' | 'next' | 'db' | 'default'

interface ChipProps {
  label: string
  variant?: ChipVariant
  tooltip?: string
}

export default function Chip({ label, variant = 'default', tooltip }: ChipProps) {
  return (
    <span
      className={`${styles.chip} ${styles[variant]}`}
      title={tooltip}
      aria-label={tooltip ? `${label} - ${tooltip}` : label}
    >
      {label}
    </span>
  )
}
