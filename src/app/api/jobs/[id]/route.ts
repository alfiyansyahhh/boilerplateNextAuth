import { NextRequest, NextResponse } from 'next/server';
import { jobs } from '../../dummyData/job';
import { candidate } from '../../dummyData/candidate';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: 'Job ID is required' },
      { status: 400 }
    );
  }

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return NextResponse.json({ message: 'Job not found' }, { status: 404 });
  }

  const jobCandidates = job.candidate_ids
    .map((candidateId) => candidate.find((c) => c.id === candidateId))
    .filter(Boolean); //

  // if (jobCandidates.length === 0) {
  //   return NextResponse.json(
  //     { message: 'No candidates found for this job' },
  //     { status: 404 }
  //   );
  // }

  return NextResponse.json({ ...job, candidates: jobCandidates || [] });
}
