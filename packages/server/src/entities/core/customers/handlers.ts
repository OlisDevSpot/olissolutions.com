import { factory } from '@olis/server/lib/create-app'

import * as repository from './repository'
import { createCustomerValidator, idParam, updateCustomerValidator } from './validators'

export const findAll = factory.createHandlers(async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const customer = await repository.findAll(userId)
  return c.json(customer)
})

export const findOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const customer = await repository.findOne(userId, id)

  if (!customer) {
    return c.json({ error: 'Customer not found' }, 404)
  }

  return c.json(customer)
})

export const createOne = factory.createHandlers(createCustomerValidator, async (c) => {
  const data = c.req.valid('json')
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const customer = await repository.createOne(data)
  return c.json(customer)
})

export const updateOne = factory.createHandlers(idParam, updateCustomerValidator, async (c) => {
  const { id } = c.req.valid('param')
  const data = c.req.valid('json')

  const updatedCustomer = await repository.findOneAndUpdate(id, data)

  if (!updatedCustomer) {
    return c.json({ error: 'Customer not updated' }, 404)
  }

  return c.json(updatedCustomer)
})

export const deleteOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid('param')
  const deletedCustomer = await repository.deleteOne(id)

  if (!deletedCustomer) {
    return c.json({ error: 'Error deleting customer' }, 404)
  }

  return c.json({ success: true }, 200)
})
