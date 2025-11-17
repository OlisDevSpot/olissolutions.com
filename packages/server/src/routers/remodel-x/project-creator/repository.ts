import type { Customer, InsertCustomerSchema } from '@olis/db/schema/platform'
import type { InsertFinancialProfileSchema, InsertJobsiteProfileSchema, InsertJobsiteRoofSchema, InsertProject, InsertXProjectScopeSchema, Project } from '@olis/db/schema/remodel-x'

import type { JoinTables } from '@olis/server/routers/remodel-x/project-creator/types'
import type { TableFilters } from '@olis/server/types'
import type { Column, SQL } from 'drizzle-orm'

import { db } from '@olis/db'
import { customers } from '@olis/db/schema/platform'
import { financialProfiles, fullAddress, jobsiteProfiles, jobsiteRoofs, projects, x_projectCustomers, x_projectScopes } from '@olis/db/schema/remodel-x'
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

export async function findAll(userId: string) {
  try {
    const foundProjects = await db
      .select({ project: { ...getTableColumns(projects) }, fullAddress, customer: customers })
      .from(projects)
      .where(eq(projects.ownerId, userId))
      .orderBy(desc(projects.createdAt))
      .leftJoin(x_projectCustomers, eq(x_projectCustomers.projectId, projects.id))
      .leftJoin(customers, eq(customers.id, x_projectCustomers.customerId))

    if (!foundProjects) {
      return []
    }

    const projectsWithCustomers: { project: Project, fullAddress: string, customers: Customer[] }[] = []

    for (const foundProject of foundProjects) {
      if (!foundProject.customer)
        continue

      const existingProject = projectsWithCustomers.find(({ project }) => project.id === foundProject.project.id)

      if (existingProject) {
        existingProject.customers.push(foundProject.customer)
      }
      else {
        projectsWithCustomers.push({
          project: foundProject.project,
          fullAddress: foundProject.fullAddress,
          customers: [foundProject.customer],
        })
      }
    }

    return projectsWithCustomers
  }
  catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to find projects', { cause: error })
    }
    throw new Error(`Failed to find projects: ${String(error)}`)
  }
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

  const [projectCustomers, projectScopes, jobsiteProfile, financialProfile] = await withJoins(project.id, joinTables)

  return {
    ...project,
    customers: projectCustomers.map(x_projectCustomer => x_projectCustomer.customer),
    scopes: projectScopes.map(x_projectScope => x_projectScope.scope),
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

export async function initProject(userId: string, data: { project: InsertProject, customer: InsertCustomerSchema, jobsite: Omit<InsertJobsiteProfileSchema, 'projectId'> }) {
  const output = await db.transaction(async (tx) => {
    const [project] = await tx
      .insert(projects)
      .values({
        ...data.project,
        ownerId: userId,
      })
      .returning()

    if (!project) {
      return null
    }

    const [customer] = await tx
      .insert(customers)
      .values({
        ...data.customer,
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
        ...data.jobsite,
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

export async function createProjectScopes(projectId: string, scopeIds: number[]) {
  await db.delete(x_projectScopes).where(eq(x_projectScopes.projectId, projectId))

  if (scopeIds.length === 0) {
    return []
  }

  const projectScopes = await db
    .insert(x_projectScopes)
    .values(scopeIds.map(scopeId => ({ projectId, scopeId })))
    .returning()

  return projectScopes
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

export async function updateProjectScope(projectId: string, scopeId: number, data: Partial<InsertXProjectScopeSchema>) {
  const [updatedProjectScope] = await db
    .update(x_projectScopes)
    .set(data)
    .where(and(eq(x_projectScopes.projectId, projectId), eq(x_projectScopes.scopeId, scopeId)))
    .returning()
  return updatedProjectScope
}

export async function createProjectCustomer(projectId: string, customerId: string) {
  const [projectCustomer] = await db
    .insert(x_projectCustomers)
    .values({
      projectId,
      customerId,
    })
    .returning()
  return projectCustomer
}
