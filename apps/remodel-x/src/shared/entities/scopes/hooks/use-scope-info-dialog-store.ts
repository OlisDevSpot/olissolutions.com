import { create } from "zustand";

import type { Scope } from "@olis/db/schema/platform";

interface ScopeInfoDialogState {
  scope: Scope | null;
  isOpen: boolean;
}

interface ScopeInfoDialogActions {
  open: (scope: Scope) => void;
  close: () => void;
}

export type ScopeInfoDialogStore = ScopeInfoDialogState & ScopeInfoDialogActions;

export const useScopeInfoDialogStore = create<ScopeInfoDialogStore>(set => ({
  scope: null,
  isOpen: false,
  open: (scope: Scope) => set({ isOpen: true, scope }),
  close: () => set({ isOpen: false, scope: null }),
}));
