import { BarChart3, CreditCard, Package, ShoppingBag } from 'lucide-react'

export const sidebarGroups = {
  main: 'Main',
  analytics: 'Analytics',
} as const

export const sidebarItems = {
  main: [
    {
      title: 'Marketplace',
      url: '/dashboard/marketplace',
      icon: ShoppingBag,
    },
    {
      title: 'My Solutions',
      url: '/dashboard/my-solutions',
      icon: Package,
      badge: '3',
    },
  ],
  analytics: [
    {
      title: 'Performance',
      url: '/dashboard/analytics',
      icon: BarChart3,
    },
    {
      title: 'Billing',
      url: '/dashboard/billing',
      icon: CreditCard,
    },
  ],
}
