import type { pricingData } from "@workspace/db/seeds/one-stop-sales/data/pricing";
import type { variablesData } from "@workspace/db/seeds/one-stop-sales/data/variables";
import type { UpgradeAccessor } from "@workspace/core/entities/upgrades/types";

export type VariablesData = typeof variablesData;
export type VariablesKeys<Upgrade extends UpgradeAccessor> = VariablesData[Upgrade][number]["key"];

export type PricingData = typeof pricingData;
export type PricingVariablesOfUpgrade<U extends UpgradeAccessor> = {
  [key in Extract<PricingData[U][number], { key: string }>["key"]]: number;
}
