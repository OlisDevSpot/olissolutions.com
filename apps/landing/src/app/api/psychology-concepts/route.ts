import { NextResponse } from 'next/server'
import { getAllPsychologyConcepts } from '@/features/solutions/lib/api'

export async function GET() {
  try {
    const concepts = await getAllPsychologyConcepts()
    return NextResponse.json(concepts)
  }
  catch (error) {
    console.error('Error fetching psychology concepts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch psychology concepts' },
      { status: 500 },
    )
  }
}
