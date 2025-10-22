import type { tradesData } from '@olis/db/seeds/one-stop-sales/data/trades'

export type TradeAccessor = (typeof tradesData)[number]['accessor']

export interface Described {
  description: string
  label: string
}

export interface Trade extends Described {
  accessor: TradeAccessor
}
