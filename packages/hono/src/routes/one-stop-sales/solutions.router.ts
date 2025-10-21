import { createRouter } from '@workspace/hono/lib/create-app'
import { authMiddleware } from '@workspace/hono/middlewares/auth.middleware'
import * as handlers from '@workspace/core/entities/solutions/server/handlers'

export const solutionsRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)
  .get('/by-upgrade', ...handlers.findAllByUpgradeId)
  .get('/with-benefits', ...handlers.findAllWithBenefits)
  .get('/:id{[0-9]+}', ...handlers.findOne)
  .get('/:accessor', ...handlers.findOneByAccessor)
  .get('/:id/variables', ...handlers.findSolutionVariables)
  .get('/:id/benefits', ...handlers.findSolutionBenefits)

export default solutionsRouter
