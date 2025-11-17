import type { ConstructionType, TradeLocation } from '@olis/core/types'

export const CONSTRUCTION_TYPES_LABEL_MAP = {
  'energy-efficient': 'Energy Efficient',
  'rough-construction': 'Rough Construction',
  'finish-construction': 'Finish Construction',
} as const satisfies Record<ConstructionType, string>

export const TRADE_LOCATIONS_LABEL_MAP = {
  exterior: 'Exterior',
  interior: 'Interior',
  lot: 'Lot',
} as const satisfies Record<TradeLocation, string>

export const BREADCRUMB_LABEL_MAP = {
  'dashboard': 'Dashboard',
  'projects': 'Projects',
  'showroom': 'Showroom',
  'trades': 'Trades',
  'solutions': 'Solutions',
  'addons': 'Addons',
  'materials': 'Materials',
  'calculator': 'Calculator',
  'edit': 'Edit',
  'customers': 'Customers',
  'property': 'Property',
  'home-situation': 'Home Situation',
  'settings': 'Settings',
  'pricing': 'Pricing',
  'energy-efficiency': 'Energy Efficiency',
  'project-roi-calculator': 'Project ROI Calculator',
}
