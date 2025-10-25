import { identitySchema } from '@olis/db/lib/constants'
import { unsafeId } from '@olis/db/lib/schema-helpers'
import { x_companyLicenses } from '@olis/db/schema/identity'

import { relations } from 'drizzle-orm'
import { varchar } from 'drizzle-orm/pg-core'

export const licenses = identitySchema.table('license', {
  id: unsafeId,
  code: varchar('type', { length: 50 }).notNull().unique(),
  label: varchar('label', { length: 80 }).notNull(),
})

export type License = typeof licenses.$inferSelect

export const licenseRelations = relations(licenses, ({ many }) => ({
  x_companyLicenses: many(x_companyLicenses),
}))
