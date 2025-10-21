import type { BenefitCategoryAccessor, BenefitsOfCategory } from "@/shared/entities/benefits/types";
import type { SolutionAccessorOfUpgrade } from "@/shared/entities/solutions/types";
import type { UpgradeAccessor } from "@/shared/entities/upgrades/types";

type SolutionBenefitsData = { 
  [U in UpgradeAccessor]?: {
    [S in SolutionAccessorOfUpgrade<U>]?: {
      [K in BenefitCategoryAccessor]?: BenefitsOfCategory<K>[]
    }
  }
}

export const solutionBenefitsData = {
  solar: {
    installPanels: {
      increaseValue: ["functionality", "increasePropertyValue"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible", "taxCredits"],      
      reduceBills: ["electricBill"]
    },
    installBattery: {
      increaseValue: ["functionality", "increasePropertyValue"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible", "taxCredits"],      
      reduceBills: ["electricBill"]
    },
  },
  roof: {
    overlay: {
      increaseComfort: ["noiseReduction"],
      increaseValue: ["fireResistance", "homeAppeal", "increasePropertyValue"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["hvacLife", "leakMoldPrevention"]
    },
    tearOff: {
      increaseComfort: ["noiseReduction"],
      increaseValue: ["fireResistance", "homeAppeal", "increasePropertyValue"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["hvacLife", "leakMoldPrevention"]
    },
    redeck: {
      increaseComfort: ["noiseReduction"],
      increaseValue: ["fireResistance", "homeAppeal", "increasePropertyValue"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["hvacLife", "leakMoldPrevention"]
    },
    tileReset: {
      increaseValue: ["homeAppeal", "increasePropertyValue"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["reduceMaintenance"],
      reduceHeadache: ["hvacLife", "leakMoldPrevention"]
    }
  },
  windows: {
    replaceWindows: {
      increaseComfort: ["noiseReduction"],
      increaseValue: ["fireResistance", "functionality", "homeAppeal", "homeSecurity", "increasePropertyValue"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["hvacLife"]
    },
    replaceSlidingDoor: {
      increaseComfort: ["noiseReduction"],
      increaseValue: ["fireResistance", "functionality", "homeAppeal", "homeSecurity", "increasePropertyValue"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["hvacLife"]
    }
  },
  hvac: {
    replaceAC: {
      increaseComfort: ["airQuality"],
      increaseValue: ["increasePropertyValue", "functionality"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["leakMoldPrevention", "hvacLife"]
    },
    replaceFurnace: {
      increaseComfort: ["airQuality"],
      increaseValue: ["increasePropertyValue", "functionality"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["leakMoldPrevention", "hvacLife"]
    },
    replacePackageUnit: {
      increaseComfort: ["airQuality"],
      increaseValue: ["increasePropertyValue", "functionality"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["leakMoldPrevention", "hvacLife"]
    },
    replaceSplitSystem: {
      increaseComfort: ["airQuality"],
      increaseValue: ["increasePropertyValue", "functionality"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["leakMoldPrevention", "hvacLife"]
    },
    installMiniSplit: {
      increaseComfort: ["airQuality"],
      increaseValue: ["increasePropertyValue", "functionality"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["gasBill", "electricBill", "reduceMaintenance"],
      reduceHeadache: ["leakMoldPrevention", "hvacLife"]
    }
  },
  atticBasement: {
    rnrAttic: {
      increaseComfort: ["airQuality"],
      increaseValue: ["increasePropertyValue", "fireResistance"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible", "taxCredits"],
      reduceBills: ["gasBill", "electricBill"],
      reduceHeadache: ["leakMoldPrevention", "hvacLife"]
    },
    installCrawlSpaceInsulation: {
      increaseComfort: ["airQuality"],
      increaseValue: ["increasePropertyValue", "fireResistance"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible", "taxCredits"],
      reduceBills: ["gasBill", "electricBill"],
      reduceHeadache: ["leakMoldPrevention", "hvacLife"]
    },
    topOffAttic: {
      increaseComfort: ["airQuality"],
      increaseValue: ["increasePropertyValue", "fireResistance"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible", "taxCredits"],
      reduceBills: ["gasBill", "electricBill"],
      reduceHeadache: ["leakMoldPrevention", "hvacLife"]
    }
  },
  dryscapingHardscaping: {
    installArtificial: {
      increaseValue: ["homeAppeal", "increasePropertyValue"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["waterBill", "gardeningBill", "reduceMaintenance"],
    },
    installConcrete: {
      increaseValue: ["homeAppeal", "increasePropertyValue", "fireResistance"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["waterBill", "gardeningBill", "reduceMaintenance"],
    },
    installPavers: {
      increaseValue: ["homeAppeal", "increasePropertyValue", "fireResistance"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["waterBill", "gardeningBill", "reduceMaintenance"],
    },
    installGravel: {
      increaseValue: ["homeAppeal", "increasePropertyValue", "fireResistance"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["waterBill", "gardeningBill", "reduceMaintenance"],
    },
    installMulch: {
      increaseValue: ["homeAppeal", "increasePropertyValue", "fireResistance"],
      receiveIncentives: ["assistancePrograms", "financing", "rebates", "taxDeductible"],
      reduceBills: ["waterBill", "gardeningBill", "reduceMaintenance"],
    }
  },
} as const satisfies SolutionBenefitsData
