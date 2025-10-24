import type { AdapterFactory } from 'better-auth/adapters'
import { db } from '@olis/db'
import * as schema from '../../db/src/schema/identity/auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { nextCookies } from 'better-auth/next-js'
import { openAPI } from 'better-auth/plugins'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema,
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_BASE_URL!,
  plugins: [
    openAPI(),
    nextCookies(),
  ],
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
  trustedOrigins: process.env.NODE_ENV === 'production'
    ? [
        'https://*.olissolutions.com',
      ]
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'http://localhost:3004',

      ],
  // emailVerification: {
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   sendVerificationEmail: async ({ user, url }) => {
  //     resend.emails.send({
  //       from: 'onboarding@resend.dev',
  //       to: user.email,
  //       subject: 'Verify your email address',
  //       html: `<p>Click the link to verify your email: ${url}</p>`,
  //     })
  //   },
  // },
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },
  user: {
    additionalFields: {
      nickname: {
        type: 'string',
        input: false,
      },
      role: {
        type: ['user', 'admin', 'super-admin'] as const,
        defaultValue: 'user',
      },
      companyId: {
        type: 'string',
        input: false,
      },
    },
  },
  // session: {
  //   additionalFields: {
  //     coolField: {
  //       type: 'string',
  //       required: false,
  //       input: false,
  //     },
  //   },
  // },
})

export type Auth = typeof auth
export type Session = Auth['$Infer']['Session']
