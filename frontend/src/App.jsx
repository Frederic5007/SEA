import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import FloatingNav from './components/Navigation/FloatingNav';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import './App.css';
import AuthModal from './components/Auth/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import LiveTracking from './pages/Tracking/LiveTracking';
import Profile from './pages/Account/Profile';
import Shipments from './pages/Account/Shipments';
import Settings from './pages/Account/Settings';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  return (
    <div className="App">
      <FloatingNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Tracking Routes */}
        <Route path="/tracking" element={
          <RequireAuth onRequireAuth={openAuth}>
            <LiveTracking />
          </RequireAuth>
        } />
        <Route path="/tracking/*" element={
          <RequireAuth onRequireAuth={openAuth}>
            <LiveTracking />
          </RequireAuth>
        } />
        
        {/* About Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/*" element={<AboutPage />} />
        
        {/* Account Routes */}
        <Route path="/account/profile" element={<RequireAuth onRequireAuth={openAuth}><Profile /></RequireAuth>} />
        <Route path="/account/shipments" element={<RequireAuth onRequireAuth={openAuth}><Shipments /></RequireAuth>} />
        <Route path="/account/settings" element={<RequireAuth onRequireAuth={openAuth}><Settings /></RequireAuth>} />
        <Route path="/account" element={<Navigate to="/account/profile" replace />} />
        
        {/* Dashboard Routes */}
        <Route path="/employee" element={
          <RequireAuth onRequireAuth={openAuth}>
            <RequireRole role="employee">
              <EmployeeDashboard />
            </RequireRole>
          </RequireAuth>
        } />
        <Route path="/employee/*" element={
          <RequireAuth onRequireAuth={openAuth}>
            <RequireRole role="employee">
              <EmployeeDashboard />
            </RequireRole>
          </RequireAuth>
        } />
        
        <Route path="/admin" element={
          <RequireAuth onRequireAuth={openAuth}>
            <RequireRole role="admin">
              <AdminDashboard />
            </RequireRole>
          </RequireAuth>
        } />
        <Route path="/admin/*" element={
          <RequireAuth onRequireAuth={openAuth}>
            <RequireRole role="admin">
              <AdminDashboard />
            </RequireRole>
          </RequireAuth>
        } />
        
        {/* Auth Routes */}
        <Route path="/auth/*" element={<PlaceholderPage title="Authentication" icon="🔐" description="Sign up or login to access tracking features" onGetStarted={openAuth} />} />
      </Routes>

      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} navigate={navigate} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

// Placeholder component for other pages
const PlaceholderPage = ({ title, icon, description, onGetStarted }) => (
  <div style={{ 
    padding: '120px 24px 60px', 
    textAlign: 'center', 
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)'
  }}>
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}>{icon}</div>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '800', 
        color: 'var(--text-primary)', 
        marginBottom: '16px' 
      }}>
        {title}
      </h1>
      <p style={{ 
        fontSize: '1.25rem', 
        color: 'var(--text-secondary)', 
        marginBottom: '40px' 
      }}>
        {description || "This page is coming soon! We're working hard to bring you the best GPS tracking experience."}
      </p>
      <button 
        type="button"
        onClick={onGetStarted}
        style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '12px',
          fontWeight: '600',
          fontSize: '1.1rem',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        }}
      >
        Get Started
      </button>
    </div>
  </div>
);

export default App;

function RequireAuth({ children, onRequireAuth }) {
  const { isLoggedIn } = useAuth();
  const promptedRef = useRef(false);

  useEffect(() => {
    if (!isLoggedIn && !promptedRef.current) {
      promptedRef.current = true;
      onRequireAuth?.();
    }
  }, [isLoggedIn, onRequireAuth]);

  if (!isLoggedIn) {
    return (
      <PlaceholderPage title="Authentication Required" icon="🔐" description="Please log in to access this page." onRequireAuth={onRequireAuth} />
    );
  }
  return children;
}

function RequireRole({ children, role }) {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <PlaceholderPage title="Loading..." icon="⏳" description="Please wait while we verify your access..." />
    );
  }

  // Check if user has the required role or higher
  const roleHierarchy = { user: 1, employee: 2, admin: 3 };
  const userRoleLevel = roleHierarchy[user.role] || 0;
  const requiredRoleLevel = roleHierarchy[role] || 0;

  if (userRoleLevel < requiredRoleLevel) {
    return (
      <PlaceholderPage 
        title="Access Denied" 
        icon="🚫" 
        description={`You need ${role} privileges to access this page. Please contact an administrator if you believe this is an error.`} 
      />
    );
  }

  return children;
}
