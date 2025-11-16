'use client';
import { Button } from '../ui/button';

const CardRecrutCandidat = () => {
  return (
    <div className='w-[300px] h-[168px] rounded-2xl relative overflow-hidden p-6 text-white'>
      <div
        className='absolute inset-0 bg-center bg-cover'
        style={{ backgroundImage: "url('/img/bg-card-bCandidate.jpg')" }}
      />

      <div className='absolute inset-0 bg-black/65' />

      <div className='relative flex flex-col h-full justify-between'>
        <div>
          <div className='text-[18px]'>Recruit the best candidates</div>
          <div className='text-[14px] mt-2'>
            Create jobs, invite, and hire with ease
          </div>
        </div>

        <Button
          variant='primary'
          className='w-full'
        >
          Create a new job
        </Button>
      </div>
    </div>
  );
};

export default CardRecrutCandidat;
