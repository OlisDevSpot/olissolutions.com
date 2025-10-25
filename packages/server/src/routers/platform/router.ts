import { createRouter } from '@olis/server/lib/create-app'
import addonsRouter from './addons/router'
import benefitsRouter from './benefits/router'
import customersRouter from './customers/router'
import materialsRouter from './materials/router'
import scopesRouter from './scopes/router'
import tradesRouter from './trades/router'

const app = createRouter()
  .route('/trades', tradesRouter)
  .route('/scopes', scopesRouter)
  .route('/addons', addonsRouter)
  .route('/materials', materialsRouter)
  .route('/benefits', benefitsRouter)
  .route('/customers', customersRouter)

export default app
export type AppRouter = typeof app
