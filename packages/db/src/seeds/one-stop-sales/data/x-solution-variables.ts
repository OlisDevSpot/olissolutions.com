import type { SolutionAccessorOfTrade } from '@olis/db/types/solutions'
import type { TradeAccessor } from '@olis/db/types/trades'
import type { VariablesKeys } from '@olis/db/types/variables'

interface XSolutionVariablesSingle<Trade extends TradeAccessor> {
  solutionAccessor: SolutionAccessorOfTrade<Trade>
  variableKey: VariablesKeys<Trade>
}

export const xSolutionVariablesData = {
  solar: [
    {
      solutionAccessor: 'installPanels',
      variableKey: 'numPanels',
    },
    {
      solutionAccessor: 'installPanels',
      variableKey: 'wattsPerPanel',
    },
    {
      solutionAccessor: 'installPanels',
      variableKey: 'inverterType',
    },
    {
      solutionAccessor: 'installBattery',
      variableKey: 'numBatteries',
    },
    {
      solutionAccessor: 'rnrPanels',
      variableKey: 'numPanels',
    },
  ],
  roof: [
    {
      solutionAccessor: 'overlay',
      variableKey: 'numPitchedBSQ',
    },
    {
      solutionAccessor: 'overlay',
      variableKey: 'numFlatBSQ',
    },
    {
      solutionAccessor: 'tearOff',
      variableKey: 'numPitchedBSQ',
    },
    {
      solutionAccessor: 'tearOff',
      variableKey: 'numFlatBSQ',
    },
    {
      solutionAccessor: 'tearOff',
      variableKey: 'numLayers',
    },
    {
      solutionAccessor: 'tearOff',
      variableKey: 'desiredRoofType',
    },
    {
      solutionAccessor: 'tearOff',
      variableKey: 'percentFreeDeckReplacement',
    },
    {
      solutionAccessor: 'redeck',
      variableKey: 'numFlatBSQ',
    },
    {
      solutionAccessor: 'redeck',
      variableKey: 'numPitchedBSQ',
    },
    {
      solutionAccessor: 'redeck',
      variableKey: 'numLayers',
    },
    {
      solutionAccessor: 'tileReset',
      variableKey: 'numPitchedBSQ',
    },
  ],
  hvac: [
    {
      solutionAccessor: 'replaceSplitSystem',
      variableKey: 'systemTonnage',
    },
    {
      solutionAccessor: 'replaceFurnace',
      variableKey: 'systemTonnage',
    },
    {
      solutionAccessor: 'replaceAC',
      variableKey: 'systemTonnage',
    },
    {
      solutionAccessor: 'installMiniSplit',
      variableKey: 'systemTonnage',
    },
    {
      solutionAccessor: 'installMiniSplit',
      variableKey: 'numMiniSplits',
    },
  ],
  windows: [
    {
      solutionAccessor: 'replaceWindows',
      variableKey: 'numSmallWindows',
    },
    {
      solutionAccessor: 'replaceWindows',
      variableKey: 'numLargeWindows',
    },
    {
      solutionAccessor: 'replaceSlidingDoor',
      variableKey: 'numStandardSliders',
    },
    {
      solutionAccessor: 'replaceSlidingDoor',
      variableKey: 'numSpecialSliders',
    },
  ],
  atticBasement: [
    {
      solutionAccessor: 'rnrAttic',
      variableKey: 'sqft',
    },
    {
      solutionAccessor: 'topOffAttic',
      variableKey: 'sqft',
    },
    {
      solutionAccessor: 'installCrawlSpaceInsulation',
      variableKey: 'sqft',
    },
  ],
  exteriorPaintSiding: [
    {
      solutionAccessor: 'installExteriorPaint',
      variableKey: 'paintType',
    },
    {
      solutionAccessor: 'installExteriorPaint',
      variableKey: 'homeSqFt',
    },
    {
      solutionAccessor: 'installExteriorPaint',
      variableKey: 'garageSqFt',
    },
  ],
  dryscapingHardscaping: [
    {
      solutionAccessor: 'installArtificial',
      variableKey: 'installSqFt',
    },
    {
      solutionAccessor: 'installConcrete',
      variableKey: 'installSqFt',
    },
    {
      solutionAccessor: 'installGravel',
      variableKey: 'installSqFt',
    },
    {
      solutionAccessor: 'installMulch',
      variableKey: 'installSqFt',
    },
    {
      solutionAccessor: 'installPavers',
      variableKey: 'installSqFt',
    },
  ],
  electricals: [
    {
      solutionAccessor: 'mpu',
      variableKey: 'relocationRequired',
    },
  ],
} as const satisfies Partial<{ [Key in TradeAccessor]: XSolutionVariablesSingle<Key>[] }>
