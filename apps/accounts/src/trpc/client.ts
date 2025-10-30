import type { BaseAppRouter } from '@olis/trpc/routers/app/base/index'
import { createTRPCContext } from '@trpc/tanstack-react-query'

export const { useTRPC, TRPCProvider } = createTRPCContext<BaseAppRouter>()
