import type {
  ProjectVars,
} from "@/features/project-creator/cost-calculation-types";
import type { PricingVariablesOfTrade } from "@olis/db/types";

import {
  defineCostFormulas,
} from "@/features/project-creator/cost-calculation-types";

const { build, defineFormula } = defineCostFormulas("exteriorPaintSiding");

export default function createCostFormulas(
  prices: PricingVariablesOfTrade<"exteriorPaintSiding">,
  _projectVars: ProjectVars,
) {
  return build({
    installExteriorPaint: defineFormula(({ paintType, garageSqFt, homeSqFt }) => {
      const totalSqFt = garageSqFt + homeSqFt;
      switch (paintType) {
        case "coolLife":
          return totalSqFt < 1500 ? prices.coolLifePaintSm : totalSqFt > 3000 ? prices.coolLifePaintLarge : prices.coolLifePaintAvg
        case "water":
          return totalSqFt < 1500 ? prices.waterPaintSm : totalSqFt > 3000 ? prices.waterPaintLarge : prices.waterPaintAvg
      }
    }),
    replaceSiding: defineFormula(() => {
      return 0;
    }),
  });
}
