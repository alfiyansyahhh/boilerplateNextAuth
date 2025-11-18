'use client';

import React, { useEffect } from 'react';
import NoCandidatePlaceHolder from './noCandidatePlaceHolder';
import { useJobs } from '@/zustand/store/useJobs';
import { useBreadcrumbStore } from '@/zustand/store/useBreadCrumb';

const ManageJobSection = ({ jobId, list }: { jobId: any; list: any }) => {
  let { getJobById } = useJobs();
  let dataJOb = getJobById(jobId);

  const addCrumbs = useBreadcrumbStore((s) => s.addCrumbs);

  useEffect(() => {
    addCrumbs({ label: 'Manage Candidate', href: `/manage-job/${jobId}` });
  }, []);

  return (
    <div>
      <div className="text-[#1D1F20] text-[18px] font-bold mb-5">
        {dataJOb?.title}
      </div>
      <div className="border p-5 rounded-md min-h-[500px]">
        {list.length === 0 && <NoCandidatePlaceHolder />}
      </div>
    </div>
  );
};

export default ManageJobSection;
