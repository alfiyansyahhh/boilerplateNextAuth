import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface NoJobsPlaceholderProps {
  onCreate?: () => void;
}

const NoJobsPlaceholder = ({ onCreate }: NoJobsPlaceholderProps) => {
  return (
    <div className='flex flex-col mt-5 items-center justify-center text-center py-10'>
      <Image
        src='/icons/no-jobs.svg'
        alt='no jobs'
        width={280}
        height={280}
        className='mx-auto'
      />

      <h2 className='font-semibold text-xl mt-6'>No job openings available</h2>

      <p className='text-base text-gray-600 mt-2'>
        Create a job opening now and start the candidate process.
      </p>

      <Button
        className='mt-6 w-40 font-semibold text-base'
        onClick={onCreate}
      >
        Create a new job
      </Button>
    </div>
  );
};

export default NoJobsPlaceholder;
