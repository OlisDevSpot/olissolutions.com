import { createTRPCRouter, mergeRouters, publicProcedure } from '@olis/trpc/init'
import { baseAppRouter } from '@olis/trpc/routers/app/base'

export const ossAppRouter = mergeRouters(
  baseAppRouter,
  createTRPCRouter({
    'oss-health-check': publicProcedure.query(() => {
      return 'Hello, world!'
    }),
  }),
)

export type OSSAppRouter = typeof ossAppRouter
