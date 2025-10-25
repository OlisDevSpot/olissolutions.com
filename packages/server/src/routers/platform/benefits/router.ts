import { createRouter } from '@olis/server/lib/create-app'
import { authMiddleware } from '@olis/server/middlewares/auth.middleware'
import * as handlers from './handlers'

export const benefitsRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)

export default benefitsRouter
