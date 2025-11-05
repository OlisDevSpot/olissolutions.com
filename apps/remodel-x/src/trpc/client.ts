import type { RemodelXAppRouter } from "@olis/trpc/routers/app/remodel-x/index"

import { createTRPCContext } from "@trpc/tanstack-react-query"

export const { useTRPC, TRPCProvider } = createTRPCContext<RemodelXAppRouter>()
