import type { AppBindings } from '@olis/server/types'

import type { MiddlewareHandler } from 'hono'

export const projectMiddleware: MiddlewareHandler<AppBindings> = async (c, next) => {
  return next()
}
