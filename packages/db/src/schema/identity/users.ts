import type z from 'zod'

import { relations } from 'drizzle-orm'

import {
  boolean,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { identitySchema, userRoleEnum } from './meta'
import { xSubscriptions } from './x-subscriptions'

export const user = identitySchema.table('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  nickname: text('nickname'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  role: userRoleEnum('role').notNull().default('user'),
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull(),
})

export const userRelations = relations(user, ({ many }) => ({
  xSubscriptions: many(xSubscriptions),
}))

export const selectUserSchema = createSelectSchema(user)
export type User = z.infer<typeof selectUserSchema>
export type SafeUser = Omit<User, 'createdAt' | 'updatedAt'> & { createdAt: string, updatedAt: string }

export const insertUserSchema = createInsertSchema(user).pick({
  name: true,
  nickname: true,
  image: true,
})
export type InsertUser = z.infer<typeof insertUserSchema>
