import type { benefitCategoriesData } from "@workspace/db/seeds/one-stop-sales/data/benefit-categories";
import type { benefitsData } from "@workspace/db/seeds/one-stop-sales/data/benefits";

export type BenefitCategoryAccessor = typeof benefitCategoriesData[number]["accessor"];
export type BenefitAccessor = typeof benefitsData[keyof typeof benefitsData][number]["accessor"];

export type BenefitsOfCategory<T extends BenefitCategoryAccessor> = typeof benefitsData[T][number]["accessor"];
