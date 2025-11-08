import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useInitProject() {
  const trpc = useTRPC()
  return useMutation(trpc.projects.init.mutationOptions());
}
