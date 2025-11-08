import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import { accountsRouter } from './accounts/accounts.router'
import { usersRouter } from './users/users.router'

export const identityRouter = createTRPCRouter({
  'oss-health-check': publicProcedure.query(() => {
    return 'Hello, world!'
  }),
  'users': usersRouter,
  'accounts': accountsRouter,
})
