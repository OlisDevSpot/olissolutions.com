"use client"

import type { OSSAppRouter } from "@olis/trpc/routers/app/remodel-x/index"

import { getQueryClient } from "@olis/data-client/get-query-client"
import { getUrl } from "@olis/trpc/lib/get-url"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import React, { useState } from "react"

import { TRPCProvider } from "@/trpc/client"

interface Props {
  children: React.ReactNode;
}

export function TRPCReactProvider({ children }: Props) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    createTRPCProxyClient<OSSAppRouter>({
      links: [
        httpBatchLink({
          // transformer: superjson,
          url: getUrl(),
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
