import { trpcServer } from "@hono/trpc-server"
import { createApp } from "@olis/server/lib/create-app"
import { createHonoTRPCContext } from "@olis/trpc/lib/create-context"
import { handle } from "hono/vercel"

import { remodelXAppRouter } from "@/trpc/routers"

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
