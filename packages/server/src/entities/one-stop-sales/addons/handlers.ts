import { factory } from '@olis/server/lib/create-app'

import * as repository from './repository'
import { accessorParam, idParam } from './validators'

export const findAll = factory.createHandlers(async (c) => {
  const addons = await repository.findAll()
  return c.json(addons)
})

export const findOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const addon = await repository.findOne(id)
  return c.json(addon)
})

export const findOneByAccessor = factory.createHandlers(accessorParam, async (c) => {
  const { accessor } = c.req.valid('param')
  const addon = await repository.findOneByAccessor(accessor)

  if (!addon) {
    return c.json({ error: 'Addon not found' }, 404)
  }

  return c.json(addon)
})
