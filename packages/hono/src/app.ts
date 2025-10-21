import { auth } from '@workspace/auth/server'
import { createApp } from '@workspace/hono/lib/create-app'

const app = createApp()
  .on(['POST', 'GET'], '/auth/*', c => auth.handler(c.req.raw))

export default app
export type AppRouter = typeof app
