import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Home, FileText, Scale, Users, Database } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  role: 'citizen' | 'clerk' | 'admin';
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const navigate = useNavigate();
  
  const getLinks = () => {
    switch (role) {
      case 'citizen':
        return [
          { name: 'Dashboard', icon: Home, path: '/citizen' },
        ];
      case 'clerk':
        return [
          { name: 'Dashboard', icon: Home, path: '/clerk' },
          { name: 'Land Records', icon: FileText, path: '/clerk/records' },
          { name: 'Litigation Cases', icon: Scale, path: '/clerk/cases' },
        ];
      case 'admin':
        return [
          { name: 'System Overview', icon: Home, path: '/admin' },
          { name: 'User Management', icon: Users, path: '/admin/users' },
          { name: 'Audit Trail', icon: Database, path: '/admin/audit' },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="w-64 h-screen bg-surface border-r border-neutral-200/50 shadow-soft flex flex-col justify-between sticky top-0 flex-shrink-0 z-20">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-neutral-200/50">
          <Scale className="w-6 h-6 text-indigo-600 mr-3" />
          <span className="font-serif font-bold text-lg text-neutral-900 tracking-tight">LandRegistry</span>
        </div>
        
        <div className="p-4">
          <p className="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Main Menu</p>
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "text-indigo-700 bg-indigo-50"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                )}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={cn("w-5 h-5 mr-3 transition-colors", isActive ? "text-indigo-600" : "text-neutral-400 group-hover:text-neutral-600")} />
                    {link.name}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t border-neutral-200/50">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-neutral-600 rounded-xl hover:bg-neutral-50 hover:text-red-600 transition-colors group"
        >
          <LogOut className="w-5 h-5 mr-3 text-neutral-400 group-hover:text-red-500 transition-colors" />
          Logout
        </button>
      </div>
    </aside>
  );
};
