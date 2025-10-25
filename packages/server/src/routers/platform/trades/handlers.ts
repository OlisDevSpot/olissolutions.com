import { factory } from '@olis/server/lib/create-app'
import * as scopesRespository from '@olis/server/routers/platform/scopes/repository'

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

export const findAllTradeScopes = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const tradeScopes = await scopesRespository.findAllByTradeId(id)

  if (!tradeScopes) {
    return c.json({ error: 'No scopes found' }, 404)
  }

  return c.json(tradeScopes)
})

export const findAllTradeAddons = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const tradeAddons = await repository.findAllTradeAddons(id)

  if (!tradeAddons) {
    return c.json({ error: 'No addons found' }, 404)
  }

  return c.json(tradeAddons)
})

export const findAllScopesByTradeAccessor = factory.createHandlers(accessorParam, async (c) => {
  const { accessor } = c.req.valid('param')
  const tradeScopes = await repository.findAllScopesByTradeAccessor(accessor)
  return c.json(tradeScopes)
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
