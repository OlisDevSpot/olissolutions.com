import type { UseMutationOptions } from "@tanstack/react-query";
import type { inferInput, inferOutput } from "@trpc/tanstack-react-query";

import { useMutation } from "@tanstack/react-query";

import type { trpc } from "@/trpc/server";

import { useTRPC } from "@/trpc/client";

export type InitProjectInput = inferInput<typeof trpc.projects.init>
export type InitProjectOutput = inferOutput<typeof trpc.projects.init>

export function useInitProject(opts: UseMutationOptions<InitProjectOutput, unknown, InitProjectInput>) {
  const trpc = useTRPC()
  return useMutation(trpc.projects.init.mutationOptions(opts));
}
