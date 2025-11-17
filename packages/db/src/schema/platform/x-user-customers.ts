import { unsafeId } from '@olis/db/lib/schema-helpers'
import { customers } from '@olis/db/schema/platform'
import { relations } from 'drizzle-orm'
import { unique, uuid } from 'drizzle-orm/pg-core'
import { user } from '../identity'
import { platformSchema } from './meta'

export const x_userCustomers = platformSchema.table('x_user_customers', {
  id: unsafeId,
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customers.id, { onDelete: 'cascade' }),
}, table => [
  unique('user_id_customer_id_unique').on(
    table.userId,
    table.customerId,
  ),
])

export const userCustomerRelations = relations(
  x_userCustomers,
  ({ one }) => ({
    customer: one(customers, {
      fields: [x_userCustomers.customerId],
      references: [customers.id],
    }),
    user: one(user, {
      fields: [x_userCustomers.userId],
      references: [user.id],
    }),
  }),
)

export type X_UserCustomer = typeof x_userCustomers.$inferSelect
export type X_UserCustomerInsert = typeof x_userCustomers.$inferInsert
