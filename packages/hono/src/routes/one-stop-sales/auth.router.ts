import { createRouter } from '@workspace/hono/lib/create-app'
import * as handlers from '@/shared/services/auth/server/handlers'

const authRouter = createRouter()
  .post('/sign-up', ...handlers.signUp)
  .post('/sign-in', ...handlers.signIn)
  .post('/sign-out', ...handlers.signOut)

export default authRouter
