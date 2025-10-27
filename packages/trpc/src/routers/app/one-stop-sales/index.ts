import { mergeRouters } from '@olis/trpc/init'
import { baseAppRouter } from '@olis/trpc/routers/app/base'
import { ossRouter } from './router'

export const ossAppRouter = mergeRouters(baseAppRouter, ossRouter)

export type OSSAppRouter = typeof ossAppRouter
