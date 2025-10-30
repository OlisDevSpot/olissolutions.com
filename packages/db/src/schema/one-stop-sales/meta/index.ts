import { electricProviders, foundationTypes, hvacComponents, hvacTypes, insulationLevels, roofLocations, roofTypes, variableDataTypes, windowsTypes } from '@olis/core/constants'
import { pgSchema } from 'drizzle-orm/pg-core'

export const oneStopSalesSchema = pgSchema('one_stop_sales')

export const hvacTypeEnum = oneStopSalesSchema.enum('hvac_type', hvacTypes)
export const hvacComponentsEnum = oneStopSalesSchema.enum('hvac_components', hvacComponents)
export const windowsTypeEnum = oneStopSalesSchema.enum('windows_type', windowsTypes)
export const insulationLevelEnum = oneStopSalesSchema.enum('insulation_level', insulationLevels)
export const foundationTypeEnum = oneStopSalesSchema.enum('foundation_type', foundationTypes)
export const electricProviderEnum = oneStopSalesSchema.enum('electric_provider', electricProviders)
export const roofLocationEnum = oneStopSalesSchema.enum('roof_location', roofLocations)
export const roofTypeEnum = oneStopSalesSchema.enum('roof_type', roofTypes)
export const dataTypeEnum = oneStopSalesSchema.enum('data_type', variableDataTypes)
