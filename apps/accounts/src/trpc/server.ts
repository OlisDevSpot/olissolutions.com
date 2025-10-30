import { auth } from '@olis/auth/server'
import { getQueryClient } from '@olis/data-client/get-query-client'
import { baseAppRouter } from '@olis/trpc/routers/app/base/index'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { headers } from 'next/headers'
import { cache } from 'react'
import 'server-only'

export const queryClient = cache(getQueryClient)
export const trpc = createTRPCOptionsProxy({
  ctx: async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    return {
      ...session,
    }
  },
  router: baseAppRouter,
  queryClient,
})
