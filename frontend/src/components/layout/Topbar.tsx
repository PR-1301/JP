import React from 'react';
import { Search, Bell, User as UserIcon } from 'lucide-react';

interface TopbarProps {
  userRole: 'citizen' | 'clerk' | 'admin';
  userName: string;
}

export const Topbar: React.FC<TopbarProps> = ({ userRole, userName }) => {
  return (
    <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-neutral-200/50 sticky top-0 z-10 flex items-center justify-between px-8 shadow-sm">
      <div className="flex-1 flex items-center">
        {/* Search shortcut for clerks/admins */}
        {userRole !== 'citizen' && (
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search survey or case number (Press ⌘K)"
              className="block w-96 pl-10 pr-3 py-2 border border-transparent rounded-xl leading-5 bg-neutral-100 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-indigo-300 focus:ring-0 sm:text-sm transition-all"
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="text-neutral-400 hover:text-indigo-600 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-surface"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-6 border-l border-neutral-200/50">
          <div className="text-right">
            <p className="text-sm font-semibold text-neutral-900">{userName}</p>
            <p className="text-xs font-medium text-neutral-500 capitalize">{userRole}</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <UserIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
};
