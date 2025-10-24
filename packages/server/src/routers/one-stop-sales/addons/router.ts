import { createRouter } from '@olis/server/lib/create-app'
import { authMiddleware } from '@olis/server/middlewares/auth.middleware'
import * as handlers from './handlers'

export const addonsRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)
  .get('/:id{[0-9]+}', ...handlers.findOne)
  .get('/:accessor', ...handlers.findOneByAccessor)

export default addonsRouter
