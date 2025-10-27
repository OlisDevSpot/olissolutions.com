import type { IdentityAppRouter } from '@olis/trpc/routers/app/identity/index'
import { createTRPCContext } from '@trpc/tanstack-react-query'

export const { useTRPC, TRPCProvider } = createTRPCContext<IdentityAppRouter>()
