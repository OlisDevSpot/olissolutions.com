import { zValidator } from '@hono/zod-validator'
import { insertFinancialProfileSchema, insertJobsiteProfileSchema, insertJobsiteRoofSchema, insertProjectSchema, insertXProjectScopeSchema } from '@olis/db/schema/one-stop-sales'
import { insertCustomerSchema } from '@olis/db/schema/platform'

import z from 'zod'

export const idParam = zValidator('param', z.object({ id: z.string() }))

export const joinCustomers = zValidator('query', z.object({ joinCustomers: z.coerce.boolean() }))

export const findWithJoinsQuery = zValidator('query', z.object({ include: z.string().optional() }))

export const createProjectValidator = zValidator('json', insertProjectSchema.strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const initProjectValidator = zValidator('json', z.object({
  projectData: insertProjectSchema,
  customerData: insertCustomerSchema,
  jobsiteData: insertJobsiteProfileSchema.pick({
    numStories: true,
    yearBuilt: true,
    electricProvider: true,
  }),
}))

export const createProjectScopesValidator = zValidator('json', z.object({ scopeIds: z.array(z.number()) }), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const updateProjectValidator = zValidator('json', insertProjectSchema.partial().strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const updateProjectJobsiteValidator = zValidator('json', z.object({
  roofData: insertJobsiteRoofSchema.partial().strict(),
  jobsiteData: insertJobsiteProfileSchema.partial().strict(),
}), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const updateProjectFinancialProfileValidator = zValidator('json', insertFinancialProfileSchema.partial().strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const updateProjectScopeParams = zValidator('param', z.object({ id: z.string(), scopeId: z.coerce.number() }), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})
export const updateProjectScopeJson = zValidator('json', z.object({ data: insertXProjectScopeSchema.partial().strict() }), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})
