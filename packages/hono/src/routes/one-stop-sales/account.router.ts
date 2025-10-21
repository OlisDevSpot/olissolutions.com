import { createRouter } from '@workspace/hono/lib/create-app'
import { authMiddleware } from '@workspace/hono/middlewares/auth.middleware'
import * as handlers from '@/features/account-management/server/handlers'

const accountRouter = createRouter()
  .use(authMiddleware)
  .get('/pricing', ...handlers.findAllPricing)

export default accountRouter
