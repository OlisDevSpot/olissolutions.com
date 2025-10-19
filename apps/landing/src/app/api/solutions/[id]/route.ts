import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getSolutionById } from '@/features/solutions/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  try {
    const solution = await getSolutionById(id)

    if (!solution) {
      return NextResponse.json(
        { error: 'Solution not found' },
        { status: 404 },
      )
    }

    return NextResponse.json(solution)
  }
  catch (error) {
    console.error('Error fetching solution:', error)
    return NextResponse.json(
      { error: 'Failed to fetch solution' },
      { status: 500 },
    )
  }
}
