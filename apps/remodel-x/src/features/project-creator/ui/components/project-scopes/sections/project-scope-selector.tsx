import { useState } from "react";

import { ScopeSelector } from "@/shared/entities/scopes/ui/components/scope-selector";
import { AddonSelector } from "@/shared/entities/trades/ui/components/addon-selector";
import { TradeSelector } from "@/shared/entities/trades/ui/components/trade-selector";

export function ProjectScopeSelector() {
  const [currentTradeId, setCurrentTradeId] = useState<number | null>(null);
  
  return (
    <div className="w-full h-full grid grid-cols-[200px_1fr_200px] gap-8">
      <div className="w-full h-full overflow-y-auto">
        <TradeSelector currentTradeId={currentTradeId} setCurrentTradeId={setCurrentTradeId} />
      </div>
      <div className="w-full h-full overflow-y-auto main-container">
        <ScopeSelector currentTradeId={currentTradeId} />
      </div>
      <div className="w-full h-full overflow-y-auto">
        <AddonSelector currentTradeId={currentTradeId} />
      </div>
    </div>
  )
}
