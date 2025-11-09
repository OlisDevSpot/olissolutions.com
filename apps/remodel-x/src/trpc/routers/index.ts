import { baseAppRouter } from "@olis/server/routers/base"

import { projectsRouter } from "@/trpc/routers/projects.router"
import { createTRPCRouter, mergeRouters, publicProcedure } from "@olis/trpc/init"

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
