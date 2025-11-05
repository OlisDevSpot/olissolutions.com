"use client";

import { useCurrentProject } from "@/features/project-creator/hooks/use-current-project";
import { JobsiteForm } from "@/features/project-creator/ui/components/forms/update-jobsite-profile-form";
import { LoadingState } from "@olis/ui/components/global/loading-state";

export function ProjectPropertyView() {
  const { data: project, isLoading } = useCurrentProject();

  if (isLoading) {
    return (
      <LoadingState
        title="Loading project..."
        description="This might take a few seconds"
      />
    );
  }

  if (!project) {
    return <div className="w-full h-full flex items-center justify-center">Project not found!</div>;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="h-full flex flex-col gap-6">

        <JobsiteForm projectId={project.id} />
      </div>
    </div>
  );
}
