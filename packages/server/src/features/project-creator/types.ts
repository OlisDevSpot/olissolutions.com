import type { honoClient } from '@olis/server/hono-client'

import type { InferResponseType } from 'hono'

export type CreateProjectWithCustomerResponse = InferResponseType<typeof honoClient.api.projects['init']['$post'], 200>

export type JoinTables = 'customers' | 'solutions' | 'jobsite-profile' | 'financial-profile'
