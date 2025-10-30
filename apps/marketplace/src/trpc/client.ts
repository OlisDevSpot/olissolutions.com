import type { MarketplaceAppRouter } from '@olis/trpc/routers/app/marketplace/index'
import { createTRPCContext } from '@trpc/tanstack-react-query'

export const { useTRPC, TRPCProvider } = createTRPCContext<MarketplaceAppRouter>()
