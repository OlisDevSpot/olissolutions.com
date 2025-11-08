import type { BaseAppRouter } from '@olis/server/routers/base'

import { createTRPCContext } from '@trpc/tanstack-react-query'

export const { useTRPC, TRPCProvider } = createTRPCContext<BaseAppRouter>()
