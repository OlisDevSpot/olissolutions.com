import { Calendar, Package, Star, TrendingUp } from 'lucide-react'

export const purchases = [
  {
    id: '1',
    name: 'Sales Presentation Toolkit',
    status: 'active',
    purchaseDate: '2024-01-15',
    nextBilling: '2024-02-15',
    price: 49,
  },
  {
    id: '2',
    name: 'Commission Tracker Pro',
    status: 'active',
    purchaseDate: '2024-01-10',
    nextBilling: '2024-02-10',
    price: 39,
  },
  {
    id: '3',
    name: 'ROI Calculator Suite',
    status: 'trial',
    purchaseDate: '2024-01-20',
    trialEnds: '2024-02-03',
    price: 19,
  },
]

export const featuredSolutions = [
  {
    id: 'customer-portal',
    name: 'Customer Portal',
    description:
      'Branded customer portal for project updates and communications',
    price: 79,
    category: 'Customer Service',
    rating: 4.9,
  },
  {
    id: 'lead-management-system',
    name: 'Lead Management System',
    description: 'Comprehensive CRM solution for construction sales',
    price: 59,
    category: 'CRM',
    rating: 4.8,
  },
  {
    id: 'proposal-generator',
    name: 'Smart Proposal Generator',
    description: 'Create professional proposals quickly with automation',
    price: 29,
    category: 'Documentation',
    rating: 4.7,
  },
]

export const stats = [
  { label: 'Active Solutions', value: '2', icon: Package },
  { label: 'Trial Solutions', value: '1', icon: Star },
  { label: 'Total Savings', value: '$340', icon: TrendingUp },
  { label: 'Member Since', value: 'Jan 2024', icon: Calendar },
]

export const solutions = [
  {
    id: 'sales-presentation-toolkit',
    name: 'Sales Presentation Toolkit',
    status: 'active' as const,
    description:
      'Professional presentation templates and tools for construction sales.',
    lastUsed: '2 hours ago',
    usageCount: 47,
    features: [
      'Customizable templates',
      'Project galleries',
      'Interactive pricing tools',
    ],
    launchUrl: 'https://presentations.olissolutions.com',
    category: 'Sales Tool',
    icon: '🎯',
  },
  {
    id: 'commission-tracker',
    name: 'Commission Tracker Pro',
    status: 'active' as const,
    description: 'Advanced commission tracking and analytics platform.',
    lastUsed: '1 day ago',
    usageCount: 23,
    features: [
      'Commission tracking',
      'Performance analytics',
      'Earning forecasts',
    ],
    launchUrl: 'https://tracker.olissolutions.com',
    category: 'Analytics',
    icon: '📊',
  },
  {
    id: 'roi-calculator',
    name: 'ROI Calculator Suite',
    status: 'trial' as const,
    description: 'Interactive calculators for project value demonstration.',
    lastUsed: '3 days ago',
    usageCount: 8,
    trialEnds: '14 days',
    features: [
      'Energy savings calculator',
      'Property value calculator',
      'Cost benefit analysis',
    ],
    launchUrl: 'https://calculator.olissolutions.com',
    category: 'Sales Tool',
    icon: '🧮',
  },
]
