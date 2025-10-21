"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useSolutionInfoDialogStore } from "@/shared/entities/solutions/hooks/use-solution-info-dialog-store";

import { SolutionOverview } from "../solution-overview";

export function SolutionInfoDialog() {
  const { isOpen, close, solution } = useSolutionInfoDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="sm:max-w-[850px] w-full max-h-[850px] h-full"
      >
        {solution && (
          <>
            <DialogHeader className="">
              <DialogTitle>{solution?.label}</DialogTitle>
              <DialogDescription>
                Solution information
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="overview" className="space-y-6 flex-grow min-h-0 overflow-y-auto">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="past-projects">Past Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <SolutionOverview solution={solution} />
              </TabsContent>

            </Tabs>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
}
