import type {
  ProjectVars,
} from "@/features/project-creator/cost-calculation-types";
import type { PricingVariablesOfTrade } from "@olis/db/types";

import {
  defineCostFormulas,
} from "@/features/project-creator/cost-calculation-types";

const { build, defineFormula } = defineCostFormulas("windows");

export default function createCostFormulas(
  prices: PricingVariablesOfTrade<"windows">,
  _projectVars: ProjectVars,
) {
  return build({
    replaceWindows: defineFormula(
      ({ numLargeWindows = 0, numSmallWindows = 0 }) => {
        return (
          numSmallWindows * prices.windowSmall
          + numLargeWindows * prices.windowLarge
        );
      },
    ),
    replaceSlidingDoor: defineFormula(
      ({ numStandardSliders = 0, numSpecialSliders = 0 }) => {
        const costStandardSliders
          = numStandardSliders * prices.slidingDoorStandard;
        const costSpecialSliders
          = numSpecialSliders * prices.slidingDoorSpecial;
        return costStandardSliders + costSpecialSliders;
      },
    ),
  });
}
