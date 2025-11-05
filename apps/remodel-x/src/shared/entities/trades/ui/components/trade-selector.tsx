import { getTradeAddonsQueryOptions } from "@olis/data-client/fetchers/platform/trades/queries/get-trade-addons";
import { getTradeScopesQueryOptions } from "@olis/data-client/fetchers/platform/trades/queries/get-trade-scopes";
import { useGetTrades } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { useQueryClient } from "@tanstack/react-query";

import { useProjectScopesStore } from "@/features/project-creator/hooks/use-project-scopes-store";
import { Card } from "@olis/ui/components/card";
import { LoadingState } from "@olis/ui/components/global/loading-state";
import { cn } from "@olis/ui/lib/utils";

interface Props {
  currentTradeId: number | null;
  setCurrentTradeId: (tradeId: number | null) => void;
}

export function TradeSelector({ currentTradeId, setCurrentTradeId }: Props) {
  const queryClient = useQueryClient();
  const { selectedScopes } = useProjectScopesStore();
  const { data: trades, isLoading } = useGetTrades();

  if (!trades) {
    return "No trades found!";
  }

  if (isLoading) {
    return (
      <LoadingState
        title="Loading trades..."
        description="This might take a few seconds"
      />
    );
  }

  function prefetch(tradeId: number) {
    queryClient.prefetchQuery(getTradeScopesQueryOptions(tradeId));
    queryClient.prefetchQuery(getTradeAddonsQueryOptions(tradeId));
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {trades.map(trade => (
        <Card
          data-selected={selectedScopes.some(selectedScope => selectedScope.tradeId === trade.id)}
          key={trade.id}
          className={cn(
            "group cursor-pointer hover:shadow-lg hover:brightness-75 transition-all duration-300 bg-card rounded-lg overflow-hidden p-0 h-24 brightness-50 data-[selected=true]:border-primary data-[selected=true]:border-2 data-[selected=true]:brightness-100",
            currentTradeId === trade.id && "brightness-100 hover:brightness-100",
          )}
          onMouseEnter={() => prefetch(trade.id)}
          onClick={() => {
            if (currentTradeId === trade.id) {
              setCurrentTradeId(null);
            }
            else {
              setCurrentTradeId(trade.id);
            }
          }}
        >
          <div className="relative overflow-hidden h-full w-full">
            <img
              src={trade.imageUrl || undefined}
              alt={trade.label}
              className="object-cover group-hover:scale-105 transition-transform duration-500 h-full w-full"
            />
            <div className="absolute top-3 left-3 text-foreground z-10">
              <h3 className="text-lg font-semibold group-hover:text-primary-foreground transition-colors">
                {trade.label}
              </h3>
            </div>
            <div className="absolute inset-0 bg-lineear-to-b from-black/70 via-transparent to-transparent" />
          </div>
        </Card>
      ))}
    </div>
  );
}
