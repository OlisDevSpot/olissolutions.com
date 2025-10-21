import { useQueryClient } from "@tanstack/react-query";

import { useProjectSolutionsStore } from "@/features/project-creator/hooks/use-project-solutions-store";
import { LoadingState } from "@/shared/components/loading-state";
import { Card } from "@/shared/components/ui/card";
import { getUpgradeAddonsQueryOptions } from "@/shared/entities/upgrades/data/queries/get-upgrade-addons";
import { getUpgradeSolutionsQueryOptions } from "@/shared/entities/upgrades/data/queries/get-upgrade-solutions";
import { useGetUpgrades } from "@/shared/entities/upgrades/data/queries/get-upgrades";
import { cn } from "@/shared/lib/utils";

interface Props {
  currentUpgradeId: number | null;
  setCurrentUpgradeId: (upgradeId: number | null) => void;
}

export function UpgradeSelector({ currentUpgradeId, setCurrentUpgradeId }: Props) {
  const queryClient = useQueryClient();
  const { selectedSolutions } = useProjectSolutionsStore();
  const { data: upgrades, isLoading } = useGetUpgrades();

  if (!upgrades) {
    return "No upgrades found!";
  }

  if (isLoading) {
    return (
      <LoadingState
        title="Loading upgrades..."
        description="This might take a few seconds"
      />
    );
  }

  function prefetch(upgradeId: number) {
    queryClient.prefetchQuery(getUpgradeSolutionsQueryOptions(upgradeId));
    queryClient.prefetchQuery(getUpgradeAddonsQueryOptions(upgradeId));
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {upgrades.map(upgrade => (
        <Card
          data-selected={selectedSolutions.some(selectedSolution => selectedSolution.upgradeId === upgrade.id)}
          key={upgrade.id}
          className={cn(
            "group cursor-pointer hover:shadow-lg hover:brightness-75 transition-all duration-300 bg-card rounded-lg overflow-hidden p-0 h-24 brightness-50 data-[selected=true]:border-primary data-[selected=true]:border-2 data-[selected=true]:brightness-100",
            currentUpgradeId === upgrade.id && "brightness-100 hover:brightness-100",
          )}
          onMouseEnter={() => prefetch(upgrade.id)}
          onClick={() => {
            if (currentUpgradeId === upgrade.id) {
              setCurrentUpgradeId(null);
            }
            else {
              setCurrentUpgradeId(upgrade.id);
            }
          }}
        >
          <div className="relative overflow-hidden h-full w-full">
            <img
              src={upgrade.imageUrl || undefined}
              alt={upgrade.label}
              className="object-cover group-hover:scale-105 transition-transform duration-500 h-full w-full"
            />
            <div className="absolute top-3 left-3 text-foreground z-10">
              <h3 className="text-lg font-semibold group-hover:text-primary-foreground transition-colors">
                {upgrade.label}
              </h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
          </div>
        </Card>
      ))}
    </div>
  );
}
