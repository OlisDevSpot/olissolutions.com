import type { tradesData } from '@olis/db/seeds/one-stop-sales/data/trades'

export type TradeAccessor = (typeof tradesData)[number]['accessor']
