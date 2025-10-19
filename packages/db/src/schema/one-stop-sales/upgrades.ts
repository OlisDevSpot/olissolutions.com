import { oneStopSalesSchema } from '@workspace/db/lib/constants'
import { id } from '@workspace/db/lib/schema-helpers'
import { integer, text } from 'drizzle-orm/pg-core'

export const upgrades = oneStopSalesSchema.table('upgrades', {
  id,
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
})
