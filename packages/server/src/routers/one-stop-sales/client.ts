import type { Context } from 'hono'
import type { InferResponseType } from 'hono/client'
import type { AppRouter } from './app'
import { hc } from 'hono/client'

export const honoClient = hc<AppRouter>(process.env.NEXT_PUBLIC_BASE_URL!)

type Response = InferResponseType<typeof honoClient.api.projects[':id']['$get'], 200>

type HasValid = Context['req']['valid']
