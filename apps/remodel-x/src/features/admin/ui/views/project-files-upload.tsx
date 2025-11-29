"use client";

import { PlusIcon } from "lucide-react";

import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";
import { Button } from "@olis/ui/components/button";
import { PageHeaderSection } from "@olis/ui/components/global/page-header";

import { UploadProjectFilesForm } from "../components/forms/upload-project-files-form";

export function ProjectFilesUploadView() {
  return (
    <div className="h-full flex flex-col gap-4">
      <PageHeaderSection>
        <PageHeaderSection.Frame>
          <PageHeaderSection.Header title="Upload" description="Upload platform files">
            <PageHeaderSection.ActionButtons>
              <div className="ml-auto">
                <Button variant="outline" onClick={() => open()}><PlusIcon /></Button>
              </div>
            </PageHeaderSection.ActionButtons>
          </PageHeaderSection.Header>
        </PageHeaderSection.Frame>
      </PageHeaderSection>
      <ProjectFlowSection className="grow min-h-0 overflow-auto">
        <ProjectFlowSection.Header title="Platform Files" />
        <UploadProjectFilesForm />
      </ProjectFlowSection>
    </div>
  )
}
