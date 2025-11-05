import { ROOTS } from "@olis/core/constants";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

import type { ShowroomItem, ShowroomItemType } from "@/features/showroom/types";

import { Badge } from "@olis/ui/components/badge";
import { useSidebar } from "@olis/ui/components/sidebar";
import { Skeleton } from "@olis/ui/components/skeleton";
import { cn } from "@olis/ui/lib/utils";

import { ShowroomCard } from "./showroom-item-card";

interface Props<T extends ShowroomItemType> extends Omit<React.ComponentProps<typeof ShowroomCard>, "item" | "onClick"> {
  type: T;
  items: ShowroomItem[];
  title?: string;
  isLoading?: boolean;
  className?: string;
}

export function ShowroomGrid<T extends ShowroomItemType>({ type, items, title, isLoading = false, className, ...showroomCardProps }: Props<T>) {
  const router = useRouter();
  const { open: sidebarOpen } = useSidebar();
  
  return (
    <section className="space-y-4">
      {isLoading
        ? <ShowroomLoading />
        : (
            <>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">
                  {title || `All ${type.charAt(0).toUpperCase() + type.slice(1)}s`}
                </h2>
                <Badge variant="secondary" className="ml-2">
                  {items.length}
                  {" "}
                  {items.length === 1 ? type : `${type}s`}
                </Badge>
              </div>
              <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", sidebarOpen && "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4", className)}>
                {items.map(item => (
                  <ShowroomCard
                    {...showroomCardProps}
                    key={item.accessor}
                    item={item}
                    onClick={() => router.push(`${ROOTS.saleos.getShowroomRoot()}/${type}s/${item.accessor}`)}
                    showHeader
                  />
                ))}
              </div>
            </>
          )}
    </section>
  )
}

export function ShowroomLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-80" />
      </div>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4")}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-48" />
        ))}
      </div>
    </div>
  )
}

export function EmptyShowroomGrid<T extends ShowroomItemType>({ type }: { type: T }) {
  return (
    <div className="text-center py-12 grow min-h-0 flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-2">
        No
        {" "}
        {`${type}s`}
        {" "}
        found
      </h3>
      <p className="text-muted-foreground">Try adjusting your search terms</p>
    </div>
  )
}
