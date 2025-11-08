// import type { honoClient } from '@olis/server/hono-client'

// import type { InferResponseType } from 'hono'

// export type CreateProjectWithCustomerResponse = InferResponseType<(typeof honoClient.api)['one-stop-sales']['projects']['init']['$post'], 200>

export type JoinTables = 'customers' | 'scopes' | 'jobsite-profile' | 'financial-profile'
