import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Login } from './pages/Login';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { ClerkDashboard } from './pages/ClerkDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { CommandPalette } from './components/ui/CommandPalette';

// A wrapper to handle Framer Motion AnimatePresence with Routes
const AnimatedRoutes = ({ userRole, userName }: { userRole: string | null, userName: string }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          userRole 
            ? <Navigate to={`/${userRole}`} replace /> 
            : <Login onLogin={() => {}} /> // Handled in App
        } />
        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/" 
          element={<DashboardLayout role={userRole as any} userName={userName} />}
        >
          <Route path="citizen" element={<CitizenDashboard />} />
          <Route path="clerk/*" element={<ClerkDashboard />} />
          <Route path="admin/*" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [userRole, setUserRole] = useState<'citizen' | 'clerk' | 'admin' | null>(() => {
    return (localStorage.getItem('userRole') as 'citizen' | 'clerk' | 'admin' | null) || null;
  });
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('userName') || '';
  });

  const handleLogin = (role: 'citizen' | 'clerk' | 'admin', name: string) => {
    setUserRole(role);
    setUserName(name);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
  };



  return (
    <BrowserRouter>
      {/* Passing handleLogin down requires restructuring slightly, but since AnimatedRoutes is inside, we handle it here */}
      <Routes>
        {!userRole ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route path="*" element={<AnimatedRoutes userRole={userRole} userName={userName} />} />
        )}
      </Routes>
      <CommandPalette />
    </BrowserRouter>
  );
}

export default App;
