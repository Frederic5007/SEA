# SEA Transit - Dashboard System

This document describes the new dashboard system for SEA Transit, including the Employee Dashboard and Admin Dashboard.

## Overview

The dashboard system provides role-based access control with three main user types:

- **Users**: Basic customers who can track shipments
- **Employees**: Transit agents with delivery management capabilities
- **Admins**: System administrators with full access

## Features

### Employee Dashboard (`/employee`)

**Access**: Users with `employee` or `admin` role

**Features**:

- **Overview**: Statistics dashboard showing active shipments, deliveries, and activities
- **Live Tracking**: Real-time tracking of packages and deliveries
- **Shipments**: Manage and monitor shipment status
- **Deliveries**: Schedule and track delivery routes
- **Customers**: Customer database and contact information
- **Settings**: Employee profile and preferences

**Key Capabilities**:

- View shipment statistics and real-time updates
- Track delivery routes and optimize paths
- Manage customer relationships
- Update shipment statuses
- Access delivery schedules

### Admin Dashboard (`/admin`)

**Access**: Users with `admin` role only

**Features**:

- **Overview**: System-wide statistics and user metrics
- **User Management**: Add, edit, and manage user accounts
- **Role Management**: Assign and modify user roles
- **Settings**: System configuration and security settings

**Key Capabilities**:

- Promote users to employees
- Demote employees to regular users
- Activate/deactivate user accounts
- View system analytics
- Manage user permissions

## Technical Implementation

### Backend API Endpoints

#### Admin Endpoints

- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:userId/role` - Update user role (admin only)
- `PUT /api/admin/users/:userId/status` - Update user status (admin only)
- `DELETE /api/admin/users/:userId` - Delete user (admin only)
- `GET /api/admin/stats` - Get system statistics (admin only)

#### Role Management

- **User**: Basic permissions (view shipments, track packages)
- **Employee**: Enhanced permissions (manage shipments, track deliveries)
- **Admin**: Full permissions (user management, system settings)

### Frontend Components

#### Employee Dashboard

- `src/pages/Employee/EmployeeDashboard.jsx` - Main dashboard component
- `src/pages/Employee/EmployeeDashboard.css` - Dashboard styling

#### Admin Dashboard

- `src/pages/Admin/AdminDashboard.jsx` - Main admin component
- `src/pages/Admin/AdminDashboard.css` - Admin styling

### Routing

- `/employee` - Employee dashboard (requires employee role)
- `/admin` - Admin dashboard (requires admin role)

## Usage Instructions

### For Employees

1. **Access Dashboard**: Navigate to `/employee` after logging in
2. **View Overview**: Check daily statistics and recent activities
3. **Track Shipments**: Monitor active shipments and delivery status
4. **Manage Deliveries**: Update delivery status and customer information
5. **Customer Support**: Access customer database for assistance

### For Administrators

1. **Access Dashboard**: Navigate to `/admin` after logging in
2. **User Management**:
   - Search and filter users
   - Change user roles (promote to employee)
   - Activate/deactivate accounts
3. **System Monitoring**: View system statistics and user metrics
4. **Role Configuration**: Manage user permissions and access levels

### Role Assignment

**To promote a user to employee**:

1. Login as admin
2. Go to Admin Dashboard → User Management
3. Find the user in the table
4. Change their role from "User" to "Employee"
5. The user will now have access to `/employee` dashboard

**To promote a user to admin**:

1. Login as admin
2. Go to Admin Dashboard → User Management
3. Find the user in the table
4. Change their role to "Admin"
5. The user will now have access to `/admin` dashboard

## Security Features

- **Role-based Access Control**: Users can only access dashboards appropriate to their role
- **JWT Authentication**: Secure token-based authentication
- **Admin-only Endpoints**: Critical operations require admin privileges
- **Input Validation**: Server-side validation of all user inputs
- **Session Management**: Secure session handling with logout functionality

## Future Enhancements

- **Real-time Notifications**: Push notifications for shipment updates
- **Advanced Analytics**: Detailed reporting and performance metrics
- **Mobile App**: Native mobile applications for field agents
- **Integration**: Connect with external logistics systems
- **Audit Logs**: Track all administrative actions for compliance

## Troubleshooting

### Common Issues

1. **Access Denied Error**: Ensure user has the correct role assigned
2. **Dashboard Not Loading**: Check if user is properly authenticated
3. **Role Changes Not Saving**: Verify admin privileges and try refreshing

### Support

For technical support or questions about the dashboard system, contact the development team or refer to the API documentation.

---

**Note**: This dashboard system is designed for internal use by SEA Transit employees and administrators. All access is logged and monitored for security purposes.
