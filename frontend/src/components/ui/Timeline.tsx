import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import type { Hearing } from '../../data/mockData';

interface TimelineProps {
  hearings: Hearing[];
}

export const Timeline: React.FC<TimelineProps> = ({ hearings }) => {
  return (
    <div className="relative border-l border-neutral-200 ml-3 space-y-8 mt-6">
      {hearings.map((hearing, index) => {
        const isCompleted = hearing.status === 'completed';
        const isScheduled = hearing.status === 'scheduled';
        
        return (
          <div key={hearing.id} className="relative pl-8">
            <span className="absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-white rounded-full ring-4 ring-white border border-neutral-200">
              {isCompleted ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : isScheduled ? (
                <Calendar className="w-4 h-4 text-blue-500" />
              ) : (
                <Clock className="w-4 h-4 text-purple-500" />
              )}
            </span>
            
            <div className="glass-panel p-5 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-base font-semibold text-neutral-900">{hearing.description}</h4>
                <StatusBadge status={hearing.status} />
              </div>
              <div className="flex items-center text-sm text-neutral-500">
                <Calendar className="w-4 h-4 mr-1.5" />
                {new Date(hearing.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
