import type { useGetPricing } from "@olis/data-client/fetchers/remodel-x/pricing/queries/get-pricing"

import type { PricingVars } from "@/features/project-creator/cost-calculation-types"
import type { TradeAccessor } from "@olis/db/types"

export function aggregatePricingByTrade(dbPrices: NonNullable<ReturnType<typeof useGetPricing>["data"]>) {
  const pricingVars = dbPrices.reduce((acc, pricingVariable) => {
    const tradeAccessor = pricingVariable.trade.accessor as TradeAccessor
    if (!acc[tradeAccessor]) {
      acc[tradeAccessor] = {}
    }
    acc[tradeAccessor][pricingVariable.key] = pricingVariable.defaultValue
    return acc
  }, {} as Record<TradeAccessor, Record<string, number>>)

  return pricingVars as PricingVars
}
