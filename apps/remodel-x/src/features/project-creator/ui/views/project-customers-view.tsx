"use client";

import { useGetProjectCustomers } from "@/features/project-creator/data/queries/get-project-customers";
import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";
import { UpdateCustomerForm } from "@olis/ui/components/global/forms/customer-form";
import { LoadingState } from "@olis/ui/components/global/loading-state";

export function ProjectCustomersView() {
  const projectId = useCurrentProjectId();
  const { data: customers, isLoading } = useGetProjectCustomers(projectId);

  if (isLoading) {
    return (
      <LoadingState 
        title="Loading customers..." 
        description="This might take a few seconds"
      />
    );
  }

  if (!customers) {
    return <div className="w-full h-full flex items-center justify-center">Customers not found!</div>;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="h-full flex flex-col gap-6">
        <ProjectFlowSection>
          <ProjectFlowSection.Header title="Customers" description="List of project customers" /> 
          <ProjectFlowSection.Content>
            <UpdateCustomerForm customer={customers?.[0]?.customer} />
          </ProjectFlowSection.Content>
        </ProjectFlowSection>
      </div>
    </div>
  );
}
