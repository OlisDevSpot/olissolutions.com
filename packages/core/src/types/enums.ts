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
  userSolutionStatuses,
  variableDataTypes,
  variableGroups,
  windowsTypes,
} from '@olis/core/constants'

// PLATFORM
export type TradeLocation = (typeof tradeLocations)[number]
export type ConstructionType = (typeof constructionTypes)[number]

export type RoofLocation = (typeof roofLocations)[number]
export type RoofType = (typeof roofTypes)[number]
export type HVACType = (typeof hvacTypes)[number]
export type HVACComponent = (typeof hvacComponents)[number]
export type WindowsType = (typeof windowsTypes)[number]
export type InsulationLevel = (typeof insulationLevels)[number]
export type FoundationType = (typeof foundationTypes)[number]

// IDENTITY
export type UserRole = (typeof userRoles)[number]

// MARKETPLACE
export type EaseOfUse = (typeof easeOfUse)[number]
export type UserSolutionStatus = (typeof userSolutionStatuses)[number]

// REMODEL-X
export type ElectricProvider = (typeof electricProviders)[number]
export type VariableDataType = (typeof variableDataTypes)[number]
export type VariableGroup = (typeof variableGroups)[number]
