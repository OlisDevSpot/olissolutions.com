import { createRouter } from '@workspace/hono/lib/create-app'
import { authMiddleware } from '@workspace/hono/middlewares/auth.middleware'

const costCalculatorRouter = createRouter()
  .use(authMiddleware)

export default costCalculatorRouter
