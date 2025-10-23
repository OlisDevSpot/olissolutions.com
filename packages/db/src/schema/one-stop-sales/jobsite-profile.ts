import type z from 'zod'

import { electricProviders, foundationTypes, hvacComponents, hvacTypes, insulationLevels, windowsTypes } from '@olis/core/constants'
import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { createdAt, id, updatedAt } from '@olis/db/lib/schema-helpers'

import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgEnum,
  uuid,
} from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { jobsiteRoofs } from './jobsite-roof'
import { projects } from './project'

export const hvacTypeEnum = pgEnum('hvac_type', hvacTypes)
export const hvacComponentsEnum = pgEnum('hvac_components', hvacComponents)
export const windowsTypeEnum = pgEnum('windows_type', windowsTypes)
export const insulationLevelEnum = pgEnum('insulation_level', insulationLevels)
export const foundationTypeEnum = pgEnum('foundation_type', foundationTypes)
export const electricProviderEnum = pgEnum('electric_provider', electricProviders)

export const jobsiteProfiles = oneStopSalesSchema.table('jobsite_profile', {
  id,

  // general property
  numStories: integer('num_stories').notNull(),
  yearBuilt: integer('year_built').notNull(),
  electricProvider: electricProviderEnum('electric_provider').notNull(),

  // home situation
  yearsInHome: integer('years_in_home'),
  numPeopleInHome: integer('num_people_in_home'),
  householdIncome: integer('household_income'),
  electricVehiclesNow: integer('electric_vehicles_now'),
  electricVehiclesFuture: integer('electric_vehicles_future'),

  // solar
  hasSolar: boolean('has_solar').default(false),
  numPanels: integer('num_panels').default(0),

  // hvac
  hvacType: hvacTypeEnum('hvac_type'),
  hvacComponents: hvacComponentsEnum('hvac_components'),
  hvacAge: integer('hvac_age'),

  // windows
  windowsType: windowsTypeEnum('windows_type'),
  windowsAge: integer('windows_age'),

  // atticBasement
  atticInsulationLevel: insulationLevelEnum('attic_insulation_level'),
  atticInsulationAge: integer('attic_insulation_age'),
  foundationType: foundationTypeEnum('foundation_type'),

  // electricals
  mainPanelSize: integer('main_panel_size'),
  mainPanelAge: integer('main_panel_age'),

  // lot
  hasPool: boolean('has_pool'),

  // foreign keys
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
})

export const jobsiteProfileRelations = relations(
  jobsiteProfiles,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [jobsiteProfiles.projectId],
      references: [projects.id],
    }),
    roofs: many(jobsiteRoofs),
  }),
)

export type JobsiteProfile = typeof jobsiteProfiles.$inferSelect
export const selectJobsiteProfileSchema = createSelectSchema(jobsiteProfiles)
export type SelectJobsiteProfileSchema = z.infer<typeof selectJobsiteProfileSchema>

export type JobsiteProfileInsert = typeof jobsiteProfiles.$inferInsert
export const insertJobsiteProfileSchema = createInsertSchema(jobsiteProfiles).omit({
  id: true,
  projectId: true,
  createdAt: true,
  updatedAt: true,
})
export type InsertJobsiteProfileSchema = z.infer<typeof insertJobsiteProfileSchema>
