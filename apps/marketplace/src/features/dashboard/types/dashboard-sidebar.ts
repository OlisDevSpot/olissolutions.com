export interface DashboardNavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

export interface DashboardNavGroup {
  title: string
  items: DashboardNavItem[]
}
