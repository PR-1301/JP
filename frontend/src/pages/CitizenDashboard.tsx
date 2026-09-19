import { useState } from 'react';
import { Search, MapPin, User, Hash, ShieldCheck, FileText } from 'lucide-react';
import { mockLandRecords, mockCases } from '../data/mockData';
import type { LandRecord, LitigationCase } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Timeline } from '../components/ui/Timeline';
import { MapComponent } from '../components/ui/MapComponent';

export const CitizenDashboard: React.FC = () => {
  const [surveyNumber, setSurveyNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const [record, setRecord] = useState<LandRecord | null>(null);
  const [cases, setCases] = useState<LitigationCase[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyNumber.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    setTimeout(() => {
      const foundRecord = mockLandRecords.find(r => r.surveyNumber.toLowerCase() === surveyNumber.trim().toLowerCase());
      setRecord(foundRecord || null);
      
      if (foundRecord) {
        const linkedCases = mockCases.filter(c => c.surveyNumber === foundRecord.surveyNumber);
        setCases(linkedCases);
      } else {
        setCases([]);
      }
      
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-serif font-bold text-neutral-900 tracking-tight">Public Land Lookup</h1>
        <p className="text-neutral-500 max-w-lg mx-auto">
          Enter a survey number to securely retrieve land ownership details, geolocation, and verifiable litigation history.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-neutral-400" />
        </div>
        <input
          type="text"
          value={surveyNumber}
          onChange={(e) => setSurveyNumber(e.target.value)}
          placeholder="Enter Survey Number (e.g., SVY-1025)"
          className="block w-full pl-14 pr-32 py-5 text-lg border-2 border-transparent bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
        />
        <div className="absolute inset-y-2 right-2">
          <button 
            type="submit"
            disabled={isSearching}
            className="h-full px-6 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70 shadow-sm"
          >
            {isSearching ? 'Searching...' : 'Search Record'}
          </button>
        </div>
      </form>

      {hasSearched && !isSearching && !record && (
        <div className="text-center py-16 animate-in fade-in zoom-in-95 bg-white border border-neutral-100 rounded-3xl shadow-sm max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <FileText className="w-10 h-10 text-neutral-400" />
          </div>
          <h3 className="text-xl font-serif font-semibold text-neutral-900">No Record Found</h3>
          <p className="text-neutral-500 mt-2">The survey number you entered does not exist in our registry.<br/>Please verify and try again.</p>
        </div>
      )}

      {hasSearched && !isSearching && record && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Left Column: Property & Map */}
          <div className="xl:col-span-1 space-y-6">
            <div className="glass-panel p-7">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-serif font-bold text-neutral-900">Property Details</h3>
                <StatusBadge status={record.status} />
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100/80">
                  <div className="flex items-center text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    <Hash className="w-4 h-4 mr-1.5" /> Survey Number
                  </div>
                  <div className="font-mono text-2xl font-bold text-indigo-900 tracking-tight">{record.surveyNumber}</div>
                </div>
                
                <div className="px-1">
                  <div className="flex items-center text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                    <User className="w-4 h-4 mr-1.5" /> Registered Owner
                  </div>
                  <div className="text-lg font-medium text-neutral-900">{record.ownerName}</div>
                </div>
                
                <div className="px-1">
                  <div className="flex items-center text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                    <MapPin className="w-4 h-4 mr-1.5" /> Location & Area
                  </div>
                  <div className="text-base text-neutral-800 leading-relaxed">{record.address}</div>
                  <div className="text-sm font-medium text-neutral-500 mt-1">{record.area}</div>
                </div>
              </div>
              
              <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-center space-x-2 text-sm font-medium text-green-700 bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Verified via Blockchain Audit Trail</span>
              </div>
            </div>

            <div className="glass-panel p-3">
              <div className="px-4 pt-3 pb-4">
                <h3 className="text-lg font-serif font-bold text-neutral-900">Geographic Bounds</h3>
                <p className="text-xs text-neutral-500 mt-1">Satellite positioning of parcel.</p>
              </div>
              <MapComponent records={[record]} height="280px" />
            </div>
          </div>

          {/* Right Column: Litigation History */}
          <div className="xl:col-span-2">
            <div className="glass-panel p-8 h-full">
              <div className="flex justify-between items-end mb-8 border-b border-neutral-100 pb-5">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-neutral-900">Litigation History</h3>
                  <p className="text-neutral-500 mt-1 text-sm">Court cases and hearing updates linked to this survey number.</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-light text-neutral-300">
                    {cases.length} <span className="text-lg font-medium text-neutral-400">Cases</span>
                  </span>
                </div>
              </div>
              
              {cases.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center bg-green-50/50 rounded-2xl border border-green-100 border-dashed">
                  <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-4 border border-green-100">
                    <ShieldCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-lg text-neutral-900 font-semibold">No Active Litigation</p>
                  <p className="text-neutral-500 mt-1">This property holds a clear legal record.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {cases.map((litigation, idx) => (
                    <div key={litigation.id} className="relative">
                      {idx !== cases.length - 1 && (
                        <div className="absolute left-8 top-24 bottom-0 w-px bg-neutral-200 -z-10"></div>
                      )}
                      
                      <div className="flex flex-col md:flex-row gap-6 items-start justify-between bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 rounded-2xl border border-neutral-100 mb-8 transition-shadow hover:shadow-soft">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-mono text-sm font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg">{litigation.caseNumber}</span>
                            <StatusBadge status={litigation.status} />
                          </div>
                          <p className="text-base text-neutral-600 mt-3">
                            <span className="font-semibold text-neutral-900">{litigation.plaintiff}</span> 
                            <span className="mx-2 text-neutral-400 font-serif italic">vs</span> 
                            <span className="font-semibold text-neutral-900">{litigation.defendant}</span>
                          </p>
                        </div>
                        <div className="md:text-right w-full md:w-auto p-4 md:p-0 bg-neutral-50 md:bg-transparent rounded-xl">
                          <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Filed On</p>
                          <p className="text-base font-medium text-neutral-900 mt-1">{new Date(litigation.filingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                      
                      <div className="pl-2">
                        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6 ml-2 flex items-center">
                          <span className="w-4 h-px bg-neutral-300 mr-2"></span>
                          Hearing Timeline
                        </h4>
                        <Timeline hearings={litigation.hearings} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
