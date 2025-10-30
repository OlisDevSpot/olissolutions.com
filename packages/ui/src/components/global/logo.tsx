import { cn } from '@olis/ui/lib/utils'
import { motion } from 'motion/react'

type LogoProps = {
  color?: 'primary' | 'green' | 'blue' | 'red'
} & ({
  full?: false
  product?: never
} | {
  full: true
  product: string
})

export function Logo({ color = 'primary', full, product }: LogoProps) {
  const colorMap: Record<'primary' | 'green' | 'blue' | 'red', string> = {
    primary: 'bg-primary',
    green: 'bg-green-700',
    blue: 'bg-blue-700',
    red: 'bg-red-700',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="flex items-center space-x-1.5"
    >
      <div className={cn('w-fit px-2 h-8 bg-primary rounded-lg flex items-center justify-center', colorMap[color])}>
        <span className="text-primary-foreground font-bold text-xl font-(family-name:--font-syne)">Olis</span>
      </div>
      {full && (
        <span className="text-lg font-medium text-foreground">
          {product}
        </span>
      )}
    </motion.div>
  )
}
