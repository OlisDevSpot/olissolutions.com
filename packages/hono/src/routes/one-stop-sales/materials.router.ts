import { createRouter } from '@workspace/hono/lib/create-app'
import { authMiddleware } from '@workspace/hono/middlewares/auth.middleware'
import * as handlers from '@workspace/core/entities/materials/server/handlers'

export const materialsRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)
  .get('/:id{[0-9]+}', ...handlers.findOne)
  .get('/:accessor', ...handlers.findOneByAccessor)
  .get('/:id/benefits', ...handlers.findMaterialBenefits)

export default materialsRouter
