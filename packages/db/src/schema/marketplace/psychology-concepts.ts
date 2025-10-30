import type z from 'zod'
import { unsafeId } from '@olis/db/lib/schema-helpers'
import { xSolutionPsychologyConcepts } from '@olis/db/schema/marketplace'
import { relations } from 'drizzle-orm'
import { text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { marketplaceSchema } from './meta'

export const psychologyConcepts = marketplaceSchema.table('psychology_concepts', {
  id: unsafeId,
  label: text('label').notNull(),
  accessor: text('accessor').notNull(),
  description: text('description').notNull(),
})

export const psychologyConceptsRelations = relations(
  psychologyConcepts,
  ({ many }) => ({
    xSolutionPsychologyConcepts: many(xSolutionPsychologyConcepts),
  }),
)

export const selectPsychologyConceptSchema = createSelectSchema(psychologyConcepts)
export type PsychologyConcept = z.infer<typeof selectPsychologyConceptSchema>

export const insertPsychologyConceptSchema = createInsertSchema(psychologyConcepts).omit({
  id: true,
})
export type InsertPsychologyConcept = z.infer<typeof insertPsychologyConceptSchema>
