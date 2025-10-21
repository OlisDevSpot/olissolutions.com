import type { BetterAuthOptions } from 'better-auth'

import db from '@workspace/db'
import * as schema from '@workspace/db/schema/public'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { nextCookies } from 'better-auth/next-js'
import { customSession, openAPI, organization } from 'better-auth/plugins'
import resend from '@/shared/services/resend/send-email'

const options = {
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: user.email,
        subject: 'Verify your email address',
        html: `<p>Click the link to verify your email: ${url}</p>`,
      })
    },
  },
  user: {
    additionalFields: {
      nickname: {
        type: 'string',
        required: false,
      },
      role: {
        type: ['user', 'admin'] as const,
        defaultValue: 'user',
      },
      companyId: {
        type: 'string',
        required: false,
        input: false,
      },
    },
  },
  session: {
    additionalFields: {
      coolField: {
        type: 'string',
        required: false,
        input: false,
      },
    },
  },
  plugins: [
    organization(),
    openAPI(),
    nextCookies(),
  ],
} satisfies BetterAuthOptions

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins || []),
    customSession(async (session, _ctx) => {
      const coolField = session.session.coolField

      return {
        ...session,
        coolField,
      }
    }, options),
  ],
})
