import type z from 'zod'

import { accessor, description, imageUrl, label, unsafeId } from '@workspace/db/lib/schema-helpers'
import { upgradeLocations } from '@workspace/core/constants/enums'
import { relations } from 'drizzle-orm'

import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { addons } from './addon'
import { solutions } from './solution'
import { x_upgradeBenefits } from './x-upgrade-benefit'

export const locationEnum = pgEnum('location', upgradeLocations)

export const upgrades = pgTable('upgrade', {
  id: unsafeId,
  label,
  accessor: accessor.unique(),
  description,
  imageUrl,
  slug: varchar({ length: 80 }).notNull(),
  location: locationEnum('location').notNull(),
})

export const upgradeRelations = relations(upgrades, ({ many }) => ({
  solutions: many(solutions),
  upgradeAddons: many(addons),
  x_upgradeBenefits: many(x_upgradeBenefits),
}))

export const selectUpgradeSchema = createSelectSchema(upgrades)
export type Upgrade = z.infer<typeof selectUpgradeSchema>

export const insertUpgradeSchema = createInsertSchema(upgrades).omit({
  id: true,
})
export type InsertUpgrade = z.infer<typeof insertUpgradeSchema>
