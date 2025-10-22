import type { TradeAccessor } from '@olis/db/types/trades'
import type { InsertPricing } from '@olis/db/schema/one-stop-sales'

export const pricingData = {
  solar: [
    {
      key: 'dollarPerWatt',
      label: 'Dollar per Watt',
      defaultValue: 3.5,
    },
    {
      key: 'dollarPerPanelRnr',
      label: 'Dollar per Panel (Remove & Reinstall)',
      defaultValue: 225,
    },
    {
      key: 'battery5kWh',
      label: 'Battery (5 kWh)',
      defaultValue: 6000,
    },
    {
      key: 'battery10kWh',
      label: 'Battery (10 kWh)',
      defaultValue: 11000,
    },
  ],
  roof: [
    {
      key: 'BSQTearOffFlat',
      label: 'Tear-Off (Flat) per BSQ',
      defaultValue: 530,
    },
    {
      key: 'BSQTearOffShingles',
      label: 'Tear-Off (Shingles) per BSQ',
      defaultValue: 480,
    },
    {
      key: 'BSQTearOffTile',
      label: 'Tear-Off (Tile) per BSQ',
      defaultValue: 750,
    },
    {
      key: 'BSQRedeckFlat',
      label: 'Redeck (Flat) per BSQ',
      defaultValue: 650,
    },
    {
      key: 'BSQRedeckPitched',
      label: 'Redeck (Pitched) per BSQ',
      defaultValue: 700,
    },
    {
      key: 'BSQTileReset',
      label: 'Tile Reset per BSQ',
      defaultValue: 580,
    },
    {
      key: 'BSQOverlayPitched',
      label: 'Overlay (Pitched) per BSQ',
      defaultValue: 420,
    },
    {
      key: 'BSQOverlayFlat',
      label: 'Overlay (Flat) per BSQ',
      defaultValue: 420,
    },
    {
      key: 'dollarPerAdditionalStory',
      label: 'Dollar per Additional Story',
      defaultValue: 25,
    },
    {
      key: 'dollarPerAdditionalLayer',
      label: 'Dollar per Additional Layer',
      defaultValue: 25,
    },
    {
      key: 'permitFee_roof',
      label: 'Permit Fee (Roof)',
      defaultValue: 250,
    },
  ],
  windows: [
    {
      key: 'windowSmall',
      label: 'Small Window',
      defaultValue: 550,
    },
    {
      key: 'windowLarge',
      label: 'Large Window',
      defaultValue: 650,
    },
    {
      key: 'slidingDoorStandard',
      label: 'Sliding Door (Standard)',
      defaultValue: 2500,
    },
    {
      key: 'slidingDoorSpecial',
      label: 'Sliding Door (Special)',
      defaultValue: 3000,
    },
    {
      key: 'frenchDoor',
      label: 'French Door',
      defaultValue: 5000,
    },
  ],
  atticBasement: [
    {
      key: 'dollarPerSqFtTopOff',
      label: 'Dollar per SqFt (Top-Off)',
      defaultValue: 1.3,
    },
    {
      key: 'dollarPerSqFtRnr',
      label: 'Dollar per SqFt (Remove & Replace)',
      defaultValue: 2.5,
    },
    {
      key: 'dollarPerSqFtCrawlSpace',
      label: 'Dollar per SqFt (Crawl space insulation)',
      defaultValue: 2.3,
    },
  ],
  dryscapingHardscaping: [
    {
      key: 'dollarPerSqFtArtificial',
      label: 'Dollar per SqFt (Artificial Turf)',
      defaultValue: 7,
    },
    {
      key: 'dollarPerSqFtGravel',
      label: 'Dollar per SqFt (Gravel)',
      defaultValue: 6,
    },
    {
      key: 'dollarPerSqFtMulch',
      label: 'Dollar per SqFt (Mulch)',
      defaultValue: 5,
    },
    {
      key: 'dollarPerSqFtConcrete',
      label: 'Dollar per SqFt (Concrete)',
      defaultValue: 11,
    },
    {
      key: 'dollarPerSqFtPavers',
      label: 'Dollar per SqFt (Pavers)',
      defaultValue: 11,
    },
  ],
  hvac: [
    {
      key: 'threeTonRnr',
      label: '3 Ton HVAC Replace & Install',
      defaultValue: 8500,
    },
    {
      key: 'furnace36kBTURnr',
      label: '36k BTU Furnace Replace & Install',
      defaultValue: 7000,
    },
    {
      key: 'miniSplits',
      label: 'Mini-Splits (Per Unit)',
      defaultValue: 3000,
    },
    {
      key: 'permitFee_hvac',
      label: 'Permit Fee (HVAC)',
      defaultValue: 250,
    },
  ],
  electricals: [
    {
      key: 'mainPanelTrade',
      label: 'Main Panel Trade',
      defaultValue: 2800,
    },
  ],
  exteriorPaintSiding: [
    {
      key: 'coolLifePaintSm',
      label: 'CoolLife Paint (Small Home)',
      defaultValue: 6000,
    },
    {
      key: 'coolLifePaintAvg',
      label: 'CoolLife Paint (Average Home)',
      defaultValue: 7000,
    },
    {
      key: 'coolLifePaintLarge',
      label: 'CoolLife Paint (Large Home)',
      defaultValue: 8500,
    },
    {
      key: 'waterPaintSm',
      label: 'Water Paint (Small Home)',
      defaultValue: 4000,
    },
    {
      key: 'waterPaintAvg',
      label: 'Water Paint (Average Home)',
      defaultValue: 5000,
    },
    {
      key: 'waterPaintLarge',
      label: 'Water Paint (Large Home)',
      defaultValue: 6500,
    },
  ],
  interiorPaint: [],
  bathroomRemodel: [],
  kitchenRemodel: [],
  plumbing: [],
  addition: [],
  flooring: [],
  adu: [],
} as const satisfies Record<TradeAccessor, InsertPricing[]>
