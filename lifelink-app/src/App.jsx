import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Splash from './pages/Splash';
import './components/layout/MobileFrame.css';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import Premium from './pages/Premium';
import Settings from './pages/Settings';
import BottomNav from './components/layout/BottomNav';
import './App.css';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      {children}
      <BottomNav />
    </div>
  );
};

const MobileAppLayout = () => {
  return (
    <div className="mobile-app-wrapper">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Legacy Redirects */}
        <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/records" element={<Navigate to="/app/records" replace />} />
        <Route path="/premium" element={<Navigate to="/app/premium" replace />} />
        <Route path="/settings" element={<Navigate to="/app/settings" replace />} />

        {/* App Routes wrapped in Mobile Frame */}
        <Route path="/app" element={<MobileAppLayout />}>
          <Route path="splash" element={<Splash />} />
          <Route path="dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="records" element={<MainLayout><Records /></MainLayout>} />
          <Route path="premium" element={<MainLayout><Premium /></MainLayout>} />
          <Route path="settings" element={<MainLayout><Settings /></MainLayout>} />
          {/* Redirect /app to /app/splash */}
          <Route index element={<Splash />} />
          <Route path="*" element={<Splash />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
