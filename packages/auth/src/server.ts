import { db } from '@olis/db'
import * as schema from '@olis/db/schema/core/auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { nextCookies } from 'better-auth/next-js'
import { openAPI } from 'better-auth/plugins'

export const auth = betterAuth({
  adapter: drizzleAdapter(db, {
    schema,
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
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
  // user: {
  //   additionalFields: {
  //     nickname: {
  //       type: 'string',
  //       required: false,
  //     },
  //     role: {
  //       type: ['user', 'admin'] as const,
  //       defaultValue: 'user',
  //     },
  //     companyId: {
  //       type: 'string',
  //       required: false,
  //       input: false,
  //     },
  //   },
  // },
  // session: {
  //   additionalFields: {
  //     coolField: {
  //       type: 'string',
  //       required: false,
  //       input: false,
  //     },
  //   },
  // },
  plugins: [
    openAPI(),
    nextCookies(),
  ],
})

export type Auth = typeof auth
export type Session = Auth['$Infer']['Session']
