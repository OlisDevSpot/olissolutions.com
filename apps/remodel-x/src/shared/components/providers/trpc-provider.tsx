"use client"

import type { BaseAppRouter } from "@olis/server/routers/base"

import { getQueryClient } from "@olis/data-client/get-query-client"
import { TRPCProvider as BaseTRPCProvider } from "@olis/data-client/trpc/client"
import { getUrl } from "@olis/trpc/lib/get-url"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import React, { useState } from "react"

import type { RemodelXAppRouter } from "@/trpc/routers"

import { TRPCProvider } from "@/trpc/client"

interface Props {
  children: React.ReactNode;
}

export function TRPCReactProvider({ children }: Props) {
  const queryClient = getQueryClient()

  const [baseTrpcClient] = useState(() =>
    createTRPCProxyClient<BaseAppRouter>({
      links: [
        httpBatchLink({
          // transformer: superjson,
          url: getUrl(),
        }),
      ],
    }),
  )

  const [trpcClient] = useState(() =>
    createTRPCProxyClient<RemodelXAppRouter>({
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
      <BaseTRPCProvider trpcClient={baseTrpcClient} queryClient={queryClient}>
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          {children}
        </TRPCProvider>
      </BaseTRPCProvider>
    </QueryClientProvider>
  )
}
