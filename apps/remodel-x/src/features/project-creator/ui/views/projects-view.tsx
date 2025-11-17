"use client";

import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";

import { useGetProjects } from "@/features/project-creator/data/queries/get-projects";
import { useModalStore } from "@/features/project-creator/hooks/dialogs/use-modal-store";
import { ProjectsTable } from "@/features/project-creator/ui/components/projects-table";
import { useTRPC } from "@/trpc/client";
import { Button } from "@olis/ui/components/button";
import { PageHeaderSection } from "@olis/ui/components/global/page-header";
import { ErrorState } from "@olis/ui/components/states/error-state";
import { LoadingState } from "@olis/ui/components/states/loading-state";

import { NewProjectModal } from "../components/dialogs/new-project-modal";

export function ProjectsView() {
  const queryClient = useQueryClient();
  const trpc = useTRPC()
  const { open, setModal } = useModalStore();
  const { data: projects, isLoading, isSuccess } = useGetProjects();

  function prefetch() {
    queryClient.prefetchQuery(trpc.projects.findOne.queryOptions({ projectId: projects?.[0]?.project.id ?? "" }));
  }

  useEffect(() => {
    if (projects?.length) {
      prefetch();
    }
    setModal({ 
      Element: <NewProjectModal />, 
      accessor: "new-project-modal"
    });
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
