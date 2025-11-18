import React from 'react';

interface StatusBadgeProps {
  status: 'Active' | 'Inactive' | 'Draft' | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = '';

  switch (status.toLowerCase()) {
    case 'active':
      bgColor = 'bg-[#F8FBF9] border-[#B8DBCA] border text-[#43936C]';
      break;
    case 'inactive':
      bgColor = 'bg-[#FFFAFA] border-[#F5B1B7] border text-[#E11428]';
      break;
    case 'draft':
      bgColor = 'bg-[#FFFCF5] border-[#FEEABC] border text-[#FBC037]';
      break;
    default:
      bgColor = 'bg-gray-300 text-black';
      break;
  }

  return (
    <div
      className={`rounded-sm py-1 px-4 text-[14px] h-8 font-bold flex items-center justify-center ${bgColor}`}
    >
      {status}
    </div>
  );
};

export default StatusBadge;
