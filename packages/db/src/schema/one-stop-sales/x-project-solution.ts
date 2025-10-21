import type z from 'zod'

import { id } from '@workspace/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { integer, jsonb, pgTable, unique, uuid } from 'drizzle-orm/pg-core'

import { createInsertSchema } from 'drizzle-zod'
import { projects } from './project'
import { solutions } from './solution'
import { x_solutionMaterials } from './x-solution-material'

export const x_projectSolutions = pgTable('x_project_solution', {
  id,
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  solutionId: integer('solution_id')
    .notNull()
    .references(() => solutions.id, { onDelete: 'no action' }),
  solutionMaterialId: integer('solution_material_id').references(
    () => x_solutionMaterials.id,
    { onDelete: 'cascade' },
  ),
  variablesData: jsonb('variables_data').$type<Record<string, any>>(),
}, table => [
  unique('project_id_solution_id_unique').on(
    table.projectId,
    table.solutionId,
  ),
])

export const projectSolutionRelations = relations(
  x_projectSolutions,
  ({ one }) => ({
    solution: one(solutions, {
      fields: [x_projectSolutions.solutionId],
      references: [solutions.id],
    }),
    project: one(projects, {
      fields: [x_projectSolutions.projectId],
      references: [projects.id],
    }),
    solutionMaterial: one(x_solutionMaterials, {
      fields: [x_projectSolutions.solutionMaterialId],
      references: [x_solutionMaterials.id],
    }),
  }),
)

export const selectXProjectSolutionSchema = createInsertSchema(x_projectSolutions)
export type SelectXProjectSolutionSchema = z.infer<typeof selectXProjectSolutionSchema>

export const insertXProjectSolutionSchema = createInsertSchema(x_projectSolutions).omit({
  id: true,
  projectId: true,
  solutionId: true,
})
export type InsertXProjectSolutionSchema = z.infer<typeof insertXProjectSolutionSchema>
