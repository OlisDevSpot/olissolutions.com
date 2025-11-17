import type { inferOutput } from "@trpc/tanstack-react-query";

import { useQuery } from "@tanstack/react-query";

import type { trpc } from "@/trpc/server";

import { useTRPC } from "@/trpc/client";

export type GetProjectsOutput = inferOutput<typeof trpc.projects.findAll>

export function useGetProjects() {
  const trpc = useTRPC()
  return useQuery(trpc.projects.findAll.queryOptions());
}
