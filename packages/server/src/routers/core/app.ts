import { createApp } from '@olis/server/lib/create-app'
import coreRouter from './router'

const app = createApp()
  .route('/core', coreRouter)

export type AppRouter = typeof app
export default app
