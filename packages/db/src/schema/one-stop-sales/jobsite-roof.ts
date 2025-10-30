import type z from 'zod'

import { createdAt, id, updatedAt } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import {
  integer,
  uuid,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { jobsiteProfiles } from './jobsite-profile'
import { oneStopSalesSchema, roofLocationEnum, roofTypeEnum } from './meta'

export const jobsiteRoofs = oneStopSalesSchema.table('jobsite_roof', {
  id,
  roofLocation: roofLocationEnum('roof_location').default('main home'),
  roofType: roofTypeEnum('roof_type'),
  roofAge: integer('roof_age'),
  jobsiteProfileId: uuid('jobsite_profile_id')
    .notNull()
    .references(() => jobsiteProfiles.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
})

export const jobsiteRoofRelations = relations(
  jobsiteRoofs,
  ({ one }) => ({
    jobsiteProfiles: one(jobsiteProfiles, {
      fields: [jobsiteRoofs.jobsiteProfileId],
      references: [jobsiteProfiles.id],
    }),
  }),
)

export type JobsiteRoof = typeof jobsiteRoofs.$inferSelect
export const selectJobsiteRoofSchema = createSelectSchema(jobsiteRoofs)
export type SelectJobsiteRoofSchema = z.infer<typeof selectJobsiteRoofSchema>

export type JobsiteRoofInsert = typeof jobsiteRoofs.$inferInsert
export const insertJobsiteRoofSchema = createInsertSchema(jobsiteRoofs).omit({
  id: true,
  jobsiteProfileId: true,
  createdAt: true,
  updatedAt: true,
})
export type InsertJobsiteRoofSchema = z.infer<typeof insertJobsiteRoofSchema>
