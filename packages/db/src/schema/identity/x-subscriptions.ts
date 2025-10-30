import type z from 'zod'
import { createdAt, id, updatedAt } from '@olis/db/lib/schema-helpers'
import { solutions } from '@olis/db/schema/marketplace'
import { relations } from 'drizzle-orm'
import { integer, text } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { identitySchema, userSolutionStatusEnum } from './meta'
import { user } from './users'

export const xSubscriptions = identitySchema.table('x_user_solutions', {
  id,
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  solutionId: integer('solution_id')
    .notNull()
    .references(() => solutions.id),
  status: userSolutionStatusEnum('status').notNull().default('active'),
  createdAt,
  updatedAt,
})

export const xSubscriptionsRelations = relations(
  xSubscriptions,
  ({ one }) => ({
    user: one(user, {
      fields: [xSubscriptions.userId],
      references: [user.id],
    }),
    solution: one(solutions, {
      fields: [xSubscriptions.solutionId],
      references: [solutions.id],
    }),
  }),
)

export const xSubscriptionsSelectSchema = createSelectSchema(xSubscriptions)
export type XSubscriptions = z.infer<typeof xSubscriptionsSelectSchema>

export const insertXSubscriptionSchema = createInsertSchema(xSubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export type InsertXSubscription = z.infer<typeof insertXSubscriptionSchema>
