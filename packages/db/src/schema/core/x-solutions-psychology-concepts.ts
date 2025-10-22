import { relations } from 'drizzle-orm'
import { integer, pgTable, uuid } from 'drizzle-orm/pg-core'
import { psychologyConcepts } from './psychology-concepts'
import { solutions } from './solutions'

export const xSolutionsPsychologyConcepts = pgTable(
  'x_solutions_psychology_concepts',
  {
    solutionId: uuid('solution_id')
      .notNull()
      .references(() => solutions.id),
    psychologyConceptId: integer('psychology_concept_id')
      .notNull()
      .references(() => psychologyConcepts.id),
  },
)

export const xSolutionsPsychologyConceptRelations = relations(
  xSolutionsPsychologyConcepts,
  ({ one }) => ({
    solution: one(solutions, {
      fields: [xSolutionsPsychologyConcepts.solutionId],
      references: [solutions.id],
    }),
    psychologyConcept: one(psychologyConcepts, {
      fields: [xSolutionsPsychologyConcepts.psychologyConceptId],
      references: [psychologyConcepts.id],
    }),
  }),
)
