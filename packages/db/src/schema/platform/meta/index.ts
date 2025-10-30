import { constructionTypes, tradeLocations } from '@olis/core/constants'
import { pgSchema } from 'drizzle-orm/pg-core'

export const platformSchema = pgSchema('platform')

export const constructionTypeEnum = platformSchema.enum('construction_type', constructionTypes)
export const locationEnum = platformSchema.enum('location', tradeLocations)
