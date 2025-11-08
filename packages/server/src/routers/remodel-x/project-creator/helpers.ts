import type { JoinTables } from './types'

import { db } from '@olis/db'

import { financialProfiles, jobsiteProfiles, x_projectCustomers, x_projectScopes } from '@olis/db/schema/remodel-x'
import { eq } from 'drizzle-orm'

export async function withJoins(projectId: string, joinTables: JoinTables[]) {
  return await Promise.all([
    joinTables.includes('customers')
      ? db
          .query
          .x_projectCustomers
          .findMany({ where: eq(x_projectCustomers.projectId, projectId), with: { customer: true } })
      : [],
    joinTables.includes('scopes')
      ? db
          .query
          .x_projectScopes
          .findMany({ where: eq(x_projectScopes.projectId, projectId), with: { scope: { with: { trade: true } } } })
      : [],
    joinTables.includes('jobsite-profile')
      ? db
          .query
          .jobsiteProfiles
          .findFirst({ where: eq(jobsiteProfiles.projectId, projectId) })
      : null,
    joinTables.includes('financial-profile')
      ? db
          .query
          .financialProfiles
          .findFirst({ where: eq(financialProfiles.projectId, projectId) })
      : null,
  ])
}
