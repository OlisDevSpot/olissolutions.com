import { createApp } from '@olis/server/lib/create-app'
import identityRouter from '@olis/server/routers/identity/router'
import platformRouter from '@olis/server/routers/platform/router'

const app = createApp()
  .route('/platform', platformRouter)
  .route('/identity', identityRouter)

export type AppRouter = typeof app
export default app
