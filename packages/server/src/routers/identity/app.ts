import { createApp } from '@olis/server/lib/create-app'
import identityRouter from './router'
import platformRouter from '@olis/server/routers/platform/router'

const app = createApp()
  .route('/identity', identityRouter)
  .route('/platform', platformRouter)

export type AppRouter = typeof app
export default app
