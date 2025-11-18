import { Job } from '@/zustand/store/useJobs';
import { Banknote, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const JobList = ({ list, isDetail }: { list?: Job[]; isDetail?: boolean }) => {
  let router = useRouter();
  return (
    <div
      className={`${
        isDetail && '  max-w-[406px] hidden md:block'
      }  w-full max-w-[384px] overflow-auto`}
    >
      {list &&
        list?.length > 0 &&
        list.map((job: Job, index: number) => (
          <div
            key={index}
            onClick={() => router.push(`/job-list-candidate/${job.id}`)}
            className='w-full h-[140px] cursor-pointer my-5 border-2 active:border-[#01777F] hover:border-[#01777F] hover:bg-[#F7FEFF] rounded-xl py-3 px-[18px]'
          >
            <div className='flex gap-3 border-b pb-3'>
              <Image
                width={48}
                height={48}
                src={'/icons/rakaminLogo.svg'}
                alt={'123'}
              />
              <div>
                <div className='font-bold text-[16px]'>{job.title}</div>
                <div>Rakamin</div>
              </div>
            </div>
            <div className='flex my-2 text-[#616161] items-center gap-2'>
              <MapPin size={14} />
              <div className='text-[12px]'>Jakarta Selatan</div>
            </div>
            <div className='flex text-[#616161] items-center gap-2'>
              <Banknote size={14} />
              <div className='text-[12px]'>
                {job?.salary_range?.display_text}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobList;
