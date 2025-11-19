'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import WebCamGesture from './webCamGesture';

const ApplyJobSection = () => {
  return (
    <div className='relative w-full my-5  sm:max-w-[700px] bg-white border h-[95vh] mx-auto '>
      <WebCamGesture />
      <div className='border-t w-full bottom-0 absolute px-10 py-6'>
        <Button
          variant='primary'
          className='w-full'
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ApplyJobSection;
