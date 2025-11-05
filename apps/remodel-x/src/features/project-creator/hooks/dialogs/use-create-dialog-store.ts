import { create } from "zustand";

interface CreateDialogState {
  isOpen: boolean;
}

interface CreateDialogActions {
  open: () => void;
  close: () => void;
}

export type CreateDialogStore = CreateDialogState & CreateDialogActions;

export const useCreateDialogStore = create<CreateDialogStore>(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
