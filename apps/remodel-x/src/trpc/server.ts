import { getQueryClient } from "@olis/data-client/get-query-client"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"
import { headers } from "next/headers"
import { cache } from "react"

import { auth } from "@olis/auth/server"
import "server-only"

import { remodelXAppRouter } from "./routers"

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
  router: remodelXAppRouter,
  queryClient,
})
