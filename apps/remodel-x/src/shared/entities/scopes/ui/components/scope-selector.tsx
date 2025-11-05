import { useGetTradeScopes } from "@olis/data-client/fetchers/platform/trades/queries/get-trade-scopes";
import { MinusIcon, PlusIcon } from "lucide-react";

import type { Scope } from "@olis/db/schema/platform";

import { useProjectScopesStore } from "@/features/project-creator/hooks/use-project-scopes-store";
import { useScopeInfoDialogStore } from "@/shared/entities/scopes/hooks/use-scope-info-dialog-store";
import { Button } from "@olis/ui/components/button";
import { Card } from "@olis/ui/components/card";
import { EmptyState } from "@olis/ui/components/global/empty-state";

interface Props {
  currentTradeId?: number | null;
}

export function ScopeSelector({ currentTradeId }: Props) {
  const { open: showInfoModal } = useScopeInfoDialogStore();
  const { addScopes, removeScopes, selectedScopes } = useProjectScopesStore();
  const scopes = useGetTradeScopes(currentTradeId!, { enabled: !!currentTradeId });

  if (!scopes.data || scopes.data.length === 0) {
    return (
      <EmptyState
        title="No trade selected"
        className="w-full max-w-full"
      />
    );
  }

  function addScope(e: React.MouseEvent, scope: Scope) {
    e.stopPropagation();
    if (selectedScopes.find(selectedScope => selectedScope.id === scope.id)) {
      removeScopes(scope);
    }
    else {
      addScopes(scope);
    }
  }
  
  function showInfo(e: React.MouseEvent, scope: Scope) {
    e.stopPropagation();
    showInfoModal(scope);
  }

  return (
    <div className="w-full gap-4 h-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-[minmax(250px,1fr)]">
      {scopes.data.map(scope => (
        <Card
          key={scope.id}
          data-selected={!!selectedScopes.find(selectedScope => selectedScope.id === scope.id)}
          className="h-full group cursor-pointer hover:shadow-lg brightness-50 hover:brightness-90 transition-all duration-300 border-0 bg-card rounded-lg overflow-hidden p-0 data-[selected=true]:border-primary data-[selected=true]:border-2 data-[selected=true]:brightness-100"
          onClick={e => showInfo(e, scope)}
        >
          <div className="relative h-full overflow-hidden">
            <img
              src={scope.imageUrl || undefined}
              alt={scope.label}
              className="object-cover group-hover:scale-105 transition-transform duration-500 h-full w-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute top-3 left-3 text-foreground z-10">
              <h3 className="text-lg font-semibold group-hover:text-primary-foreground transition-colors">
                {scope.label}
              </h3>
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-transparent" />
            <div className="absolute top-12 left-3">
              <a href={`https://www.google.com/search?q=${scope.label.replace(/[^a-z0-9 ]/gi, "").replace(" ", "+")}+replacement+cost+california`} target="_blank" rel="noopener noreferrer" className="absolute w-full min-w-max text-foreground text-semibold bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md text-sm hover:bg-background/70 transition" onClick={e => e.stopPropagation()}>Compare on Google</a>
            </div>
            <div className="absolute top-3 right-3">
              <Button variant="ghost" onClick={e => addScope(e, scope)}>
                {selectedScopes.find(selectedScope => selectedScope.id === scope.id) 
                  ? <MinusIcon className="size-6" />
                  : <PlusIcon className="size-6" />}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
