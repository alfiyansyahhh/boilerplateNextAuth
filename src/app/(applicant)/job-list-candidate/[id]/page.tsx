import JobListApplicantSection from '@/components/sections/joblistApplicantSection';
import { Job } from '@/zustand/store/useJobs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JobList - resume - detail',
};

const JobListCandidate = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const url = new URL(`/api/jobs/${id}`, process.env.NEXT_PUBLIC_BASE_URL);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  const data = await res.json();
  const job: Job = data;

  return (
    <div>
      <JobListApplicantSection
        dataJob={job}
        id={id}
      />
    </div>
  );
};

export default JobListCandidate;
