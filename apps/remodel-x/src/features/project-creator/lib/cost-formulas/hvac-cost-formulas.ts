/* eslint-disable no-console */
import type {
  ProjectVars,
} from "@/features/project-creator/cost-calculation-types";
import type { PricingVariablesOfTrade } from "@olis/db/types";

import {
  defineCostFormulas,
} from "@/features/project-creator/cost-calculation-types";

const { build, defineFormula } = defineCostFormulas("hvac");

export default function createCostFormulas(
  prices: PricingVariablesOfTrade<"hvac">,
  _projectVars: ProjectVars,
) {
  return build({
    replaceSplitSystem: defineFormula(({ systemTonnage = 3 }) => {
      const cost = prices.threeTonRnr + (systemTonnage - 3) * 800;
      return cost;
    }),
    replaceFurnace: defineFormula(({ systemTonnage = 3 }) => {
      const cost = prices.furnace36kBTURnr + (systemTonnage - 3) * 800;
      return cost;
    }),
    replacePackageUnit: defineFormula(({ systemTonnage = 3 }) => {
      console.log(systemTonnage);
      return 0;
    }),
    replaceAC: defineFormula(({ systemTonnage = 3 }) => {
      console.log(systemTonnage);
      return 0;
    }),
    installMiniSplit: defineFormula(
      ({ numMiniSplits = 1 }) => {
        const cost = prices.miniSplits * numMiniSplits;
        return cost;
      },
    ),
  });
}
