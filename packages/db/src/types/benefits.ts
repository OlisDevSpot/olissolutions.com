import type { benefitCategoriesData } from "@olis/db/seeds/platform/data/benefit-categories";
import type { benefitsData } from "@olis/db/seeds/platform/data/benefits";

export type BenefitCategoryAccessor = typeof benefitCategoriesData[number]["accessor"];
export type BenefitAccessor = typeof benefitsData[keyof typeof benefitsData][number]["accessor"];

export type BenefitsOfCategory<T extends BenefitCategoryAccessor> = typeof benefitsData[T][number]["accessor"];
