import { Button } from '@/components/ui/button';
import Image from 'next/image';
import CreateNewJobDialog from './CreateNewJobDialog';
import { useState } from 'react';

const NoJobsPlaceholder = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <CreateNewJobDialog {...{ isOpen, setIsOpen }} />
      <div className='flex flex-col mt-5 items-center justify-center text-center py-10'>
        <Image
          src='/icons/no-jobs.svg'
          alt='no jobs'
          width={280}
          height={280}
          className='mx-auto'
        />

        <h2 className='font-semibold text-xl mt-6'>
          No job openings available
        </h2>

        <p className='text-base text-gray-600 mt-2'>
          Create a job opening now and start the candidate process.
        </p>

        <Button
          className='mt-6 w-40 font-semibold text-base'
          onClick={() => setIsOpen(true)}
        >
          Create a new job
        </Button>
      </div>
    </>
  );
};

export default NoJobsPlaceholder;
