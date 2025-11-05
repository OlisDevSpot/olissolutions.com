import type { UseMutationOptions } from "@tanstack/react-query";

import { honoClient } from "@olis/server/apps/clients/one-stop-sales";
import { mutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function deleteProjectMutationOptions(
  options?: Omit<UseMutationOptions<{ success: boolean }, Error, string>, "mutationFn">,
) {
  return mutationOptions({
    ...options,
    mutationFn: async (id: string) => {
      const res = await honoClient.api.projects[":id"].$delete({ param: { id } });

      if (!res.ok) {
        throw new Error("Error deleting project");
      }

      return await res.json();
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation(deleteProjectMutationOptions({
    onError: () => {
      toast.error("Error deleting project");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
  }));
}
