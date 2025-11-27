import type z from 'zod'
import { unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const tagsTable = pgTable('tags', {
  id: unsafeId,
  label: text('label').notNull(),
  accessor: text('accessor').notNull().unique(),
  description: text('description'),
})

// export const tagsRelations = relations(tagsTable, ({ many }) => ({
//   x_tradeTags: many(x_tradeTags),
//   x_scopeTags: many(x_scopeTags),
//   x_addonTags: many(x_addonTags),
//   x_materialTags: many(x_materialTags),
// }))

export const selectTagSchema = createSelectSchema(tagsTable)
export type Tag = z.infer<typeof selectTagSchema>

export const insertTagSchema = createInsertSchema(tagsTable)
export type InsertTag = z.infer<typeof insertTagSchema>
