import { unsafeId } from '@workspace/db/lib/schema-helpers'
import { variableDataTypes } from '@workspace/core/constants/enums'

import { relations } from 'drizzle-orm'
import {
  jsonb,
  pgEnum,
  pgTable,
  varchar,
} from 'drizzle-orm/pg-core'

import { x_solutionVariables } from './x-solution-variable'

export const dataTypeEnum = pgEnum('data_type', variableDataTypes)

export const variables = pgTable('variable', {
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
