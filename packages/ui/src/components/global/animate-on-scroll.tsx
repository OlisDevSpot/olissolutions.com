'use client'

import type { Variants } from 'motion/react'
import { fadeInUp, useScrollAnimation } from '@workspace/ui/hooks/use-scroll-animation'
import { motion } from 'motion/react'

export function AnimateOnScroll({
  children,
  variants = fadeInUp,
  threshold = 0.1,
  className = '',
}: {
  children: React.ReactNode
  variants?: Variants
  threshold?: number
  className?: string
}) {
  const { ref, isInView } = useScrollAnimation(threshold)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
