import type z from 'zod'

import { createdAt, id, updatedAt } from '@olis/db/lib/schema-helpers'
import { x_companyLicenses } from '@olis/db/schema/one-stop-sales/x-company-licenses'
import { relations } from 'drizzle-orm'

import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const companies = pgTable('company', {
  id,
  name: varchar('name', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }),
  city: varchar('city', { length: 255 }),
  state: varchar('state', { length: 2 }).default('CA').notNull(),
  zipCode: varchar('zip_code', { length: 5 }),
  logo: text('logo'),
  website: text('website'),
  createdAt,
  updatedAt,
})

export const companyRelations = relations(companies, ({ many }) => ({
  x_companyLicenses: many(x_companyLicenses),
}))

export const selectCompanySchema = createSelectSchema(companies)
export type Company = z.infer<typeof selectCompanySchema>

export const insertCompanySchema = createInsertSchema(companies)
export type InsertCompany = z.infer<typeof insertCompanySchema>
