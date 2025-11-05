// Example usage patterns for the enhanced ShowroomCard component
// This file demonstrates the new presenter-focused features

import type { ShowroomItem } from "@/features/showroom/types";

import { 
  ShowroomCard, 
  TradeShowroomCard, 
  MaterialShowroomCard, 
  PresentationShowroomCard 
} from "./showroom-item-card";

// Sample data for demonstration
const sampleTrade: ShowroomItem = {
  label: "HVAC System Upgrade",
  accessor: "hvac-upgrade",
  description: "Complete heating, ventilation, and air conditioning system replacement",
  imageUrl: "/images/hvac-system.jpg"
};

const sampleMaterial: ShowroomItem = {
  label: "Premium Insulation",
  accessor: "premium-insulation", 
  description: "High-efficiency spray foam insulation for maximum energy savings",
  imageUrl: "/images/insulation.jpg"
};

export function ShowroomCardExamples() {
  return (
    <div className="space-y-8 p-6">
      
      {/* Standard Grid View - Current Usage */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Standard Grid View (Current)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ShowroomCard
            item={sampleTrade}
            onClick={() => console.log("Navigate to trade details")}
            showHeader
          />
          <ShowroomCard
            item={sampleMaterial}
            onClick={() => console.log("Navigate to material details")}
            showHeader
          />
        </div>
      </section>

      {/* Enhanced Presenter Mode */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Enhanced Presenter Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TradeShowroomCard
            item={sampleTrade}
            onClick={() => console.log("Navigate to trade details")}
            variant="presentation"
            estimatedPrice="$15,000"
            roiPercentage="25"
            showQuickActions
            onFavoriteToggle={() => console.log("Toggle favorite")}
            onQuickView={() => console.log("Quick view modal")}
            status="recommended"
          />
          
          <MaterialShowroomCard
            item={sampleMaterial}
            onClick={() => console.log("Navigate to material details")}
            variant="presentation"
            estimatedPrice="$3,500"
            showQuickActions
            onFavoriteToggle={() => console.log("Toggle favorite")}
            onQuickView={() => console.log("Quick view modal")}
            status="popular"
          />
        </div>
      </section>

      {/* Compact View for Mobile */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Compact View (Mobile/Sidebar)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ShowroomCard
            item={sampleTrade}
            onClick={() => console.log("Navigate to trade details")}
            variant="compact"
            type="trade"
          />
          <ShowroomCard
            item={sampleMaterial}
            onClick={() => console.log("Navigate to material details")}
            variant="compact"
            type="material"
          />
        </div>
      </section>

      {/* Full Presentation Mode */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Full Presentation Mode (Sales Meetings)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PresentationShowroomCard
            item={sampleTrade}
            onClick={() => console.log("Navigate to trade details")}
            type="trade"
            estimatedPrice="$15,000"
            roiPercentage="25"
            onFavoriteToggle={() => console.log("Toggle favorite")}
            onQuickView={() => console.log("Quick view modal")}
            status="recommended"
          />
          
          <PresentationShowroomCard
            item={sampleMaterial}
            onClick={() => console.log("Navigate to material details")}
            type="material"
            estimatedPrice="$3,500"
            onFavoriteToggle={() => console.log("Toggle favorite")}
            onQuickView={() => console.log("Quick view modal")}
            status="available"
          />
        </div>
      </section>

    </div>
  );
}

// Usage in showroom grids with enhanced features
export function EnhancedShowroomGrid() {
  const trades = [sampleTrade]; // This would come from your data fetching

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trades.map(trade => (
        <TradeShowroomCard
          key={trade.accessor}
          item={trade}
          onClick={() => console.log(`Navigate to ${trade.accessor}`)}
          estimatedPrice="$15,000"
          roiPercentage="25"
          showQuickActions
          onFavoriteToggle={() => console.log(`Toggle favorite: ${trade.accessor}`)}
          onQuickView={() => console.log(`Quick view: ${trade.accessor}`)}
          status="recommended"
        />
      ))}
    </div>
  );
}