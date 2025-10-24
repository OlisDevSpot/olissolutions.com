import { zValidator } from '@hono/zod-validator'

import { insertCustomerSchema } from '../../../../../db/dist/schema/platform'

import z from 'zod'

export const idParam = zValidator('param', z.object({ id: z.string() }), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const createCustomerValidator = zValidator('json', insertCustomerSchema.strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const updateCustomerValidator = zValidator('json', insertCustomerSchema.partial().strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})
