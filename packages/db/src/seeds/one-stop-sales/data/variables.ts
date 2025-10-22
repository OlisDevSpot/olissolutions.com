import type { TradeAccessor } from '@olis/db/types/trades'
import type { InsertVariable } from '@olis/db/schema/one-stop-sales'

export const variablesData = {
  solar: [
    {
      key: 'numPanels',
      label: 'Number of panels',
      dataType: 'number',
    },
    {
      key: 'wattsPerPanel',
      label: 'Watts per panel',
      dataType: 'number',
    },
    {
      key: 'numBatteries',
      label: 'Number of batteries',
      dataType: 'select',
      options: [0, 1, 2, 3],
    },
    {
      key: 'kWhPerBattery',
      label: 'kWh per battery',
      dataType: 'select',
      options: [5, 10],
    },
    {
      key: 'inverterType',
      label: 'Inverter type',
      dataType: 'select',
      options: ['microinverter', 'solar-edge'],
    },
  ],

  roof: [
    {
      key: 'numFlatBSQ',
      label: 'Number of flat BSQ',
      dataType: 'number',
    },
    {
      key: 'numPitchedBSQ',
      label: 'Number of pitched BSQ',
      dataType: 'number',
    },
    {
      key: 'numLayers',
      label: 'Number of current roof layers',
      dataType: 'select',
      options: [1, 2, 3],
    },
    {
      key: 'currentRoofType',
      label: 'Starting roof type',
      dataType: 'select',
      options: ['shingle', 'tile', 'metal', 'flat', 'woodshakes'],
    },
    {
      key: 'desiredRoofType',
      label: 'Finishing roof type',
      dataType: 'select',
      options: ['shingle', 'tile', 'metal', 'flat', 'woodshakes'],
    },
    {
      key: 'percentFreeDeckReplacement',
      label: 'Percent free deck replacement',
      dataType: 'select',
      options: [15, 20, 25],
    },
  ],

  windows: [
    {
      key: 'numLargeWindows',
      label: 'Number of large windows',
      dataType: 'number',
    },
    {
      key: 'numSmallWindows',
      label: 'Number of small windows',
      dataType: 'number',
    },
    {
      key: 'numStandardSliders',
      label: 'Number of standard sliding doors',
      dataType: 'number',
    },
    {
      key: 'numSpecialSliders',
      label: 'Number of special sliding doors',
      dataType: 'number',
    },
  ],

  hvac: [
    {
      key: 'systemTonnage',
      label: 'System tonnage',
      dataType: 'select',
      options: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    },
    {
      key: 'numMiniSplits',
      label: 'Number of mini splits',
      dataType: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
      key: 'replaceDucts',
      label: 'Duct replacement',
      dataType: 'boolean',
    },
  ],

  atticBasement: [
    {
      key: 'sqft',
      label: 'Square feet of insulation',
      dataType: 'number',
    },
    {
      key: 'existingInsulationType',
      label: 'Starting insulation type',
      dataType: 'select',
      options: ['fiberglass batts', 'fiberglass blown', 'cellulose blown'],
    },
    {
      key: 'desiredInsulationType',
      label: 'Finish insulation type',
      dataType: 'select',
      options: ['fiberglass batts', 'fiberglass blown', 'cellulose blown'],
    },
  ],

  dryscapingHardscaping: [
    {
      key: 'installSqFt',
      label: 'Square feet of installation',
      dataType: 'number',
    },
    {
      key: 'demoSqFt',
      label: 'Square feet of demo / removal',
      dataType: 'number',
    },
  ],

  exteriorPaintSiding: [
    {
      key: 'paintType',
      label: 'Paint type',
      dataType: 'select',
      options: ['coolLife', 'water'],
    },
    {
      key: 'homeSqFt',
      label: 'Home square footage',
      dataType: 'number',
    },
    {
      key: 'garageSqFt',
      label: 'Garage square footage',
      dataType: 'number',
    },
  ],

  interiorPaint: [
    {
      key: 'numBedrooms',
      label: 'Number of bedrooms',
      dataType: 'number',
    },
    {
      key: 'numBathrooms',
      label: 'Number of bathrooms',
      dataType: 'number',
    },
    {
      key: 'extent',
      label: 'What is being painted?',
      dataType: 'select',
      options: ['all', 'partial'],
    },
  ],

  electricals: [
    {
      key: 'relocationRequired',
      label: 'Relocation required?',
      dataType: 'boolean',
    },
  ],
  bathroomRemodel: [],
  kitchenRemodel: [],
  plumbing: [],
  addition: [],
  flooring: [],
  adu: [],
} as const satisfies Partial<Record<TradeAccessor, InsertVariable[]>>
