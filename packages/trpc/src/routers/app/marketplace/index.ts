import { createTRPCRouter, mergeRouters, publicProcedure } from '@olis/trpc/init'
import { baseAppRouter } from '@olis/trpc/routers/app/base'
import { solutionsRouter } from './solutions.router'
import { xSubscriptionsRouter } from './x-subscriptions.router'

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
