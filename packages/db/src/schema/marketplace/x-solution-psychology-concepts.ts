import type * as z from 'zod'
import { unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { integer } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { marketplaceSchema } from './meta'
import { psychologyConcepts } from './psychology-concepts'
import { solutions } from './solutions'

export const xSolutionPsychologyConcepts = marketplaceSchema.table(
  'x_solution_psychology_concepts',
  {
    id: unsafeId,
    solutionId: integer('solution_id')
      .notNull()
      .references(() => solutions.id),
    psychologyConceptId: integer('psychology_concept_id')
      .notNull()
      .references(() => psychologyConcepts.id),
  },
)

export const xSolutionPsychologyConceptRelations = relations(
  xSolutionPsychologyConcepts,
  ({ one }) => ({
    solution: one(solutions, {
      fields: [xSolutionPsychologyConcepts.solutionId],
      references: [solutions.id],
    }),
    psychologyConcept: one(psychologyConcepts, {
      fields: [xSolutionPsychologyConcepts.psychologyConceptId],
      references: [psychologyConcepts.id],
    }),
  }),
)

export const selectXSolutionPsychologyConceptSchema = createSelectSchema(xSolutionPsychologyConcepts)
export type XSolutionPsychologyConcept = z.infer<typeof selectXSolutionPsychologyConceptSchema>

export const insertXSolutionPsychologyConceptSchema = selectXSolutionPsychologyConceptSchema.omit({ id: true })
export type InsertXSolutionPsychologyConcept = z.infer<typeof insertXSolutionPsychologyConceptSchema>
