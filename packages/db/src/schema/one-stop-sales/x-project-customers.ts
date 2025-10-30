import { unsafeId } from '@olis/db/lib/schema-helpers'
import { projects } from '@olis/db/schema/one-stop-sales/project'
import { customers } from '@olis/db/schema/platform'
import { relations } from 'drizzle-orm'
import { boolean, unique, uuid } from 'drizzle-orm/pg-core'
import { oneStopSalesSchema } from './meta'

export const x_projectCustomers = oneStopSalesSchema.table('x_project_customers', {
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
