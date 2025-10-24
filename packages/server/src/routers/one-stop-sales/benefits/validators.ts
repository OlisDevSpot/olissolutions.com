import type { InferInput } from '@olis/server/types'
import { zValidator } from '@hono/zod-validator'

import { insertSolutionSchema } from '@olis/db/schema/one-stop-sales'

import z from 'zod'

export const idParam = zValidator('param', z.object({ id: z.coerce.number() }))

export const accessorParam = zValidator('param', z.object({ accessor: z.string() }))

export const findAllByTradeIdValidator = zValidator('query', z.object({ tradeId: z.coerce.number().optional() }))

export const createSolutionValidator = zValidator('json', insertSolutionSchema.strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const updateSolutionValidator = zValidator('json', insertSolutionSchema.partial().strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export type CreateSolutionValidator = InferInput<typeof createSolutionValidator>
export type UpdateSolutionValidator = InferInput<typeof updateSolutionValidator>
