import { NextRequest, NextResponse } from 'next/server';
import { candidate } from '../dummyData/candidate';

export async function GET(req: NextRequest) {
  return NextResponse.json({ data: candidate });
}
