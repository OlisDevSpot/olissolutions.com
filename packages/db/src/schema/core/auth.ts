import type z from 'zod'

import { userRoles } from '@olis/core/constants/enums'
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

// export const userRoleEnum = pgEnum('user_role', userRoles)

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  nickname: text('nickname'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  // role: userRoleEnum('role').notNull().default('user'),
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectUserSchema = createSelectSchema(user)
export type User = z.infer<typeof selectUserSchema>
export type SafeUser = Omit<User, 'createdAt' | 'updatedAt'> & { createdAt: string, updatedAt: string }

export const insertUserSchema = createInsertSchema(user).pick({
  name: true,
  nickname: true,
  image: true,
})
export type InsertUser = z.infer<typeof insertUserSchema>
