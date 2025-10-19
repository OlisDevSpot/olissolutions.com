import { timestamp, uuid } from 'drizzle-orm/pg-core'

export const id = uuid('id').defaultRandom().primaryKey()
export const createdAt = timestamp('created_at', { mode: 'date' }).defaultNow().notNull()
export const updatedAt = timestamp('updated_at', { mode: 'date' })
  .defaultNow()
  .notNull()
  .$onUpdate(() => new Date())
