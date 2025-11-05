import { create } from "zustand";

import type { Addon, Scope } from "@olis/db/schema/platform";

interface ProjectScopesTotals {
  cost: number;
  price: number;
  tax: number;
  priceBase: number;
}

interface Pricing extends ProjectScopesTotals {
  variables: Record<string, any>;
}

interface ProjectScopesState {
  selectedScopes: (Scope & {
    pricing: Pricing;
  })[];
  selectedAddons: Addon[];
}

interface ProjectScopesActions {
  addScopes: (scopes: Scope | Scope[]) => void;
  removeScopes: (scope?: Scope) => void;
  updateScopePricing: (scopeId: number, pricing: Pricing | null) => void;
  addAddons: (addon: Addon | Addon[]) => void;
  removeAddons: (addon?: Addon) => void;
}

export type ProjectScopesStore = ProjectScopesState & ProjectScopesActions;

export const useProjectScopesStore = create<ProjectScopesStore>()(set => ({
  selectedScopes: [],
  selectedAddons: [],
  totals: { cost: 0, price: 0, tax: 0, priceBase: 0 },
  addScopes: (scopes: Scope | Scope[]) => set((state) => {
    const mapPricing = (scope: Scope) => ({
      ...scope,
      pricing: {
        variables: {},
        cost: 0,
        price: 0,
        tax: 0,
        priceBase: 0,
      },
    });
    const newScopes = [...(Array.isArray(scopes) ? scopes.map(mapPricing) : [mapPricing(scopes)])];
    return { selectedScopes: [...state.selectedScopes, ...newScopes] };
  }),
  removeScopes: (scope?: Scope) => set(state => ({ selectedScopes: !scope ? [] : state.selectedScopes.filter(selectedScope => selectedScope.id !== scope.id) })),
  updateScopePricing: (scopeId: number, pricing: Pricing | null) => set((state) => {
    const updatedScopes = state.selectedScopes.map((selectedScope) => {
      if (selectedScope.id === scopeId) {
        return {
          ...selectedScope,
          pricing: pricing || { variables: {}, cost: 0, price: 0, tax: 0, priceBase: 0 },
        };
      }
      return selectedScope;
    });
    const cost = updatedScopes.reduce((total, scope) => total + scope.pricing.cost, 0);
    const price = updatedScopes.reduce((total, scope) => total + scope.pricing.price, 0);
    const tax = updatedScopes.reduce((total, scope) => total + scope.pricing.tax, 0);
    const priceBase = price - tax;

    return {
      selectedScopes: updatedScopes,
      totals: { cost, price, tax, priceBase },
    };
  }),
  addAddons: (addon: Addon | Addon[]) => set(state => ({ selectedAddons: [...state.selectedAddons, ...(Array.isArray(addon) ? addon : [addon])] })),
  removeAddons: (addon?: Addon) => set(state => ({ selectedAddons: !addon ? [] : state.selectedAddons.filter(selectedAddon => selectedAddon.id !== addon.id) })),
}));
