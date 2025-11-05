import type {
  ProjectVars,
} from "@/features/project-creator/cost-calculation-types";
import type { PricingVariablesOfTrade } from "@olis/db/types";

import {
  defineCostFormulas,
} from "@/features/project-creator/cost-calculation-types";

const { build, defineFormula } = defineCostFormulas("dryscapingHardscaping");

export default function createCostFormulas(
  prices: PricingVariablesOfTrade<"dryscapingHardscaping">,
  _projectVars: ProjectVars,
) {
  return build({
    installArtificial: defineFormula(({ installSqFt }) => {
      return installSqFt * prices.dollarPerSqFtArtificial;
    }),
    installGravel: defineFormula(({ installSqFt }) => {
      return installSqFt * prices.dollarPerSqFtGravel;
    }),
    installMulch: defineFormula(({ installSqFt }) => {
      return installSqFt * prices.dollarPerSqFtMulch;
    }),
    installConcrete: defineFormula(({ installSqFt }) => {
      return installSqFt * prices.dollarPerSqFtConcrete;
    }),
    installPavers: defineFormula(({ installSqFt }) => {
      return installSqFt * prices.dollarPerSqFtPavers;
    }),
  });
}
