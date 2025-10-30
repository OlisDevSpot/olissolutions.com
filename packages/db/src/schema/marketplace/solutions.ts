import type * as z from 'zod'
import { createdAt, unsafeId, updatedAt } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { boolean, integer, json, real, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { easeOfUseEnum, marketplaceSchema } from './meta'
import { xSolutionPsychologyConcepts } from './x-solution-psychology-concepts'

export interface GeneralDescription {
  description: string
  whatItDoes: string
  howItHelps: string
}

export const solutions = marketplaceSchema.table('solutions', {
  id: unsafeId,
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  generalDescription: json('general_description').$type<GeneralDescription>().notNull(),
  easeOfUse: easeOfUseEnum('ease_of_use').notNull().default('moderate'),
  pricePerMonth: real('price_per_month').notNull(),
  isFeatured: boolean('is_featured').notNull().default(false),
  devPort: integer('dev_port').notNull(),
  subdomain: text('subdomain').notNull(),
  isActive: boolean('is_active').notNull().default(false),
  createdAt,
  updatedAt,
})

export const solutionsRelations = relations(solutions, ({ many }) => ({
  xSolutionPsychologyConcepts: many(xSolutionPsychologyConcepts),
}))

export const selectSolutionSchema = createSelectSchema(solutions)
export type Solution = z.infer<typeof selectSolutionSchema>
export type SafeSolution = Omit<Solution, 'createdAt' | 'updatedAt'> & { createdAt: string, updatedAt: string }

export const insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export type InsertSolution = z.infer<typeof insertSolutionSchema>
export type SafeInsertSolution = Omit<InsertSolution, 'createdAt' | 'updatedAt'> & { createdAt: string, updatedAt: string }
