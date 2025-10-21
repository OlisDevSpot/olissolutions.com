import { Info } from "lucide-react";

import type { Solution } from "@/shared/schema";

import { useProjectSolutionsStore } from "@/features/project-creator/hooks/use-project-solutions-store";
import { EmptyState } from "@/shared/components/empty-state";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { useSolutionInfoDialogStore } from "@/shared/entities/solutions/hooks/use-solution-info-dialog-store";
import { useGetUpgradeSolutions } from "@/shared/entities/upgrades/data/queries/get-upgrade-solutions";

interface Props {
  currentUpgradeId?: number | null;
}

export function SolutionSelector({ currentUpgradeId }: Props) {
  const { open: showInfoModal } = useSolutionInfoDialogStore();
  const { addSolutions, removeSolutions, selectedSolutions } = useProjectSolutionsStore();
  const solutions = useGetUpgradeSolutions(currentUpgradeId!, { enabled: !!currentUpgradeId });

  if (!solutions.data || solutions.data.length === 0) {
    return (
      <EmptyState
        title="No upgrade selected"
        className="w-full max-w-full"
      />
    );
  }

  function showInfo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, solution: Solution) {
    e.stopPropagation();
    showInfoModal(solution);
  }

  return (
    <div className="w-full gap-4 h-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-[minmax(250px,1fr)]">
      {solutions.data.map(solution => (
        <Card
          key={solution.id}
          data-selected={!!selectedSolutions.find(selectedSolution => selectedSolution.id === solution.id)}
          className="h-full group cursor-pointer hover:shadow-lg brightness-50 hover:brightness-[90%] transition-all duration-300 border-0 bg-card rounded-lg overflow-hidden p-0 data-[selected=true]:border-primary data-[selected=true]:border-2 data-[selected=true]:brightness-100"
          onClick={() => {
            if (selectedSolutions.find(selectedSolution => selectedSolution.id === solution.id)) {
              removeSolutions(solution);
            }
            else {
              addSolutions(solution);
            }
          }}
        >
          <div className="relative h-full overflow-hidden">
            <img
              src={solution.imageUrl || undefined}
              alt={solution.label}
              className="object-cover group-hover:scale-105 transition-transform duration-500 h-full w-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute top-3 left-3 text-foreground z-10">
              <h3 className="text-lg font-semibold group-hover:text-primary-foreground transition-colors">
                {solution.label}
              </h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
            <div className="absolute top-12 left-3">
              <a href={`https://www.google.com/search?q=${solution.label.replace(/[^a-z0-9 ]/gi, "").replace(" ", "+")}+replacement+cost+california`} target="_blank" rel="noopener noreferrer" className="absolute w-full min-w-max text-foreground text-semibold bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md text-sm hover:bg-background/70 transition" onClick={e => e.stopPropagation()}>Compare on Google</a>
            </div>
            <div className="absolute top-3 right-3">
              <Button variant="ghost" onClick={e => showInfo(e, solution)}>
                <Info className="size-6" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
