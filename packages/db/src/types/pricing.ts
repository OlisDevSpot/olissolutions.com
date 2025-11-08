import type { pricingData } from "@olis/db/seeds/remodel-x/data/pricing";

export type PricingAccessor = typeof pricingData[keyof typeof pricingData][number]["key"];
