import type { PricingVars, ProjectVars } from "../cost-calculation-types";

import { createProjectCostFormulas } from "./cost-formulas";

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const TTL_MS = 1000 * 60 * 10; // 10 minutes

export const costFormulasCache = new Map<string, CacheEntry<ReturnType<typeof createProjectCostFormulas>>>();

export function getProjectFormulas(projectId: string, pricingVars: PricingVars, projectVars: ProjectVars) {
  const now = Date.now();

  const existingFormulas = costFormulasCache.get(projectId);
  if (existingFormulas && existingFormulas.expiresAt > now) {
    // Cache hit
    return existingFormulas.value;
  }

  // Cache miss! creating new formulas
  const newFormulas = createProjectCostFormulas(pricingVars, projectVars);
  costFormulasCache.set(projectId, {
    value: newFormulas,
    expiresAt: now + TTL_MS,
  });
  return newFormulas;
}

export function clearProjectFormulas(projectId: string) {
  costFormulasCache.delete(projectId);
}

setInterval(() => {
  const now = Date.now();
  costFormulasCache.forEach((entry, projectId) => {
    if (entry.expiresAt < now) {
      costFormulasCache.delete(projectId);
    }
  });
}, TTL_MS);
