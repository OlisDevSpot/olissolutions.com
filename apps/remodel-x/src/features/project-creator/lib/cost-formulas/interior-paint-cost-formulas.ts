import type {
  ProjectVars,
} from "@/features/project-creator/cost-calculation-types";
import type { PricingVariablesOfTrade } from "@olis/db/types";

import {
  defineCostFormulas,
} from "@/features/project-creator/cost-calculation-types";

const { build, defineFormula } = defineCostFormulas("interiorPaint");

export default function createCostFormulas(
  _prices: PricingVariablesOfTrade<"interiorPaint">,
  _projectVars: ProjectVars,
) { 
  return build({
    partialInteriorPaint: defineFormula(() => {
      return 0;
    }),
    fullInteriorPaint: defineFormula(() => {
      return 0;
    }),
  });
}
