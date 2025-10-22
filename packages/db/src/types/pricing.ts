import type { pricingData } from "@olis/db/seeds/one-stop-sales/data/pricing";

export type PricingAccessor = typeof pricingData[keyof typeof pricingData][number]["key"];
