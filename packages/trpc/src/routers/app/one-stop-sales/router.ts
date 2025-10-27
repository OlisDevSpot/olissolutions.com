import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'

export const ossRouter = createTRPCRouter({
  'oss-health-check': publicProcedure.query(() => {
    return 'Hello, world!'
  }),
})
