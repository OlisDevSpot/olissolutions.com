"use client";

import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";

import { getProjectQueryOptions } from "@/features/project-creator/data/queries/get-project";
import { useGetProjects } from "@/features/project-creator/data/queries/get-projects";
import { useCreateDialogStore } from "@/features/project-creator/hooks/dialogs/use-create-dialog-store";
import { ProjectsTable } from "@/features/project-creator/ui/components/table";
import { Button } from "@olis/ui/components/button";
import { ErrorState } from "@olis/ui/components/global/error-state";
import { LoadingState } from "@olis/ui/components/global/loading-state";
import { PageHeaderSection } from "@olis/ui/components/global/page-header";

export function ProjectsView() {
  const queryClient = useQueryClient();
  const { open } = useCreateDialogStore();
  const { data: projects, isLoading, isSuccess } = useGetProjects();

  function prefetch() {
    queryClient.prefetchQuery(getProjectQueryOptions(projects?.[0]?.id ?? ""));
  }

  useEffect(() => {
    if (projects?.length) {
      prefetch();
    }
  }, [projects]);

  return (
    <>
      <div className="h-full space-y-8 flex flex-col">
        <PageHeaderSection>
          <PageHeaderSection.Frame>
            <PageHeaderSection.Header title="Projects" description="Create a new project or jump into an existing one">
              <PageHeaderSection.ActionButtons>
                <div className="ml-auto">
                  <Button variant="outline" onClick={() => open()}><PlusIcon /></Button>
                </div>
              </PageHeaderSection.ActionButtons>
            </PageHeaderSection.Header>
          </PageHeaderSection.Frame>
        </PageHeaderSection>
        <div className="grow w-full overflow-auto">
          {isLoading
            ? (
                <LoadingState 
                  title="Loading projects..." 
                  description="This might take a few seconds"
                />
              )
            : !isSuccess
                ? <ErrorState title="Error loading projects" description="Please try again later" />
                : <ProjectsTable projects={projects} />}
        </div>
      </div>
    </>
  );
}
