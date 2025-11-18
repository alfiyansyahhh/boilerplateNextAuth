import { Job, jobs } from '@/app/api/dummyData/job';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 });
    }

    const index = jobs.findIndex((j) => j.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    const job = jobs[index];

    const updatedJob: Job = {
      ...job,
      status: 'Active',
      list_card: {
        ...job?.list_card,
        badge: 'Active',
      },
    };

    jobs[index] = updatedJob;

    return NextResponse.json({ data: updatedJob });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
