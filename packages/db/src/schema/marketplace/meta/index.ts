import { easeOfUse } from '@olis/core/constants'
import { pgSchema } from 'drizzle-orm/pg-core'

export const marketplaceSchema = pgSchema('marketplace')

export const easeOfUseEnum = marketplaceSchema.enum('ease_of_use', easeOfUse)
