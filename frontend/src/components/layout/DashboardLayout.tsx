import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  role: 'citizen' | 'clerk' | 'admin';
  userName: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role, userName }) => {
  if (!role) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden text-neutral-900">
      <Sidebar role={role} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar userRole={role} userName={userName} />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};
