import { createTRPCRouter, mergeRouters, publicProcedure } from '@olis/trpc/init'
import { baseAppRouter } from '@olis/trpc/routers/app/base'

export const remodelXAppRouter = mergeRouters(
  baseAppRouter,
  createTRPCRouter({
    'oss-health-check': publicProcedure.query(() => {
      return 'Hello, world!'
    }),
  }),
)

export type RemodelXAppRouter = typeof remodelXAppRouter
