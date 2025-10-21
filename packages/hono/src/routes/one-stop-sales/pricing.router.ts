import { createRouter } from '@workspace/hono/lib/create-app'
import { authMiddleware } from '@workspace/hono/middlewares/auth.middleware'
import * as handlers from '@workspace/core/entities/pricing/server/handlers'

export const pricingRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAllPricing)

export default pricingRouter
