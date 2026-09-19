import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Outlet, Navigate } from 'react-router-dom';

interface DashboardLayoutProps {
  role: 'citizen' | 'clerk' | 'admin';
  userName: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role, userName }) => {
  // If no role is provided (simulating not logged in), redirect to login
  if (!role) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden text-neutral-900">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar userRole={role} userName={userName} />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
