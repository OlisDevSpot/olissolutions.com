import type { UseMutationOptions } from "@tanstack/react-query";
import type { inferInput, inferOutput } from "@trpc/tanstack-react-query";

import { useMutation } from "@tanstack/react-query";

import type { trpc } from "@/trpc/server";

import { useTRPC } from "@/trpc/client";

type CreateProjectScopesOutput = inferOutput<typeof trpc.projects.createProjectScopes>;
type CreateProjectScopesInput = inferInput<typeof trpc.projects.createProjectScopes>;

export function useCreateProjectScopes(opts: UseMutationOptions<CreateProjectScopesOutput, unknown, CreateProjectScopesInput>) {
  const trpc = useTRPC()
  return useMutation(trpc.projects.createProjectScopes.mutationOptions(opts));
}
