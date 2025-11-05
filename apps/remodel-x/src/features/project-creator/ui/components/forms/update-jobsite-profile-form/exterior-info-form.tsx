import { useGetTrades } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import type { Trade } from "@olis/db/schema/platform";

import { Button } from "@olis/ui/components/button";

import { tradeFieldsForms } from "./constants";

export function ExteriorInfoForm() {
  const { data: trades, isLoading } = useGetTrades();
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  useEffect(() => {
    if (trades && !isLoading) {
      setSelectedTrade(trades[0] || null);
    }
  }, [trades]);

  const isActive = (id: number) => {
    if (!selectedTrade) {
      return false;
    }
    return selectedTrade.id === id;
  };

  const TradeForm = tradeFieldsForms.find(form => form.accessor === selectedTrade?.accessor)?.form || (() => <div>Loading...</div>);

  return (
    <div className="flex gap-8 ">
      <div className="min-w-max h-auto ">
        <div className="h-full flex flex-col gap-2 pr-6 border-r-2">
          {isLoading && !trades
            ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )
            : (
                <>
                  {trades?.filter(trade => trade.location === "exterior").map(trade => (
                    <Button
                      data-active={isActive(trade.id)}
                      onClick={() => setSelectedTrade(trade)}
                      key={trade.id}
                      variant={isActive(trade.id) ? "outline" : "ghost"}
                      className="justify-start data-[active=true]:text-accent"
                      type="button"
                    >
                      <p>{trade.label}</p>
                    </Button>
                  ))}
                </>
              )}
        </div>
      </div>
      <div className="space-y-8 w-full">
        <TradeForm />
      </div>
    </div>
  );
}
