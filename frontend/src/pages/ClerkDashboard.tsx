import React, { useState } from 'react';
import { mockLandRecords, mockCases } from '../data/mockData';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { FileText, Scale, Plus, Map as MapIcon, List } from 'lucide-react';
import { MapComponent } from '../components/ui/MapComponent';

export const ClerkDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'records' | 'cases'>('records');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
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
          <div className="flex items-center space-x-2 bg-neutral-100 p-1 rounded-lg mb-2">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        {activeTab === 'records' ? (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {viewMode === 'list' ? (
              <div className="space-y-4">
                <DataTable columns={recordColumns} data={mockLandRecords} onRowClick={(row) => console.log('Row clicked', row)} />
              </div>
            ) : (
              <div className="glass-panel p-2">
                <MapComponent records={mockLandRecords} height="550px" />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <DataTable columns={caseColumns} data={mockCases} onRowClick={(row) => console.log('Row clicked', row)} />
          </div>
        )}
      </div>
    </div>
  );
};
