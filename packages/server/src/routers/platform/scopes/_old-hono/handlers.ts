import { factory } from '@olis/server/lib/create-app'

import * as repository from '../repository'
import { accessorParam, createScopeValidator, findAllByTradeIdValidator, idParam } from './validators'

export const findAll = factory.createHandlers(async (c) => {
  const scopes = await repository.findAll()
  return c.json(scopes)
})

export const findAllByTradeId = factory.createHandlers(findAllByTradeIdValidator, async (c) => {
  const { tradeId } = c.req.valid('query')

  if (!tradeId) {
    return c.json({ error: 'No trade id provided' }, 400)
  }

  const scopes = await repository.findAllByTradeId(tradeId)
  return c.json(scopes)
})

export const findAllWithBenefits = factory.createHandlers(async (c) => {
  const scopes = await repository.findAllWithBenefits()
  return c.json(scopes)
})

export const findOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const scope = await repository.findOne(id)
  return c.json(scope)
})

export const findOneByAccessor = factory.createHandlers(accessorParam, async (c) => {
  const { accessor } = c.req.valid('param')
  const scope = await repository.findOneByAccessor(accessor)
  return c.json(scope)
})

export const findScopeVariables = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const variables = await repository.findScopeVariables(id)

  if (!variables) {
    return c.json({ error: 'No variables found' }, 404)
  }

  return c.json(variables)
})

export const findScopeBenefits = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const scopeBenefits = await repository.findScopeBenefits(id)

  if (!scopeBenefits) {
    return c.json({ error: 'No scope benefits found' }, 404)
  }

  return c.json(scopeBenefits)
})

export const createOne = factory.createHandlers(createScopeValidator, async (c) => {
  const data = c.req.valid('json')
  const scope = await repository.createOne(data)
  return c.json(scope)
})
