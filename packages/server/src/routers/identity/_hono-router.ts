import { createRouter } from '@olis/server/lib/create-app'
import accountRouter from './accounts/_old-hono/router'
import authRouter from './auth/router'
import usersRouter from './users/_old-hono/users.router'

const app = createRouter()
  .route('/olis-auth', authRouter)
  .route('/users', usersRouter)
  .route('/account', accountRouter)

export default app
