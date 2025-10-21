import type { AppBindings } from '@workspace/hono/types'

import type { MiddlewareHandler } from 'hono'

export const projectMiddleware: MiddlewareHandler<AppBindings> = async (c, next) => {
  return next()
}
