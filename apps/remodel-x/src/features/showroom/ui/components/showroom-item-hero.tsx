import type { LucideIcon } from "lucide-react";

import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import type { ShowroomItem, ShowroomItemType } from "@/features/showroom/types";

import { ROOTS } from "@olis/core/constants";
import { Badge } from "@olis/ui/components/badge";
import { Button } from "@olis/ui/components/button";
import { cn } from "@olis/ui/lib/utils";

interface ShowroomItemHeroProps extends React.ComponentProps<"div"> {
  item: ShowroomItem;
  type: ShowroomItemType;
}

const showroomItemHeroContext = createContext<ShowroomItemHeroProps | null>(null);

function useShowroomItemHeroContext() {
  const context = useContext(showroomItemHeroContext);
  if (!context) {
    throw new Error("useShowroomHeroContext must be used within a ShowroomHeroProvider");
  }
  return context;
}

function ShowroomItemHeroProvider({ children, item, type }: ShowroomItemHeroProps & { children: React.ReactNode }) {
  return <showroomItemHeroContext.Provider value={{ item, type }}>{children}</showroomItemHeroContext.Provider>;
}

export function ShowroomItemHero({ item, className, children, type, ...props }: ShowroomItemHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleHeight, setVisibleHeight] = useState(0);

  useEffect(() => {
    if (!containerRef.current)
      return;

    function updateHeight() {
      const rect = containerRef.current?.closest(".main-container")?.getBoundingClientRect();
      if (!rect) {
        setVisibleHeight(0);
        return;
      }
      setVisibleHeight(rect.bottom - rect.top - 4);
    }

    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <ShowroomItemHeroProvider item={item} type={type}>
      <div ref={containerRef} className={cn("relative overflow-hidden rounded-3xl bg-linear-to-br from-card via-card/50 to-muted/30 border", className)} {...props}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative p-8 lg:p-12 grid lg:grid-cols-12 gap-8" style={{ height: `${visibleHeight}px` }}>
          <div
            style={{
              maskImage: `linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0,0,0,0.3), rgba(0,0,0,1)`,
              backgroundImage: `
                url(${item.imageUrl})`,
            }}
            className="absolute top-0 right-0 w-3/4 h-full bg-cover bg-center"
          />
          <div className="grow min-h-0 w-full lg:col-span-7 ">
            {children}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 z-10">
            <Button variant="outline" size="lg" className="px-8 py-6 text-base font-medium border-2 hover:bg-muted/50 transition-all">
              View Gallery
            </Button>
          </div>
        </div>
      </div>
    </ShowroomItemHeroProvider>
  );
}

interface ShowroomItemHeroContentProps extends React.ComponentProps<"div"> {
  badge?: string;
}

export function ShowroomItemHeroContent({ badge, children, className, ...props }: ShowroomItemHeroContentProps) {
  return (
    <div className={cn("relative z-10 flex flex-col gap-8 justify-between h-full ", className)} {...props}>
      <ShowroomItemHeroHeader badge={badge} />
      <div className="grow min-h-0 space-y-8 overflow-y-auto rounded-xl">
        {children}
      </div>
    </div>
  )
}

interface ShowroomItemHeroHeaderProps {
  badge?: string;
}

function ShowroomItemHeroHeader({ badge }: ShowroomItemHeroHeaderProps) {
  const { item, type } = useShowroomItemHeroContext();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button className="rounded-full" variant="outline" asChild>
          <Link href={`${ROOTS.remodelX.getShowroomRoot()}/${type}s`} scroll={false}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        {badge && (
          <Badge
            variant="secondary"
            className="px-3 py-1 text-sm font-medium rounded-full"
          >
            {badge}
          </Badge>
        )}

        <div className="flex items-center gap-1 px-3 py-1 bg-muted/50 rounded-full">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-medium ml-1">5.0</span>
        </div>
      </div>

      <div>

        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          <span className="bg-linear-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent text-[clamp(1.5rem,2vw+1rem,3rem)]">
            {item.label}
          </span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl text-[clamp(1rem,1vw+0.5rem,1.5rem)]">
          {item.description}
        </p>
      </div>
    </div>
  )
}

function ShowroomItemHeroStats({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="hidden sm:grid grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

interface ShowroomItemHeroStatCardProps {
  Icon: LucideIcon;
  title: string;
  value: string;
  description: string;
}

export function ShowroomItemHeroStatCard({ Icon, title, value, description }: ShowroomItemHeroStatCardProps) {
  return (
    <div className="bg-linear-to-br from-card to-card/50 rounded-2xl p-6 border shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-xl">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

interface ShowroomItemHeroSubItemsProps<T extends ShowroomItemType> {
  subItems: ShowroomItem<T>[];
  onClick?: (item: ShowroomItem<T>) => void;
}

export function ShowroomItemHeroSubItems<T extends ShowroomItemType>({ subItems, onClick }: ShowroomItemHeroSubItemsProps<T>) {
  return (
    <div className="flex flex-col gap-4">
      {subItems && subItems.length > 0 && (
        <div className={cn(`relative rounded-lg w-full x-scrollable`)}>
          <div className="w-full inline-flex gap-4 overflow-x-scroll bottom-scrollbar">
            {subItems.map(subItem => (
              <div
                key={subItem.label}
                onClick={() => onClick?.(subItem)}
                style={{ 
                  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${subItem.imageUrl})`
                }} 
                className={cn("flex flex-col gap-2items-center justify-center border-b px-4 py-2 shrink-0 h-40 border rounded-lg w-[400px]", onClick ? "cursor-pointer" : "")}
              >
                <p className="font-medium">{subItem.label}</p>
                <p className="text-muted-foreground">{subItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

ShowroomItemHero.displayName = "ShowroomItemHero";
ShowroomItemHero.Content = ShowroomItemHeroContent;
ShowroomItemHero.Header = ShowroomItemHeroHeader;
ShowroomItemHero.Stats = ShowroomItemHeroStats;
