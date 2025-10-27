import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import { identityRouter } from '../common/identity'
import { platformRouter } from '../common/platform'

export const baseAppRouter = createTRPCRouter({
  'health-check': publicProcedure.query(() => 'yay!'),
  'platform': platformRouter,
  'identity': identityRouter,
})
// export type definition of API
export type BaseAppRouter = typeof baseAppRouter
