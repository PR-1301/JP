import React from 'react';
import type { Block } from '../../data/mockData';
import { Link2, Hash, Clock, Database, CheckCircle, ShieldAlert } from 'lucide-react';

interface BlockchainNodeProps {
  block: Block;
  isValidated: boolean;
  isTampered?: boolean;
}

export const BlockchainNode: React.FC<BlockchainNodeProps> = ({ block, isValidated, isTampered = false }) => {
  return (
    <div className={`relative flex items-start gap-4 p-6 rounded-2xl border transition-all duration-500 ${
      isValidated 
        ? isTampered 
          ? 'bg-red-50/50 border-red-200 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
          : 'bg-green-50/50 border-green-200 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
        : 'bg-surface border-neutral-200 shadow-soft hover:shadow-soft-lg'
    }`}>
      
      {/* Node Icon */}
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${
        isValidated 
          ? isTampered ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          : 'bg-indigo-100 text-indigo-600'
      }`}>
        <Database className="w-6 h-6" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-serif font-semibold text-neutral-900 flex items-center gap-2">
            Block #{block.index}
            {isValidated && !isTampered && <CheckCircle className="w-4 h-4 text-green-500" />}
            {isValidated && isTampered && <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />}
          </h4>
          <span className="flex items-center text-xs text-neutral-500 font-medium bg-neutral-100 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {new Date(block.timestamp).toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Transaction Data</div>
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 font-mono text-sm text-neutral-700 break-words">
              {JSON.stringify(block.data, null, 2)}
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">
                <Hash className="w-3.5 h-3.5 mr-1" /> Block Hash
              </div>
              <div className="font-mono text-xs text-indigo-700 bg-indigo-50/50 p-2 rounded-lg break-all border border-indigo-100/50">
                {block.hash}
              </div>
            </div>
            
            <div>
              <div className="flex items-center text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">
                <Link2 className="w-3.5 h-3.5 mr-1" /> Previous Hash
              </div>
              <div className="font-mono text-xs text-neutral-600 bg-neutral-50 p-2 rounded-lg break-all border border-neutral-100">
                {block.previousHash}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
