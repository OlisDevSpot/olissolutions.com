"use client";

import { useModalStore } from "@/features/project-creator/hooks/dialogs/use-modal-store";
import { useBaseModalStore } from "@olis/ui/hooks/use-base-modal-store";

export function DashboardModals() {
  const { modal: baseModal } = useBaseModalStore();
  const { modal } = useModalStore();

  return (
    <>
      {baseModal?.Element}
      {modal?.Element}
    </>
  )
}
