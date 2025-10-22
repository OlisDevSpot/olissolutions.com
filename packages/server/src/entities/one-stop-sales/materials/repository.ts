import { db } from '@olis/db'

import { benefitCategories, benefits, materials, x_materialBenefits } from '@olis/db/schema/one-stop-sales'
import { eq, getTableColumns } from 'drizzle-orm'

export async function findAll() {
  return await db
    .select()
    .from(materials)
}

export async function findOne(id: number) {
  const [material] = await db
    .select()
    .from(materials)
    .where(eq(materials.id, id))
  return material
}

export async function findOneByAccessor(accessor: string) {
  const [material] = await db
    .select()
    .from(materials)
    .where(eq(materials.accessor, accessor))
  return material
}

export async function findMaterialBenefits(id: number) {
  const foundBenefits = await db
    .select({ ...getTableColumns(benefits), category: { ...getTableColumns(benefitCategories) } })
    .from(x_materialBenefits)
    .where(eq(x_materialBenefits.materialId, id))
    .innerJoin(benefits, eq(benefits.id, x_materialBenefits.benefitId))
    .innerJoin(benefitCategories, eq(benefits.categoryId, benefitCategories.id))

  return foundBenefits
}
