import { baseAppRouter } from '@olis/server/routers/base'
import { createTRPCRouter, mergeRouters, publicProcedure } from '@olis/trpc/init'

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
