export interface SolutionWithPsychologyConcepts {
  id: number
  name: string
  description: string
  whatItDoes: string
  howItHelps: string
  easeOfUse: 'easy' | 'moderate' | 'advanced'
  pricePerMonth: number
  isFeatured: boolean
  psychologyConcepts: PsychologyConcept[]
}

export interface PsychologyConcept {
  id: number
  label: string
  accessor: string
  description: string
}

export interface Purchase {
  id: number
  solutionId: string
  userId: string
  status: 'active' | 'trial' | 'cancelled'
  purchaseDate: string
  nextBilling?: string
  trialEnds?: string
}

export interface SolutionCardProps extends SolutionWithPsychologyConcepts {
  showPsychologyConcepts?: boolean
}
