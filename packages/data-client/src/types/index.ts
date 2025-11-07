import type { BaseAppRouter } from '@olis/trpc/routers/app/base'
import type { createTRPCProxyClient } from '@trpc/client'

export type BaseTRPCClient = Awaited<ReturnType<typeof createTRPCProxyClient<BaseAppRouter>>>
