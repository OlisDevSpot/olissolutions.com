import { factory } from '@olis/server/lib/create-app'

import * as repository from './repository'
import { accessorParam, createSolutionValidator, findAllByTradeIdValidator, idParam } from './validators'

export const findAll = factory.createHandlers(async (c) => {
  const solutions = await repository.findAll()
  return c.json(solutions)
})

export const findAllByTradeId = factory.createHandlers(findAllByTradeIdValidator, async (c) => {
  const { tradeId } = c.req.valid('query')

  if (!tradeId) {
    return c.json({ error: 'No trade id provided' }, 400)
  }

  const solutions = await repository.findAllByTradeId(tradeId)
  return c.json(solutions)
})

export const findAllWithBenefits = factory.createHandlers(async (c) => {
  const solutions = await repository.findAllWithBenefits()
  return c.json(solutions)
})

export const findOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const solution = await repository.findOne(id)
  return c.json(solution)
})

export const findOneByAccessor = factory.createHandlers(accessorParam, async (c) => {
  const { accessor } = c.req.valid('param')
  const solution = await repository.findOneByAccessor(accessor)
  return c.json(solution)
})

export const findSolutionVariables = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const variables = await repository.findSolutionVariables(id)

  if (!variables) {
    return c.json({ error: 'No variables found' }, 404)
  }

  return c.json(variables)
})

export const findSolutionBenefits = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const solutionBenefits = await repository.findSolutionBenefits(id)

  if (!solutionBenefits) {
    return c.json({ error: 'No solution benefits found' }, 404)
  }

  return c.json(solutionBenefits)
})

export const createOne = factory.createHandlers(createSolutionValidator, async (c) => {
  const data = c.req.valid('json')
  const solution = await repository.createOne(data)
  return c.json(solution)
})
