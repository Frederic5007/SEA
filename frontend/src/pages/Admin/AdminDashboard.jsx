import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Shield, 
  BarChart3, 
  Settings, 
  LogOut,
  Search,
  UserPlus,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const { user, logout } = useAuth();

  // Mock data
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@company.com',
        role: 'user',
        status: 'active',
        joinedAt: '2024-01-01',
        lastLogin: '2024-01-15',
        totalShipments: 12
      },
      {
        id: 2,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        role: 'employee',
        status: 'active',
        joinedAt: '2024-01-05',
        lastLogin: '2024-01-15',
        totalShipments: 25
      }
    ];
    setUsers(mockUsers);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'roles', label: 'Role Management', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab users={users} />;
      case 'users':
        return <UsersTab 
          users={users}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterRole={filterRole}
          setFilterRole={setFilterRole}
          onRoleChange={handleRoleChange}
        />;
      case 'roles':
        return <RolesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab users={users} />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <motion.aside 
        className="dashboard-sidebar"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sidebar-header">
          <div className="company-logo">
            <Shield size={32} />
            <h2>SEA Admin</h2>
          </div>
          <p className="admin-role">Administrator Portal</p>
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
          <div className="admin-info">
            <div className="admin-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="admin-details">
              <p className="admin-name">{user?.name || 'Admin'}</p>
              <p className="admin-email">{user?.email}</p>
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
              Welcome back, {user?.name}! Manage your system and users.
            </p>
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
const OverviewTab = ({ users }) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const employees = users.filter(u => u.role === 'employee').length;

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: Users, color: 'blue' },
    { label: 'Active Users', value: activeUsers, icon: Shield, color: 'green' },
    { label: 'Employees', value: employees, icon: UserPlus, color: 'purple' }
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

// Users Tab Component
const UsersTab = ({ users, searchQuery, setSearchQuery, filterRole, setFilterRole, onRoleChange }) => {
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="users-tab">
      <div className="users-header">
        <div className="search-filters">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="employee">Employees</option>
          </select>
        </div>
        <button className="add-user-btn">
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div className="table-cell">User</div>
          <div className="table-cell">Role</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Joined</div>
          <div className="table-cell">Actions</div>
        </div>
        
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            className="table-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="table-cell user-info">
              <div className="user-avatar">
                {user.name.charAt(0)}
              </div>
              <div className="user-details">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
              </div>
            </div>
            
            <div className="table-cell">
              <select
                value={user.role}
                onChange={(e) => onRoleChange(user.id, e.target.value)}
                className={`role-select ${user.role}`}
              >
                <option value="user">User</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div className="table-cell">
              <span className={`status-badge ${user.status}`}>
                {user.status}
              </span>
            </div>
            
            <div className="table-cell">{user.joinedAt}</div>
            
            <div className="table-cell actions">
              <button className="action-btn view" title="View Details">
                <Eye size={16} />
              </button>
              <button className="action-btn edit" title="Edit User">
                <Edit3 size={16} />
              </button>
              <button className="action-btn delete" title="Delete User">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Placeholder components
const RolesTab = () => <div className="tab-content">Role Management Content</div>;
const SettingsTab = () => <div className="tab-content">Settings Content</div>;

export default AdminDashboard;
