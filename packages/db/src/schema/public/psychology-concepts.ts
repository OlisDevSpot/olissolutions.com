import { xSolutionsPsychologyConcepts } from '@workspace/db/schema/public'
import { relations } from 'drizzle-orm'
import { pgTable, serial, text } from 'drizzle-orm/pg-core'

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
