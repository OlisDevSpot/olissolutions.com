import { unsafeId } from '@workspace/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { x_companyLicenses } from './x-company-licenses'

export const licenses = pgTable('license', {
  id: unsafeId,
  code: varchar('type', { length: 50 }).notNull().unique(),
  label: varchar('label', { length: 80 }).notNull(),
})

export type License = typeof licenses.$inferSelect

export const licenseRelations = relations(licenses, ({ many }) => ({
  x_companyLicenses: many(x_companyLicenses),
}))
