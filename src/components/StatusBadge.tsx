import React from 'react';
import { PROJECT_STATUS, STATUS_LABEL } from '../utils/constants';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const label = STATUS_LABEL[status as keyof typeof STATUS_LABEL] || status;

  const className = status === PROJECT_STATUS.COMPLETED
    ? 'bg-[#203225] text-[#9fd0a6] border border-[#35533f]'
    : status === PROJECT_STATUS.IN_PROGRESS
      ? 'bg-[#342b1d] text-[#f0c47a] border border-[#5b492d]'
      : status === PROJECT_STATUS.ON_HOLD
        ? 'bg-[#3b2623] text-[#e5a39b] border border-[#643a35]'
        : 'bg-[#25313a] text-[#9ec6df] border border-[#3a5668]';

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
};
