import { createApp } from '@olis/server/lib/create-app'
import projectsRouter from '@olis/server/routers/features/project-creator/router'
import coreRouter from '../core/router'
import addonsRouter from './addons/router'
import benefitsRouter from './benefits/router'
import costCalculatorRouter from './cost-calculator/cost-calculator.router'
import indexRoute from './index.route'
import materialsRouter from './materials/router'
import pricingRouter from './pricing/router'
import solutionsRouter from './solutions/router'
import tradesRouter from './trades/router'

const app = createApp()
  .route('/core', coreRouter)
  .route('/', indexRoute)
  .route('/projects', projectsRouter)
  .route('/pricing', pricingRouter)
  .route('/trades', tradesRouter)
  .route('/solutions', solutionsRouter)
  .route('/addons', addonsRouter)
  .route('/materials', materialsRouter)
  .route('/cost-calculator', costCalculatorRouter)
  .route('/benefits', benefitsRouter)

export default app
export type AppRouter = typeof app
