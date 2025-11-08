import { factory } from '@olis/server/lib/create-app'

import * as repository from '../repository'
import { idParam } from './validators'

export const findAll = factory.createHandlers(async (c) => {
  const users = await repository.findAll()
  return c.json(users)
})

export const findOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const user = await repository.findOne(id)
  return c.json(user)
})

export const deleteOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  await repository.deleteOne(id)
  return c.json({ success: true }, 200)
})
