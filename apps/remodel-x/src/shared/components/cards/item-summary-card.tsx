import { ArrowRight, Award, CheckCircle, Clock, DollarSign, Eye, Heart, Star, TrendingUp, Zap } from "lucide-react";
import { createContext, useContext } from "react";

import type { ShowroomItem } from "@/features/showroom/types";

import { Badge } from "@olis/ui/components/badge";
import { Button } from "@olis/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader } from "@olis/ui/components/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@olis/ui/components/tooltip";
import { cn } from "@olis/ui/lib/utils";

interface ItemCardProps<T extends ShowroomItem> extends React.ComponentProps<typeof Card> {
  item: T;
  onClick: () => void;
  children?: React.ReactNode;
  variant?: "default" | "compact" | "presentation";
  showQuickActions?: boolean;
  estimatedPrice?: string;
  roiPercentage?: string;
  isFavorited?: boolean;
  onFavoriteToggle?: () => void;
  onQuickView?: () => void;
  presentationMode?: boolean;
}

interface ItemCardContextType {
  item: ShowroomItem;
  variant?: "default" | "compact" | "presentation";
  estimatedPrice?: string;
  roiPercentage?: string;
  showQuickActions?: boolean;
  isFavorited?: boolean;
  onFavoriteToggle?: () => void;
  onQuickView?: () => void;
  presentationMode?: boolean;
}

const itemCardContext = createContext<ItemCardContextType | null>(null);

export function useItemCardContext() {
  const context = useContext(itemCardContext);
  if (!context) {
    throw new Error("useItemCardContext must be used within a ItemCardProvider");
  }
  return context;
}

export function ItemCardProvider({ children, item, ...contextProps }: { 
  children: React.ReactNode; 
  item: ShowroomItem;
} & Omit<ItemCardContextType, "item">) {
  return (
    <itemCardContext.Provider value={{ item, ...contextProps }}>
      {children}
    </itemCardContext.Provider>
  );
}

