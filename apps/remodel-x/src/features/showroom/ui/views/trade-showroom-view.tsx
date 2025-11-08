"use client";

import { useGetTradeScopes } from "@olis/data-client/fetchers/platform/trades/queries/get-trade-scopes";
import { useGetTrades } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { ArrowLeft, Building, TrendingUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { ShowroomItemHero, ShowroomItemHeroStatCard, ShowroomItemHeroSubItems } from "@/features/showroom/ui/components/showroom-item-hero";
import { ROOTS } from "@olis/core/constants";
import { Button } from "@olis/ui/components/button";
import { LoadingState } from "@olis/ui/components/global/loading-state";

export function TradeShowroomView() {
  const pathname = usePathname();
  const router = useRouter();
  const tradeAccessor = pathname.split("/").pop();

  const { data: trades } = useGetTrades();

  const currentTrade = trades?.find(trade => trade.accessor === tradeAccessor);
  const { data: tradeScopes, isLoading } = useGetTradeScopes(currentTrade?.id || -1, { enabled: !!currentTrade });

  if (isLoading || !currentTrade) {
    return (
      <LoadingState
        title="Loading trade details..."
        description="This might take a few seconds"
      />
    );
  }

  if (!tradeScopes) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Building className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Trade not found</h1>
        <p className="text-muted-foreground">The trade you're looking for doesn't exist</p>
        <Button onClick={() => router.push(`${ROOTS.remodelX.getShowroomRoot()}/trades`)} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Trades
        </Button>
      </div>
    );
  }

  return (
    <ShowroomItemHero
      type="trade"
      item={currentTrade}
    >
      <ShowroomItemHero.Content badge="New badge">
        <div className="flex flex-col gap-8 justify-between h-full">
          <ShowroomItemHero.Stats>
            <ShowroomItemHeroStatCard Icon={TrendingUp} title="ROI" value="10%" description="Return on investment is a lot!" />
          </ShowroomItemHero.Stats>
          <ShowroomItemHeroSubItems subItems={tradeScopes} />
        </div>
      </ShowroomItemHero.Content>
    </ShowroomItemHero>
  );
}
