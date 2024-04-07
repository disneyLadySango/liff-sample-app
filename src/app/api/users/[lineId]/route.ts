import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params }: {
  params: { lineId: string }
} ) => {
  const { lineId } = params

  return NextResponse.json({message: lineId})
}
