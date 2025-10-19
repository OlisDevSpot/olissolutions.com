import { motion } from 'motion/react'
import Link from 'next/link'

interface LogoProps {
  long?: boolean
}

export function Logo({ long = false }: LogoProps) {
  return (
    <Link href="/">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center space-x-2"
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">O</span>
        </div>
        <span className="text-2xl font-bold text-foreground font-(family-name:--font-syne)">
          {long ? 'Olis Solutions' : 'Olis'}
        </span>
      </motion.div>
    </Link>
  )
}
