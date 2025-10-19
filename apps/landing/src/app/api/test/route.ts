import { db } from '@workspace/db'
import { solutions } from '@workspace/db/schema/public'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await db.select().from(solutions)

  return NextResponse.json(data)
}
