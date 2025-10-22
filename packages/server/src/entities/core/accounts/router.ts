import { createRouter } from '@olis/server/lib/create-app'
import { authMiddleware } from '@olis/server/middlewares/auth.middleware'
import * as handlers from './handlers'

const accountRouter = createRouter()
  .use(authMiddleware)
  .get('/pricing', ...handlers.findAllPricing)

export default accountRouter
