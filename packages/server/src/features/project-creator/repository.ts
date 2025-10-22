import type { InsertCustomerSchema } from '@olis/db/schema/core'
import type { InsertFinancialProfileSchema, InsertJobsiteProfileSchema, InsertJobsiteRoofSchema, InsertProject, InsertXProjectSolutionSchema } from '@olis/db/schema/one-stop-sales'

import type { JoinTables } from '@olis/server/features/project-creator/types'
import type { TableFilters } from '@olis/server/types'
import type { Column, SQL } from 'drizzle-orm'

import { db } from '@olis/db'
import { customers } from '@olis/db/schema/core'
import { financialProfiles, fullAddress, jobsiteProfiles, jobsiteRoofs, projects, x_projectCustomers, x_projectSolutions } from '@olis/db/schema/one-stop-sales'
import { and, desc, eq, getTableColumns } from 'drizzle-orm'

import { withJoins } from './helpers'

export async function findOne(userId: string, projectId: string) {
  const [project] = await db
    .select({ ...getTableColumns(projects), fullAddress })
    .from(projects)
    .where(
      and(
        eq(projects.ownerId, userId),
        eq(projects.id, projectId),
      ),
    )

  return project
}

export async function findAll(userId: string, options: { joinCustomers?: boolean } = {}) {
  return await db
    .select({ ...getTableColumns(projects), fullAddress, customers })
    .from(projects)
    .where(eq(projects.ownerId, userId))
    .orderBy(desc(projects.createdAt))
    .leftJoin(x_projectCustomers, options.joinCustomers ? eq(x_projectCustomers.projectId, projects.id) : undefined)
    .leftJoin(customers, options.joinCustomers ? eq(customers.id, x_projectCustomers.customerId) : undefined)
}

export async function findOneWithJoins(userId: string, projectId: string, joinTables: JoinTables[] = []) {
  const [project] = await db
    .select({ ...getTableColumns(projects), fullAddress })
    .from(projects)
    .where(
      and(
        eq(projects.ownerId, userId),
        eq(projects.id, projectId),
      ),
    )

  if (!project) {
    return null
  }

  const [projectCustomers, projectSolutions, jobsiteProfile, financialProfile] = await withJoins(project.id, joinTables)

  return {
    ...project,
    customers: projectCustomers.map(x_projectCustomer => x_projectCustomer.customer),
    solutions: projectSolutions.map(x_projectSolution => x_projectSolution.solution),
    jobsiteProfile,
    financialProfile,
  }
}

export async function createOne(userId: string, data: InsertProject) {
  const [newProject] = await db
    .insert(projects)
    .values({ ...data, ownerId: userId })
    .returning()

  if (!newProject) {
    return null
  }

  return newProject
}

export async function initProject(userId: string, data: { projectData: InsertProject, customerData: InsertCustomerSchema, jobsiteData: Omit<InsertJobsiteProfileSchema, 'projectId'> }) {
  const output = await db.transaction(async (tx) => {
    const [project] = await tx
      .insert(projects)
      .values({
        ...data.projectData,
        ownerId: userId,
      })
      .returning()

    if (!project) {
      return null
    }

    const [customer] = await tx
      .insert(customers)
      .values({
        ...data.customerData,
      })
      .returning()

    if (!customer) {
      return null
    }

    await tx.insert(x_projectCustomers).values({
      projectId: project.id,
      customerId: customer.id,
      isPrimary: true,
    })

    const [jobsite] = await tx
      .insert(jobsiteProfiles)
      .values({
        ...data.jobsiteData,
        projectId: project.id,
      })
      .returning()

    if (!jobsite) {
      return null
    }

    await tx.insert(jobsiteRoofs).values({
      jobsiteProfileId: jobsite.id,
    })

    const [financialProfile] = await tx
      .insert(financialProfiles)
      .values({
        projectId: project.id,
      })
      .returning()

    if (!financialProfile) {
      return null
    }

    return { project, customer, jobsite, financialProfile }
  })

  return output
}

export async function findOneAndUpdate(projectId: string, data: Partial<InsertProject>) {
  const [updatedProject] = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, projectId))
    .returning()
  return updatedProject
}

export async function find({ filters }: TableFilters<typeof projects>) {
  const conditions: SQL[] = []

  for (const [key, value] of Object.entries(filters)) {
    const column = projects[key as keyof typeof projects] as Column
    conditions.push(eq(column, value))
  }
  return await db
    .select()
    .from(projects)
    .where(and(...conditions))
}

export async function deleteOne(projectId: string) {
  const [deletedProject] = await db
    .delete(projects)
    .where(eq(projects.id, projectId))
    .returning()

  return deletedProject
}

export async function findProjectJobsite(projectId: string) {
  const [jobsite] = await db
    .select()
    .from(jobsiteProfiles)
    .where(eq(jobsiteProfiles.projectId, projectId))
    .leftJoin(jobsiteRoofs, eq(jobsiteProfiles.id, jobsiteRoofs.jobsiteProfileId))

  return { ...jobsite?.jobsite_profile, roofs: jobsite?.jobsite_roof }
}

export async function findProjectFinancialProfile(projectId: string) {
  const [financialProfile] = await db
    .select()
    .from(financialProfiles)
    .where(eq(financialProfiles.projectId, projectId))
  return financialProfile
}

export async function createProjectSolutions(projectId: string, solutionIds: number[]) {
  await db.delete(x_projectSolutions).where(eq(x_projectSolutions.projectId, projectId))

  if (solutionIds.length === 0) {
    return []
  }

  const projectSolutions = await db
    .insert(x_projectSolutions)
    .values(solutionIds.map(solutionId => ({ projectId, solutionId })))
    .returning()

  return projectSolutions
}

export async function updateProjectJobsiteProfile(
  projectId: string,
  data: {
    jobsiteData: Partial<InsertJobsiteProfileSchema>
    roofData: Partial<InsertJobsiteRoofSchema>
  },
) {
  const output = await db.transaction(async (tx) => {
    const [updatedJobsite] = await tx
      .update(jobsiteProfiles)
      .set(data.jobsiteData)
      .where(eq(jobsiteProfiles.projectId, projectId))
      .returning()

    if (!updatedJobsite) {
      return null
    }

    const [updatedRoof] = await tx
      .update(jobsiteRoofs)
      .set(data.roofData)
      .where(eq(jobsiteRoofs.jobsiteProfileId, updatedJobsite.id))
      .returning()

    return { updatedJobsite, updatedRoof }
  })
  return output
}

export async function updateProjectFinancialProfile(projectId: string, data: Partial<InsertFinancialProfileSchema>) {
  const [updateFinancialProfile] = await db
    .update(financialProfiles)
    .set(data)
    .where(eq(financialProfiles.projectId, projectId))
    .returning()
  return updateFinancialProfile
}

export async function updateProjectSolution(projectId: string, solutionId: number, data: Partial<InsertXProjectSolutionSchema>) {
  const [updatedProjectSolution] = await db
    .update(x_projectSolutions)
    .set(data)
    .where(and(eq(x_projectSolutions.projectId, projectId), eq(x_projectSolutions.solutionId, solutionId)))
    .returning()
  return updatedProjectSolution
}
