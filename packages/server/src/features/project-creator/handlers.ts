import { factory } from '@olis/server/lib/create-app'

import * as customersRepository from '@olis/server/routers/core/customers/repository'
import * as solutionsRepository from '@olis/server/routers/one-stop-sales/solutions/repository'

import * as repository from './repository'
import * as validators from './validators'

export const findAll = factory.createHandlers(validators.joinCustomers, async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const { joinCustomers } = c.req.valid('query')

  const projects = await repository.findAll(userId, { joinCustomers })

  return c.json(projects)
})

export const findOne = factory.createHandlers(validators.idParam, async (c) => {
  const { id } = c.req.valid('param')
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const project = await repository.findOne(userId, id)

  if (!project) {
    return c.json({ error: 'Project not found' }, 404)
  }

  return c.json(project)
})

export const createOne = factory.createHandlers(validators.createProjectValidator, async (c) => {
  const data = c.req.valid('json')
  const userId = c.get('user').id
  const project = await repository.createOne(userId, data)
  return c.json(project)
})

export const initProject = factory.createHandlers(validators.initProjectValidator, async (c) => {
  const data = c.req.valid('json')
  const userId = c.get('user').id
  const output = await repository.initProject(userId, data)

  if (!output) {
    return c.json({ error: 'Project not created' }, 404)
  }

  return c.json(output)
})

export const updateOne = factory.createHandlers(validators.idParam, validators.updateProjectValidator, async (c) => {
  const { id } = c.req.valid('param')
  const data = c.req.valid('json')

  const updatedProject = await repository.findOneAndUpdate(id, data)

  if (!updatedProject) {
    return c.json({ error: 'Project not updated' }, 404)
  }

  return c.json(updatedProject)
})

export const deleteOne = factory.createHandlers(validators.idParam, async (c) => {
  const { id } = c.req.valid('param')
  const deletedProject = await repository.deleteOne(id)

  if (!deletedProject) {
    return c.json({ error: 'Error deleting project' }, 404)
  }

  return c.json({ success: true }, 200)
})

export const findAllProjectCustomers = factory.createHandlers(validators.idParam, async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const { id } = c.req.valid('param')
  const customers = await customersRepository.findAllByProjectId(id)
  return c.json(customers)
})

export const findAllProjectSolutions = factory.createHandlers(validators.idParam, async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const { id } = c.req.valid('param')
  const solutions = await solutionsRepository.findAllByProjectId(id)

  return c.json(solutions)
})

export const findProjectJobsite = factory.createHandlers(validators.idParam, async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const { id } = c.req.valid('param')
  const jobsite = await repository.findProjectJobsite(id)

  if (!jobsite) {
    return c.json({ error: 'Project jobsite profile not found' }, 404)
  }

  return c.json(jobsite)
})

export const findProjectFinancialProfile = factory.createHandlers(validators.idParam, async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const { id } = c.req.valid('param')
  const financialProfile = await repository.findProjectFinancialProfile(id)

  if (!financialProfile) {
    return c.json({ error: 'Project financial profile not found' }, 404)
  }

  return c.json(financialProfile)
})

export const createProjectSolutions = factory.createHandlers(validators.idParam, validators.createProjectSolutionsValidator, async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const { id } = c.req.valid('param')
  const { solutionIds } = c.req.valid('json')

  const newProjectSolutions = await repository.createProjectSolutions(id, solutionIds)

  if (!newProjectSolutions) {
    return c.json({ error: 'Project not updated' }, 404)
  }

  return c.json(newProjectSolutions)
})

export const updateProjectJobsite = factory.createHandlers(validators.idParam, validators.updateProjectJobsiteValidator, async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const { id } = c.req.valid('param')
  const data = c.req.valid('json')

  if (!data) {
    return c.json({ error: 'No data provided' }, 400)
  }

  const updatedJobsite = await repository.updateProjectJobsiteProfile(id, data)

  if (!updatedJobsite) {
    return c.json({ error: 'Project not updated' }, 404)
  }

  return c.json(updatedJobsite)
})

export const updateProjectFinancialProfile = factory.createHandlers(validators.idParam, validators.updateProjectFinancialProfileValidator, async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const { id } = c.req.valid('param')
  const data = c.req.valid('json')

  if (!data) {
    return c.json({ error: 'No data provided' }, 400)
  }

  const updatedFinancialProfile = await repository.updateProjectFinancialProfile(id, data)

  if (!updatedFinancialProfile) {
    return c.json({ error: 'Project not updated' }, 404)
  }

  return c.json(updatedFinancialProfile)
})

export const updateProjectSolution = factory.createHandlers(validators.updateProjectSolutionParams, validators.updateProjectSolutionJson, async (c) => {
  const userId = c.get('user').id

  if (!userId) {
    return c.json({ error: 'User not found, unauthorized' }, 401)
  }

  const { id } = c.req.valid('param')
  const { solutionId } = c.req.valid('param')
  const { data } = c.req.valid('json')

  if (!data) {
    return c.json({ error: 'No data provided' }, 400)
  }

  const updatedSolution = await repository.updateProjectSolution(id, solutionId, data)

  if (!updatedSolution) {
    return c.json({ error: 'Project not updated' }, 404)
  }

  return c.json(updatedSolution)
})
