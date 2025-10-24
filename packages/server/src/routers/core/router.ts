import { createRouter } from '@olis/server/lib/create-app'
import accountRouter from './accounts/router'
import authRouter from './auth/router'
import customersRouter from './customers/router'
import usersRouter from './users/users.router'

const app = createRouter()
  .route('/olis-auth', authRouter)
  .route('/users', usersRouter)
  .route('/account', accountRouter)
  .route('/customers', customersRouter)

export default app
