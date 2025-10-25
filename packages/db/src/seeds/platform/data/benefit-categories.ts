import type { InsertBenefitCategory } from '@olis/db/schema/platform'

export const benefitCategoriesData = [
  {
    accessor: 'reduceBills',
    label: 'Reduce bills',
  },
  {
    accessor: 'increaseValue',
    label: 'Increase value & protection',
  },
  {
    accessor: 'reduceHeadache',
    label: 'Reduce headache',
  },
  {
    accessor: 'increaseComfort',
    label: 'Increase comfort',
  },
  {
    accessor: 'receiveIncentives',
    label: 'Receive incentives',
  },
] as const satisfies InsertBenefitCategory[]
