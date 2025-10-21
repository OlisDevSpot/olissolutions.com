import type { AppBindings } from '@workspace/hono/types'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createFactory } from 'hono/factory'

import { notFound, onError } from 'stoker/middlewares'

export const factory = createFactory<AppBindings>({ defaultAppOptions: { strict: false } })

export function createRouter() {
  const app = factory.createApp()
  return app
}

export function createApp() {
  const app = new Hono<AppBindings>().basePath('/api')

  app.use(cors())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
