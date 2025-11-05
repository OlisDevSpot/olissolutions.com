"use client";

import { useScopeInfoDialogStore } from "@/shared/entities/scopes/hooks/use-scope-info-dialog-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@olis/ui/components/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@olis/ui/components/tabs";

import { ScopeOverview } from "../scope-overview";

export function ScopeInfoDialog() {
  const { isOpen, close, scope } = useScopeInfoDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="sm:max-w-[850px] w-full max-h-[850px] h-full flex flex-col gap-4"
      >
        {scope && (
          <div className="flex flex-col gap-8 h-full">
            <DialogHeader className="max-h-fit">
              <DialogTitle>{scope?.label}</DialogTitle>
              <DialogDescription>
                Scope information
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="overview" className="space-y-6 grow min-h-0 overflow-y-auto">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="past-projects">Past Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <ScopeOverview scope={scope} />
              </TabsContent>

            </Tabs>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
