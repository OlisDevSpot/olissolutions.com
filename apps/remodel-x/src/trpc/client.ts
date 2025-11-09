import { createTRPCContext } from "@trpc/tanstack-react-query"

import type { RemodelXAppRouter } from "./routers"

export const { useTRPC, TRPCProvider } = createTRPCContext<RemodelXAppRouter>()
