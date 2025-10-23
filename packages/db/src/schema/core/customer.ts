import type z from 'zod'

import { createdAt, id, updatedAt } from '@olis/db/lib/schema-helpers'
import { x_projectCustomers } from '@olis/db/schema/one-stop-sales/x-project-customer'
import { relations } from 'drizzle-orm'

import { pgTable, varchar } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const customers = pgTable('customer', {
  id,
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phoneNum: varchar('phone_num', { length: 15 }),
  createdAt,
  updatedAt,
})

export const customerRelations = relations(customers, ({ many }) => ({
  x_projectCustomers: many(x_projectCustomers),
}))

export const selectCustomerSchema = createSelectSchema(customers)
export type Customer = z.infer<typeof selectCustomerSchema>

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export type InsertCustomerSchema = z.infer<typeof insertCustomerSchema>
