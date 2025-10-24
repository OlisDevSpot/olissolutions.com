import type z from 'zod'

import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { createdAt, id, updatedAt } from '@olis/db/lib/schema-helpers'
import { user } from '@olis/db/schema/identity'

import { relations, sql } from 'drizzle-orm'

import { text, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { jobsiteProfiles } from './jobsite-profile'
import { x_projectCustomers } from './x-project-customers'
import { x_projectScopes } from './x-project-scopes'

export const projects = oneStopSalesSchema.table('project', {
  id,
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  address: varchar('address', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  state: varchar('state', { length: 2 }).default('CA').notNull(),
  zipCode: varchar('zip_code', { length: 255 }).notNull(),
  createdAt,
  updatedAt,
})

export const fullAddress = sql<string>`${projects.address} || ', ' || ${projects.city} || ', ' || ${projects.state} || ' ' || ${projects.zipCode}`.as('fullAddress')

export const projectRelations = relations(projects, ({ many, one }) => ({
  owner: one(user, {
    fields: [projects.ownerId],
    references: [user.id],
  }),
  jobsite: one(jobsiteProfiles, {
    fields: [projects.id],
    references: [jobsiteProfiles.projectId],
  }),
  x_projectScopes: many(x_projectScopes),
  x_projectCustomers: many(x_projectCustomers),
}))

export const selectProjectSchema = createSelectSchema(projects)
export type Project = z.infer<typeof selectProjectSchema>

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
})
export type InsertProject = z.infer<typeof insertProjectSchema>
