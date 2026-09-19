import React from 'react';
import { cn } from './StatCard';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'clear':
      case 'completed':
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200/60';
      case 'disputed':
      case 'in_progress':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'litigation':
      case 'open':
      case 'inactive':
        return 'bg-red-50 text-red-700 border-red-200/60';
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'adjourned':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200/60';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
      getStatusStyles(status)
    )}>
      {getStatusLabel(status)}
    </span>
  );
};
