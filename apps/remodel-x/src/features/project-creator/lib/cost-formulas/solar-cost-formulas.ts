import type {
  ProjectVars,
} from "@/features/project-creator/cost-calculation-types";
import type { PricingVariablesOfTrade } from "@olis/db/types";

import {
  defineCostFormulas,
} from "@/features/project-creator/cost-calculation-types";

const { build, defineFormula } = defineCostFormulas("solar");

export default function createCostFormulas(
  prices: PricingVariablesOfTrade<"solar">,
  _projectVars: ProjectVars,
) {
  return build({
    installPanels: defineFormula(
      ({ numPanels, wattsPerPanel }) => {
        return numPanels * wattsPerPanel * prices.dollarPerWatt;
      },
    ),
    rnrPanels: defineFormula(({ numPanels = 0 }) => {
      return numPanels * prices.dollarPerPanelRnr;
    }),
    installBattery: defineFormula(
      ({ numBatteries = 0, kWhPerBattery = 5 }) => {
        const pricePerBattery
          = kWhPerBattery === 5 ? prices.battery5kWh : prices.battery10kWh;
        return numBatteries * pricePerBattery;
      },
    ),
  });
}
