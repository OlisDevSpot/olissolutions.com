import { createRouter } from '@olis/server/lib/create-app'
import accountRouter from './accounts/router'
import authRouter from './auth/router'
import usersRouter from './users/users.router'

const app = createRouter()
  .route('/auth/*', authRouter)
  .route('/users/*', usersRouter)
  .route('/account/*', accountRouter)

export default app
