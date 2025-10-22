import { createRouter } from '@olis/server/lib/create-app'
import { authMiddleware } from '@olis/server/middlewares/auth.middleware'
import * as handlers from './handlers'

export const solutionsRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)
  .get('/by-trade', ...handlers.findAllByTradeId)
  .get('/with-benefits', ...handlers.findAllWithBenefits)
  .get('/:id{[0-9]+}', ...handlers.findOne)
  .get('/:accessor', ...handlers.findOneByAccessor)
  .get('/:id/variables', ...handlers.findSolutionVariables)
  .get('/:id/benefits', ...handlers.findSolutionBenefits)

export default solutionsRouter
