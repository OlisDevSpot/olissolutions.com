import type { honoClient } from '@olis/server/routers/one-stop-sales/client'
import type { InferRequestType, InferResponseType } from 'hono'

export type GetTradesResponse = InferResponseType<typeof honoClient.api['platform']['trades']['$get'], 200>

export type GetTradeScopesRequest = InferRequestType<typeof honoClient.api['platform']['trades'][':id']['scopes']['$get']>
export type GetTradeScopesResponse = InferResponseType<typeof honoClient.api['platform']['trades'][':id']['scopes']['$get'], 200>

export type GetTradeAddonsRequest = InferRequestType<typeof honoClient.api['platform']['trades'][':id']['addons']['$get']>
export type GetTradeAddonsResponse = InferResponseType<typeof honoClient.api['platform']['trades'][':id']['addons']['$get'], 200>
