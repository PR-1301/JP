import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { ClerkDashboard } from './pages/ClerkDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { DashboardLayout } from './components/layout/DashboardLayout';

function App() {
  const [userRole, setUserRole] = useState<'citizen' | 'clerk' | 'admin' | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleLogin = (role: 'citizen' | 'clerk' | 'admin', name: string) => {
    setUserRole(role);
    setUserName(name);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/" 
          element={<DashboardLayout role={userRole!} userName={userName} />}
        >
          <Route path="citizen" element={<CitizenDashboard />} />
          <Route path="clerk/*" element={<ClerkDashboard />} />
          <Route path="admin/*" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
