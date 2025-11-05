import type {
  ProjectVars,
} from "@/features/project-creator/cost-calculation-types";
import type { PricingVariablesOfTrade } from "@olis/db/types";

import {
  defineCostFormulas,
} from "@/features/project-creator/cost-calculation-types";

const { build, defineFormula } = defineCostFormulas("electricals");

export default function createCostFormulas(
  _prices: PricingVariablesOfTrade<"electricals">,
  _projectVars: ProjectVars,
) {
  return build({
    mpu: defineFormula(
      ({ relocationRequired = false }) => {
        return relocationRequired ? 4000 : 3200;
      },
    ),
    rewire: defineFormula(() => {
      return 0;
    }),
  });
}
