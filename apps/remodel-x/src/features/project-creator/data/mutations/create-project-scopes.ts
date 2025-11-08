import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useCreateProjectScopes() {
  const trpc = useTRPC()
  return useMutation(trpc.projects.createProjectScopes.mutationOptions());
}
