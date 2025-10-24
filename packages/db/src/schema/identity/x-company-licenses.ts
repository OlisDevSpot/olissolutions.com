import { identitySchema } from '@olis/db/lib/constants'
import { createdAt, id, updatedAt } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import { integer, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { companies } from './company'
import { licenses } from './licenses'

export const x_companyLicenses = identitySchema.table('x-company-licenses', {
  id,
  companyId: uuid('company_id').notNull().references(() => companies.id),
  licenseId: integer('license_id').notNull().references(() => licenses.id),
  number: varchar('number', { length: 20 }).notNull(),
  createdAt,
  updatedAt,
})

export const companyLicenseRelations = relations(x_companyLicenses, ({ one }) => ({
  company: one(companies, {
    fields: [x_companyLicenses.companyId],
    references: [companies.id],
  }),
  license: one(licenses, {
    fields: [x_companyLicenses.licenseId],
    references: [licenses.id],
  }),
}))

export type CompanyLicense = typeof x_companyLicenses.$inferSelect
export const selectCompanyLicenseSchema = createSelectSchema(x_companyLicenses)
export type SelectCompanyLicenseSchema = typeof selectCompanyLicenseSchema

export type InsertCompanyLicense = typeof x_companyLicenses.$inferInsert
export const insertCompanyLicenseSchema = createInsertSchema(x_companyLicenses)
export type InsertCompanyLicenseSchema = typeof insertCompanyLicenseSchema
