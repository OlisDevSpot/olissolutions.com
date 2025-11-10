import { useState } from "react";

import type { ShowroomItem, ShowroomItemType } from "@/features/showroom/types";

import { ItemCard } from "@/shared/components/cards/item-summary-card";

interface Props extends React.ComponentProps<typeof ItemCard>, React.ComponentProps<typeof ItemCard.Image> {
  item: ShowroomItem;
  onClick: () => void;
  showHeader?: boolean;
  type?: ShowroomItemType;
  estimatedPrice?: string;
  roiPercentage?: string;
  showPricing?: boolean;
  showROI?: boolean;
  showQuickActions?: boolean;
  onFavoriteToggle?: () => void;
  onQuickView?: () => void;
  status?: "available" | "popular" | "recommended" | "new" | "limited";
  variant?: "default" | "compact";
}

export function ShowroomCard({ 
  item, 
  onClick, 
  showHeader = true, 
  showStars, 
  compareGoogle,
  type,
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
  const enhancedShowQuickActions = showQuickActions;
  const enhancedShowStars = showStars;
  
  return (
    <ItemCard 
      item={item} 
      onClick={onClick}
      variant={variant}
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
      <div className="">
        {showHeader && <ItemCard.Header />}
      </div>
    </ItemCard>
  );
}

// Convenience components for specific showroom contexts
export function TradeShowroomCard(props: Omit<Props, "type">) {
  return (
    <ShowroomCard 
      {...props} 
      type="trade"
      showROI={props.showROI ?? true}
      status={props.status ?? "recommended"}
    />
  );
}

export function MaterialShowroomCard(props: Omit<Props, "type">) {
  return (
    <ShowroomCard 
      {...props} 
      type="material"
      showPricing={props.showPricing ?? true}
      status={props.status ?? "available"}
    />
  );
}

export function ScopeShowroomCard(props: Omit<Props, "type">) {
  return (
    <ShowroomCard 
      {...props} 
      type="scope"
      status={props.status ?? "available"}
    />
  );
}

export function AddonShowroomCard(props: Omit<Props, "type">) {
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
      variant="default"
      showQuickActions={true}
      showStars={true}
    />
  );
}
