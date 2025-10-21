import { unsafeId } from '@workspace/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import { integer, pgTable, unique } from 'drizzle-orm/pg-core'
import { benefits } from './benefit'
import { upgrades } from './upgrade'

export const x_upgradeBenefits = pgTable('x_upgrade_benefit', {
  id: unsafeId,
  upgradeId: integer('upgrade_id')
    .notNull()
    .references(() => upgrades.id, { onDelete: 'cascade' }),
  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id, { onDelete: 'cascade' }),
}, table => [
  unique('upgrade_id_benefit_id_unique').on(table.upgradeId, table.benefitId),
])

export const upgradeBenefitRelations = relations(
  x_upgradeBenefits,
  ({ one }) => ({
    upgrade: one(upgrades, {
      fields: [x_upgradeBenefits.upgradeId],
      references: [upgrades.id],
    }),
    benefit: one(benefits, {
      fields: [x_upgradeBenefits.benefitId],
      references: [benefits.id],
    }),
  }),
)

export type X_UpgradeBenefit = typeof x_upgradeBenefits.$inferSelect
export type X_UpgradeBenefitInsert = typeof x_upgradeBenefits.$inferInsert
