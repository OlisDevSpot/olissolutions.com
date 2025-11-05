"use client";

import { useDeleteProject } from "@/features/project-creator/data/mutations/delete-project";
import { cn } from "@olis/ui/lib/utils";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const mutation = useDeleteProject();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        mutation.mutate(projectId);
      }}
      className={cn("text-destructive hover:text-destructive/80 cursor-pointer", mutation.isPending && "cursor-not-allowed opacity-50")}
    >
      Delete
    </div>
  );
}
