import React, { useState } from 'react';
import { StatCard } from '../components/ui/StatCard';
import { DataTable } from '../components/ui/DataTable';
import { BlockchainNode } from '../components/ui/BlockchainNode';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockUsers, mockBlockchain, mockLandRecords, mockCases } from '../data/mockData';
import { Users, FileText, Scale, Database, RefreshCw, Download, Map as MapIcon, BarChart3 } from 'lucide-react';
import { MapComponent } from '../components/ui/MapComponent';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'audit'>('overview');
  const [isValidating, setIsValidating] = useState(false);
  const [isChainValid, setIsChainValid] = useState<boolean | null>(null);

  const handleVerifyChain = () => {
    setIsValidating(true);
    setIsChainValid(null);
    setTimeout(() => {
      setIsValidating(false);
      setIsChainValid(true);
    }, 2000);
  };

  const userColumns = [
    { header: 'ID', accessor: 'id' as const, className: 'font-mono text-xs text-neutral-500' },
    { header: 'Name', accessor: 'name' as const, className: 'font-medium' },
    { header: 'Role', accessor: (row: any) => <span className="capitalize">{row.role}</span> },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  // Chart Data
  const registrationData = [
    { name: 'Jan', records: 40 },
    { name: 'Feb', records: 30 },
    { name: 'Mar', records: 45 },
    { name: 'Apr', records: 50 },
    { name: 'May', records: 65 },
    { name: 'Jun', records: 85 },
  ];

  const caseData = [
    { name: 'Open', cases: mockCases.filter(c => c.status === 'open' || c.status === 'in_progress').length },
    { name: 'Closed', cases: mockCases.filter(c => c.status === 'closed').length },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900">System Admin</h1>
          <p className="text-neutral-500 mt-1">Platform overview and security controls.</p>
        </div>
      </div>

      <div className="border-b border-neutral-200">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setActiveTab('overview')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${activeTab === 'overview' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}>Overview</button>
          <button onClick={() => setActiveTab('users')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${activeTab === 'users' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}>Users</button>
          <button onClick={() => setActiveTab('audit')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${activeTab === 'audit' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}>Audit Trail</button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Records" value={mockLandRecords.length.toString()} icon={FileText} trend={{ value: '12%', isPositive: true }} delay={0} />
              <StatCard title="Active Cases" value={mockCases.length.toString()} icon={Scale} trend={{ value: '2%', isPositive: false }} delay={100} />
              <StatCard title="Registered Users" value={mockUsers.length.toString()} icon={Users} delay={200} />
              <StatCard title="Blockchain Nodes" value={mockBlockchain.length.toString()} icon={Database} delay={300} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 delay-150 fill-mode-both">
              
              {/* GIS Map View */}
              <div className="xl:col-span-2 glass-panel p-6 flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-neutral-900 flex items-center">
                      <MapIcon className="w-5 h-5 mr-2 text-indigo-600" />
                      GIS Parcel Map
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">Geographic distribution of registered land parcels.</p>
                  </div>
                </div>
                <div className="flex-1 relative rounded-xl overflow-hidden border border-neutral-100">
                  <MapComponent records={mockLandRecords} zoom={12} height="100%" />
                </div>
              </div>

              {/* Charts */}
              <div className="xl:col-span-1 space-y-8">
                <div className="glass-panel p-6 h-[236px] flex flex-col">
                  <h3 className="text-lg font-serif font-bold text-neutral-900 flex items-center mb-4">
                    <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
                    Registration Trend
                  </h3>
                  <div className="flex-1 min-h-0 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={registrationData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRecords" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)' }} />
                        <Area type="monotone" dataKey="records" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRecords)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="glass-panel p-6 h-[236px] flex flex-col">
                  <h3 className="text-lg font-serif font-bold text-neutral-900 flex items-center mb-4">
                    <Scale className="w-5 h-5 mr-2 text-indigo-600" />
                    Litigation Status
                  </h3>
                  <div className="flex-1 min-h-0 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={caseData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#475569', fontWeight: 500 }} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)' }} />
                        <Bar dataKey="cases" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <DataTable columns={userColumns} data={mockUsers} />
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-neutral-200 shadow-soft">
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-900">Cryptographic Ledger</h3>
                <p className="text-sm text-neutral-500 mt-1">Immutable record of all system state changes.</p>
              </div>
              <div className="flex space-x-4">
                <button className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
                <button onClick={handleVerifyChain} disabled={isValidating} className="btn-primary">
                  <RefreshCw className={`w-4 h-4 mr-2 ${isValidating ? 'animate-spin' : ''}`} />
                  {isValidating ? 'Verifying Chain...' : 'Verify Chain Integrity'}
                </button>
              </div>
            </div>

            {isChainValid !== null && (
              <div className={`p-4 rounded-xl border flex items-center ${isChainValid ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                <div className="flex-1 font-medium">
                  {isChainValid ? '✅ Blockchain integrity verified. No tampering detected.' : '❌ Warning: Chain integrity compromised. Hash mismatch detected.'}
                </div>
              </div>
            )}

            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[2.25rem] before:w-0.5 before:bg-indigo-100 before:-z-10">
              {mockBlockchain.map((block) => (
                <BlockchainNode key={block.hash} block={block} isValidated={isChainValid === true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
