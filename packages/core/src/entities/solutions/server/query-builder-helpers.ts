import type { PgSelectQueryBuilder } from "drizzle-orm/pg-core";

import { eq } from "drizzle-orm"
import { QueryBuilder } from "drizzle-orm/pg-core"

import db from "@/server/drizzle";
import { benefitCategories, benefits, solutions, variables, x_solutionBenefits, x_solutionVariables } from "@/shared/schema"

import type { SolutionsTableOptions } from "../types";

export function withBenefits<T extends PgSelectQueryBuilder>(query: T) {
  return query
    .leftJoin(x_solutionBenefits, eq(x_solutionBenefits.solutionId, solutions.id))
    .leftJoin(benefits, eq(benefits.id, x_solutionBenefits.benefitId))
    .leftJoin(benefitCategories, eq(benefitCategories.id, benefits.categoryId))
    .as("solution_benefits")
}

export function withVariables<T extends PgSelectQueryBuilder>(query: T) {
  return query
    .leftJoin(x_solutionVariables, eq(x_solutionVariables.solutionId, solutions.id))
    .leftJoin(variables, eq(variables.id, x_solutionVariables.variableId))
    .as("solution_variables")
}

// DEMO PURPOSES FOR QUERY BUILDER!
export async function findAll({ include }: SolutionsTableOptions = { include: [] }) {
  const qb = new QueryBuilder();
  
  const baseQuery = qb
    .select()
    .from(solutions)
    .$dynamic()

  if (include.length === 0) {
    return await db.select().from(solutions);
  }

  const query = include.includes("benefits") 
    ? withBenefits(baseQuery)
    : withVariables(baseQuery);
  return await db.select().from(query);
}
