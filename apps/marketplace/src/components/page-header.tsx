import { motion } from 'motion/react'

interface PageHeaderProps {
  children?: React.ReactNode
  label: string
  description: string
}

export function PageHeader({ children, label, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-8 justify-between items-center"
      >
        <div className="">
          <h1 className="text-3xl font-bold text-foreground mb-2">{label}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
      </motion.div>
    </div>
  )
}
