import type { AppBindings } from '@olis/server/types'

import type { MiddlewareHandler } from 'hono'

import { auth } from '@olis/auth/server'

export const authMiddleware: MiddlewareHandler<AppBindings> = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  c.set('user', session.user)
  c.set('session', session.session)
  // c.set("project", session.activeProject);

  return next()
}
