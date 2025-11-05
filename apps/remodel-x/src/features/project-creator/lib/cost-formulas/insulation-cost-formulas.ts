import type {
  ProjectVars,
} from "@/features/project-creator/cost-calculation-types";
import type { PricingVariablesOfTrade } from "@olis/db/types";

import {
  defineCostFormulas,
} from "@/features/project-creator/cost-calculation-types";

const { build, defineFormula } = defineCostFormulas("atticBasement");

export default function createCostFormulas(
  prices: PricingVariablesOfTrade<"atticBasement">,
  _projectVars: ProjectVars,
) {
  return build({
    rnrAttic: defineFormula(({ sqft }) => {
      return sqft * prices.dollarPerSqFtRnr;
    }),
    topOffAttic: defineFormula(({ sqft }) => {
      return sqft * prices.dollarPerSqFtTopOff;
    }),
    installCrawlSpaceInsulation: defineFormula(({ sqft }) => {
      return sqft * prices.dollarPerSqFtCrawlSpace;
    }),
  });
}
