import type { InsertTag } from '@olis/db/schema/platform/tags'

export const tagsData = [
  {
    label: 'Energy efficient',
    accessor: 'energy-efficient',
  },
  {
    label: 'T-24',
    accessor: 't-24',
  },
  {
    label: 'Curb appeal',
    accessor: 'curb-appeal',
  },
] as const satisfies InsertTag[]