export function ItemCard<T extends ShowroomItem>({
  item,
  onClick,
  children,
  className,
  variant = "default",
  showQuickActions = false,
  estimatedPrice,
  roiPercentage,
  isFavorited = false,
  onFavoriteToggle,
  onQuickView,
  presentationMode = false,
  ...props
}: ItemCardProps<T>) {
  const cardVariants = {
    default: "group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-card rounded-lg overflow-hidden p-0",
    compact: "group cursor-pointer hover:shadow-md transition-all duration-200 border border-border bg-card rounded-md overflow-hidden p-0 h-32",
    presentation: "group cursor-pointer hover:shadow-xl transition-all duration-500 border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 rounded-xl overflow-hidden p-0 backdrop-blur-sm"
  };

  return (
    <ItemCardProvider 
      item={item} 
      variant={variant}
      estimatedPrice={estimatedPrice}
      roiPercentage={roiPercentage}
      showQuickActions={showQuickActions}
      isFavorited={isFavorited}
      onFavoriteToggle={onFavoriteToggle}
      onQuickView={onQuickView}
      presentationMode={presentationMode}
    >
      <Card
        className={cn(cardVariants[variant], presentationMode && "ring-2 ring-primary/10", className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </Card>
    </ItemCardProvider>
  );
}

export function ItemImage({ 
  showStars, 
  badges = [], 
  compareGoogle,
  showPricing = false,
  showROI = false
}: { 
  showStars?: boolean; 
  badges?: string[]; 
  compareGoogle?: boolean;
  showPricing?: boolean;
  showROI?: boolean;
}) {
  const { item, variant, estimatedPrice, roiPercentage, showQuickActions, presentationMode } = useItemCardContext();

  const imageHeight = variant === "compact" ? "h-32" : variant === "presentation" ? "h-56" : "h-48";

  return (
    <div className={cn("relative overflow-hidden", imageHeight)}>
      <img
        src={item.imageUrl || undefined}
        alt={item.label}
        className="object-cover group-hover:scale-105 transition-transform duration-500 h-full w-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      
      {/* Top overlay elements */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
        <div className="flex flex-col gap-2">
          {compareGoogle && <CompareGoogle />}
          {(showPricing && estimatedPrice) && <ItemPricing />}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {showStars && <ItemStars />}
          {(showROI && roiPercentage) && <ItemROI />}
          {showQuickActions && <ItemQuickActions />}
          {badges.length > 0 && (
            <div className="flex items-center gap-2">
              {badges.map(badge => (
                <Badge key={badge} className="capitalize bg-black/30 backdrop-blur-sm text-white border-white/20">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom title */}
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <h3 className={cn(
          "font-semibold group-hover:text-primary-foreground transition-colors line-clamp-2",
          variant === "compact" ? "text-sm" : variant === "presentation" ? "text-xl" : "text-lg"
        )}
        >
          {item.label}
        </h3>
        {presentationMode && (
          <p className="text-xs text-white/80 mt-1 line-clamp-1">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export function ItemStars() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full hover:bg-black/40 transition-colors">
            {Array.from({ length: 5 }).map((_star, index) => (
              <Star key={index} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-white text-xs ml-1 font-medium">5.0</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Industry leading performance rating</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function CompareGoogle() {
  const { item } = useItemCardContext();

  return (
    <div className="absolute top-3 left-3">
      <a href={`https://www.google.com/search?q=${item.label.replace("&", "and").replace(/[^a-z0-9 ]/gi, "").replace(" ", "+")}+replacement+cost+california`} target="_blank" rel="noopener noreferrer" className="absolute w-full min-w-max text-foreground text-semibold bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md text-sm hover:bg-background/70 transition" onClick={e => e.stopPropagation()}>Compare on Google</a>
    </div>
  );
}

export function ItemHeader() {
  const { item } = useItemCardContext();

  return (
    <CardHeader className="pb-3">
      <CardDescription className="text-sm line-clamp-2 group-hover:text-foreground/80 transition-colors">
        {item.description}
      </CardDescription>
    </CardHeader>
  );
}

export function ItemContent({ children }: { children: React.ReactNode }) {
  return (
    <CardContent className="pt-0">
      {children}
    </CardContent>
  );
}

export function ExploreMore() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-primary/70 group-hover:text-primary transition-colors">
        <span className="text-sm font-medium">Explore</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

// New subcomponents for enhanced presenter UX
export function ItemPricing() {
  const { estimatedPrice } = useItemCardContext();
  
  if (!estimatedPrice) 
    return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 bg-green-600/90 backdrop-blur-sm px-2 py-1 rounded-full hover:bg-green-600 transition-colors">
            <DollarSign className="w-3 h-3 text-white" />
            <span className="text-white text-xs font-medium">{estimatedPrice}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Estimated project cost</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ItemROI() {
  const { roiPercentage } = useItemCardContext();
  
  if (!roiPercentage) 
    return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 bg-blue-600/90 backdrop-blur-sm px-2 py-1 rounded-full hover:bg-blue-600 transition-colors">
            <TrendingUp className="w-3 h-3 text-white" />
            <span className="text-white text-xs font-medium">
              {roiPercentage}
              %
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Estimated return on investment</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ItemQuickActions() {
  const { isFavorited, onFavoriteToggle, onQuickView } = useItemCardContext();
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.();
  };
  
  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.();
  };
  
  return (
    <div className="flex items-center gap-1">
      {onFavoriteToggle && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 bg-black/30 backdrop-blur-sm hover:bg-black/40 border-white/20"
                onClick={handleFavoriteClick}
              >
                <Heart className={cn("w-3 h-3", isFavorited ? "fill-red-500 text-red-500" : "text-white")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorited ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {onQuickView && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 bg-black/30 backdrop-blur-sm hover:bg-black/40 border-white/20"
                onClick={handleQuickViewClick}
              >
                <Eye className="w-3 h-3 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Quick preview</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export function ItemFooter() {
  const { estimatedPrice, roiPercentage, variant, presentationMode } = useItemCardContext();
  
  if (variant === "compact" || !presentationMode) 
    return null;
  
  return (
    <CardContent className="pt-2 pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {estimatedPrice && (
            <div className="flex items-center gap-1 text-green-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">{estimatedPrice}</span>
            </div>
          )}
          {roiPercentage && (
            <div className="flex items-center gap-1 text-blue-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                {roiPercentage}
                % ROI
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-primary/70 group-hover:text-primary transition-colors">
          <Award className="h-4 w-4" />
          <span className="text-xs font-medium">Presenter Recommended</span>
        </div>
      </div>
    </CardContent>
  );
}

export function ItemStatusIndicator({ status }: { status: "available" | "popular" | "recommended" | "new" | "limited" }) {
  const statusConfig = {
    available: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Available" },
    popular: { icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10", label: "Popular Choice" },
    recommended: { icon: Award, color: "text-blue-500", bg: "bg-blue-500/10", label: "Recommended" },
    new: { icon: Star, color: "text-purple-500", bg: "bg-purple-500/10", label: "New" },
    limited: { icon: Clock, color: "text-red-500", bg: "bg-red-500/10", label: "Limited Availability" }
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", config.bg, config.color)}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
}

ItemCard.displayName = "ItemCard";
ItemCard.Image = ItemImage;
ItemCard.Stars = ItemStars;
ItemCard.CompareGoogle = CompareGoogle;
ItemCard.Header = ItemHeader;
ItemCard.Content = ItemContent;
ItemCard.ExploreMore = ExploreMore;
ItemCard.Pricing = ItemPricing;
ItemCard.ROI = ItemROI;
ItemCard.QuickActions = ItemQuickActions;
ItemCard.Footer = ItemFooter;
ItemCard.StatusIndicator = ItemStatusIndicator;
