import * as solutionsRespository from '@olis/server/entities/one-stop-sales/solutions/repository'
import { factory } from '@olis/server/lib/create-app'

import * as repository from './repository'
import { accessorParam, createTradeValidator, idParam, updateTradeValidator } from './validators'

export const findAll = factory.createHandlers(async (c) => {
  const trades = await repository.findAll()
  return c.json(trades)
})

export const findOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const trade = await repository.findOne(id)
  return c.json(trade)
})

export const findAllTradeSolutions = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const tradeSolutions = await solutionsRespository.findAllByTradeId(id)

  if (!tradeSolutions) {
    return c.json({ error: 'No solutions found' }, 404)
  }

  return c.json(tradeSolutions)
})

export const findAllTradeAddons = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const tradeAddons = await repository.findAllTradeAddons(id)

  if (!tradeAddons) {
    return c.json({ error: 'No addons found' }, 404)
  }

  return c.json(tradeAddons)
})

export const findAllSolutionsByTradeAccessor = factory.createHandlers(accessorParam, async (c) => {
  const { accessor } = c.req.valid('param')
  const tradeSolutions = await repository.findAllSolutionsByTradeAccessor(accessor)
  return c.json(tradeSolutions)
})

export const createOne = factory.createHandlers(createTradeValidator, async (c) => {
  const data = c.req.valid('json')
  const trade = await repository.createOne(data)
  return c.json(trade)
})

export const updateOne = factory.createHandlers(idParam, updateTradeValidator, async (c) => {
  const { id } = c.req.valid('param')
  const data = c.req.valid('json')
  const trade = await repository.findOne(id)

  if (!trade) {
    throw new Error('Trade not found')
  }

  const updatedTrade = await repository.findOneAndUpdate(id, data)
  return c.json(updatedTrade)
})

export const deleteOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  await repository.deleteOne(id)
  return c.json({ success: true }, 200)
})
