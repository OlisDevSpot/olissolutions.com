import { Package } from "lucide-react";

import type { Project } from "@olis/db/schema/remodel-x";

import { useGetProjectScopes } from "@/features/project-creator/data/queries/get-project-scopes";
import { Button } from "@olis/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@olis/ui/components/card";
import { LoadingState } from "@olis/ui/components/global/loading-state";
import { useSidebar } from "@olis/ui/components/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@olis/ui/components/tooltip";
import { cn } from "@olis/ui/lib/utils";

interface Props {
  project: Project;
}

const mockFinancialInfo = {
  total: 0,
  monthlyPayment: 0,
};

export function ProjectSummary({ project }: Props) {
  const scopes = useGetProjectScopes(project.id);
  const { open: sidebarOpen } = useSidebar();

  if (scopes.isLoading) {
    return (
      <LoadingState
        title="Loading project summary..." 
        description="This might take a few seconds"
      />
    )
  }

  if (!scopes.data) {
    return "Error";
  }

  const projectTrades = new Set<string>();

  for (const entry of scopes.data) {
    if (!entry.trade) {
      continue;
    }
    projectTrades.add(entry.trade.label);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Project Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm space-y-4">
          <div className={cn("w-full flex items-center gap-4", sidebarOpen && "flex-col w-full")}>
            <Tooltip>
              <TooltipTrigger asChild disabled={!scopes.data.length} className="flex-1 w-full">
                <Button variant="outline">
                  Trades
                  {" "}
                  (
                  {projectTrades.size}
                  )
                </Button>
              </TooltipTrigger>
              <TooltipContent side={sidebarOpen ? "right" : "top"} className="bg-popover text-popover-foreground 1px-3">
                <div className="flex flex-col gap-1">
                  {[...projectTrades].map(trade => (
                    <span key={trade} className="flex items-center gap-1 text-sm">
                      •
                      {" "}
                      <p>{trade}</p>
                    </span>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild disabled={!scopes.data.length} className="flex-1 w-full">
                <Button variant="outline">
                  Scopes
                  {" "}
                  (
                  {scopes.data.length}
                  )
                </Button>
              </TooltipTrigger>
              <TooltipContent side={sidebarOpen ? "right" : "top"} className="bg-popover text-popover-foreground 1px-3">
                <div className="flex flex-col gap-1">
                  {scopes.data.map(entry => (
                    <span key={entry.scope?.id} className="flex items-center gap-1 text-sm">
                      •
                      {" "}
                      <p key={entry.scope?.id}>{entry.scope?.label}</p>
                    </span>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Value:</span>
            <span className="font-medium">
              $
              {mockFinancialInfo.total?.toLocaleString() ?? "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Est. Monthly:</span>
            <span className="font-medium">
              $
              {mockFinancialInfo.monthlyPayment ?? 0}
              /mo
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
