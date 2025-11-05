import type {
  ProjectVars,
} from "@/features/project-creator/cost-calculation-types";
import type { PricingVariablesOfTrade } from "@olis/db/types";

import {
  defineCostFormulas,
} from "@/features/project-creator/cost-calculation-types";

const { build, defineFormula } = defineCostFormulas("roof");

export default function createCostFormulas(
  prices: PricingVariablesOfTrade<"roof">,
  projectVars: ProjectVars,
) {
  return build({
    overlay: defineFormula(
      ({ numFlatBSQ = 0, numPitchedBSQ = 0 }) => {
        const flatCost = numFlatBSQ * prices.BSQOverlayFlat;
        const pitchedCost = numPitchedBSQ * prices.BSQOverlayPitched;
        const totalBSQ = numFlatBSQ + numPitchedBSQ;
        const costAdditionalStories
          = (projectVars.numStories - 1)
            * prices.dollarPerAdditionalStory
            * totalBSQ;

        return flatCost + pitchedCost + costAdditionalStories;
      },
    ),
    tearOff: defineFormula(
      ({ numFlatBSQ = 0, numPitchedBSQ = 0, numLayers = 1 }) => {
        const totalBSQ = numFlatBSQ + numPitchedBSQ;
        const pitchedCost
          = (projectVars.roofType === "shingle"
            ? prices.BSQTearOffShingles
            : prices.BSQTearOffTile) * numPitchedBSQ;
        const flatCost = numFlatBSQ * prices.BSQTearOffFlat;
        const costAdditionalLayers
          = (numLayers - 1) * prices.dollarPerAdditionalLayer * numPitchedBSQ;
        const costAdditionalStories
          = (projectVars.numStories - 1)
            * prices.dollarPerAdditionalStory
            * totalBSQ;

        const totalCost = pitchedCost + flatCost + costAdditionalLayers + costAdditionalStories;
        return totalCost;
      },
    ),
    redeck: defineFormula(
      ({ numFlatBSQ = 0, numPitchedBSQ = 0, numLayers = 1 }) => {
        const totalBSQ = numFlatBSQ + numPitchedBSQ;
        const baseCost
          = numFlatBSQ * prices.BSQRedeckFlat
            + numPitchedBSQ * prices.BSQRedeckPitched;
        const costAdditionalLayers
          = (numLayers - 1) * prices.dollarPerAdditionalLayer * numPitchedBSQ;
        const costAdditionalStories
          = (projectVars.numStories - 1)
            * prices.dollarPerAdditionalStory
            * totalBSQ;
        return baseCost + costAdditionalLayers + costAdditionalStories;
      },
    ),
    tileReset: defineFormula(({ numPitchedBSQ = 0 }) => {
      const additionalStoriesPricing
        = (projectVars.numStories - 1) * prices.dollarPerAdditionalStory;
      const baseCost
        = numPitchedBSQ * (prices.BSQTileReset + additionalStoriesPricing);
      return baseCost;
    }),
  });
}
