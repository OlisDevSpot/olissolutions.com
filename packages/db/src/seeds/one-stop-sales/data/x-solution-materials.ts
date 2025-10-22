import type { MaterialAccessor } from '@olis/db/types/materials'
import type { SolutionAccessor } from '@olis/db/types/solutions'

export interface XSolutionMaterial {
  solutionAccessor: SolutionAccessor
  materialAccessor: MaterialAccessor
  isMostPopular?: boolean
}

export const xSolutionMaterialsData: XSolutionMaterial[] = [
  {
    solutionAccessor: 'rnrAttic',
    materialAccessor: 'fiberglassBatts',
  },
  {
    solutionAccessor: 'rnrAttic',
    materialAccessor: 'fiberglassBlown',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'rnrAttic',
    materialAccessor: 'cellulose',
  },
  {
    solutionAccessor: 'topOffAttic',
    materialAccessor: 'cellulose',
  },
  {
    solutionAccessor: 'topOffAttic',
    materialAccessor: 'fiberglassBlown',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'installCrawlSpaceInsulation',
    materialAccessor: 'fiberglassBatts',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'tearOff',
    materialAccessor: 'coolShingles',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'tearOff',
    materialAccessor: 'metalRoof',
  },
  {
    solutionAccessor: 'tearOff',
    materialAccessor: 'clayTile',
  },
  {
    solutionAccessor: 'tearOff',
    materialAccessor: 'torchDown',
  },
  {
    solutionAccessor: 'redeck',
    materialAccessor: 'coolShingles',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'redeck',
    materialAccessor: 'metalRoof',
  },
  {
    solutionAccessor: 'redeck',
    materialAccessor: 'clayTile',
  },
  {
    solutionAccessor: 'redeck',
    materialAccessor: 'torchDown',
  },
  {
    solutionAccessor: 'installArtificial',
    materialAccessor: 'artificialTurf',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'installMulch',
    materialAccessor: 'redMulch',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'installMulch',
    materialAccessor: 'blackMulch',
  },
  {
    solutionAccessor: 'installPavers',
    materialAccessor: 'pavers',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'installConcrete',
    materialAccessor: 'concrete',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'installGravel',
    materialAccessor: 'gravel',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'installExteriorPaint',
    materialAccessor: 'coolLifePaint',
    isMostPopular: true,
  },
  {
    solutionAccessor: 'installExteriorPaint',
    materialAccessor: 'waterPaint',
  },
]
