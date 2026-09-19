import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, delay = 0 }) => {
  return (
    <div 
      className="glass-panel p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-soft-lg transition-all"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-serif font-bold text-neutral-900">{value}</h3>
          
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span className={cn("font-medium", trend.isPositive ? "text-green-600" : "text-red-600")}>
                {trend.isPositive ? '+' : '-'}{trend.value}
              </span>
              <span className="text-neutral-400 ml-2">from last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
