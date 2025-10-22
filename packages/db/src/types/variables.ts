import type { pricingData } from '@olis/db/seeds/one-stop-sales/data/pricing'
import type { variablesData } from '@olis/db/seeds/one-stop-sales/data/variables'
import type { TradeAccessor } from './trades'

export type VariablesData = typeof variablesData
export type VariablesKeys<Trade extends TradeAccessor> = VariablesData[Trade][number]['key']

export type PricingData = typeof pricingData
export type PricingVariablesOfTrade<U extends TradeAccessor> = {
  [key in Extract<PricingData[U][number], { key: string }>['key']]: number;
}
