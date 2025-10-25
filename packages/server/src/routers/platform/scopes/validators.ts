import type { InferInput } from '@olis/server/types'
import { zValidator } from '@hono/zod-validator'

import { insertScopeSchema } from '@olis/db/schema/platform'

import z from 'zod'

export const idParam = zValidator('param', z.object({ id: z.coerce.number() }))

export const accessorParam = zValidator('param', z.object({ accessor: z.string() }))

export const findAllByTradeIdValidator = zValidator('query', z.object({ tradeId: z.coerce.number().optional() }))

export const createScopeValidator = zValidator('json', insertScopeSchema.strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const updateScopeValidator = zValidator('json', insertScopeSchema.partial().strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export type CreateScopeValidator = InferInput<typeof createScopeValidator>
export type UpdateScopeValidator = InferInput<typeof updateScopeValidator>
