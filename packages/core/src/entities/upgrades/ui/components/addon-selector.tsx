import { useProjectSolutionsStore } from "@/features/project-creator/hooks/use-project-solutions-store";
import { EmptyState } from "@/shared/components/empty-state";
import { LoadingState } from "@/shared/components/loading-state";
import { Card } from "@/shared/components/ui/card";
import { useGetUpgradeAddons } from "@/shared/entities/upgrades/data/queries/get-upgrade-addons";
import { cn } from "@/shared/lib/utils";

interface Props {
  currentUpgradeId: number | null;
}

export function AddonSelector({ currentUpgradeId }: Props) {
  const { selectedAddons } = useProjectSolutionsStore();
  const addonsOfUpgrade = useGetUpgradeAddons(currentUpgradeId!, { enabled: currentUpgradeId !== null });

  if (addonsOfUpgrade.isLoading) {
    return (
      <LoadingState
        title="Loading addons..."
        description="This might take a few seconds"
      />
    );
  }

  const addons = addonsOfUpgrade.data?.addons || [];

  if (!addonsOfUpgrade.data || addons.length === 0) {
    return (
      <EmptyState 
        title="No addons" 
        className="max-w-full"
      />
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {addons.map(addon => (
        <Card
          data-selected={selectedAddons.some(selectedAddon => selectedAddon.id === addon.id)}
          key={addon.id}
          className={cn(
            "group cursor-pointer hover:shadow-lg hover:brightness-75 transition-all duration-300 bg-card rounded-lg overflow-hidden p-0 h-52 brightness-50 data-[selected=true]:border-primary data-[selected=true]:border-2 data-[selected=true]:brightness-100",
            false && "brightness-100 hover:brightness-100",
          )}
          onClick={() => {}}
        >
          <div className="relative overflow-hidden h-full w-full">
            <img
              src={addon.imageUrl || undefined}
              alt={addon.label}
              className="object-cover group-hover:scale-105 transition-transform duration-500 h-full w-full"
            />
            <div className="absolute top-3 left-3 text-foreground z-10">
              <h3 className="text-lg font-semibold group-hover:text-primary-foreground transition-colors">
                {addon.label}
              </h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
          </div>
        </Card>
      ))}
    </div>
  );
}
