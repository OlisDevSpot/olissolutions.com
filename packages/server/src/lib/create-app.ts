import type { AppBindings } from '@olis/server/types'
import { auth } from '@olis/auth/server'

import { origins } from '@olis/server/constants/origins'
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
  const app = new Hono<AppBindings>()
    .basePath('/api')
    .use('*', cors({
      origin: Array.from(origins),
      credentials: true,
      allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    }))
    .on(['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'], '/auth/*', c => auth.handler(c.req.raw))
    .get('/', () => new Response('Hello from Olis Solutions Hono!!'))

  app.notFound(notFound)
  app.onError(onError)

  return app
}
