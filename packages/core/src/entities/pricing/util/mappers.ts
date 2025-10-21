import type { PricingVars } from "@/features/project-creator/cost-calculation-types";
import type { UpgradeAccessor } from "@/shared/entities/upgrades/types";

import type { useGetPricing } from "../data/queries/get-pricing";

export function aggregatePricingByUpgrade(dbPrices: NonNullable<ReturnType<typeof useGetPricing>["data"]>) {
  const pricingVars = dbPrices.reduce((acc, pricingVariable) => {
    const upgradeAccessor = pricingVariable.upgrade.accessor as UpgradeAccessor;
    if (!acc[upgradeAccessor]) {
      acc[upgradeAccessor] = {};
    }
    acc[upgradeAccessor][pricingVariable.key] = pricingVariable.defaultValue;
    return acc;
  }, {} as Record<UpgradeAccessor, Record<string, number>>);
  return pricingVars as PricingVars;
}
