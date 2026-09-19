import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Fingerprint, Shield, FileText } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import Tilt from 'react-parallax-tilt';

interface LoginProps {
  onLogin: (role: 'citizen' | 'clerk' | 'admin', name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (role: 'citizen' | 'clerk' | 'admin') => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      onLogin(role, user.name);
      navigate(`/${role}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side: Brand Storytelling */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577983693247-49f3e46c9687?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-indigo-900/50"></div>
        </div>
        
        <div className="relative z-10 max-w-lg text-white space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-center space-x-3 mb-12">
            <Scale className="w-10 h-10 text-indigo-400" />
            <span className="font-serif text-3xl font-bold tracking-tight">LandRegistry</span>
          </div>
          
          <h1 className="text-5xl font-serif font-bold leading-tight">
            Immutable. <br />
            Transparent. <br />
            Secure.
          </h1>
          
          <p className="text-indigo-200 text-lg leading-relaxed">
            A government-grade platform managing land ownership records, court litigation cases, and a blockchain-backed audit trail for tamper-proof record keeping.
          </p>
          
          <div className="grid grid-cols-2 gap-6 pt-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-indigo-400 mt-1" />
              <div>
                <h4 className="font-semibold">Cryptographic Security</h4>
                <p className="text-sm text-indigo-300 mt-1">Every record is hashed and linked securely.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FileText className="w-6 h-6 text-indigo-400 mt-1" />
              <div>
                <h4 className="font-semibold">Litigation Tracking</h4>
                <p className="text-sm text-indigo-300 mt-1">Real-time sync with court hearing statuses.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative">
        <div className="absolute top-8 right-8 text-sm text-neutral-400 font-mono">v2.4.0 (Gov Cloud)</div>
        
        <div className="w-full max-w-sm mx-auto space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 delay-300 fill-mode-both">
          <div>
            <h2 className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">Access Portal</h2>
            <p className="mt-2 text-sm text-neutral-500">Select your authorized role to enter the system.</p>
          </div>

          <div className="space-y-4">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000}>
              <button 
                onClick={() => handleLogin('citizen')}
                className="w-full group flex items-center justify-between p-4 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow-soft hover:border-indigo-400 hover:shadow-[0_0_30px_rgb(79,70,229,0.2)] transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white/80 group-hover:bg-indigo-50 flex items-center justify-center transition-colors shadow-sm">
                    <Fingerprint className="w-6 h-6 text-neutral-500 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 group-hover:text-indigo-900 transition-colors">Citizen Portal</h3>
                    <p className="text-xs text-neutral-500">Public land record lookup</p>
                  </div>
                </div>
              </button>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000}>
              <button 
                onClick={() => handleLogin('clerk')}
                className="w-full group flex items-center justify-between p-4 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow-soft hover:border-indigo-400 hover:shadow-[0_0_30px_rgb(79,70,229,0.2)] transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white/80 group-hover:bg-indigo-50 flex items-center justify-center transition-colors shadow-sm">
                    <FileText className="w-6 h-6 text-neutral-500 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 group-hover:text-indigo-900 transition-colors">Clerk Workspace</h3>
                    <p className="text-xs text-neutral-500">Manage records and litigation</p>
                  </div>
                </div>
              </button>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000}>
              <button 
                onClick={() => handleLogin('admin')}
                className="w-full group flex items-center justify-between p-4 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow-soft hover:border-indigo-400 hover:shadow-[0_0_30px_rgb(79,70,229,0.2)] transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white/80 group-hover:bg-indigo-50 flex items-center justify-center transition-colors shadow-sm">
                    <Shield className="w-6 h-6 text-neutral-500 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 group-hover:text-indigo-900 transition-colors">Admin Dashboard</h3>
                    <p className="text-xs text-neutral-500">System config & Audit trail</p>
                  </div>
                </div>
              </button>
            </Tilt>
          </div>
          
          <p className="text-center text-xs text-neutral-400">
            By accessing this system, you agree to the Government Data Protection Policy and Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
};
