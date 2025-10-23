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
