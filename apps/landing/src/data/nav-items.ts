import type { DashboardNavGroup, DashboardNavItem } from '@/features/dashboard/types/dashboard-sidebar'

import {
  BarChart3,
  CreditCard,
  HelpCircle,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
} from 'lucide-react'

export const navigationItems = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact-us' },
]

export const authenticatedNavItems = [
  ...navigationItems,
  { name: 'Dashboard', href: '/dashboard' },
]

export const dashboardSidebarNavItems: DashboardNavGroup[] = [
  {
    title: 'Main',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Overview and quick actions',
      },
      {
        title: 'Marketplace',
        href: '/dashboard/marketplace',
        icon: ShoppingBag,
        description: 'Browse and purchase solutions',
      },
      {
        title: 'My Solutions',
        href: '/dashboard/my-solutions',
        icon: Package,
        badge: '3',
        description: 'Access your purchased tools',
      },
    ],
  },
  {
    title: 'Analytics',
    items: [
      {
        title: 'Performance',
        href: '/dashboard/analytics',
        icon: BarChart3,
        description: 'Sales metrics and insights',
      },
      {
        title: 'Billing',
        href: '/dashboard/billing',
        icon: CreditCard,
        description: 'Invoices and payment history',
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
        description: 'Profile and preferences',
      },
      {
        title: 'Support',
        href: '/dashboard/support',
        icon: HelpCircle,
        description: 'Get help and contact us',
      },
    ],
  },
]

export const dashboardSidebarQuickActions: DashboardNavItem[] = [
  {
    title: 'Back to Site',
    href: '/',
    icon: Home,
    description: 'Return to main website',
  },
]
