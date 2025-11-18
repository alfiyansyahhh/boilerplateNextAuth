import { NextRequest, NextResponse } from 'next/server';
import { jobs } from '../../dummyData/job';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId, candidate_id } = body;

    if (!jobId || !candidate_id) {
      return NextResponse.json(
        { error: 'Job ID and Candidate ID are required' },
        { status: 400 }
      );
    }

    const job = jobs.find((job) => job.id === jobId);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (typeof candidate_id !== 'string') {
      return NextResponse.json(
        { error: 'Candidate ID must be a string' },
        { status: 400 }
      );
    }

    if (job.candidate_ids.includes(candidate_id)) {
      return NextResponse.json(
        {
          error: `Candidate ID ${candidate_id} already exists in this job.`,
        },
        { status: 400 }
      );
    }

    if (job.candidate_ids.length >= job.number_of_candidate) {
      return NextResponse.json(
        {
          error: `The maximum number of candidates (${job.number_of_candidate}) has already been reached.`,
        },
        { status: 400 }
      );
    }

    job.candidate_ids.push(candidate_id);

    return NextResponse.json(
      {
        message: `Candidate ${candidate_id} successfully added to job ${jobId}.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    );
  }
}
