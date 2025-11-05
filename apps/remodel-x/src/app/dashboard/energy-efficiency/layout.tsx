"use client";

import { ENERGY_EFFICIENCY_MENU_ITEMS } from "@/features/education/lib/constants";
import { PROJECT_STEPS } from "@/features/project-creator/lib/project-menu";
import { SectionSidebar } from "@olis/ui/components/global/navigation/section-sidebar";
import { SectionTopbar } from "@olis/ui/components/global/navigation/section-topbar";
import { useIsMobile } from "@olis/ui/hooks/use-mobile";
import { cn } from "@olis/ui/lib/utils";

export default function EnergyEfficiencyLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className={cn("h-full w-full flex overflow-auto", isMobile ? "flex-col" : "flex-row")}>
      <div className="shrink-0">
        { isMobile 
          ? <SectionTopbar steps={PROJECT_STEPS} />
          : <SectionSidebar menuItems={ENERGY_EFFICIENCY_MENU_ITEMS} />}
      </div>
      <div className={cn("p-4 grow overflow-auto main-container")}>
        {children}
      </div>
    </div>
  );
}
