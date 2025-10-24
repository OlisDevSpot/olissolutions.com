import { factory } from '@olis/server/lib/create-app'

import * as repository from './repository'

export const findAll = factory.createHandlers(async (c) => {
  const benefits = await repository.findAll()
  return c.json(benefits)
})
