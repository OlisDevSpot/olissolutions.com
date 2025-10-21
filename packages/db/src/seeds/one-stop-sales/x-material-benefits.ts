import { sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";
import type { MaterialAccessor } from "@/shared/entities/materials/types";

import type { InsertXMaterialBenefit } from "@workspace/db/schema/one-stop-sales/index";

import { benefits, materials, x_materialBenefits } from "@workspace/db/schema/one-stop-sales/index";
import { materialBenefitsData } from "./data/x-material-benefits";

export default async function seed(db: DB) {
  const materialAccessors = Object.keys(materialBenefitsData) as MaterialAccessor[]
  
  const [allMaterials, allBenefits] = await Promise.all([
    db.select().from(materials),
    db.select().from(benefits),
  ])

  const mappedXMaterialBenefits: InsertXMaterialBenefit[] = [];

  for (const materialAccessor of materialAccessors) {
    const materialEntry = allMaterials.find(dbMaterial => dbMaterial.accessor === materialAccessor);

    for (const benefit of materialBenefitsData[materialAccessor as keyof typeof materialBenefitsData]) {
      const benefitEntry = allBenefits.find(dbBenefit => dbBenefit.accessor === benefit);

      if (!materialEntry || !benefitEntry)
        continue;

      mappedXMaterialBenefits.push({ 
        materialId: materialEntry.id, 
        benefitId: benefitEntry.id
      });
    }
  }

  await db
    .insert(x_materialBenefits)
    .values(mappedXMaterialBenefits)
    .onConflictDoUpdate({
      target: [x_materialBenefits.materialId, x_materialBenefits.benefitId],
      set: { 
        materialId: sql`EXCLUDED.material_id`,
        benefitId: sql`EXCLUDED.benefit_id`,
      },
    });
}
