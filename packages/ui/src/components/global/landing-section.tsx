import { cn } from '@olis/ui/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function LandingSection({ children, className, ...props }: Props) {
  return (
    <section className={cn('py-16 md:py-32', className)} {...props}>
      <div className="mx-auto space-y-8 px-6 md:space-y-16 container">
        {children}
      </div>
    </section>
  )
}
