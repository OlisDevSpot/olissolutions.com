import { db } from '@olis/db'
import { solutions } from '@olis/db/schema/core'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await db.select().from(solutions)

  return NextResponse.json(data)
}
