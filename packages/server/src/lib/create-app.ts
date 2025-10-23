import type { AppBindings } from '@olis/server/types'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createFactory } from 'hono/factory'

import { notFound, onError } from 'stoker/middlewares'
import { origins } from '../constants/origins'

export const factory = createFactory<AppBindings>({ defaultAppOptions: { strict: false } })

export function createRouter() {
  const app = factory.createApp({ strict: false })
  return app
}

export function createApp() {
  const app = new Hono<AppBindings>().basePath('/api')

  app.use('*', cors({
    origin: Array.from(origins),
    credentials: true,
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  }))

  app.notFound(notFound)
  app.onError(onError)

  console.log({ routes: app.routes })

  return app
}
