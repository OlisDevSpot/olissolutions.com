import { create } from "zustand";

import type { Solution } from "@workspace/db";

interface SolutionInfoDialogState {
  solution: Solution | null;
  isOpen: boolean;
}

interface SolutionInfoDialogActions {
  open: (solution: Solution) => void;
  close: () => void;
}

export type SolutionInfoDialogStore = SolutionInfoDialogState & SolutionInfoDialogActions;

export const useSolutionInfoDialogStore = create<SolutionInfoDialogStore>(set => ({
  solution: null,
  isOpen: false,
  open: (solution: Solution) => set({ isOpen: true, solution }),
  close: () => set({ isOpen: false, solution: null }),
}));
