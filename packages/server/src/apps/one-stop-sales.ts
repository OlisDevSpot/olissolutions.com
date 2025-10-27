import { createApp } from '@olis/server/lib/create-app'
import projectsRouter from '@olis/server/routers/features/project-creator/router'
import identityRouter from '@olis/server/routers/identity/router'
import costCalculatorRouter from '@olis/server/routers/one-stop-sales/cost-calculator/cost-calculator.router'
import pricingRouter from '@olis/server/routers/one-stop-sales/pricing/router'
import platformRouter from '@olis/server/routers/platform/router'

const app = createApp()
  .route('/identity', identityRouter)
  .route('/platform', platformRouter)
  .route('/projects', projectsRouter)
  .route('/pricing', pricingRouter)
  .route('/cost-calculator', costCalculatorRouter)

export default app
export type AppRouter = typeof app
