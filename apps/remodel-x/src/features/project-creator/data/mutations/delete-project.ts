import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const trpc = useTRPC();
  return useMutation(trpc.projects.deleteOne.mutationOptions({
    onError: () => {
      toast.error("Error deleting project");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
  }));
}
