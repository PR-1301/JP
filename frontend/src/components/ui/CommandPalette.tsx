import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Scale, Database, User, Map as MapIcon, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const actions = [
    { id: 1, name: 'Search Land Records', icon: FileText, route: '/citizen' },
    { id: 2, name: 'Manage Litigation Cases', icon: Scale, route: '/clerk' },
    { id: 3, name: 'View Blockchain Audit Trail', icon: Database, route: '/admin' },
    { id: 4, name: 'User Management', icon: User, route: '/admin' },
    { id: 5, name: 'GIS Map Overview', icon: MapIcon, route: '/admin' },
    { id: 6, name: 'Verify Integrity', icon: ShieldCheck, route: '/admin' },
  ];

  const filteredActions = actions.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  const handleAction = (route: string) => {
    setIsOpen(false);
    navigate(route);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white/90 backdrop-blur-3xl rounded-2xl shadow-2xl border border-white overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-neutral-100/50">
              <Search className="w-6 h-6 text-indigo-500 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you need to do? (Search records, cases, audit...)"
                className="flex-1 bg-transparent border-none outline-none text-lg text-neutral-900 placeholder-neutral-400 font-medium"
              />
              <div className="text-xs text-neutral-400 font-mono bg-neutral-100 px-2 py-1 rounded-md">ESC</div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center text-neutral-500">
                  No actions found for "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Suggested Actions</div>
                  {filteredActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.route)}
                      className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-indigo-50/80 transition-colors group text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 group-hover:bg-indigo-100 flex items-center justify-center mr-4 transition-colors">
                        <action.icon className="w-5 h-5 text-neutral-500 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <span className="text-neutral-700 group-hover:text-indigo-900 font-medium transition-colors">{action.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
