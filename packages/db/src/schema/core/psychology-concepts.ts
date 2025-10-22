import type z from 'zod'
import { xSolutionsPsychologyConcepts } from '@olis/db/schema/core'
import { relations } from 'drizzle-orm'
import { pgTable, serial, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const psychologyConcepts = pgTable('psychology_concepts', {
  id: serial('id').primaryKey().notNull(),
  label: text('name').notNull(),
  accessor: text('accessor').notNull(),
  description: text('description').notNull(),
})

export const psychologyConceptsRelations = relations(
  psychologyConcepts,
  ({ many }) => ({
    solutions: many(xSolutionsPsychologyConcepts),
  }),
)

export const selectPsychologyConceptSchema = createSelectSchema(psychologyConcepts)
export type SelectPsychologyConcept = z.infer<typeof selectPsychologyConceptSchema>

export const insertPsychologyConceptSchema = createInsertSchema(psychologyConcepts).omit({
  id: true,
})
export type InsertPsychologyConcept = z.infer<typeof insertPsychologyConceptSchema>
