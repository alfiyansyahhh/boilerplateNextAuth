'use client';

import React from 'react';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumbStore } from '@/zustand/store/useBreadCrumb';
import { useRouter } from 'next/navigation';

export default function DynamicBreadcrumb() {
  const crumbs = useBreadcrumbStore((s) => s.crumbs);

  let router = useRouter();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.length <= 1 && (
          <div className="font-bold text-[18px] text-[#1E1F21]">
            {crumbs[0]?.label}
          </div>
        )}

        {crumbs.length > 1 &&
          crumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem className="font-bold">
                <div
                  className={`
                  ${
                    index === crumbs.length - 1 &&
                    'bg-[#EDEDED] border-[#C2C2C2]'
                  } 
                  font-bold cursor-pointer border-2 py-1 px-4 text-[14px] text-[#1D1F20]   rounded-md`}
                  onClick={() => {
                    router.push(item.href || '/');
                  }}
                >
                  {item.label}
                </div>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
