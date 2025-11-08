import type { BaseAppRouter } from '@olis/server/routers/base'
import type { createTRPCProxyClient } from '@trpc/client'

export type BaseTRPCClient = Awaited<ReturnType<typeof createTRPCProxyClient<BaseAppRouter>>>
