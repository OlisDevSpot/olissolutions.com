import { cn } from '@olis/ui/lib/utils'
import { createContext, use } from 'react'

interface PageHeaderSectionContext {}

export const pageHeaderContext = createContext<PageHeaderSectionContext | null>(null)

export function usePageHeaderSectionContext() {
  const context = use(pageHeaderContext)

  if (!context) {
    throw new Error('usePageHeaderSectionContext must be used within a PageHeaderProvider')
  }

  return context
}

interface PageHeaderSectionProps extends React.HTMLProps<HTMLDivElement> {
  values?: PageHeaderSectionContext
  children: React.ReactNode
}

export function PageHeaderSection({ children, values }: PageHeaderSectionProps) {
  return (
    <pageHeaderContext.Provider value={values || {}}>
      {children}
    </pageHeaderContext.Provider>
  )
}

interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

function Frame({ children, className, ...props }: FrameProps) {
  return (
    <header className={cn('flex flex-col gap-6 shrink-0', className)} {...props}>
      {children}
    </header>
  )
}

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
  title: string
  description?: string
  sticky?: boolean
  children?: React.ReactNode
}

function Header({ title, description, sticky = false, children, ...props }: HeaderProps) {
  return (
    <div className="flex" {...props}>
      <div className={cn('flex flex-col gap-2', sticky && 'sticky top-0')}>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {children}
    </div>
  )
}

function ActionButtons({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 ml-auto">
      {children}
    </div>
  )
}

function Filters({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  )
}

PageHeaderSection.Frame = Frame
PageHeaderSection.Header = Header
PageHeaderSection.ActionButtons = ActionButtons
PageHeaderSection.Filters = Filters
