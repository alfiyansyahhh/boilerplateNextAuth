import React, { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='max-w-[1440px] mx-auto overflow-hidden h-screen border'>
      <div className=' h-16 border-b-2 items-center flex justify-between px-4'>
        <div>
          <div className='font-bold text-[18px]'>Job List</div>
        </div>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className='py-8 px-4'>{children}</div>
    </div>
  );
};

export default MainLayout;
