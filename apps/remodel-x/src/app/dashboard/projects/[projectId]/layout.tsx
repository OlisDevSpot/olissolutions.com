"use client";

import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { PROJECT_STEPS } from "@/features/project-creator/lib/project-menu";
import { ScopeInfoDialog } from "@/shared/entities/scopes/ui/components/dialogs/scope-info-dialog";
import { ROOTS } from "@olis/core/constants";
import { SectionSidebar } from "@olis/ui/components/global/navigation/section-sidebar";
import { SectionTopbar } from "@olis/ui/components/global/navigation/section-topbar";
import { useIsMobile } from "@olis/ui/hooks/use-mobile";
import { cn } from "@olis/ui/lib/utils";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const projectId = useCurrentProjectId();

  return (
    <>
      <ScopeInfoDialog />
      <div className={cn("h-full w-full flex", isMobile ? "flex-col" : "flex-row")}>
        <div className="shrink-0">
          { isMobile 
            ? <SectionTopbar steps={PROJECT_STEPS} baseUrl={`${ROOTS.remodelX.getProjectsRoot()}/${projectId}`} />
            : <SectionSidebar menuItems={PROJECT_STEPS} baseUrl={`${ROOTS.remodelX.getProjectsRoot()}/${projectId}`} />}
        </div>
        <div className={cn("p-4 w-full", isMobile && "grow")}>
          {children}
        </div>
      </div>
    </>
  );
}
