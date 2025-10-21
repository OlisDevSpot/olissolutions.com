import { createRouter } from '@workspace/hono/lib/create-app'
import { authMiddleware } from '@workspace/hono/middlewares/auth.middleware'
import * as handlers from '@workspace/core/entities/benefits/server/handlers'

export const benefitsRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)

export default benefitsRouter
