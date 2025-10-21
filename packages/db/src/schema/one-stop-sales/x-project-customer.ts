import { unsafeId } from '@workspace/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import { boolean, pgTable, unique, uuid } from 'drizzle-orm/pg-core'
import { customers } from './customer'
import { projects } from './project'

export const x_projectCustomers = pgTable('x_project_customer', {
  id: unsafeId,
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customers.id, { onDelete: 'cascade' }),
  isPrimary: boolean('is_primary').default(false),
}, table => [
  unique('project_id_customer_id_unique').on(
    table.projectId,
    table.customerId,
  ),
])

export const projectCustomerRelations = relations(
  x_projectCustomers,
  ({ one }) => ({
    customer: one(customers, {
      fields: [x_projectCustomers.customerId],
      references: [customers.id],
    }),
    project: one(projects, {
      fields: [x_projectCustomers.projectId],
      references: [projects.id],
    }),
  }),
)

export type X_ProjectCustomer = typeof x_projectCustomers.$inferSelect
export type X_ProjectCustomerInsert = typeof x_projectCustomers.$inferInsert
