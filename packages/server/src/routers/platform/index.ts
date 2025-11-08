import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import { addonsRouter } from './addons/addons.router'
import { benefitsRouter } from './benefits/benefits.router'
import { customersRouter } from './customers/customers.router'
import { materialsRouter } from './materials/materials.router'
import { scopesRouter } from './scopes/scopes.router'
import { tradesRouter } from './trades/trades.router'

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
