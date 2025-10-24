import { createRouter } from '@olis/server/lib/create-app'
import * as handlers from './handlers'

const authRouter = createRouter()
  .post('/sign-up', ...handlers.signUp)
  .post('/sign-in', ...handlers.signIn)
  .post('/sign-out', ...handlers.signOut)

export default authRouter
