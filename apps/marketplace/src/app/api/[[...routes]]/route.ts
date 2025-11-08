import { trpcServer } from '@hono/trpc-server'
import { createApp } from '@olis/server/lib/create-app'
import { baseAppRouter } from '@olis/server/routers/base'
import { createTRPCRouter, mergeRouters, publicProcedure } from '@olis/trpc/init'

import { createHonoTRPCContext } from '@olis/trpc/lib/create-context'
import { handle } from 'hono/vercel'
import { solutionsRouter } from '@/trpc/routers/solutions.router'
import { xSubscriptionsRouter } from '@/trpc/routers/x-subscriptions.router'

export const marketplaceAppRouter = mergeRouters(
  baseAppRouter,
  createTRPCRouter({
    'marketplace-health-check': publicProcedure.query(() => {
      return 'Hello, world!'
    }),
    'solutions': solutionsRouter,
    'x-subscriptions': xSubscriptionsRouter,
  }),
)

export type MarketplaceAppRouter = typeof marketplaceAppRouter

const app = createApp()

app.use('/trpc/*', trpcServer({
  router: marketplaceAppRouter,
  endpoint: '/api/trpc',
  createContext: createHonoTRPCContext,
}))

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const OPTIONS = handle(app)
