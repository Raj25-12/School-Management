import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();

  // If no specific roles required or user matches allowed roles
  if (allowedRoles.length === 0 || (userRole && allowedRoles.map(r => r.toLowerCase()).includes(userRole))) {
    return <Outlet />;
  }

  // Redirect to appropriate dashboard based on actual role if user has a different role
  if (userRole === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (userRole === 'teacher') {
    return <Navigate to="/teacher/dashboard" replace />;
  }
  if (userRole === 'student') {
    return <Navigate to="/student/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RoleRoute;
