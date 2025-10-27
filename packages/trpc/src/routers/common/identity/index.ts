import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import { accountsRouter } from './accounts.router'
import { usersRouter } from './users.router'

export const identityRouter = createTRPCRouter({
  'oss-health-check': publicProcedure.query(() => {
    return 'Hello, world!'
  }),
  'users': usersRouter,
  'accounts': accountsRouter,
})
