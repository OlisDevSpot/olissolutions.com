import { createRouter } from '@olis/server/lib/create-app'
import { authMiddleware } from '@olis/server/middlewares/auth.middleware'
import * as handlers from './handlers'

export const customersRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)
  .post('/', ...handlers.createOne)
  .patch('/:id', ...handlers.updateOne)
  .delete('/:id', ...handlers.deleteOne)

export default customersRouter
