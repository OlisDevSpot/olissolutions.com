import type z from 'zod'
import { unsafeId } from '@olis/db/lib/schema-helpers'
import { customers } from '@olis/db/schema/platform'
import { projects } from '@olis/db/schema/remodel-x/project'
import { relations } from 'drizzle-orm'
import { boolean, unique, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { remodelXSchema } from './meta'

export const x_projectCustomers = remodelXSchema.table('x_project_customers', {
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

export const selectXProjectCustomerSchema = createSelectSchema(x_projectCustomers)
export type SelectXProjectCustomerSchema = z.infer<typeof selectXProjectCustomerSchema>

export const insertXProjectCustomerSchema = createInsertSchema(x_projectCustomers).omit({
  id: true,
  projectId: true,
  customerId: true,
})
export type InsertXProjectCustomerSchema = z.infer<typeof insertXProjectCustomerSchema>
