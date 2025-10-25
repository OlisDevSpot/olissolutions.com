import type { auth } from '@olis/auth/server'
import type { Prettify } from '@olis/core/types'
import type { Project } from '@olis/db/schema/one-stop-sales'

import type { PgTable } from 'drizzle-orm/pg-core'
import type { Handler, Input, MiddlewareHandler } from 'hono'
import type { BlankInput, BlankSchema, TypedResponse } from 'hono/types'

export interface AppBindings {
  Variables: {
    user: typeof auth.$Infer.Session.user
    session: typeof auth.$Infer.Session.session
    project: Project | null
  }
}

export type InferInput<T extends MiddlewareHandler<any, any, any>> = T extends MiddlewareHandler<
  any,
  any,
  infer I
>
  ? I
  : never

export type AsyncHandlerResponse<T> = Promise<TypedResponse<T>>
export type RouteHandler<Res> = Handler<AppBindings, any, BlankInput, AsyncHandlerResponse<Res>>
export type RouteHandlerWithInput<I extends Input = BlankSchema, Res = any> = Handler<AppBindings, any, I, AsyncHandlerResponse<Res>>

export interface Metadata<T extends string = string> {
  accessor: T
  label: string
  description: string
  imageUrl: string
}

export interface TableFilters<T extends PgTable> {
  filters: Prettify<Partial<Omit<T['$inferInsert'], 'id'>>>
}
