import type { ScopesTableOptions } from '@olis/db/types'

import type { PgSelectQueryBuilder } from 'drizzle-orm/pg-core'
import { db } from '@olis/db'

import { benefitCategories, benefits, scopes, x_scopeBenefits } from '@olis/db/schema/platform'
import { variables, x_scopeVariables } from '@olis/db/schema/remodel-x'
import { eq } from 'drizzle-orm'

import { QueryBuilder } from 'drizzle-orm/pg-core'

export function withBenefits<T extends PgSelectQueryBuilder>(query: T) {
  return query
    .leftJoin(x_scopeBenefits, eq(x_scopeBenefits.scopeId, scopes.id))
    .leftJoin(benefits, eq(benefits.id, x_scopeBenefits.benefitId))
    .leftJoin(benefitCategories, eq(benefitCategories.id, benefits.categoryId))
    .as('scope_benefits')
}

export function withVariables<T extends PgSelectQueryBuilder>(query: T) {
  return query
    .leftJoin(x_scopeVariables, eq(x_scopeVariables.scopeId, scopes.id))
    .leftJoin(variables, eq(variables.id, x_scopeVariables.variableId))
    .as('scope_variables')
}

// DEMO PURPOSES FOR QUERY BUILDER!
export async function findAll({ include }: ScopesTableOptions = { include: [] }) {
  const qb = new QueryBuilder()

  const baseQuery = qb
    .select()
    .from(scopes)
    .$dynamic()

  if (include.length === 0) {
    return await db.select().from(scopes)
  }

  const query = include.includes('benefits')
    ? withBenefits(baseQuery)
    : withVariables(baseQuery)
  return await db.select().from(query)
}
