import type { BetterAuthOptions } from 'better-auth'
import { db } from '@workspace/db'
import * as authSchema from '@workspace/db/schema/public/auth'
import { betterAuth } from 'better-auth'

import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { customSession, openAPI, organization } from 'better-auth/plugins'

export const options = {
  database: drizzleAdapter(db, {
    schema: authSchema,
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  trustedOrigins: process.env.NODE_ENV === 'production'
    ? [
        process.env.APP1_URL,
        process.env.APP2_URL,
      ].filter(Boolean) as string[]
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
      ],
  /*
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email address",
        html: `<p>Click the link to verify your email: ${url}</p>`,
      });
    },
  },
  */
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
  pages: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    verifyEmail: '/auth/verify-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
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

export type Auth = typeof auth
export type Session = Auth['$Infer']['Session']
