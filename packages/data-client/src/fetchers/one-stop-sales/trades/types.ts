import type { honoClient } from '@olis/server/routers/one-stop-sales/client'
import type { InferRequestType, InferResponseType } from 'hono'

export type GetTradesResponse = InferResponseType<typeof honoClient.api['trades']['$get'], 200>

export type GetTradeSolutionsRequest = InferRequestType<typeof honoClient.api['trades'][':id']['solutions']['$get']>
export type GetTradeSolutionsResponse = InferResponseType<typeof honoClient.api['trades'][':id']['solutions']['$get'], 200>

export type GetTradeAddonsRequest = InferRequestType<typeof honoClient.api['trades'][':id']['addons']['$get']>
export type GetTradeAddonsResponse = InferResponseType<typeof honoClient.api['trades'][':id']['addons']['$get'], 200>
