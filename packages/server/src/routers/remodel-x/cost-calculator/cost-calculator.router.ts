import { createRouter } from '@olis/server/lib/create-app'
import { authMiddleware } from '@olis/server/middlewares/auth.middleware'

const costCalculatorRouter = createRouter()
  .use(authMiddleware)

export default costCalculatorRouter
