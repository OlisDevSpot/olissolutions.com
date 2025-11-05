import type { PricingVars, ProjectVars } from "@/features/project-creator/cost-calculation-types";

import createDryscapingCostFormulas from "./dryscaping-cost-formulas";
import createElectricalsCostFormulas from "./electricals-cost-formulas";
import createExteriorPaintCostFormulas from "./exterior-paint-cost-formulas";
import createHvacCostFormulas from "./hvac-cost-formulas";
import createInsulationCostFormulas from "./insulation-cost-formulas";
import createInteriorPaintCostFormulas from "./interior-paint-cost-formulas";
import createRoofCostFormulas from "./roof-cost-formulas";
import createSolarCostFormulas from "./solar-cost-formulas";
import createWindowsCostFormulas from "./window-cost-formulas";

export function createProjectCostFormulas(pricingVariables: PricingVars, projectVars: ProjectVars) {
  return {
    ...createSolarCostFormulas(pricingVariables.solar, projectVars),
    ...createRoofCostFormulas(pricingVariables.roof, projectVars),
    ...createHvacCostFormulas(pricingVariables.hvac, projectVars),
    ...createWindowsCostFormulas(pricingVariables.windows, projectVars),
    ...createInsulationCostFormulas(pricingVariables.atticBasement, projectVars),
    ...createDryscapingCostFormulas(pricingVariables.dryscapingHardscaping, projectVars),
    ...createElectricalsCostFormulas(pricingVariables.electricals, projectVars),
    ...createExteriorPaintCostFormulas(pricingVariables.exteriorPaintSiding, projectVars),
    ...createInteriorPaintCostFormulas(pricingVariables.interiorPaint, projectVars),
  };
}
