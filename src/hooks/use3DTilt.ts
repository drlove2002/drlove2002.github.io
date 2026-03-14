'use client'

import { useMotionValue, useTransform } from 'framer-motion'

export function use3DTilt(rotation = 10) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [rotation, -rotation])
  const rotateY = useTransform(x, [-0.5, 0.5], [-rotation, rotation])

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return { rotateX, rotateY, onMouseMove, onMouseLeave }
}
