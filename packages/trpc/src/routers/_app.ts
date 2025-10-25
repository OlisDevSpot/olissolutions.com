import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import { usersRouter } from './identity/users.router'

export const appRouter = createTRPCRouter({
  'health-check': publicProcedure.query(() => 'yay!'),

  'users': usersRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
