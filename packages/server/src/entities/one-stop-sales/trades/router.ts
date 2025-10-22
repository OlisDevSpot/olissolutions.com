import { createRouter } from '@olis/server/lib/create-app'
import { authMiddleware } from '@olis/server/middlewares/auth.middleware'
import * as handlers from './handlers'

export const tradesRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)
  .post('/', ...handlers.createOne)
  .get('/:id', ...handlers.findOne)
  .patch('/:id', ...handlers.updateOne)
  .delete('/:id', ...handlers.deleteOne)
  .get('/:id/solutions', ...handlers.findAllTradeSolutions)
  .get('/:id/addons', ...handlers.findAllTradeAddons)
  .get('/:accessor/solutions', ...handlers.findAllSolutionsByTradeAccessor)

export default tradesRouter
export type TradesRouter = typeof tradesRouter
