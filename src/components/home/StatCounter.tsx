'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './StatCounter.module.css'

interface StatCounterProps {
  end: number
  suffix?: string
  label: string
  duration?: number // ms
  delay?: number    // ms - stagger offset
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function StatCounter({
  end,
  suffix = '',
  label,
  duration = 1400,
  delay = 0,
}: StatCounterProps) {
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          setVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    started.current = true

    const timeout = setTimeout(() => {
      const start = performance.now()

      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        setValue(Math.round(easeOut(progress) * end))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)

    return () => clearTimeout(timeout)
  }, [visible, end, duration, delay])

  return (
    <div className={styles.stat} ref={ref}>
      <div className={styles.number} aria-label={`${end}${suffix}`}>
        {value}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}
