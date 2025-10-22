import { auth } from '@olis/auth/server'
import { createApp } from '@olis/server/lib/create-app'
import coreRouter from './entities/core'
import oneStopSalesRouter from './entities/one-stop-sales'

const app = createApp()
  .on(['POST', 'GET'], '/auth/*', c => auth.handler(c.req.raw))
  .get('/', () => new Response('Hello from Olis Solutions!'))
  .route('/one-stop-sales', oneStopSalesRouter)
  .route('/core', coreRouter)

export default app
export type AppRouter = typeof app
