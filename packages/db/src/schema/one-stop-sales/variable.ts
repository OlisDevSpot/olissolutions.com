import { variableDataTypes } from '@olis/core/constants/enums'
import { oneStopSalesSchema } from '@olis/db/lib/constants'

import { unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import {
  jsonb,
  pgEnum,
  varchar,
} from 'drizzle-orm/pg-core'
import { x_solutionVariables } from './x-solution-variable'

export const dataTypeEnum = pgEnum('data_type', variableDataTypes)

export const variables = oneStopSalesSchema.table('variable', {
  id: unsafeId,
  key: varchar('key', { length: 80 }).notNull().unique(),
  label: varchar('label', { length: 80 }).notNull(),
  dataType: dataTypeEnum('data_type').notNull(),
  description: varchar('description', { length: 255 }),
  options: jsonb('options').$type<string[] | number[]>(),
})

export const variableRelations = relations(variables, ({ many }) => ({
  x_solutionVariables: many(x_solutionVariables),
}))

export type Variable = typeof variables.$inferSelect
export type InsertVariable = typeof variables.$inferInsert
