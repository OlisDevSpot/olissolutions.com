import { useState } from "react";

import type { ShowroomItem, ShowroomItemType } from "@/features/showroom/types";

import { ItemCard } from "@/shared/components/cards/item-summary-card";

interface Props extends React.ComponentProps<typeof ItemCard>, React.ComponentProps<typeof ItemCard.Image> {
  item: ShowroomItem;
  onClick: () => void;
  showHeader?: boolean;
  type?: ShowroomItemType;
  presentationMode?: boolean;
  estimatedPrice?: string;
  roiPercentage?: string;
  showPricing?: boolean;
  showROI?: boolean;
  showQuickActions?: boolean;
  onFavoriteToggle?: () => void;
  onQuickView?: () => void;
  status?: "available" | "popular" | "recommended" | "new" | "limited";
  variant?: "default" | "compact" | "presentation";
}

export function ShowroomCard({ 
  item, 
  onClick, 
  showHeader, 
  showStars, 
  compareGoogle,
  type,
  presentationMode = false,
  estimatedPrice,
  roiPercentage,
  showPricing = false,
  showROI = false,
  showQuickActions = false,
  onFavoriteToggle,
  onQuickView,
  status,
  variant = "default",
  ...props 
}: Props) {
  const [isFavorited, setIsFavorited] = useState(false);
  
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    onFavoriteToggle?.();
  };
  
  // Auto-determine pricing and ROI display based on type
  const shouldShowPricing = showPricing || (type === "material" && !!estimatedPrice);
  const shouldShowROI = showROI || (type === "trade" && !!roiPercentage);
  
  // Auto-determine presentation features based on variant
  const enhancedShowQuickActions = showQuickActions || variant === "presentation";
  const enhancedShowStars = showStars || variant === "presentation";
  
  return (
    <ItemCard 
      item={item} 
      onClick={onClick}
      variant={variant}
      presentationMode={presentationMode}
      estimatedPrice={estimatedPrice}
      roiPercentage={roiPercentage}
      showQuickActions={enhancedShowQuickActions}
      isFavorited={isFavorited}
      onFavoriteToggle={handleFavoriteToggle}
      onQuickView={onQuickView}
      {...props}
    >
      <ItemCard.Image 
        showStars={enhancedShowStars} 
        compareGoogle={compareGoogle}
        showPricing={shouldShowPricing}
        showROI={shouldShowROI}
      />
      
      {showHeader && <ItemCard.Header />}
      
      {/* Enhanced content area for presentation mode */}
      {(presentationMode || variant === "presentation") && (
        <ItemCard.Content>
          <div className="space-y-2">
            {status && <ItemCard.StatusIndicator status={status} />}
            
            {type === "trade" && (
              <div className="text-xs text-muted-foreground">
                Complete home improvement solution
              </div>
            )}
            
            {type === "material" && (
              <div className="text-xs text-muted-foreground">
                Premium quality materials
              </div>
            )}
            
            {type === "scope" && (
              <div className="text-xs text-muted-foreground">
                Detailed work specification
              </div>
            )}
            
            {type === "addon" && (
              <div className="text-xs text-muted-foreground">
                Optional enhancement
              </div>
            )}
          </div>
        </ItemCard.Content>
      )}
      
      {/* Footer for presentation mode */}
      {(presentationMode || variant === "presentation") && <ItemCard.Footer />}
      
      {/* Default explore more for standard cards */}
      {variant === "default" && !presentationMode && <ItemCard.ExploreMore />}
    </ItemCard>
  );
}

// Convenience components for specific showroom contexts
export function TradeShowroomCard(props: Omit<Props, 'type'>) {
  return (
    <ShowroomCard 
      {...props} 
      type="trade"
      showROI={props.showROI ?? true}
      status={props.status ?? "recommended"}
    />
  );
}

export function MaterialShowroomCard(props: Omit<Props, 'type'>) {
  return (
    <ShowroomCard 
      {...props} 
      type="material"
      showPricing={props.showPricing ?? true}
      status={props.status ?? "available"}
    />
  );
}

export function ScopeShowroomCard(props: Omit<Props, 'type'>) {
  return (
    <ShowroomCard 
      {...props} 
      type="scope"
      status={props.status ?? "available"}
    />
  );
}

export function AddonShowroomCard(props: Omit<Props, 'type'>) {
  return (
    <ShowroomCard 
      {...props} 
      type="addon"
      status={props.status ?? "popular"}
    />
  );
}

// Presentation mode wrapper for sales presentations
export function PresentationShowroomCard(props: Props) {
  return (
    <ShowroomCard 
      {...props}
      variant="presentation"
      presentationMode={true}
      showQuickActions={true}
      showStars={true}
    />
  );
}
