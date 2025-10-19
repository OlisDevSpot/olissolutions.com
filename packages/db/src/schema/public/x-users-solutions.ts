import { createdAt, id, updatedAt } from '@workspace/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'
import { solutions } from './solutions'

export const xUsersSolutions = pgTable('x_users_solutions', {
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

export const xUsersSolutionRelations = relations(
  xUsersSolutions,
  ({ one }) => ({
    user: one(user, {
      fields: [xUsersSolutions.userId],
      references: [user.id],
    }),
    solution: one(solutions, {
      fields: [xUsersSolutions.solutionId],
      references: [solutions.id],
    }),
  }),
)

export const xUsersSolution = xUsersSolutions.$inferSelect
export const xUsersSolutionInsert = xUsersSolutions.$inferInsert
