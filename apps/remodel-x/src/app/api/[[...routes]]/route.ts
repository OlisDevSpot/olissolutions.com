import { trpcServer } from "@hono/trpc-server"
import { createApp } from "@olis/server/lib/create-app"
import { baseAppRouter } from "@olis/server/routers/base"
import { createTRPCRouter, mergeRouters, publicProcedure } from "@olis/trpc/init"
import { createHonoTRPCContext } from "@olis/trpc/lib/create-context"
import { handle } from "hono/vercel"

import { projectsRouter } from "@/trpc/routers/projects.router"

export const remodelXAppRouter = mergeRouters(
  baseAppRouter,
  createTRPCRouter({
    "oss-health-check": publicProcedure.query(() => {
      return "Hello, world!"
    }),
    "projects": projectsRouter,
  }),
)

export type RemodelXAppRouter = typeof remodelXAppRouter

const app = createApp()

app.use("/trpc/*", trpcServer({
  router: remodelXAppRouter,
  endpoint: "/api/trpc",
  createContext: createHonoTRPCContext,
}))

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const OPTIONS = handle(app)
