import type { tradesData } from '@olis/db/seeds/platform/data/trades'

export type TradeAccessor = (typeof tradesData)[number]['accessor']
