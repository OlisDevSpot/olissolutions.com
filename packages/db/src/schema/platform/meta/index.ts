import { constructionTypes, homeAreas, tradeLocations } from '@olis/core/constants'
import { pgSchema } from 'drizzle-orm/pg-core'

export const platformSchema = pgSchema('platform')

export const constructionTypeEnum = platformSchema.enum('construction_type', constructionTypes)
export const homeAreaEnum = platformSchema.enum('home_area', homeAreas)
export const locationEnum = platformSchema.enum('location', tradeLocations)
