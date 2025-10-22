import customersRouter from '@olis/server/entities/core/customers/router'
import addonsRouter from '@olis/server/entities/one-stop-sales/addons/router'
import benefitsRouter from '@olis/server/entities/one-stop-sales/benefits/router'
import costCalculatorRouter from '@olis/server/entities/one-stop-sales/cost-calculator/cost-calculator.router'
import indexRoute from '@olis/server/entities/one-stop-sales/index.route'
import materialsRouter from '@olis/server/entities/one-stop-sales/materials/router'
import pricingRouter from '@olis/server/entities/one-stop-sales/pricing/router'
import solutionsRouter from '@olis/server/entities/one-stop-sales/solutions/router'
import tradesRouter from '@olis/server/entities/one-stop-sales/trades/router'
import projectsRouter from '@olis/server/features/project-creator/router'
import { createRouter } from '@olis/server/lib/create-app'

const app = createRouter()
  // .route('/', indexRoute)
  .route('/projects', projectsRouter)
  // .route('/customers', customersRouter)
  // .route('/pricing', pricingRouter)
  // .route('/trades', tradesRouter)
  // .route('/solutions', solutionsRouter)
  // .route('/addons', addonsRouter)
  // .route('/materials', materialsRouter)
  // .route('/cost-calculator', costCalculatorRouter)
  // .route('/benefits', benefitsRouter)

export default app
export type OneStopSalesAppRouter = typeof app
