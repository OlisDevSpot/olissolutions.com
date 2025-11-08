import { baseAppRouter } from "@olis/server/routers/base"
import { createTRPCRouter, mergeRouters, publicProcedure } from "@olis/trpc/init"

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
