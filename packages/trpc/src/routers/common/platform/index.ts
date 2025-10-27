import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import { addonsRouter } from './addons.router'
import { benefitsRouter } from './benefits.router'
import { customersRouter } from './customers.router'
import { materialsRouter } from './materials.router'
import { scopesRouter } from './scopes.router'
import { tradesRouter } from './trades.router'

export const platformRouter = createTRPCRouter({
  'health-check': publicProcedure.query(() => {
    return 'Hello, world!'
  }),
  'trades': tradesRouter,
  'scopes': scopesRouter,
  'addons': addonsRouter,
  'materials': materialsRouter,
  'benefits': benefitsRouter,
  'customers': customersRouter,
})
