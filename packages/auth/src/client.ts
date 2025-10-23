import type { auth } from './server'
import { inferAdditionalFields, organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const { useSession, signOut, signIn, signUp, updateUser } = createAuthClient({
  // you can pass client configuration here
  baseURL: process.env.NEXT_PUBLIC_ACCOUNTS_URL!,
  plugins: [
    organizationClient(),
    inferAdditionalFields<typeof auth>(),
  ],
  fetchOptions: {
    credentials: 'include',
  },
})
