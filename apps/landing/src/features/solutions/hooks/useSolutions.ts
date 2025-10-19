import type { PsychologyConcept, SolutionWithPsychologyConcepts } from '../types'
import { useQuery } from '@tanstack/react-query'

export function useSolutions(psychologyConceptAccessors?: string[]) {
  return useQuery<SolutionWithPsychologyConcepts[]>({
    queryKey: ['solutions', psychologyConceptAccessors],
    queryFn: async () => {
      const params = psychologyConceptAccessors
        ? `?concepts=${psychologyConceptAccessors.join(',')}`
        : ''
      const response = await fetch(`/api/solutions${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch solutions')
      }
      return response.json()
    },
  })
}

export function useSolution(id: string) {
  return useQuery<SolutionWithPsychologyConcepts>({
    queryKey: ['solution', id],
    queryFn: async () => {
      const response = await fetch(`/api/solutions/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch solution')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

export function usePsychologyConcepts() {
  return useQuery<PsychologyConcept[]>({
    queryKey: ['psychology-concepts'],
    queryFn: async () => {
      const response = await fetch('/api/psychology-concepts')
      if (!response.ok) {
        throw new Error('Failed to fetch psychology concepts')
      }
      return response.json()
    },
  })
}
