import type { InferInput } from '@olis/server/types'
import { zValidator } from '@hono/zod-validator'

import { insertTradeSchema } from '@olis/db/schema/one-stop-sales'

import z from 'zod'

export const idParam = zValidator('param', z.object({ id: z.coerce.number() }))

export const accessorParam = zValidator('param', z.object({ accessor: z.string() }))

export const createTradeValidator = zValidator('json', insertTradeSchema.strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const updateTradeValidator = zValidator('json', insertTradeSchema.partial().strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export type CreateTradeValidator = InferInput<typeof createTradeValidator>
export type UpdateTradeValidator = InferInput<typeof updateTradeValidator>
