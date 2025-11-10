import { electricProviders, foundationTypes, hvacComponents, hvacTypes, insulationLevels, roofLocations, roofTypes, variableDataTypes, windowsTypes } from '@olis/core/constants'
import { pgSchema } from 'drizzle-orm/pg-core'

export const remodelXSchema = pgSchema('remodel_x')

export const hvacTypeEnum = remodelXSchema.enum('hvac_type', hvacTypes)
export const hvacComponentsEnum = remodelXSchema.enum('hvac_components', hvacComponents)
export const windowsTypeEnum = remodelXSchema.enum('windows_type', windowsTypes)
export const insulationLevelEnum = remodelXSchema.enum('insulation_level', insulationLevels)
export const foundationTypeEnum = remodelXSchema.enum('foundation_type', foundationTypes)
export const electricProviderEnum = remodelXSchema.enum('electric_provider', electricProviders)
export const roofLocationEnum = remodelXSchema.enum('roof_location', roofLocations)
export const roofTypeEnum = remodelXSchema.enum('roof_type', roofTypes)
export const dataTypeEnum = remodelXSchema.enum('data_type', variableDataTypes)
