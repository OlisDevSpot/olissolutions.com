import { getQueryClient } from "@olis/data-client/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { TradesShowroomView } from "@/features/showroom/ui/views/trades-showroom-view";
import { trpc } from "@/trpc/server";

export default function TradesShowroomPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.platform.trades.findAll.queryOptions());
  
  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <TradesShowroomView />
      </Suspense>
    </HydrationBoundary>
  );
}
