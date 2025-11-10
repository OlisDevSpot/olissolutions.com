import type { MarketplaceAppRouter } from './routers'
import { createTRPCContext } from '@trpc/tanstack-react-query'

export const { useTRPC, TRPCProvider } = createTRPCContext<MarketplaceAppRouter>()
