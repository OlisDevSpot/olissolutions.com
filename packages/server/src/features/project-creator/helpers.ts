import type { JoinTables } from './types'

import { db } from '@olis/db'

import { financialProfiles, jobsiteProfiles, x_projectCustomers, x_projectSolutions } from '@olis/db/schema/one-stop-sales'
import { eq } from 'drizzle-orm'

export async function withJoins(projectId: string, joinTables: JoinTables[]) {
  return await Promise.all([
    joinTables.includes('customers')
      ? db
          .query
          .x_projectCustomers
          .findMany({ where: eq(x_projectCustomers.projectId, projectId), with: { customer: true } })
      : [],
    joinTables.includes('solutions')
      ? db
          .query
          .x_projectSolutions
          .findMany({ where: eq(x_projectSolutions.projectId, projectId), with: { solution: { with: { trade: true } } } })
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
