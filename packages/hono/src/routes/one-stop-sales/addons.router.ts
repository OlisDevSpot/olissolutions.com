import { createRouter } from '@workspace/hono/lib/create-app'
import { authMiddleware } from '@workspace/hono/middlewares/auth.middleware'
import * as handlers from '@/shared/entities/addons/server/handlers'

export const addonsRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)
  .get('/:id{[0-9]+}', ...handlers.findOne)
  .get('/:accessor', ...handlers.findOneByAccessor)

export default addonsRouter
