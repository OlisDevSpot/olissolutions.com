import { createRouter } from '@olis/server/lib/create-app'
import addonsRouter from './addons/router'
import benefitsRouter from './benefits/_old-hono/router'
import customersRouter from './customers/_old-hono/router'
import materialsRouter from './materials/_old-hono/router'
import scopesRouter from './scopes/_old-hono/router'
import tradesRouter from './trades/_old-hono/router'

const app = createRouter()
  .route('/trades', tradesRouter)
  .route('/scopes', scopesRouter)
  .route('/addons', addonsRouter)
  .route('/materials', materialsRouter)
  .route('/benefits', benefitsRouter)
  .route('/customers', customersRouter)

export default app
export type AppRouter = typeof app
