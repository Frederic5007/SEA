import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Package, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Search,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'tracking', label: 'Live Tracking', icon: MapPin },
    { id: 'shipments', label: 'Shipments', icon: Package },
    { id: 'deliveries', label: 'Deliveries', icon: Truck },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'tracking':
        return <TrackingTab />;
      case 'shipments':
        return <ShipmentsTab />;
      case 'deliveries':
        return <DeliveriesTab />;
      case 'customers':
        return <CustomersTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="employee-dashboard">
      {/* Sidebar */}
      <motion.aside 
        className="dashboard-sidebar"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sidebar-header">
          <div className="company-logo">
            <Package size={32} />
            <h2>SEA Transit</h2>
          </div>
          <p className="employee-role">Employee Portal</p>
        </div>

        <nav className="sidebar-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="employee-info">
            <div className="employee-avatar">
              {user?.name?.charAt(0) || 'E'}
            </div>
            <div className="employee-details">
              <p className="employee-name">{user?.name || 'Employee'}</p>
              <p className="employee-email">{user?.email}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="page-title">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h1>
            <p className="page-subtitle">
              Welcome back, {user?.name}! Here's what's happening today.
            </p>
          </div>
          <div className="header-right">
            <div className="date-time">
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="date-time">
              <Clock size={16} />
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = () => {
  const stats = [
    { label: 'Active Shipments', value: '24', icon: Package, color: 'blue' },
    { label: 'In Transit', value: '12', icon: Truck, color: 'orange' },
    { label: 'Delivered Today', value: '8', icon: MapPin, color: 'green' },
    { label: 'Pending Pickups', value: '5', icon: Users, color: 'purple' }
  ];

  return (
    <div className="overview-tab">
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className={`stat-card stat-${stat.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Placeholder components for other tabs
const TrackingTab = () => <div className="tab-content">Live Tracking Content</div>;
const ShipmentsTab = () => <div className="tab-content">Shipments Content</div>;
const DeliveriesTab = () => <div className="tab-content">Deliveries Content</div>;
const CustomersTab = () => <div className="tab-content">Customers Content</div>;
const SettingsTab = () => <div className="tab-content">Settings Content</div>;

export default EmployeeDashboard;
