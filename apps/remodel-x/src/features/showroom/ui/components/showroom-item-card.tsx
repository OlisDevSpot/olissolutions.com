import type { ShowroomItem } from "@/features/showroom/types";

import { ItemCard } from "@/shared/components/cards/item-summary-card";

interface Props extends Omit<React.ComponentProps<typeof ItemCard>, "children">, React.ComponentProps<typeof ItemCard.Image> {
  type: ShowroomItem["type"];
  item: Omit<ShowroomItem, "type">;
  onClick: () => void;
  showHeader?: boolean;
  roiPercentage?: string;
  showROI?: boolean;
  showQuickActions?: boolean;
  onQuickView?: () => void;
  status?: "available" | "popular" | "recommended" | "new" | "limited";
  variant?: "default" | "compact";
  children?: React.ReactNode;
}

export function ShowroomCard({ 
  item, 
  onClick, 
  showHeader = true, 
  showStars, 
  compareGoogle,
  type,
  roiPercentage,
  showPricing = false,
  showROI = false,
  showQuickActions = false,
  onQuickView,
  status,
  variant = "default",
  ...props 
}: Props) {
  // Auto-determine pricing and ROI display based on type
  const shouldShowPricing = showPricing || (type === "material");
  const shouldShowROI = showROI || (type === "trade" && !!roiPercentage);
  
  // Auto-determine presentation features based on variant
  const enhancedShowQuickActions = showQuickActions;
  const enhancedShowStars = showStars;
  
  return (
    <ItemCard 
      type={type}
      item={item} 
      onClick={onClick}
      variant={variant}
      showQuickActions={enhancedShowQuickActions}
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
