import { platformSchema } from '@olis/db/lib/constants'
import { createdAt, id, updatedAt } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { text, uuid } from 'drizzle-orm/pg-core'
import { user } from '../identity/auth'

import { solutions } from './solutions'

export const xUserSolutions = platformSchema.table('x_user_solutions', {
  id,
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  solutionId: uuid('solution_id')
    .notNull()
    .references(() => solutions.id),
  createdAt,
  updatedAt,
})

export const xUserSolutionRelations = relations(
  xUserSolutions,
  ({ one }) => ({
    user: one(user, {
      fields: [xUserSolutions.userId],
      references: [user.id],
    }),
    solution: one(solutions, {
      fields: [xUserSolutions.solutionId],
      references: [solutions.id],
    }),
  }),
)

export const xUserSolution = xUserSolutions.$inferSelect
export const xUserSolutionInsert = xUserSolutions.$inferInsert
