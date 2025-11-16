'use client';

import { Button } from '@/components/ui/button';
import NoJobsPlaceholder from './noJobsPlaceholder';
import StatusBadge from '@/components/ui/statusBadge';
import CreateNewJobDialog from './CreateNewJobDialog';

const JobListSection = ({ list }: { list: any }) => {
  return (
    <div className='mt-5 mx-3'>
      <CreateNewJobDialog />
      {list.length > 0 ? (
        list.map((job: any, i: number) => (
          <div
            key={i}
            className='h-[156px] p-6 relative bg-[#FFFFFF] shadow-lg rounded-2xl'
          >
            <div className='flex gap-3 mb-4'>
              <StatusBadge status={job.status} />
              <div className='border rounded-sm py-1 px-4 text-[14px] h-8'>
                {job?.list_card?.started_on_text}
              </div>
            </div>
            <div className='text-[18px] font-bold mb-3'>{job?.title}</div>
            <div className='text-[#616161] text-[16px]'>
              {job?.salary_range?.display_text}
            </div>
            <Button
              variant='primary'
              className='w-[98px] h-7 absolute bottom-5 right-5 rounded-[10px]'
            >
              {job.list_card?.cta}
            </Button>
          </div>
        ))
      ) : (
        <NoJobsPlaceholder />
      )}
    </div>
  );
};

export default JobListSection;
