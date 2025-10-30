import type z from 'zod'

import { createdAt, id, updatedAt } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import {
  boolean,
  real,
  uuid,
} from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { oneStopSalesSchema } from './meta'
import { projects } from './project'

export const financialProfiles = oneStopSalesSchema.table('financial_profile', {
  id,

  // disadvantages info
  isSenior: boolean('is_senior').notNull().default(false),
  isRetired: boolean('is_retired').notNull().default(false),
  isFixedIncome: boolean('is_fixed_income').notNull().default(false),
  isLowIncome: boolean('is_low_income').notNull().default(false),
  isHighElectricPayment: boolean('is_high_electric_payment')
    .notNull()
    .default(false),
  isGovtAssisted: boolean('is_govt_assisted').notNull().default(false),

  // bills
  currentElectricPayment: real('current_electric_payment'),
  currentGasPayment: real('current_gas_payment'),
  currentWaterPayment: real('current_water_payment'),
  currentGardeningPayment: real('current_gardening_payment'),

  // foreign keys
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
})

export const financialProfileRelations = relations(
  financialProfiles,
  ({ one }) => ({
    project: one(projects, {
      fields: [financialProfiles.projectId],
      references: [projects.id],
    }),
  }),
)

export type FinancialProfile = typeof financialProfiles.$inferSelect
export const selectFinancialProfileSchema = createSelectSchema(financialProfiles)
export type SelectFinancialProfileSchema = z.infer<typeof selectFinancialProfileSchema>

export type FinancialProfileInsert = typeof financialProfiles.$inferInsert
export const insertFinancialProfileSchema = createInsertSchema(financialProfiles).omit({
  id: true,
  projectId: true,
  createdAt: true,
  updatedAt: true,
})
export type InsertFinancialProfileSchema = z.infer<typeof insertFinancialProfileSchema>
