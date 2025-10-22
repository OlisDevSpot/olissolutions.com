import type {
  constructionTypes,
  easeOfUse,
  electricProviders,
  foundationTypes,
  hvacComponents,
  hvacTypes,
  insulationLevels,
  roofLocations,
  roofTypes,
  tradeLocations,
  userRoles,
  variableDataTypes,
  variableGroups,
  windowsTypes,
} from '@olis/core/constants/enums'

export type EaseOfUse = (typeof easeOfUse)[number]
export type UserRole = (typeof userRoles)[number]

export type ElectricProvider = (typeof electricProviders)[number]

export type TradeLocation = (typeof tradeLocations)[number]
export type ConstructionType = (typeof constructionTypes)[number]

export type RoofLocation = (typeof roofLocations)[number]
export type RoofType = (typeof roofTypes)[number]
export type HVACType = (typeof hvacTypes)[number]
export type HVACComponent = (typeof hvacComponents)[number]
export type WindowsType = (typeof windowsTypes)[number]
export type InsulationLevel = (typeof insulationLevels)[number]
export type FoundationType = (typeof foundationTypes)[number]

export type VariableDataType = (typeof variableDataTypes)[number]
export type VariableGroup = (typeof variableGroups)[number]
