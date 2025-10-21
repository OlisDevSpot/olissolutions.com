import { eq } from "drizzle-orm";

import type { Benefit, BenefitCategory } from "@/shared/schema";

import db from "@/server/drizzle";
import { benefitCategories, benefits } from "@/shared/schema";

export async function findAll() {
  const rows = await db
    .select({ benefit: benefits, benefitCategory: benefitCategories })
    .from(benefits)
    .innerJoin(benefitCategories, eq(benefits.categoryId, benefitCategories.id))
  ;

  const map = new Map<number, BenefitCategory & { benefits: Benefit[] }>();

  for (const row of rows) {
    if (!map.has(row.benefitCategory.id)) {
      map.set(row.benefitCategory.id, {
        ...row.benefitCategory,
        benefits: [],
      });
    }
    map.get(row.benefitCategory.id)!.benefits.push(row.benefit);
  }

  return Array.from(map.values());
}
