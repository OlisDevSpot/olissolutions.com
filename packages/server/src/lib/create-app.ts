import type { AppBindings } from '@olis/server/types'
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

  const devOrigins = new Set([
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
  ])

  // app.options('/auth/*', async (c) => {
  //   console.log('Preflight request for', c.req.method, c.req.path)
  //   c.header('Access-Control-Allow-Origin', c.req.header('Origin') || '')
  //   c.header('Access-Control-Allow-Credentials', 'true')
  //   c.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE,PATCH')
  //   c.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Cookie')
  //   return c.newResponse('No content', 204)
  // })

  app.use('*', cors({
    origin: process.env.NODE_ENV === 'production' ? ['https://*.olissolutions.com'] : Array.from(devOrigins),
    credentials: true,
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  }))

  app.notFound(notFound)
  app.onError(onError)

  console.log({ routes: app.routes })

  return app
}
