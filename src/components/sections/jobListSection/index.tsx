'use client';

import { Button } from '@/components/ui/button';
import NoJobsPlaceholder from './noJobsPlaceholder';
import StatusBadge from '@/components/ui/statusBadge';
import { useEffect, useState } from 'react';
import { useJobs } from '@/zustand/store/useJobs';
import CreateNewJobDialog from './CreateNewJobDialog';

const JobListSection = ({ list }: { list: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobId, setJobId] = useState('');

  const setJobs = useJobs((state) => state.setJobs);

  useEffect(() => {
    if (list && list.length > 0) {
      setJobs(list);
    }
  }, [list, setJobs]);

  const jobs = useJobs((state) => state.jobs);

  return (
    <>
      <CreateNewJobDialog {...{ isOpen, setIsOpen, jobId }} />

      <div className='mt-5 sm:mx-3 pb-40'>
        {jobs.length > 0 ? (
          jobs.map((job: any, i: number) => (
            <div
              key={i}
              className='h-auto sm:h-[156px] p-6 relative mt-4 bg-[#FFFFFF] shadow-lg rounded-2xl'
            >
              <div className='flex gap-3 mb-4'>
                <StatusBadge status={job.status} />
                <div className='border rounded-sm py-1 px-4 text-[14px] h-8'>
                  {job?.list_card?.started_on_text}
                </div>
              </div>
              <div className=' text-md sm:text-[18px] font-bold mb-3'>
                {job?.title}
              </div>
              <div className='text-[#616161] text-sm sm:text-[16px]'>
                {job?.salary_range?.display_text}
              </div>
              <Button
                variant='primary'
                className=' w-[98px] h-7 absolute bottom-5 right-5 rounded-[10px]'
                onClick={() => {
                  if (job.list_card?.cta === 'Edit Job') {
                    setJobId(job.id);
                    setIsOpen(true);
                  }
                }}
              >
                {job.list_card?.cta}
              </Button>
              <br />
              <br />
            </div>
          ))
        ) : (
          <NoJobsPlaceholder />
        )}
      </div>
    </>
  );
};

export default JobListSection;
