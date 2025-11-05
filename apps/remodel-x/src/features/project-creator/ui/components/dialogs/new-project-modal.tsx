"use client";

import { useCreateDialogStore } from "@/features/project-creator/hooks/dialogs/use-create-dialog-store";
import { InitProjectForm } from "@/features/project-creator/ui/components/forms/init-project-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@olis/ui/components/dialog";

export function NewProjectModal() {
  const { isOpen, close } = useCreateDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="sm:max-w-[425px] space-y-2"
        onInteractOutside={(event) => {
        // Prevent closing when clicking Google Places dropdown
          if (
            event.target instanceof HTMLElement
            && event.target.closest(".pac-container")
          ) {
            event.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Add a new project to the portal
          </DialogDescription>
        </DialogHeader>
        <InitProjectForm />
      </DialogContent>
    </Dialog>
  );
}
