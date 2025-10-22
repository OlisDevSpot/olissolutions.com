import { createRouter } from '@olis/server/lib/create-app'
import { authMiddleware } from '@olis/server/middlewares/auth.middleware'
import * as handlers from './handlers'

export const pricingRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAllPricing)

export default pricingRouter
