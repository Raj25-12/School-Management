import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const ProtectedRoute = ({ allowedRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen size="md" variant="primary" />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    const roleTarget = user.role === 'admin' ? '/admin/dashboard' : user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard';
    return <Navigate to={roleTarget} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
