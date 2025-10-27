import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getAllSolutions, getSolutionsByPsychologyConcepts } from '@/features/solutions/lib/api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conceptsParam = searchParams.get('concepts')

    let solutions

    if (conceptsParam) {
      const concepts = conceptsParam.split(',').filter(Boolean)
      solutions = await getSolutionsByPsychologyConcepts(concepts)
    }
    else {
      solutions = await getAllSolutions()
    }

    return NextResponse.json(solutions)
  }
  catch (error) {
    console.error('Error fetching solutions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch solutions' },
      { status: 500 },
    )
  }
}
