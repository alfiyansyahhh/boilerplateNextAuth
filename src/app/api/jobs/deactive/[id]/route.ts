import { Job, jobs } from '@/app/api/dummyData/job';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
      status: 'Inactive',
      list_card: {
        ...job.list_card,
        badge: 'Inactive',
      },
    };

    jobs[index] = updatedJob; // Update the job in the array

    return NextResponse.json({ data: updatedJob });
  } catch (err) {
    console.error(err); // Log the actual error for better debugging
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    );
  }
}
