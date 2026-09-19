import React, { useState } from 'react';
import { mockLandRecords, mockCases } from '../data/mockData';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { FileText, Scale, Plus, Map as MapIcon, List, Columns } from 'lucide-react';
import { MapComponent } from '../components/ui/MapComponent';
import { motion, AnimatePresence } from 'framer-motion';

export const ClerkDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'records' | 'cases'>('records');
  const [recordViewMode, setRecordViewMode] = useState<'list' | 'map'>('list');
  const [caseViewMode, setCaseViewMode] = useState<'list' | 'kanban'>('kanban');

  const recordColumns = [
    { header: 'Survey No.', accessor: 'surveyNumber' as const, className: 'font-mono font-medium' },
    { header: 'Owner', accessor: 'ownerName' as const },
    { header: 'Area', accessor: 'area' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  const caseColumns = [
    { header: 'Case No.', accessor: 'caseNumber' as const, className: 'font-mono font-medium' },
    { header: 'Survey No.', accessor: 'surveyNumber' as const, className: 'font-mono text-neutral-500' },
    { header: 'Parties', accessor: (row: any) => <span className="text-sm"><span className="font-medium">{row.plaintiff}</span> vs {row.defendant}</span> },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  const kanbanColumns = [
    { id: 'open', title: 'Open Cases' },
    { id: 'in_progress', title: 'In Progress / Hearings' },
    { id: 'closed', title: 'Closed / Resolved' }
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900">Workspace</h1>
          <p className="text-neutral-500 mt-1">Manage land records, litigation, and geographical mapping.</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="btn-secondary">Export Report</button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            {activeTab === 'records' ? 'New Record' : 'File Case'}
          </button>
        </div>
      </div>

      <div className="border-b border-neutral-200 flex justify-between items-end">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setActiveTab('records')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${activeTab === 'records' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}>
            <FileText className={`w-4 h-4 mr-2 ${activeTab === 'records' ? 'text-indigo-500' : 'text-neutral-400'}`} />
            Land Records
          </button>
          <button onClick={() => setActiveTab('cases')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${activeTab === 'cases' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}>
            <Scale className={`w-4 h-4 mr-2 ${activeTab === 'cases' ? 'text-indigo-500' : 'text-neutral-400'}`} />
            Litigation Cases
          </button>
        </nav>
        
        {activeTab === 'records' && (
          <div className="flex items-center space-x-2 bg-white/50 backdrop-blur p-1 rounded-lg mb-2 shadow-sm border border-neutral-200/50">
            <button 
              onClick={() => setRecordViewMode('list')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-all ${recordViewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setRecordViewMode('map')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-all ${recordViewMode === 'map' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="flex items-center space-x-2 bg-white/50 backdrop-blur p-1 rounded-lg mb-2 shadow-sm border border-neutral-200/50">
            <button 
              onClick={() => setCaseViewMode('list')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-all ${caseViewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCaseViewMode('kanban')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-all ${caseViewMode === 'kanban' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <Columns className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'records' ? (
            <motion.div 
              key="records"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {recordViewMode === 'list' ? (
                <div className="space-y-4">
                  <DataTable columns={recordColumns} data={mockLandRecords} onRowClick={(row) => console.log('Row clicked', row)} />
                </div>
              ) : (
                <div className="glass-panel p-2 shadow-xl border-white">
                  <MapComponent records={mockLandRecords} height="650px" />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="cases"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {caseViewMode === 'list' ? (
                <div className="space-y-4">
                  <DataTable columns={caseColumns} data={mockCases} onRowClick={(row) => console.log('Row clicked', row)} />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {kanbanColumns.map(col => (
                    <div key={col.id} className="flex flex-col bg-neutral-100/50 rounded-2xl p-4 h-[700px] border border-neutral-200/50">
                      <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="font-semibold text-neutral-700">{col.title}</h3>
                        <span className="bg-white text-neutral-600 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {mockCases.filter(c => c.status === col.id).length}
                        </span>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                        {mockCases.filter(c => c.status === col.id).map((caseItem, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                            key={caseItem.id} 
                            className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 cursor-grab active:cursor-grabbing"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md">{caseItem.caseNumber}</span>
                              <StatusBadge status={caseItem.status} />
                            </div>
                            <p className="text-sm text-neutral-900 font-medium mb-1">Survey: {caseItem.surveyNumber}</p>
                            <p className="text-xs text-neutral-500 mb-3 line-clamp-2">
                              {caseItem.plaintiff} vs {caseItem.defendant}
                            </p>
                            <div className="pt-3 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-400">
                              <span>{new Date(caseItem.filingDate).toLocaleDateString()}</span>
                              <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-[10px] text-neutral-600">
                                {caseItem.hearings.length}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
