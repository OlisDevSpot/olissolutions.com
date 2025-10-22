import { unsafeId } from '@olis/db/lib/schema-helpers'
import { x_companyLicenses } from '@olis/db/schema/one-stop-sales/x-company-licenses'

import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'

export const licenses = pgTable('license', {
  id: unsafeId,
  code: varchar('type', { length: 50 }).notNull().unique(),
  label: varchar('label', { length: 80 }).notNull(),
})

export type License = typeof licenses.$inferSelect

export const licenseRelations = relations(licenses, ({ many }) => ({
  x_companyLicenses: many(x_companyLicenses),
}))
