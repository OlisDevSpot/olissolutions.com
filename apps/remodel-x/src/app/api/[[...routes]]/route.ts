import { trpcServer } from "@hono/trpc-server"
import app from "@olis/server/apps/one-stop-sales"
import { createHonoTRPCContext } from "@olis/trpc/lib/create-context"
import { remodelXAppRouter } from "@olis/trpc/routers/app/remodel-x/index"
import { handle } from "hono/vercel"

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
