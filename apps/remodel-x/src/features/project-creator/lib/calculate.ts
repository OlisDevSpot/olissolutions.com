import type { ScopeAccessor } from "@olis/db/types";

import type { PricingVars, ProjectVars } from "../cost-calculation-types";

import { createProjectCostFormulas } from "./cost-formulas";

export function calculateScopeCost(pricingVars: PricingVars, projectVars: ProjectVars, scopeAccessor: ScopeAccessor, inputs: any) {
  const costFormula = createProjectCostFormulas(pricingVars, projectVars)[scopeAccessor];
  // TODO: Handle type
  const cost = costFormula(inputs as any);
  const price = Math.round(cost * 2.8);
  const tax = Math.round(price * 0.075);

  return {
    cost,
    price,
    tax,
    priceBase: price - tax,
  };
}
