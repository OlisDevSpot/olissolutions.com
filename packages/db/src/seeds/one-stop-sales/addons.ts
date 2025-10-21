import type { DB } from '@workspace/db'

import { addons, upgrades } from '@workspace/db/schema/one-stop-sales/index'

import { eq, sql } from 'drizzle-orm'
import { addonsData } from './data/addons'

export default async function seed(db: DB) {
  const newAddons = await Promise.all(
    addonsData.map(async (addon) => {
      const upgradeEntry = await db.query.upgrades.findFirst({
        where: eq(upgrades.accessor, addon.upgradeAccessor),
      })
      const upgradeId = upgradeEntry?.id || -1
      return {
        label: addon.label,
        accessor: addon.accessor,
        description: addon.description,
        imageUrl: addon.imageUrl,
        upgradeId,
      }
    }),

  )
  await db
    .insert(addons)
    .values(newAddons)
    .onConflictDoUpdate({
      target: addons.accessor,
      set: {
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        imageUrl: sql`EXCLUDED.image_url`,
        upgradeId: sql`EXCLUDED.upgrade_id`,
      },
    })
}
