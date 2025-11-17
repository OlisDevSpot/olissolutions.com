"use client";

import { useCurrentProject } from "@/features/project-creator/hooks/use-current-project";
import { ProjectScopes } from "@/features/project-creator/ui/components/project-scopes";
import { LoadingState } from "@olis/ui/components/states/loading-state";

export function ProjectScopesView() {
  const { data: project, isLoading } = useCurrentProject();

  if (isLoading) {
    return (
      <LoadingState
        title="Loading project..."
        description="This might take a few seconds"
      />
    );
  }

  if (!project || "error" in project) {
    return <div className="w-full h-full flex items-center justify-center">Project not found!</div>;
  }

  return (
    <div className="h-full">
      <div className="h-full flex flex-col gap-6">
        <ProjectScopes />
      </div>
    </div>
  );
}
