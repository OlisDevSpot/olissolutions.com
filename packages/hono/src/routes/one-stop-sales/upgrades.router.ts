import { createRouter } from '@workspace/hono/lib/create-app'
import { authMiddleware } from '@workspace/hono/middlewares/auth.middleware'
import * as handlers from '@workspace/core/entities/upgrades/server/handlers'

export const upgradesRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)
  .post('/', ...handlers.createOne)
  .get('/:id', ...handlers.findOne)
  .patch('/:id', ...handlers.updateOne)
  .delete('/:id', ...handlers.deleteOne)
  .get('/:id/solutions', ...handlers.findAllUpgradeSolutions)
  .get('/:id/addons', ...handlers.findAllUpgradeAddons)
  .get('/:accessor/solutions', ...handlers.findAllSolutionsByUpgradeAccessor)

export default upgradesRouter
export type UpgradesRouter = typeof upgradesRouter
