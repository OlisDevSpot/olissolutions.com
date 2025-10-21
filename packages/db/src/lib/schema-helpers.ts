import { serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const id = uuid().primaryKey().defaultRandom()
export const unsafeId = serial('id').primaryKey().notNull()
export const accessor = varchar('accessor', { length: 80 }).notNull()
export const label = varchar('label', { length: 80 }).notNull()
export const description = varchar('description', { length: 255 }).notNull()
export const imageUrl = varchar('image_url', { length: 255 }).notNull()
export const createdAt = timestamp('created_at', { mode: 'string' })
  .defaultNow()
  .notNull()
export const updatedAt = timestamp('updated_at', { mode: 'string' })
  .defaultNow()
  .notNull()
