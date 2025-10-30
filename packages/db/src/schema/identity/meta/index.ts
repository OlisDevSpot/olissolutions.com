import { userRoles, userSolutionStatuses } from '@olis/core/constants'
import { pgSchema } from 'drizzle-orm/pg-core'

export const identitySchema = pgSchema('identity')

export const userRoleEnum = identitySchema.enum('user_role', userRoles)
export const userSolutionStatusEnum = identitySchema.enum('user_solution_status', userSolutionStatuses)
