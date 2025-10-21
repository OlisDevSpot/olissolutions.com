import type * as z from 'zod'
import { easeOfUse } from '@workspace/core/constants/enums'
import { createdAt, id, updatedAt } from '@workspace/db/lib/schema-helpers'
import { boolean, pgEnum, pgTable, real, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const easeOfUseEnum = pgEnum('ease_of_use', easeOfUse)

export const solutions = pgTable('solutions', {
  id,
  name: text('name').notNull(),
  description: text('description').notNull(),
  whatItDoes: text('what_it_does').notNull(),
  howItHelps: text('how_it_helps').notNull(),
  easeOfUse: easeOfUseEnum('ease_of_use').notNull().default('moderate'),
  pricePerMonth: real('price_per_month').notNull(),
  isFeatured: boolean('is_featured').notNull().default(false),
  subdomain: text('subdomain').notNull(),
  isActive: boolean('is_active').notNull().default(false),
  createdAt,
  updatedAt,
})

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
