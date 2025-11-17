"use client";

import { useModalStore } from "@/features/project-creator/hooks/dialogs/use-modal-store";
import { InitProjectForm } from "@/features/project-creator/ui/components/forms/init-project-form";
import { Modal } from "@olis/ui/components/dialogs/modal";

export function NewProjectModal() {
  const { isOpen, close } = useModalStore();

  return (
    <Modal close={close} isOpen={isOpen} title="Create new project" description="Add a new project to the portal">
      <InitProjectForm onSettled={() => close()} />
    </Modal>
  );
}
