import type { InsertAddon } from '@olis/db/schema/platform'
import type { TradeAccessor } from '@olis/db/types/trades'

export const addonsData = [
  {
    label: 'Install attic fan',
    accessor: 'atticFan',
    description: 'Improve your home\'s ventilation and energy efficiency by installing an attic fan to keep your space cooler and more comfortable',
    imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1756346660/attic-fan_ajlrdt.webp',
    tradeAccessor: 'atticBasement',
  },
  {
    label: 'Install radiant barrier',
    accessor: 'radiantBarrier',
    description: 'Boost your home\'s energy efficiency and reduce cooling costs by installing a radiant barrier in your attic',
    imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1756346660/radiant-barrier_fq7118.webp',
    tradeAccessor: 'atticBasement',
  },
  {
    label: 'Install retaining wall',
    accessor: 'retainingWall',
    description: 'Boost yard appeal with new retaining wall',
    imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1756346660/retaining-wall_tuovew.jpg',
    tradeAccessor: 'dryscapingHardscaping',
  },
  {
    label: 'Facia Boards Replacement',
    accessor: 'replaceFasciaBoards',
    description: 'Boost your home\'s curb appeal with modern facia boards',
    imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1756346660/fascia-board-replacement_gw8owg.webp',
    tradeAccessor: 'roof',
  },
  {
    label: 'Facia Boards Repaint',
    accessor: 'repaintFasciaBoards',
    description: 'Boost your home\'s curb appeal with modern facia boards6389p',
    imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1756346660/fascia-board-repaint_zsnxhp.jpg',
    tradeAccessor: 'exteriorPaintSiding',
  },
  {
    label: 'Gutters trade',
    accessor: 'tradeGutters',
    description: 'Boost yard appeal with new retaining wall',
    imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1756346660/gutter-replacement-2_xbly5l.webp',
    tradeAccessor: 'roof',
  },
  {
    label: 'Ducting replacement',
    accessor: 'replaceDucts',
    description: 'Trade the energy efficiency of your ducts',
    imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1757092099/duct-replacement_xkoil9.webp',
    tradeAccessor: 'hvac',
  },
] as const satisfies (Omit<InsertAddon, 'tradeId'> & { tradeAccessor: TradeAccessor })[]
